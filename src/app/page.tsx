import { PostList } from "./_components/PostList";
import { fetchPosts } from "./_state/effects";

export default async function Home() {
  const initialPosts = await fetchPosts({ limit: 2, page: 1 });
  return (
    <div className="w-full min-h-screen max-w-lg container mx-auto bg-white px-4 py-8">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Posts</h2>
        <div className="flex flex-col gap-4 mt-4">
          <PostList initialPosts={initialPosts} />
        </div>
      </div>
    </div>
  );
}
