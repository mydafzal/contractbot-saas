import cn from "@/lib/cn";
import { DISCORD_LINK } from "@/lib/links";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import Logo from "../design-system/Logo";
import { Section } from "./Section";

const Subsection: React.FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => (
  <div className="flex flex-col space-y-3 p-2">
    <p className="text-sm font-bold">{title}</p>
    <div className="flex flex-col space-y-3 text-gray-500">{children}</div>
  </div>
);

export default function Footer({ className }: { className?: string }) {
  return (
    <div className={cn("border-t bg-gray-100", className)}>
      <Section>
        <div className="flex min-h-[200px] flex-col justify-between gap-8 bg-gray-100 text-base md:flex-row">
          <div className="flex h-full shrink-0 flex-col">
            <Logo variant="wordmark" />
            <p className="mt-3 max-w-sm text-gray-600">
              ContractBot is a platform utilizing Artificial General Intelligence to assist in the generation, editing, and advising on the creation of legal contracts. It is important to note that ContractBot does not constitute a legal practitioner or legal advisor, nor is it affiliated with or endorsed by the United States legal system or any of its entities. The content produced by ContractBot is not intended for use in legal proceedings, including but not limited to courtrooms or any other formal legal settings. Users should consult a qualified attorney for legal advice and document validation.
            </p>
            <p className="mt-12 text-gray-400">© 2024 Cheetah Agency, LLC. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-between gap-x-24 px-2">
            <Subsection title="Product">
              <Link href="/blog">ContractBot Blog</Link>
              <Link href="/roadmap">The Roadmap</Link>
              <Link href="https://dotbot.ai/about">About DotBot</Link>
            </Subsection>
            <Subsection title="About DotBot">
              <Link href="/terms-of-use">Terms of Use</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </Subsection>
            <Subsection title="Follow ContractBot">
              <Link href="https://x.com/contractbotai">X</Link>
              <Link href={DISCORD_LINK}>Discord</Link>
              <Link href="https://facebook.com/contractbotai">Facebook</Link>
              <Link href="https://instagram.com/contractbotai">Instagram</Link>
              <Link href="https://github.com/dotbotai">GitHub</Link>
            </Subsection>
          </div>
        </div>
      </Section>
    </div>
  );
}
