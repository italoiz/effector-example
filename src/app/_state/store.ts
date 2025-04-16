'use client'

import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { fetchPosts, Post } from "./effects";
import { useEffect } from "react";

interface $PostsStore {
  posts: Post[]
}

export const postsStore = createStore<$PostsStore>({
  posts: [],
});

const setPosts = createEvent<Post[]>()

postsStore
  .on(fetchPosts.doneData, (state, posts) => ({
    ...state,
    posts,
  }))
  .on(setPosts, (state, posts) => ({
    ...state,
    posts,
  }));


export const postsSelectors = {
  usePosts: ({ initialPosts }: { initialPosts?: Post[] }) => {
    useEffect(() => {
      if (initialPosts && !!initialPosts.length)
        setPosts(initialPosts)
    }, [initialPosts])

    return useUnit({
      posts: postsStore.map(state => state.posts),
      isLoading: fetchPosts.pending,
      fetchMore: fetchPosts,
    })
  },
};
