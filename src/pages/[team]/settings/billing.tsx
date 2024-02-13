import type { Price, Product, Subscription, Team } from "@prisma/client";
import { PricingPlanInterval } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/design-system/Button";
import Spinner from "@/components/design-system/Spinner";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/design-system/TabSelector";
import cn from "@/lib/cn";
import getStripe from "@/utils/stripeClient";
import { useTeam } from "@/lib/useTeam";
import type { RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
import SettingsLayout from "./layout";
import { createSSG } from "@/utils/ssg";
import type { GetServerSideProps } from "next";
import { addDays, format, isAfter } from "date-fns";
import Tag from "@/components/design-system/Tag";
import _ from "lodash";
import hasAccess, { ALL_FEATURES } from "@/lib/hasAccess";
import { Check, X } from "lucide-react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const ssg = await createSSG({ req, res });

  await Promise.allSettled([
    ssg.teams.get.prefetch(),
    ssg.stripe.products.prefetch(),
  ]);

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

function SubscriptionCard({
  product,
  subscription,
  price,
  team,
}: {
  product: Product;
  subscription: Subscription;
  price: Price;
  team: Team;
}) {
  const router = useRouter();
  const createPortalLinkMutation = api.stripe.createPortalLink.useMutation();
  const handleManageSubscription = useCallback(async () => {
    if (!team) return;

    const { portalUrl } = await createPortalLinkMutation.mutateAsync({
      slug: team.slug,
    });

    await router.push(portalUrl);
  }, [createPortalLinkMutation, router, team]);

  return (
    <>
      <h2 className="mb-4 text-lg font-medium">Current plan</h2>
      <div className="flex flex-col space-y-2">
        <div className="rounded-md border bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex">
              <div>
                <Image
                  src={product.image ?? ""}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="mr-3 rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-medium">{product.name}</p>
                <p>
                  {price
                    ? `${_.capitalize(price.interval ?? "")}ly plan`
                    : "Free plan"}
                </p>
                {subscription.cancelAt && (
                  <div className="flex">
                    Plan expires on &nbsp;
                    <Tag color="gray">
                      {format(subscription.cancelAt, "PPP")}
                    </Tag>
                  </div>
                )}
                {subscription?.status === "canceled" && (
                  <div>
                    <Tag color="gray">Canceled</Tag>
                    <pre>{JSON.stringify(team, null, 2)}</pre>
                  </div>
                )}
                {!subscription.cancelAtPeriodEnd &&
                  subscription.status !== "canceled" && (
                    <div className="flex">
                      Renews on&nbsp;
                      <Tag color="gray">
                        {format(
                          addDays(subscription.currentPeriodEnd, 1),
                          "PPP"
                        )}
                      </Tag>
                    </div>
                  )}
              </div>
            </div>
            <Button
              loading={createPortalLinkMutation.isLoading}
              variant="outline"
              onClick={handleManageSubscription}
            >
              Manage
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function Product({
  name,
  description,
  image,
  prices,
  selectedInterval,
  team,
  currentPrice,
}: RouterOutputs["stripe"]["products"][0] & {
  selectedInterval: PricingPlanInterval;
  team: Team;
  currentPrice: Price | undefined;
}) {
  const createSessionMutation = api.stripe.createCheckoutSession.useMutation();
  const price = prices.find((p) => p.interval === selectedInterval);

  const handleCreateSubscription = useCallback(async () => {
    if (!price || !team) return;

    const { sessionId } = await createSessionMutation.mutateAsync({
      slug: team.slug,
      priceId: price.id,
    });

    const stripe = await getStripe();
    await stripe?.redirectToCheckout({ sessionId });
  }, [createSessionMutation, price, team]);

  if (!price) return null;

  const isCurrentPlan = price.id === currentPrice?.id;
  const onAnyPlan = !!currentPrice;

  return (
    <div
      className={cn(
        "flex flex-1 flex-col rounded-md bg-white px-4 pb-8 text-center",
        "border",
        {
          "border-2 border-primary-600": isCurrentPlan,
        }
      )}
    >
      <h4 className="mt-6 self-center text-lg font-medium">{name}</h4>
      {image && (
        <Image
          src={image}
          alt={name}
          width={64}
          height={64}
          className="self-center rounded-md"
        />
      )}
      <h4 className="text-3xl font-semibold">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: price.currency,
          minimumFractionDigits: 0,
        }).format((price.unitAmount || 0) / 100)}
      </h4>
      <p className="mb-4 text-gray-500">per user, per {price.interval}</p>
      <h4 className="min-h-[50px] text-gray-500">{description}</h4>
      {!onAnyPlan && (
        <Button
          className={"mt-2 self-center px-5"}
          loading={createSessionMutation.isLoading}
          onClick={async () => {
            await handleCreateSubscription();
          }}
        >
          Upgrade
        </Button>
      )}
    </div>
  );
}

export default function Billing() {
  const { team } = useTeam();
  const [interval, setInterval] = useState<PricingPlanInterval>("month");

  const { data: products } = api.stripe.products.useQuery();

  useEffect(() => {
    const subscription = team?.subscriptions[0];
    if (!subscription) return;

    if (subscription.price.interval) {
      setInterval(subscription.price.interval);
    }
  }, [team]);

  if (!team) return;

  const currentSubscription = team?.subscriptions[0];
  const currentPrice = currentSubscription?.price;
  const currentProduct = currentPrice?.product;

  return (
    <SettingsLayout
      title="Billing"
      description="View and manage your plans and invoices"
    >
      {products ? (
        <>
          {currentSubscription && currentProduct && currentPrice && (
            <div className="mb-4">
              <SubscriptionCard
                team={team}
                subscription={currentSubscription}
                product={currentProduct}
                price={currentPrice}
              />
            </div>
          )}
          <div className="mt-8 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Plans</h3>
              <Tabs
                onValueChange={(v) => setInterval(v as PricingPlanInterval)}
                value={interval}
                className="self-end"
              >
                <TabsList>
                  <TabsTrigger value={PricingPlanInterval["month"]}>
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger value={PricingPlanInterval["year"]}>
                    Yearly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              {products?.map((p) => (
                <Product
                  key={p.id}
                  team={team}
                  selectedInterval={interval}
                  currentPrice={
                    currentSubscription?.status === "active"
                      ? currentPrice
                      : undefined
                  }
                  {...p}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {/* <h3 className="mt-12 mb-4 text-lg font-medium">Feature access</h3>
      <div className="flex w-full flex-col space-y-2 rounded-md border bg-gray-100 px-6 py-3">
        {ALL_FEATURES.map((feature) => (
          <div className="flex w-full items-center" key={feature}>
            <span className="mr-4 w-full">Access to "{feature}"?</span>
            {hasAccess(product, feature) ? (
              <Check className="h-5 w-4 text-green-500" />
            ) : (
              <X className="w-4 text-red-500" />
            )}
          </div>
        ))}
      </div> */}
    </SettingsLayout>
  );
}
