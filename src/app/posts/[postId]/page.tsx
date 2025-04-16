import { fetchPost } from "@/app/_state/effects";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { postId: string } }) {
  const post = await fetchPost(params.postId)

  if (!post) {
    return notFound()
  }

  return (
    <div className="w-full min-h-screen max-w-lg container mx-auto bg-white px-4 py-8">
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <Link href="/">
            <span className="text-gray-500 leading-0 text-sm font-bold">{'<<'} Voltar</span>
          </Link>
          <h2 className="text-2xl font-bold">{post.title}</h2>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <p>{post.body}</p>
        </div>
      </div>
    </div>
  );
}
