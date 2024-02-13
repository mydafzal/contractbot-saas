import Image from "next/image";
import type { Author, Roadmap } from "contentlayer/generated";
import { AuthorCard } from "../AuthorCard";
import PostDate from "../blog/PostDate";
import MDX from "../mdx";
import Separator from "@/components/design-system/Separator";
import Link from "next/link";

export default function RoadmapCard({
  roadmap,
  author,
  link,
  showSeparator = true,
}: {
  roadmap: Roadmap;
  author: Author;
  link?: boolean;
  showSeparator?: boolean;
}) {
  const hero = (
    <>
      <Image
        src={roadmap.heroImage}
        alt={roadmap.title}
        className="w-full rounded-md"
        width={920}
        height={640}
      />
      <h2 className="mt-5 mb-4 text-4xl font-extrabold">{roadmap.title}</h2>
    </>
  );
  return (
    <li
      key={roadmap._id}
      className="relative grid grid-cols-3 md:grid-cols-4 md:pb-16"
    >
      <div className="sticky top-24 col-span-1 hidden h-fit pb-5 text-base md:block">
        <PostDate timeString={roadmap.createdAt} />
      </div>
      <div className="col-span-3">
        <div className="relative w-full md:pl-8">
          {link ? <Link href={`/roadmap/${roadmap.slug}`}>{hero}</Link> : hero}
          <PostDate timeString={roadmap.createdAt} className="mt-4 md:hidden" />
          <AuthorCard author={author} link={false} />
          <MDX content={roadmap.body.code} />
        </div>
      </div>
      {showSeparator && (
        <Separator className="col-span-4 my-8 w-full md:mt-20" />
      )}
    </li>
  );
}
