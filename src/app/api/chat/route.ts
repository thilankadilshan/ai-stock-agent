// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Gemini SDK.
// It automatically picks up GEMINI_API_KEY from your .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(request: Request) {
  try {
    // 1. Extract the user's message from the incoming frontend request
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    // 2. Select the Gemini model (gemini-1.5-pro is best for complex analysis)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 3. Define the system instructions (The "Vibe" and scope)
    const systemPrompt = `You are an expert quantitative analysis assistant for the Sri Lankan Stock Market (CSE). 
    Maintain a highly professional, enterprise-grade tone. Provide data-driven insights.`;

    // 4. Send the prompt to Gemini
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
      systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
    });

    const aiResponse = result.response.text();

    // 5. Send the AI's response back to the Next.js frontend
    return NextResponse.json({ reply: aiResponse }, { status: 200 });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 },
    );
  }
}
