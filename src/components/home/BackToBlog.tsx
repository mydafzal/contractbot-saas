import { LinkButton } from "@/components/design-system/LinkButton";
import { ArrowLeft } from "lucide-react";

export default function BackTo({ location }: { location: string }) {
  return (
    <LinkButton
      href={`/${location}`}
      variant="link"
      className="px-0 text-gray-600"
    >
      <ArrowLeft className="mr-2 w-4" /> Back to {location}
    </LinkButton>
  );
}
