import type { GetStaticPaths, GetStaticProps } from "next";
import { BlogHeader } from "@/components/home/Header";
import type { Author, Roadmap } from "contentlayer/generated";
import { allAuthors, allRoadmaps } from "contentlayer/generated";
import Head from "@/components/home/Head";
import Footer from "@/components/home/Footer";
import BackTo from "@/components/home/BackToBlog";
import RoadmapCard from "@/components/home/roadmap/RoadmapCard";
import Separator from "@/components/design-system/Separator";

type Props = {
  roadmap: Roadmap;
  author: Author;
};

export default function RoadmapPage({ roadmap, author }: Props) {
  return (
    <>
      <Head title={roadmap.title} description={""} image={roadmap.heroImage} />
      <div className="">
        <BlogHeader />
        <div className="relative mx-auto mt-8 max-w-7xl py-12 px-4">
          <BackTo location="roadmap" />
          <Separator className="mt-4 mb-8" />
          <div className="flex flex-col">
            <RoadmapCard roadmap={roadmap} author={author} />
            <div className="h-8" />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allRoadmaps.map((roadmap) => ({
    params: { slug: roadmap.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const slug = params?.slug as string;
  const roadmap = allRoadmaps.find((p) => p.slug === slug);
  if (!roadmap) {
    throw new Error(`Roadmap with slug ${slug} not found`);
  }

  const author = allAuthors.find((a) => a.slug === roadmap.author);
  if (!author) {
    throw new Error(`Author with slug ${roadmap.author} not found`);
  }

  return {
    revalidate: 60,
    props: {
      roadmap,
      author,
    },
  };
};
