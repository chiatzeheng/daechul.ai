import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { env } from '@/env';
import OpenAI from "openai";
import pdf from 'pdf-parse';
import axios from 'axios';

const openai = new OpenAI({
  organization: "org-ymxnpz8pTqTYE6t0QUvKql4N",
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatbot = createTRPCRouter({
  getEmbedding: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      try {
        const embedding = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: input.text,
          dimensions: 1536,
          encoding_format: "float",
        });
        return embedding;
      } catch (error) {
        console.error('Error generating embedding:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to generate embedding' });
      }
    }),

  convertHostedPDFToEmbedding: protectedProcedure
    .input(z.object({
      documentId: z.string(),
      pdfUrl: z.string().url(),
      metadata: z.record(z.unknown()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // 1. Fetch PDF from URL
        const response = await axios.get(input.pdfUrl, { responseType: 'arraybuffer' });
        const pdfBuffer = Buffer.from(response.data, 'binary');

        // 2. Extract text from PDF
        const data = await pdf(pdfBuffer);
        const text = data.text;

        // 3. Generate embedding
        const embeddingResponse = await ctx.client.getEmbedding.query({ text });

        // 4. Store in database (assuming ctx.db.vectorTable is your vector database)
        await ctx.db.vectorTable.create({
          data: {
            id: input.documentId,
            embedding: embeddingResponse.data[0].embedding,
            metadata: {
              content: text,
              pdfUrl: input.pdfUrl,
              ...input.metadata,
            },
          },
        });

        return { success: true, documentId: input.documentId };
      } catch (error) {
        console.error('Error converting hosted PDF to embedding:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to convert hosted PDF to embedding' });
      }
    }),

  batchConvertHostedPDFsToEmbeddings: protectedProcedure
    .input(z.array(z.object({
      documentId: z.string(),
      pdfUrl: z.string().url(),
      metadata: z.record(z.unknown()).optional(),
    })))
    .mutation(async ({ ctx, input }) => {
      const results = await Promise.all(
        input.map(doc => ctx.client.convertHostedPDFToEmbedding.mutate(doc))
      );
      return results;
    }),

  adminDocumentSearch: protectedProcedure
    .input(z.object({ question: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const embedding = await ctx.client.getEmbedding.query({ text: input.question });
        
        const similarDocuments = await ctx.db.vectorTable.findMany({
          where: {
            embedding: {
              $near: {
                vector: embedding.data[0].embedding,
                max: 5,  // Adjust this value based on your needs
              },
            },
          },
          include: {
            metadata: true,
          },
        });
        
        const processedResults = similarDocuments.map((doc) => ({
          ...doc,
          highlightedContent: highlightText(doc.metadata.content, input.question),
          similarityPercentage: ((1 - doc.embedding.$meta.distance) * 100).toFixed(2) + '%',
        }));

        return processedResults;
      } catch (error) {
        console.error('Error in adminDocumentSearch:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to process document search' });
      }
    }),
});

function highlightText(content: string, query: string): string {
  const words = query.toLowerCase().split(/\s+/);
  const regex = new RegExp(words.join('|'), 'gi');
  return content.replace(regex, match => `<mark>${match}</mark>`);
}