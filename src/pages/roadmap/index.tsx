import type { GetStaticProps } from "next";
import { BlogHeader as HomeHeader } from "@/components/home/Header";
import type { Author, Roadmap } from "contentlayer/generated";
import { allRoadmaps } from "contentlayer/generated";
import { allAuthors } from "contentlayer/generated";
import Head from "@/components/home/Head";
import Footer from "@/components/home/Footer";
import { HorizontalLine } from "@/components/home/HorizontalLine";
import { Twitter } from "lucide-react";
import { LinkButton } from "@/components/design-system/LinkButton";
import RoadmapCard from "@/components/home/roadmap/RoadmapCard";
import TwitterFollowButton from "@/components/home/TwitterFollowButton";
import Separator from "@/components/design-system/Separator";
import PageTitle from "@/components/home/PageTitle";

type Props = {
  roadmaps: (Roadmap & { author: Author })[];
};

export default function RoadmapHome({ roadmaps }: Props) {
  return (
    <>
      <Head
        title="The Roadmap - ContractBot&trade;"
        description="Stay up-to-date with ContractBot's development roadmap as we near our full ALPHA launch."
        image="https://storage.googleapis.com/contractbot-web-assets/contractbot-social.png"
      />
      <div className="">
        <HomeHeader />
        <div className="container mx-auto mt-16 max-w-7xl px-4 lg:mt-16">
          <PageTitle>The Road To ContractBot Alpha</PageTitle>
          <Separator className="my-4 md:my-12" />
          <ul className="flex flex-col">
            {roadmaps.map((roadmap, i) => (
              <RoadmapCard
                key={roadmap.slug}
                roadmap={roadmap}
                author={roadmap.author}
                link
                showSeparator={i !== roadmaps.length - 1}
              />
            ))}
          </ul>
        </div>
        <Footer className="" />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const roadmaps = allRoadmaps
    .map((l) => {
      return {
        ...l,
        author: allAuthors.find((a) => a.slug === l.author),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return {
    props: {
      roadmaps,
    },
    revalidate: 60,
  };
};
