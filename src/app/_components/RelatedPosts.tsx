import Link from "next/link"
import { fetchPosts } from "../_state/effects"

export async function RelatedPosts() {
  const relatedPosts = await fetchPosts({ limit: 4, page: 1 })

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {relatedPosts.map((relatedPost) => (
            <Link 
              key={relatedPost.id} 
              href={`/posts/${relatedPost.id}`}
              className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <h4 className="font-semibold text-lg mb-2 line-clamp-2">{relatedPost.title}</h4>
              <p className="text-gray-600 text-sm line-clamp-3">{relatedPost.body.substring(0, 100)}...</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/display-name
RelatedPosts.Skeleton = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Related Posts</h3>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {new Array(3).fill('').map((_, idx) => (
            <div
              key={`mock-${idx}`} 
              className="animate-pulse bg-gray-400 flex-shrink-0 w-64 h-48 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            />
          ))}
        </div>
      </div>
    </div>
  )
}