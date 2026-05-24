import { pipeline } from "@xenova/transformers";

// 🔹 Simple in-memory vector store (for testing)
class SimpleVectorStore {
  constructor() {
    this.documents = [];
    this.embeddings = [];
    this.metadatas = [];
  }

  add({ documents, embeddings, metadatas }) {
    this.documents.push(...documents);
    this.embeddings.push(...embeddings);
    this.metadatas.push(...metadatas);
  }

  // Cosine similarity
  cosineSimilarity(a, b) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  query({ queryEmbedding, nResults = 3 }) {
    const similarities = this.embeddings.map((emb, i) => ({
      similarity: this.cosineSimilarity(queryEmbedding, emb),
      document: this.documents[i],
      metadata: this.metadatas[i],
      index: i
    }));

    similarities.sort((a, b) => b.similarity - a.similarity);

    return {
      documents: [similarities.slice(0, nResults).map(s => s.document)],
      metadatas: [similarities.slice(0, nResults).map(s => s.metadata)],
      distances: [similarities.slice(0, nResults).map(s => 1 - s.similarity)] // Convert to distance
    };
  }
}

// 🔹 Simple embedding wrapper
class XenovaEmbeddings {
  constructor(extractor) {
    this.extractor = extractor;
  }

  async embed(text) {
    const result = await this.extractor(text, { pooling: "mean" });
    return Array.from(result.data);
  }

  async embedBatch(texts) {
    const results = await Promise.all(
      texts.map((t) => this.extractor(t, { pooling: "mean" }))
    );
    return results.map((r) => Array.from(r.data));
  }
}

async function testChroma() {
  try {
    console.log("⏳ Loading embedding model...");

    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/jina-embeddings-v2-small-en"
    );

    console.log("✅ Model loaded");

    const embeddings = new XenovaEmbeddings(extractor);

    // 🔹 Test embedding first
    const testText = "Hello world";
    const testEmbedding = await embeddings.embed(testText);
    console.log(`✅ Embedding test: Length ${testEmbedding.length}, First 5: [${testEmbedding.slice(0, 5).map(x => x.toFixed(3)).join(", ")}]`);

    // 🔹 Initialize simple vector store
    console.log("⏳ Creating vector store...");
    const vectorStore = new SimpleVectorStore();

    // 🔹 Your portfolio data
    const texts = [
      "Taha Siddiqui is a MERN stack developer",
      "He built StreamHub, a streaming platform project",
      "He is based in Mumbai",
      "He has experience in React, Node.js, and MongoDB",
    ];

    console.log("⏳ Generating embeddings...");

    // 🔹 Generate embeddings for all texts
    const embeddingsArray = await embeddings.embedBatch(texts);

    console.log("⏳ Adding to vector store...");

    // 🔹 Add documents to collection
    const ids = texts.map((_, i) => `doc_${i + 1}`);
    const metadatas = texts.map((_, i) => ({ id: i + 1, source: "portfolio" }));

    vectorStore.add({
      documents: texts,
      embeddings: embeddingsArray,
      metadatas: metadatas
    });

    console.log("✅ Vector store ready");

    // 🔹 Test query
    const query = "What does Taha do?";
    console.log("\n🔍 Query:", query);

    const queryEmbedding = await embeddings.embed(query);

    const results = vectorStore.query({
      queryEmbedding: queryEmbedding,
      nResults: 2
    });

    console.log("\n📄 Retrieved docs:");
    results.documents[0].forEach((doc, i) => {
      const distance = results.distances[0][i];
      console.log(`${i + 1}. [${distance.toFixed(3)}] ${doc}`);
    });

    console.log("\n🎉 Vector store integration successful!");
    console.log("💡 Ready to integrate with your chatbot!");

  } catch (err) {
    console.error("❌ Error:", err);
  }
}

testChroma();