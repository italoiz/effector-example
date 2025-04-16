'use client'

import { Fragment } from "react";
import { Post } from "../_state/effects";
import PostCard from "./PostCard";
import { postsSelectors } from "../_state/store";
import { useSearchParams } from "next/navigation";

interface Props {
  initialPosts?: Post[]
}

export function PostList({ initialPosts }: Props) {
  const searchParams = useSearchParams()
  const { posts, isLoading, fetchMore } = postsSelectors.usePosts({
    initialPosts,
  });

  return (
    <Fragment>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 cursor-pointer"
        onClick={() => {
          const limit = searchParams.get('limit') ?? '2'
          fetchMore({ limit: parseInt(limit) + 2, page: 1 })
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Carregando...' : 'Carregar mais'}
      </button>
    </Fragment>
  )
}