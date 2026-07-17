"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Namaste! I am your Ridhāna nutrition helper. Ask me about our ancient grains, stone-milling, or how to store your fresh flour.",
      timestamp: new Date(),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userMsg: ChatMessage = {
      sender: "user",
      text: inputVal,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");

    // Simulate bot response after a brief delay
    setTimeout(() => {
      const responseText = getBotResponse(inputVal);
      const botMsg: ChatMessage = {
        sender: "bot",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("khapli") && q.includes("sharbati")) {
      return "MP Sharbati wheat is a modern bread wheat known for making exceptionally soft, sweet daily rotis. MH Khapli (Emmer) is an ancient low-gluten grain, richer in fiber, and highly recommended for diabetics or anyone with gluten sensitivity.";
    }
    if (q.includes("khapli")) {
      return "MH Khapli Wheat is an ancient emmer grain. It has a weak gluten structure making it highly digestible, and is rich in B-complex vitamins, iron, and dietary fibre. Perfect for gut wellness.";
    }
    if (q.includes("sharbati")) {
      return "MP Sharbati is considered the premium choice for standard rotis. Milled at ambient temperatures, it preserves its natural sweetness and absorbs more water, ensuring rotis stay soft for hours.";
    }
    if (q.includes("stone mill") || q.includes("milling") || q.includes("chakki")) {
      return "Unlike high-speed commercial steel rollers that generate friction heat and destroy nutrients, our traditional stone mills rotate slowly. This preserves all fibres, germ oils, and natural enzymes intact.";
    }
    if (q.includes("shelf") || q.includes("storage") || q.includes("expire") || q.includes("preserve")) {
      return "We add absolutely no artificial preservatives, bleach, or chemicals. We recommend storing our flour in an airtight container in a cool place and consuming it within 30-45 days of the mill date for maximum freshness.";
    }
    if (q.includes("recipe") || q.includes("cook") || q.includes("bake")) {
      return "For Khapli Atta, try flatbreads or ancient sourdough loaves. For millet flours like Bajra or Jowar, flatbread bhakris (using hot water to knead) turn out best. Check out our recipe cards above!";
    }
    if (q.includes("gluten")) {
      return "Our Jowar, Bajra, and Makki flours are 100% gluten-free. Our MH Khapli wheat flour contains a weak, ancient gluten structure that is much easier to digest than regular roller-milled wheat.";
    }

    return "That's a wonderful question! Our stone-milled flours are crafted to restore pure, clean carbs to your diet. For specific recipe tips or customized orders, you can connect directly with our millers on WhatsApp!";
  };

  return (
    <>
      {/* Floating Chat Bubble Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-espresso text-bone flex items-center justify-center shadow-warm-lg hover:bg-gold hover:text-espresso transition-all duration-300 active:scale-95 border border-gold/10"
        aria-label="Open AI Nutrition Guide"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>

      {/* Slide-out Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[320px] md:w-[360px] h-[450px] bg-cream border border-stone/10 rounded-card shadow-warm-lg overflow-hidden flex flex-col justify-between"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="bg-espresso text-bone px-4 py-3.5 flex items-center justify-between border-b border-stone/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold leading-none">Nutrition Helper</h4>
                  <span className="text-[9px] text-wheat/60 tracking-wider uppercase font-semibold">Guide</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-bone/60 hover:text-bone p-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 bg-bone/30">
              {messages.map((msg, idx) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "flex items-end gap-2 max-w-[85%]",
                      isBot ? "self-start" : "self-end flex-row-reverse"
                    )}
                  >
                    {/* Avatar */}
                    <div
                      className={clsx(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0",
                        isBot ? "bg-espresso text-gold" : "bg-gold text-espresso"
                      )}
                    >
                      {isBot ? <Sparkles size={10} /> : <User size={10} />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={clsx(
                        "p-3 rounded-card text-xs leading-relaxed font-sans",
                        isBot
                          ? "bg-cream text-espresso rounded-bl-none border border-stone/5"
                          : "bg-espresso text-bone rounded-br-none"
                      )}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-cream border-t border-stone/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about Khapli, stone-milling..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-3 py-2 bg-bone border border-stone/20 rounded-lg text-xs text-espresso placeholder:text-stone/40 focus:outline-none focus:border-gold"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-espresso hover:bg-gold hover:text-espresso text-bone rounded-lg transition-colors active:scale-95"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
