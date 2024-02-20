import { nanoid } from "@/lib/contentUtils";
import { Chat } from "@/components/app/Chat";
import Layout from "../../layout";
import { TooltipProvider } from "@/components/design-system/ToolTip";

const id = nanoid();

export default function TeamHome() {
  return (
    <Layout
      pageName="Chat"
      subtitle="Chat with our AI Assitant to get help with your queries."
    >
      <TooltipProvider>
        <Chat id={id} />
      </TooltipProvider>
    </Layout>
  );
}
