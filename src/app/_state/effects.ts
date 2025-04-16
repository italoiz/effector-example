import { createEffect } from "effector";
import { z } from "zod";
import { isSSR } from "./utils";

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const FetchPostsParamsSchema = z.object({
  limit: z.number().optional().default(10),
  page: z.number().optional().default(1),
})

export type Post = z.infer<typeof PostSchema>;
export type FetchPostsParams = z.infer<typeof FetchPostsParamsSchema>;

export const fetchPosts = createEffect<FetchPostsParams, Post[]>(async (params) => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  if (!isSSR()) {
    const newURL = new URL(window.location.href)
    newURL.searchParams.set('page', params.page.toString())
    newURL.searchParams.set('limit', params.limit.toString())
    window.history.pushState({}, '', newURL)
  }

  return await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${params.limit}&_page=${params.page}`)
    .then(res => res.json())
    .then(data => z.array(PostSchema).parse(data));
});

export const fetchPost = createEffect<number | string, Post>(async (postId) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(data => PostSchema.parse(data));
});
