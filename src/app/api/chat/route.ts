// import { openai } from "@ai-sdk/openai";
// import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are ORICO AI, a business planning assistant for founders and teams.
Help with business ideas, market research, positioning, pricing, financial forecasts,
and investor materials. Be concrete and structured. State assumptions behind any
financial figures and remind the user to verify them before sharing with investors.`;

export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: openai("gpt-4o"),
//     system: SYSTEM_PROMPT,
//     messages: convertToModelMessages(messages),
//   });

//   return result.toUIMessageStreamResponse();
}
