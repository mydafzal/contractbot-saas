import type { GetStaticProps } from "next";
import { BlogHeader } from "@/components/home/Header";
import PostCard from "@/components/home/blog/PostCard";
import type { Author, Post } from "contentlayer/generated";
import { allAuthors } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";
import Head from "@/components/home/Head";
import Footer from "@/components/home/Footer";
import { HorizontalLine } from "@/components/home/HorizontalLine";
import PageTitle from "@/components/home/PageTitle";
import Separator from "@/components/design-system/Separator";

type Props = {
  posts: (Post & { author: Author })[];
};

export default function Home({ posts }: Props) {
  return (
    <>
      <Head
        title="Blog - ContractBot"
        description="ContractBot's blog is full of useful information about our advancements in the legal and artificial intelligence spaces."
        image="https://storage.googleapis.com/contractbot-web-assets/contractbot-social.png"
      />
      <div className="">
        <BlogHeader />
        <div className="container mx-auto mt-16 max-w-7xl px-4 lg:mt-16">
          <PageTitle>Blog</PageTitle>
          <Separator className="my-4 md:my-12" />
          <ul className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 lg:gap-y-20">
            {posts.map((post) => (
              <li key={post._id}>
                <PostCard post={post} author={post.author} />
              </li>
            ))}
          </ul>
        </div>
        <div className="h-20" />
        <Footer className="" />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.map((p) => {
    return {
      ...p,
      author: allAuthors.find((a) => a.slug === p.author),
    };
  });

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};
