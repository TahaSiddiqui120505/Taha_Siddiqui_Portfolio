import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { retrieve, initRAG } from "./rag.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await initRAG();

    app.post("/chat", async (req, res) => {
      const { message } = req.body;

      try {
        const context = await retrieve(message);

        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction:
            "You are an AI assistant for Taha Siddiqui's portfolio. Answer professionally in 10-15 words using ONLY the provided context.",
        });

        const prompt = `Context:\n${context}\n\nQuestion:\n${message}`;

        const result = await model.generateContent(prompt);
        const reply = result.response.text();

        res.json({ reply });
      } catch (error) {
        console.error("Chat error:", error.message);
        res.status(500).json({
          reply: "Something went wrong.",
          error: error.message,
        });
      }
    });

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  } catch (err) {
    console.error("Server failed to start:", err);
  }
}

startServer();
