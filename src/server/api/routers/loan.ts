import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { DocumentStatus } from '@prisma/client';
import axios from 'axios';

export const loanRouter = createTRPCRouter({
  getLoanStatuses: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      return ctx.db.loanBridge.findMany({
        where: { userId },
        include: {
          loan: {
            select: {
              id: true,
              businessName: true,
              amount: true,
            },
          },
        },
      });
    }),

  getAllLoans: protectedProcedure
    .query(async ({ ctx }) => {
   
      return ctx.db.loanBridge.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }),
  getLoanByID: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const loan = await ctx.db.loan.findUnique({
        where: {
          id: input.id,
        },
        include: {
          loanBridge: {
            where: {
              userId,
            },
          },
        },
        
      });
      if (!loan || !loan.loanBridge) {
        throw new Error("Loan not found or not accessible");
      }

      return loan;
    }),


    getAdminLoanByID: protectedProcedure
    .input(z.object({
      id: z.string(),
      userId: z.string(),
    }))
    .query(async ({ ctx, input }) => {

      const { id, userId } = input;

      const loan = await ctx.db.loan.findUnique({
        where: {
          id: id,
        },
        include: {
          loanBridge: {
            where: {
              userId,
            },
          },
        },
      });
      if (!loan || !loan.loanBridge) {
        throw new Error("Loan not found or not accessible");
      }

      return loan;
    }),

    submitLoanApplication: protectedProcedure
    .input(z.object({
      businessName: z.string(),
      businessType: z.string(),
      taxId: z.string(),
      yearEstablished: z.number().int(),
      annualRevenue: z.number(),
      numberOfEmployees: z.number().int(),
      businessAddress: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
      contactFirstName: z.string(),
      contactLastName: z.string(),
      contactEmail: z.string().email(),
      contactPhone: z.string(),
      amount: z.number(),
      loanPurpose: z.string(),
      propertyType: z.string(),
      propertyUse: z.string(),
      creditScore: z.number().int(),
      downPayment: z.number(),
      hasCoBorrower: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.db.$transaction(async (prisma) => {
        const loan = await prisma.loan.create({
          data: {
            ...input,
            userId,
          },
        });

        const loanBridge = await prisma.loanBridge.create({
          data: {
            userId,
            loanId: loan.id,
            status: DocumentStatus.PENDING,
          },
        });

        return { loan, loanBridge };
      });
    }),

  updateLoanStatus: protectedProcedure
    .input(z.object({
      loanId: z.string(),
      userId: z.string(),
      status: z.nativeEnum(DocumentStatus),
    }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.loanBridge.update({
        where: {
          userId_loanId: {
            userId: input.userId,
            loanId: input.loanId,
          },
        },
        data: {
          status: input.status,
        },
        include: {
          loan: true,
        },
      });
    }),


    // userId        String
    // name          String
    // key           String         @unique
    // url           String         @unique
    // currentStatus DocumentStatus @default(PENDING)

    postDocument: protectedProcedure
    .input(z.object({
      name: z.string(),
      url: z.string(),
      key: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.document.create({
        data: {...input,
          userId: ctx.session.user.id,
        },
      });
    }),


  updateDocumentStatus: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.nativeEnum(DocumentStatus),
    }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.document.update({
        where: {  
          id: input.id,
        },
        data: {
          currentStatus: input.status,
        },
        include: {
          User: true,
        },
      });
    }),

  getDocuments: protectedProcedure
  .input(z.object({
    userId: z.string(),
  }))
  .query(async ({ ctx, input }) => {


      return ctx.db.document.findMany({
        where: {
          userId: input.userId,

        },

      
      });
    }),

    deleteDocument: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.document.delete({
        where: {  
          id: input.id,
        },
        include: {
          User: true,
        },
      });
    }),

    generateAIUnderwritingReport: protectedProcedure
    .input(z.object({
      data: z.object({
        businessName: z.string(),
        businessType: z.string(),
        taxId: z.string(),
        yearEstablished: z.number().int(),
        annualRevenue: z.number(),
        numberOfEmployees: z.number().int(),
        businessAddress: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        contactFirstName: z.string(),
        contactLastName: z.string(),
        contactEmail: z.string().email(),
        contactPhone: z.string(),
        amount: z.number(),
        loanPurpose: z.string(),
        propertyType: z.string(),
        propertyUse: z.string(),
        creditScore: z.number().int(),
        downPayment: z.number(),
        hasCoBorrower: z.boolean(),
      }),
      documents: z.array(z.string()),
    }))
    .mutation(async ({ input }) => {
      const { data, documents } = input;

      const response = await axios.post('http://0.0.0.0:8000/evaluate-loan', { data, documents }, {

        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response.data);
     return response.data;
  })

});