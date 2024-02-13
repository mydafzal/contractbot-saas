import type { GetStaticPaths, GetStaticProps } from "next";
import { BlogHeader } from "@/components/home/Header";
import PostCard from "@/components/home/blog/PostCard";
import type { Author, Post } from "contentlayer/generated";
import { allAuthors, allPosts } from "contentlayer/generated";
import Head from "@/components/home/Head";

type Props = {
  author: Author;
  posts: Post[];
};

export default function PostPage({ author, posts }: Props) {
  return (
    <>
      <Head
        title={author.name}
        description={`${author.name}'s posts for the ContractBot blog`}
        image="https://storage.googleapis.com/contractbot-web-assets/contractbot-social.png"
      />
      <div className="">
        <BlogHeader />
        <div className="container mx-auto mt-16 max-w-[920px] py-12">
          <h1 className="mb-10 text-xl font-medium">
            <span className="text-gray-500">More posts from </span>
            <span className="font-semibold">{author.name}</span>
          </h1>
          <ul className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 lg:gap-y-20">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allAuthors.map((author) => ({
    params: { authorSlug: author.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const slug = params?.authorSlug as string;
  const author = allAuthors.find((a) => a.slug === slug);

  if (!author) throw new Error("Author not found");

  const posts = allPosts.filter((p) => p.author === author.slug);

  return {
    revalidate: 60,
    props: {
      author,
      posts,
    },
  };
};
