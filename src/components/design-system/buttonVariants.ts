import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-primary-100 ",
  {
    variants: {
      variant: {
        default: "bg-primary-900 text-white hover:bg-primary-700",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
        outline:
          "bg-transparent border border-primary-200 hover:bg-primary-100",
        subtle: "bg-primary-100 text-primary-900 hover:bg-primary-200",
        ghost:
          "bg-transparent hover:bg-primary-100 data-[state=open]:bg-transparent ",
        link: "bg-transparent underline-offset-4 hover:underline text-primary-900  hover:bg-transparent ",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-12 px-8 rounded-lg",
        flush: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonVariant = ButtonVariantProps["variant"];
