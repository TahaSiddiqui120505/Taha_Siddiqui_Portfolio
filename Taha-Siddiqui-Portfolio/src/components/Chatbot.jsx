import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "What projects has Taha built?",
    "Summarize Taha's portfolio",
    "What technologies does Taha use?",
    "Tell me about EduSaver"
  ];

  const sendMessage = async (customMessage) => {
    const messageToSend = customMessage || input;
    if (!messageToSend) return;

    const userMessage = { sender: "user", text: messageToSend };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const res = await axios.post("https://taha-siddiqui-portfolio.onrender.com/chat", {
        message: messageToSend,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to server." },
      ]);
    }

    setIsTyping(false);
    setInput("");
  };

  return (
    <>
      <div
        className="fixed bottom-6 right-6 cursor-pointer z-[9999]"
        onClick={() => setOpen(!open)}
      >
        <div className="w-12 h-12 bg-light text-black flex items-center justify-center rounded-full shadow-xl hover:scale-105 transition-all animate-pulse">
          💬
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="chatbot-window fixed bottom-20 right-6 w-80 bg-[#0d0d0d] border border-muted border-opacity-30 rounded-xl shadow-2xl backdrop-blur-md z-[9999]"
        >
          <div className="px-4 py-2 border-b border-muted border-opacity-20 flex justify-between items-center">
            <span className="text-xs font-mono text-light opacity-70">
              AI ASSISTANT
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-muted text-xs hover:text-light transition"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages h-64 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.length === 0 && (
              <>
                <p className="text-light opacity-70 text-xs">
                  Ask anything about Taha...
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="text-[10px] px-2 py-1 rounded-full bg-secondary bg-opacity-40 text-light hover:bg-opacity-70 transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 max-w-[75%] text-xs rounded-md ${
                    msg.sender === "user"
                      ? "bg-secondary text-light"
                      : "bg-secondary bg-opacity-40 text-light"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="px-3 py-2 max-w-[75%] text-xs rounded-md bg-secondary bg-opacity-40 text-light flex items-center gap-1">
                  Typing
                  <span className="flex gap-1 ml-1">
                    <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-muted border-opacity-20 p-2 flex gap-2">
            <input
              className="flex-1 bg-transparent text-xs outline-none text-light placeholder:text-muted"
              placeholder="Ask about projects, skills..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
              className="text-xs font-mono text-muted hover:text-light transition"
            >
              SEND
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Chatbot;
