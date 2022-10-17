import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.episodes.findMany();
  }),
  getAllAboutEpisode: publicProcedure
    .input(z.object({ tconst: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.titles.findUnique({
        where: {
          tconst: input?.tconst,
        },
      });
    }),
});
