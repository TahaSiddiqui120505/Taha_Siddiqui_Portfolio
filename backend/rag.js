import { pipeline } from "@xenova/transformers";
import fs from "fs";

class SimpleVectorStore {
  constructor() {
    this.documents = [];
    this.embeddings = [];
  }

  add(documents, embeddings) {
    this.documents.push(...documents);
    this.embeddings.push(...embeddings);
  }

  cosineSimilarity(a, b) {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  query(queryEmbedding, k = 3) {
    const scores = this.embeddings.map((emb, i) => ({
      score: this.cosineSimilarity(queryEmbedding, emb),
      text: this.documents[i],
    }));
    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, k).map((s) => s.text);
  }
}

let extractor;
let vectorStore;

export async function initRAG() {
  extractor = await pipeline(
    "feature-extraction",
    "Xenova/jina-embeddings-v2-small-en"
  );

  const rawText = fs.readFileSync("./data/portfolio.txt", "utf-8");

  const texts = rawText
    .split("\n\n")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const embeddings = await Promise.all(
    texts.map(async (t) => {
      const res = await extractor(t, { pooling: "mean" });
      return Array.from(res.data);
    })
  );

  vectorStore = new SimpleVectorStore();
  vectorStore.add(texts, embeddings);
}

export async function retrieve(query) {
  const res = await extractor(query, { pooling: "mean" });
  const queryEmbedding = Array.from(res.data);
  const docs = vectorStore.query(queryEmbedding, 3);
  return docs.join("\n");
}
