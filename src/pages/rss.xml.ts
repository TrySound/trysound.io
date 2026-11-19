import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { siteTitle, siteDescription } from "../site";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  const sortedPosts = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: siteTitle,
    description: siteDescription,
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.id}/`,
    })),
    customData: "<language>en-us</language>",
  });
}
