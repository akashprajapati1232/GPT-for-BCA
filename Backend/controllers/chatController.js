const { GoogleGenerativeAI } = require("@google/generative-ai");

// ─── Constants ────────────────────────────────────────────────────────────────
const MODEL_NAME = "gemini-1.5-flash-latest";

const SYSTEM_PROMPT =
  "You are a helpful AI assistant.\n" +
  "Detect the user's language automatically and respond in the same language.\n" +
  "Keep responses short, clear, and conversational.";

// ─── Controller ───────────────────────────────────────────────────────────────

/**
 * POST /api/chat
 * Body: { message: string }
 * Returns: { reply: string }
 */
const handleChat = async (req, res) => {
  const { message } = req.body;

  // Validate input
  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({ error: "A non-empty 'message' field is required." });
  }

  // Guard: API key must be configured
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    return res.status(500).json({ error: "Server configuration error: API key missing." });
  }

  try {
    // Initialise the Gemini client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    });

    // Start a fresh chat session and send the user message
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage(message.trim());
    const aiReply = result.response.text();

    if (!aiReply) {
      console.error("Gemini returned an empty response:", JSON.stringify(result.response));
      return res.status(502).json({ error: "Received an empty response from the AI service." });
    }

    return res.status(200).json({ reply: aiReply });

  } catch (error) {
    // ── Gemini SDK surfaces errors in error.message and optional error.status ──
    console.error("━━━ Gemini API Error ━━━");
    console.error("Message :", error.message);

    if (error.status) {
      console.error("Status  :", error.status);
    }
    if (error.errorDetails) {
      console.error("Details :", JSON.stringify(error.errorDetails, null, 2));
    }
    console.error("Stack   :", error.stack);
    console.error("────────────────────────");

    // Surface a meaningful status code to the client
    const httpStatus =
      error.status === 400 ? 400 :
        error.status === 401 || error.status === 403 ? 401 :
          error.status === 429 ? 429 :
            502;

    return res.status(httpStatus).json({
      error: error.message || "Failed to generate AI response.",
    });
  }
};

module.exports = { handleChat };
