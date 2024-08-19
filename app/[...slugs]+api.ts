import { extract } from "@extractus/feed-extractor";
import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" }).get(
  "/rss",
  async ({ query }) => {
    const rss = await extract(query.feed);
    return rss;
  },
  { query: t.Object({ feed: t.String() }) },
);

export const GET = app.handle;
export const POST = app.handle;
