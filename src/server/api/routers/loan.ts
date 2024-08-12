import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
    getLoansByUserID: protectedProcedure
        .query(async ({ctx}) => {
            const res = ctx.db.loan.findMany({
                where: {
                    id: ctx.session.user?.id,
                },
            });

            return res;
        }),
    getLoanByID: protectedProcedure
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ctx, input}) => {
            const res = ctx.db.loan.findUnique({
                where: {
                    id: input.id,
                },
            });

            return res;
        }),
});
