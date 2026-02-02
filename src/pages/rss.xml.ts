import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const blog = await getCollection("blog");
  const sortedPosts = blog.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: "Bogdan Chadkin aka TrySound",
    description:
      "Building fast, accessible user interfaces and scalable front-end architecture. 10+ years of experience with a passion for performance, web standards, and developer experience.",
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.slug}/`,
    })),
    customData: "<language>en-us</language>",
  });
}
