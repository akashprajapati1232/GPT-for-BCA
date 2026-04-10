const axios = require("axios");

// ─── Constants ────────────────────────────────────────────────────────────────
const OLLAMA_URL = "http://localhost:11434/api/generate";

const DEFAULT_MODEL = "qwen3:8b";

const SUPPORTED_MODELS = ["qwen3:8b", "phi3"];

const SYSTEM_PROMPT =
  "You are a helpful AI assistant for BCA students.\n" +
  "Detect the user's language automatically and respond in the same language.\n" +
  "Keep responses clear, concise, and accurate.";

// ─── Controller ───────────────────────────────────────────────────────────────

/**
 * POST /api/chat
 * Body: { message: string, model?: string }
 * Returns: { reply: string, model: string }
 */
const handleChat = async (req, res) => {
  const { message, model: requestedModel } = req.body;

  // Validate input
  if (!message || typeof message !== "string" || message.trim() === "") {
    return res
      .status(400)
      .json({ error: "A non-empty 'message' field is required." });
  }

  // Resolve model — fall back to default if unsupported or not provided
  const model = SUPPORTED_MODELS.includes(requestedModel)
    ? requestedModel
    : DEFAULT_MODEL;

  const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message.trim()}\nAssistant:`;

  try {
    const ollamaResponse = await axios.post(
      OLLAMA_URL,
      {
        model,
        prompt,
        stream: false,
      },
      {
        timeout: 120_000, // 2-minute timeout for local models
        headers: { "Content-Type": "application/json" },
      }
    );

    const aiReply = ollamaResponse.data?.response?.trim();

    if (!aiReply) {
      console.error(
        "Ollama returned an empty response:",
        JSON.stringify(ollamaResponse.data)
      );
      return res
        .status(502)
        .json({ error: "Received an empty response from the AI service." });
    }

    return res.status(200).json({ reply: aiReply, model });
  } catch (error) {
    console.error("━━━ Ollama API Error ━━━");
    console.error("Model   :", model);
    console.error("Message :", error.message);

    if (error.response) {
      console.error("Status  :", error.response.status);
      console.error("Data    :", JSON.stringify(error.response.data, null, 2));
    }
    console.error("Stack   :", error.stack);
    console.error("────────────────────────");

    // Distinguish connection errors from other failures
    const isConnectionRefused =
      error.code === "ECONNREFUSED" || error.code === "ENOTFOUND";

    if (isConnectionRefused) {
      return res.status(503).json({
        error:
          "Ollama service is not running. Please start Ollama and try again.",
      });
    }

    const httpStatus = error.response?.status ?? 502;
    return res.status(httpStatus).json({
      error: error.message || "Failed to generate AI response.",
    });
  }
};

module.exports = { handleChat };
