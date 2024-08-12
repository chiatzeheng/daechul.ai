import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
    getAllDocuments: protectedProcedure
        .query(async ({ctx}) => {
          const response = ctx.db.document.findMany({
            include: {
              versions: {
                orderBy: {
                  version: 'desc',
                },
                take: 1,
              },
            },
          })
          return response;
        }),

      getDocumentsFromUser: protectedProcedure 
      .input(z.object({ userID: z.string()}))
      .mutation(async ({ctx, input}) => {

        const { userID } = input;

        const user = await ctx.db.user.findUnique({
          where: { id: userID },
          include: {
            documents: {
              include: {
                versions: {
                  orderBy: {
                    version: 'desc',
                  },
                  take: 1,
                },
              },
            },
          },
        })
      
        if (!user) throw new Error('User not found')
        
        // const documents = user.documents.map(doc => ({
        //   id: doc.id,
        //   documentType: doc.documentType,
        //   createdAt: doc.createdAt,
        //   updatedAt: doc.updatedAt,
        //   currentStatus: doc.currentStatus,
        //   latestVersion: doc.versions[0],
        // }))


      
        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          //  documents: documents,
          documents: user.documents,
        }
      }
    )

});
