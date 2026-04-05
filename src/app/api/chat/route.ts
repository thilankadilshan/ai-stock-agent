import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { search } from "duck-duck-scrape";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Message history is required" },
        { status: 400 },
      );
    }

    const userQuery = messages[messages.length - 1].content;
    let searchContext = "";

    // --- WATERFALL SEARCH SYSTEM ---
    try {
      console.log(
        `[Search 1] Trying SerpApi (Google Search) for: ${userQuery}`,
      );
      const serpApiKey = process.env.SERPAPI_API_KEY;

      if (!serpApiKey)
        throw new Error("No SERPAPI_API_KEY found in .env.local");

      // Fetch from Google via SerpApi
      const serpUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(userQuery + " CSE stock price news Sri Lanka")}&engine=google&api_key=${serpApiKey}`;
      const serpRes = await fetch(serpUrl);
      const serpData = await serpRes.json();

      if (serpData.organic_results && serpData.organic_results.length > 0) {
        searchContext = serpData.organic_results
          .slice(0, 5)
          .map((res: any) => `Title: ${res.title}\nInfo: ${res.snippet}`)
          .join("\n\n");
        console.log("Successfully retrieved data from SerpApi.");
      } else {
        throw new Error("No organic results returned from SerpApi");
      }
    } catch (serpError) {
      console.log(
        `[Search 2] SerpApi failed or missing. Falling back to DuckDuckGo...`,
      );

      try {
        const searchResults = await search(
          `${userQuery} CSE stock price news Sri Lanka`,
        );
        searchContext = searchResults.results
          .slice(0, 5)
          .map((res) => `Title: ${res.title}\nInfo: ${res.description}`)
          .join("\n\n");
        console.log("Successfully retrieved data from DuckDuckGo.");
      } catch (ddgError) {
        console.error("Both search engines failed.", ddgError);
        searchContext =
          "WARNING: Real-time web search temporarily unavailable. You must state that current market data could not be retrieved.";
      }
    }

    // 3. The System Prompt (Injecting the data)
    const systemPrompt = {
      role: "system",
      content: `You are a ruthless, highly logical Quantitative Financial Analyst specializing in the Colombo Stock Exchange (CSE). 
      Maintain a highly professional, dark-mode, enterprise-grade tone.
      
      CRITICAL INSTRUCTION: You MUST base your analysis on the following REAL-TIME web search data provided below. 
      Use the actual current stock prices and news mentioned in this data. Do not invent or hallucinate prices.
      
      --- LIVE MARKET DATA ---
      ${searchContext}
      ------------------------
      
      Provide a 'Bull Case', 'Base Case', and 'Bear Case' scenario outlining the exact estimated price targets and reasoning based on the live data. 
      Format beautifully using Markdown tables, bold text, and bullet points. If the LIVE MARKET DATA says it is unavailable, you must state that you cannot access current prices.`,
    };

    const chatCompletion = await groq.chat.completions.create({
      messages: [systemPrompt, ...messages],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      max_tokens: 2000,
    });

    const aiResponse =
      chatCompletion.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ reply: aiResponse }, { status: 200 });
  } catch (error) {
    console.error("Groq/Backend Error:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 },
    );
  }
}
