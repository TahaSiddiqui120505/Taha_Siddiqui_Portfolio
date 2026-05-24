import { env, pipeline } from "@xenova/transformers";

// Don't download models during startup
env.allowDownloadingModels = false;

async function testEmbeddings() {
  try {
    console.log("⏳ Loading embedding model (first time = download ~50MB)...");

    // Use Jina embeddings (384-dimensional, free, no API key needed)
    const extractor = await pipeline("feature-extraction", "Xenova/jina-embeddings-v2-small-en");

    console.log("✅ Model loaded");

    // Test embedding
    const result = await extractor("Hello world", { pooling: "mean" });

    // Convert to regular array
    const embedding = Array.from(result.data);

    console.log("\n📊 Embedding Results:");
    console.log("Length:", embedding.length);
    console.log("First 5:", embedding.slice(0, 5));
    console.log("\n✅ Success! Ready for Chroma integration");

  } catch (err) {
    console.error("❌ Error:", err.message);
    console.log("\n💾 Install the required package:");
    console.log("npm install @xenova/transformers");
  }
}

testEmbeddings();