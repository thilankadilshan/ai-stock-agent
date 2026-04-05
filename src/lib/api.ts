import { Message } from "@/src/types/chat";

export async function sendMessageToAI(messages: Message[]): Promise<string> {
  try {
    // Format the messages to match what Groq/OpenAI expects (user and assistant)
    const formattedMessages = messages.map((msg) => ({
      role: msg.role === "ai" ? "assistant" : "user",
      content: msg.content,
    }));

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: formattedMessages }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Failed to send message:", error);
    return "⚠️ I'm sorry, I encountered a network error while analyzing that request. Please try again.";
  }
}
