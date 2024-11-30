import axios from "axios";
import { NextResponse } from "next/server";

const IMGFLIP_API_URL = "https://api.imgflip.com/automeme";

export async function POST(req: Request) {
  let { text } = await req.json();
  try {
    text = text.replace(/^"|"$/g, '');
    const response = await axios.post(
      IMGFLIP_API_URL,
      new URLSearchParams({
        username: process.env.IMGFLIP_USERNAME!,
        password: process.env.IMGFLIP_PASSWORD!,
        text: text,
      })
    );
    console.log(text);
    const { success, data, error_message } = response.data;
    if (!data || !success) {
      console.log(error_message);
      throw new Error(error_message);
    }
    return NextResponse.json(
      { url: data.url, pageUrl: data.page_url },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "An error occurred while generating meme image." },
      { status: 500 }
    );
  }
}
