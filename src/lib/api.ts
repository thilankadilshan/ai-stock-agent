// src/lib/api.ts

export async function sendMessageToAI(message: string): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
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
