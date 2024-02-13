import * as React from "react";
import type { VariantProps } from "class-variance-authority";

import cn from "@/lib/cn";
import Spinner from "./Spinner";
import type { ButtonVariantProps } from "./buttonVariants";
import { buttonVariants } from "./buttonVariants";
import type { LinkProps } from "next/link";
import Link from "next/link";

interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    ButtonVariantProps,
    LinkProps {
  loading?: boolean;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <Link
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading && <Spinner size="small" className="mr-2" />}
        {children}
      </Link>
    );
  }
);
LinkButton.displayName = "Button";

export { LinkButton };
