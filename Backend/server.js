require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());



// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "GPT for BCA — Backend is running 🚀" });
});

// AI inference route (existing Ollama integration)
app.use("/api/chat", chatRoutes);



// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// ─── Warm-up: preload the default Ollama model ────────────────────────────────
const warmUpOllama = async () => {
  const ollamaUrl =
    process.env.OLLAMA_URL || "http://localhost:11434/api/generate";
  const defaultModel = process.env.DEFAULT_MODEL || "qwen3:8b";

  try {
    console.log(`🔄 Warming up Ollama model: ${defaultModel} ...`);
    await axios.post(
      ollamaUrl,
      { model: defaultModel, prompt: "hi", stream: false },
      { timeout: 60_000 }
    );
    console.log(`✅ Ollama warm-up complete for model: ${defaultModel}`);
  } catch (err) {
    console.warn(
      `⚠️  Ollama warm-up failed (model may still load on first request): ${err.message}`
    );
  }
};

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  warmUpOllama();
});
