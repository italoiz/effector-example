import Link from "next/link";

interface Props {
  title: string
  body: string
  id: number
}

export default function PostCard({ title, body, id: postId }: Props) {
  return (
    <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{body}</p>
      <Link href={`/posts/${postId}`} className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">
        Read more
      </Link>
    </div>
  );
}