import { Twitter } from "lucide-react";
import { LinkButton } from "../design-system/LinkButton";

export default function TwitterFollowButton() {
  return (
    <LinkButton
      variant="subtle"
      href="https://twitter.com/contractbotai"
      target="blank"
      rel="noopener noreferrer"
      className="self-start"
    >
      <Twitter className="mr-2 w-4 shrink-0" />
      Follow us on X
    </LinkButton>
  );
}
