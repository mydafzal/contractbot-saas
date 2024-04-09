import type { NextApiRequest, NextApiResponse } from "next";

const rateLimitMap = new Map();

export default function rateLimitMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const limit = 20; // Limiting requests to 20 per 3 hours per IP
    const windowMs = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      const timeUntilReset = Math.ceil(
        (ipData.lastReset + windowMs - Date.now()) / (60 * 1000)
      ); // Time until reset in minutes
      const resetMessage = `Rate limit exceeded. Please try again in ${timeUntilReset} minutes.`;
      return res.status(429).send(resetMessage);
    }

    ipData.count += 1;
    return handler(req, res);
  };
}
