import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Callout from "./Callout";
import { H1, H2, H3, H4 } from "./Headings";
import LI from "./LI";
import Link from "./Link";
import OL from "./OL";
import P from "./P";
import Pre from "./Pre";
import Code from "./Code";
import Span from "./Span";
import UL from "./UL";
import Tweet from "./Tweet";

const MDX_COMPONENTS = {
  // basic
  Image,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  a: Link,
  pre: Pre,
  code: Code,
  p: P,
  span: Span,
  ul: UL,
  ol: OL,
  li: LI,

  // custom
  Callout,
  Tweet,
};

export default function MDX({ content }: { content: string }) {
  const Component = useMDXComponent(content);
  if (Component) {
    return (
      <div className="text-base">
        <Component components={MDX_COMPONENTS} />
      </div>
    );
  }

  return <div />;
}
