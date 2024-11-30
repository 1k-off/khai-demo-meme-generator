import { NextResponse } from "next/server";
import { getOpenAIInstance } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { inputText } = await req.json();

    if (!inputText || typeof inputText !== "string") {
      return NextResponse.json(
        { error: 'Invalid input. Please provide a valid "inputText" string.' },
        { status: 400 }
      );
    }

    const openai = getOpenAIInstance();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": "You are a sarcastic person who loves to joke with people and can turn any situation into a meme."
        },
        {
          role: "user",
          content: `Generate a funny meme text for the following input: "${inputText}". Do not use any smiles and so on, just write a text that will be used as a meme caption. Do not use text reductions like it's, there's, etc, use full words. Text size should be 64 symbols or less. Do not use words like 'when' for describing a situation, just write a text that will be used as a meme caption.`,
        },
      ],
    });

    const memeText = completion.choices[0]?.message?.content?.trim();

    if (!memeText) {
      throw new Error("Failed to generate meme text.");
    }

    return NextResponse.json({ memeText }, { status: 200 });
  } catch (error: any) {
    console.error("Error generating meme text:", error);
    return NextResponse.json(
      { error: "An error occurred while generating meme text." },
      { status: 500 }
    );
  }
}
