import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as readline from "readline";
import { getServerAuthSession } from "@/server/auth";
import rateLimitMiddleware from "@/utils/rateLimiter";

interface Message {
  role: string;
  content: string;
}
interface JsonInterface {
  messages: Message[];
  id: string;
  previewToken: string | null;
}

// Initialize the global context array
let globalContext: number[] = [];

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // check if the user is authorize
    const session = await getServerAuthSession({ req, res });
    if (!session) {
      return res.status(401).send("Unauthorized");
    }
    const json = req.body as JsonInterface;
    // Get the latest message from the array
    const message = json.messages.slice(-1)[0];
    const response = await axios.post(
      "https://mjrvgq2i4kz4oj-11434.proxy.runpod.net/api/generate",
      {
        model: "contractbot",
        prompt: message?.content,
        context: globalContext,
        stream: true,
      },
      {
        responseType: "stream",
      }
    );

    const rl = readline.createInterface({
      input: response.data,
    });

    rl.on("line", (line: string) => {
      // Parse the JSON object and extract the "response" value
      const parsedJson = JSON.parse(line);
      if (parsedJson.context) {
        globalContext = parsedJson.context;
      }
      const responseText = parsedJson.response;
      res.write(responseText);
    });

    rl.on("close", () => {
      res.end();
    });
  } catch (error) {
    console.error("There was a problem with the POST request:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export default rateLimitMiddleware(handler);
