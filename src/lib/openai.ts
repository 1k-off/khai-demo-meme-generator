import OpenAI from "openai";

let openai: OpenAI | null = null;

export const getOpenAIInstance = (): OpenAI => {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openai;
};
