import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as readline from "readline";

interface Message {
  role: string;
  content: string;
}
interface JsonInterface {
  messages: Message[];
  id: string;
  previewToken: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const json = req.body as JsonInterface;

    const response = await axios.post(
      "https://say.helloadam.ai:3050/api/generate",
      {
        model: "contractbot",
        prompt: json?.messages[0]?.content,
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
      const responseText = parsedJson.response;
      // Send the "response" value as the response
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
