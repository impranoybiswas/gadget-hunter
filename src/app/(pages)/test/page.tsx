"use client";
import { useState } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    setChat((prev) => [...prev, { role: "user", text: message }]);
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    if (res.ok) {
      setChat((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } else {
      setChat((prev) => [
        ...prev,
        { role: "assistant", text: data.error || "Something went wrong" },
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 shadow-lg rounded-xl p-4">
      <div className="h-60 overflow-y-auto text-sm mb-3">
        {chat.map((c, i) => (
          <div key={i} className={c.role === "user" ? "text-right" : ""}>
            <p className="my-1">{c.text}</p>
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>

      <div className="flex gap-2">
        <input
          className="border w-full px-2 py-1 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about products..."
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-3 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
