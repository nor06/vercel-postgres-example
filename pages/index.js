import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function getServerSideProps() {
  const posts = await prisma.post.findMany();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)), // To handle Date serialization
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className="p-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="border-b max-w-xs flex items-center justify-between bg-gray-300 border-gray-300 p-2">
            <Link href={`/${post.id}`} className="text-blue-500 hover:underline text-lg font-semibold">
              {post.name}
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
}
