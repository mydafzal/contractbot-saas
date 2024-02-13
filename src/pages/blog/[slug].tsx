import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { BlogHeader } from "@/components/home/Header";
import TimeToRead from "@/components/home/blog/MinuteRead";
import type { Author, Post } from "contentlayer/generated";
import { allAuthors, allPosts } from "contentlayer/generated";
import PostDate from "@/components/home/blog/PostDate";
import Head from "@/components/home/Head";
import Footer from "@/components/home/Footer";
import BackTo from "@/components/home/BackToBlog";
import MDX from "@/components/home/mdx";
import { LinkButton } from "@/components/design-system/LinkButton";
import { CONTRACTBOT_LINK } from "@/lib/links";
import { ArrowRight } from "lucide-react";
import { AuthorCard } from "@/components/home/AuthorCard";

type Props = {
  post: Post;
  author: Author;
};

export default function PostPage({ post, author }: Props) {
  return (
    <>
      <Head
        title={post.title}
        description={post.brief}
        image={post.heroImage}
      />
      <div className="">
        <BlogHeader />
        <div className="container relative mx-auto mt-16 max-w-[820px] py-12 px-4">
          <BackTo location="blog" />
          <div className="mt-4 flex flex-col">
            {post.heroImage && (
              <Image
                className="mx-auto mb-8 rounded-md"
                src={post.heroImage}
                alt={post.title}
                width={920}
                height={640}
              />
            )}
            <div className="my-4 flex items-center text-base">
              <PostDate timeString={post.createdAt} />
              <span className="px-2 text-gray-200">•</span>
              <TimeToRead minutes={post.readTimeInMinutes} />
            </div>
            <h1 className="mb-3 text-4xl font-bold">{post.title}</h1>
            <AuthorCard author={author} />
            <MDX content={post.body.code} />
            <div className="my-4 w-full rounded py-10 px-4 pt-12 text-center shadow-outline">
              <h3 className="text-xl font-bold md:text-2xl">
              We're nearing the launch of ContractBot's Alpha!
              </h3>
              <p className="mt-4 mb-6 text-base">
                Be one of the first in line to try out our revolutionary legal platform.
              </p>
              <LinkButton variant="default" href={CONTRACTBOT_LINK}>
                  Get Early Access
                <ArrowRight className="ml-2 w-4" />
              </LinkButton>
            </div>
            <div className="h-8" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const slug = params?.slug as string;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) {
    throw new Error(`Post with slug ${slug} not found`);
  }

  const author = allAuthors.find((a) => a.slug === post.author);
  if (!author) {
    throw new Error(`Author with slug ${post.author} not found`);
  }

  return {
    revalidate: 60,
    props: {
      post,
      author,
    },
  };
};
