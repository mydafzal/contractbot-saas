import Header from "../Header";
import { useState } from "react";
import cn from "@/lib/cn";
import { CTAButton } from "../CTAButton";
import { motion } from "framer-motion";
import Footer from "../Footer";
import { HorizontalLine } from "../HorizontalLine";
import Head from "../Head";
import type { LucideIcon } from "lucide-react";
import { Scale } from "lucide-react";
import { ArrowRight } from "lucide-react";
import {
  FileLock,
  Check,
  X,
  BrainCircuit,
  Rabbit,
  Asterisk,
  Brain,
} from "lucide-react";
import type { Price } from "@prisma/client";
import { PricingPlanInterval } from "@prisma/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/design-system/Tabs";
import { Button } from "@/components/design-system/Button";
import { Section } from "../Section";
import Link from "next/link";

const PRODUCTS = [
  {
    name: "Pro",
    description: "For businesses and small firms.",
    prices: [
      {
        unitAmount: 1499,
        currency: "usd",
        interval: "month",
      },
      {
        unitAmount: 15999,
        currency: "usd",
        interval: "year",
      },
    ],
  },
  {
    name: "Elite",
    description: "For attorneys and law firms.",
    prices: [
      {
        unitAmount: 9999,
        currency: "usd",
        interval: "month",
      },
      {
        unitAmount: 107989,
        currency: "usd",
        interval: "year",
      },
    ],
  },
];

export const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl lg:text-4xl">
      {title}
    </h2>
  );
};

export const SectionSubtitle: React.FC<{ subtitle: string }> = ({
  subtitle,
}) => {
  return (
    <h3 className="mb-12 text-center text-xl font-light text-gray-600">
      {subtitle}
    </h3>
  );
};

export const Hero = () => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Link href="https://contract-bot.vercel.app/">
        <div className="mx-auto mb-8 flex w-fit items-center rounded-lg border bg-gray-100 p-2 pr-1 ring-0 ring-gray-200 transition-[ring] hover:ring-4">
          <span className="rounded-md bg-gray-300 px-2 py-[4px] text-xs font-semibold">
            ContractBot Chat
          </span>
          <p className="mx-2 hidden md:block">
            Use ContractBot's FREE chat, while awaiting ContractBot's launch.
          </p>
          <p className="mx-2 md:hidden">Use our new ContractBot Chat</p>
          <div className="hidden items-center space-x-1 p-1 px-2 md:flex">
            <span className="font-medium">Use Chat</span>
            <ArrowRight className="w-3" />
          </div>
        </div>
      </Link>
      <h1 className="mb-5 text-4xl font-extrabold md:text-5xl">
        Your AI-powered legal assistant.
      </h1>
      <h3 className="mb-8 flex flex-wrap items-center justify-center space-x-3 font-light text-gray-500 md:text-xl">
        ContractBot simplifies writing contracts and agreements. It's like
        having a lawyer in your pocket.
      </h3>
      <div className="mb-8 flex flex-col items-center space-y-4">
        <CTAButton />
      </div>

      <div className="max-w-8xl mx-auto">
        <video
          src="https://storage.googleapis.com/contractbot-web-assets/Comp%2017.mp4"
          autoPlay
          loop
          muted
          className="h-auto w-full"
        />
      </div>
    </motion.div>
  );
};

const FAQ_ITEMS = [
  {
    question: "Does ContractBot use ChatGPT or any of OpenAI's models?",
    answer:
      "No. ContractBot uses a proprietary model trained on a dataset of over 1 million legal documents and counting. We have worked hard to develop our own internal models to ensure that we can provide the best possible service to our users.",
  },
  {
    question: "Will ContractBot have an API or a developer platform?",
    answer:
      "Yes, we are currently working on an API and developer platform. If you are interested in being an early adopter, please contact us at developers@contractbot.ai",
  },
  {
    question: "Do users already have early access to ContractBot?",
    answer:
      "Yes, we are currently in the process of onboarding our first users. If you are interested in being an early adopter, please contact us at early@contractbot.ai",
  },
];

export const FAQAccordion: React.FC = () => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const handleClick = (index: number) => {
    setActiveIndexes((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className="mx-auto rounded-lg border bg-gray-100">
      {FAQ_ITEMS.map((item, index) => {
        const open = activeIndexes.includes(index);

        return (
          <div
            key={index}
            className="whitespace-pre-line border-b border-gray-200 text-base last:border-none"
          >
            <button
              className="flex w-full items-center space-x-4 py-6 px-5 text-gray-600"
              onClick={() => handleClick(index)}
            >
              <X
                className={cn("w-3 shrink-0 text-gray-400 transition", {
                  "rotate-45": !open,
                })}
              />
              <p className="text-left">{item.question}</p>
            </button>
            <div
              className={cn(
                "duration-400 overflow-hidden px-8 transition-[max-height,padding]",
                {
                  "max-h-0": !open,
                  "max-h-48 pb-8": open,
                }
              )}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const FeatureCard: React.FC<{
  title: string;
  icon: LucideIcon;
  description: string;
}> = ({ title, icon: Icon, description }) => {
  return (
    <div className="flex flex-col space-y-4 rounded-lg border p-6 ring-0 ring-gray-100 transition-[ring] hover:ring-4 md:p-8">
      <Icon className="h-8 w-8 stroke-1" />
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-base font-light leading-snug text-gray-500">
        {description}
      </p>
    </div>
  );
};

const PRICING_FEATURE_LIST: Record<string, string[]> = {
  Basic: ["Free Access To ContractBot Chat", "Generate 5 monthly contracts"],
  Pro: [
    "Unlimited ContractBot chat queries",
    "100 generated contracts per-month",
    "AI-Driven contract analysis",
    "Automated risk detection",
  ],
  Elite: [
    "Unlimited ContractBot chat queries",
    "Unlimiteed generated contracts",
    "AI-Driven contract analysis",
    "Automated risk detection",
  ],
};

const ProductCard: React.FC<{
  name: string;
  description: string | null;
  prevProductName?: string | undefined;
  price: Pick<Price, "currency" | "unitAmount">;
  interval: PricingPlanInterval;
}> = ({ interval, price, name, description, prevProductName }) => {
  return (
    <div className="flex flex-col justify-between rounded-lg border pt-8 pb-5 text-base ring-0 ring-gray-100 transition-[ring] hover:ring-4">
      <div className="flex flex-col space-y-4">
        <h3 className="text-center text-2xl font-bold">{name}</h3>
        <p className="mx-auto max-w-[20rem] px-8 text-center text-sm text-gray-600">
          {description}
        </p>
        <div className="flex w-full items-center justify-center space-x-2 border-b px-8 pb-8">
          {price.unitAmount === 0 ? (
            <p className="text-center text-5xl font-medium">Free</p>
          ) : (
            <>
              <p className="text-center text-5xl font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: price.currency,
                  minimumFractionDigits: 0,
                }).format((price.unitAmount || 0) / 100)}
              </p>
              <div className="text-gray-600">
                <p className="-mb-1">per user</p>
                <p>per {interval}</p>
              </div>
            </>
          )}
        </div>
        <div className="px-8 py-5">
          <p className="mb-3 font-medium text-gray-600">
            {prevProductName == null
              ? "Features"
              : `Everything in ${prevProductName}, plus...`}
          </p>
          <ul className="mb-8 space-y-2">
            {PRICING_FEATURE_LIST[name]?.map((feature, index) => (
              <li key={index} className="flex space-x-1">
                <Check className="w-4 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-4">
        <Button className="w-full py-6 text-center">
          Get started with {name}
        </Button>
      </div>
    </div>
  );
};

const PricingGrid: React.FC = () => {
  const [interval, setInterval] = useState<PricingPlanInterval>("month");

  return (
    <div className="flex w-full flex-col items-center space-y-8">
      <Tabs
        onValueChange={(v) => setInterval(v as PricingPlanInterval)}
        value={interval}
        className=""
      >
        <TabsList>
          <TabsTrigger value={PricingPlanInterval["month"]}>
            Monthly
          </TabsTrigger>
          <TabsTrigger value={PricingPlanInterval["year"]}>Yearly</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProductCard
          name="Basic"
          description="Everything small teams need to run operations"
          price={{
            currency: "USD",
            unitAmount: 0,
          }}
          interval={interval}
        />
        {PRODUCTS.map((product, i) => {
          const price = product.prices.find((p) => p.interval === interval);

          if (!price) return null;

          return (
            <ProductCard
              key={i}
              price={price}
              name={product.name}
              description={product.description}
              prevProductName={PRODUCTS[i - 1]?.name}
              interval={interval}
            />
          );
        })}
      </div>
    </div>
  );
};

export default function UnauthenticatedHome() {
  return (
    <>
      <Head
        title="ContractBot - Your AI Legal Assistant "
        description="ContractBot offers secure, AI-driven contract analysis with a user-centric design. Our platform uses advanced machine learning to predict contract outcomes, draft recommendations, and more. Enjoy seamless, scalable architecture with ongoing support and maintenance."
        image="https://storage.googleapis.com/contractbot-web-assets/contractbot-social.png"
      />
      <Header />
      <div className="">
        <Section>
          <Hero />
        </Section>
        <HorizontalLine />
        <Section>
          <SectionTitle title="Every single day, we load it up." />
          <SectionSubtitle subtitle="ContractBot isn't just built for attorneys, it evens the judicial playing field." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={BrainCircuit}
              title="AI-driven contract analysis"
              description="Leverage advanced machine learning models to predict contract outcomes, draft recommendations, understand complex legal jargon, and identify anomalies in legal filings."
            />
            <FeatureCard
              icon={Scale}
              title="Secure &amp; compliance-centric"
              description="Prioritize data protection with robust encryption and authentication mechanisms. Stay compliant with industry standards, data protection regulations, and legal technology standards."
            />
            <FeatureCard
              icon={Rabbit}
              title="Drastically increase drafting speed"
              description="Speed up the drafting and analyzing process of legal documents with the help of AI. ContractBot can help you draft contracts in minutes, not hours."
            />

            <FeatureCard
              icon={Brain}
              title="Intelligent insights"
              description="Gain smart suggestions during the contract creation process, making it more efficient and accurate. "
            />

            <FeatureCard
              icon={Asterisk}
              title="Automatic risk detection"
              description="Automatically identify potential legal pitfalls or non-compliant clauses in contracts and filings, reducing the risk of legal issues."
            />
            <FeatureCard
              icon={FileLock}
              title="Military-grade security"
              description="Rest assured that your data is protected with the highest standards of security and privacy. We use the latest encryption and authentication mechanisms to ensure your data is safe."
            />
          </div>
        </Section>
        <HorizontalLine />
        <Section>
          <SectionTitle title="Pricing" />
          <SectionSubtitle subtitle="Try for free. Pay to add teammates later." />
          <PricingGrid />
        </Section>
        <HorizontalLine />
        <Section>
          <SectionTitle title="FAQ" />
          <SectionSubtitle subtitle="Answers to help you decide if ContractBot is a good fit." />
          <FAQAccordion />
        </Section>
        <div className="h-8" />
        <Footer />
      </div>
    </>
  );
}
