// src/components/AiAssistanceChat.jsx
import React, { useState } from "react";
import genAI from "../gemini";

const AiAssistanceChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "You", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const reply = result.response.text();

      setMessages([...newMessages, { sender: "AI", text: reply }]);
    } catch (err) {
      console.error("Gemini error:", err);
      setMessages([
        ...newMessages,
        { sender: "AI", text: "Gemini API error. Try again later." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <section className="bg-white p-4 rounded shadow mb-4" aria-labelledby="chat-header">
      <h2 id="chat-header" className="text-lg font-semibold mb-2">
        AI Assistant Chat
      </h2>

      <div className="h-40 bg-gray-100 p-2 rounded overflow-y-scroll mb-2">
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Ask about diagnosis or medication..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </section>
  );
};

export default AiAssistanceChat;
