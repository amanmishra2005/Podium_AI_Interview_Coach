const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL = "gemini-2.5-flash";

async function callGemini(systemPrompt, messages, maxTokens = 1024) {
  // Map standard chat roles to the roles expected by the Gemini API
  const formattedContents = messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: formattedContents,
    config: {
      systemInstruction: systemPrompt,
      maxOutputTokens: maxTokens,
    },
  });

  return response.text;
}

module.exports = { callGemini };
