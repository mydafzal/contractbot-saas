import * as React from "react";
import type { ButtonVariantProps } from "./buttonVariants";
import { buttonVariants } from "./buttonVariants";
import cn from "@/lib/cn";
import Spinner from "./Spinner";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner size="small" className="mr-2" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
