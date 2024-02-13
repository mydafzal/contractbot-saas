import type { Product } from "@prisma/client";

const PRO_PRODUCT = "prod_PTY2tQImgPNaoQ";
const ELITE_PRODUCT = "prod_PTY2B3Gd802xdS";

export type Feature = "example_pro_feature" | "example_elite_feature";

/**
 * This is a mapping from stripe product ids to the features they unlock.
 * The keys are in the order of increasingly powerful products.
 * ex: Free/Basic ($0) -> Business ($20) -> Enterprise ($30)
 * ex: All the features unlocked by Business are also automatically unlocked by Enterprise.
 */
const FEATURE_UNLOCKS_BY_PRODUCT: Record<string, Feature[]> = {
  [PRO_PRODUCT]: ["example_pro_feature"],
  [ELITE_PRODUCT]: ["example_elite_feature"],
};

const SORTED_PRODUCT_IDS = Object.keys(FEATURE_UNLOCKS_BY_PRODUCT);

export const ALL_FEATURES = Object.values(FEATURE_UNLOCKS_BY_PRODUCT).flat();

/**
 * hasAccess checks if a subscription has access to a feature.
 * This assumes that subscriptions on the SORTED_PRODUCT_IDS list
 * have access to all features unlocked by previous products.
 */
export default function hasAccess(
  product: Product | null,
  feature: Feature
): boolean {
  if (product === null) {
    return false;
  }

  const productIndex = SORTED_PRODUCT_IDS.indexOf(product.id);
  if (productIndex === -1) {
    console.error(`Product ${product.id} is not in the list of products`);
    return false;
  }

  const relevantFeatures = Object.values(FEATURE_UNLOCKS_BY_PRODUCT)
    .slice(0, productIndex + 1)
    .flatMap((x) => x);

  return relevantFeatures.includes(feature);
}
