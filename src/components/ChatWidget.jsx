import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ExternalLink,
  Bot,
  User,
  RotateCcw,
  Code2,
  Terminal,
} from 'lucide-react';

export default function ChatWidget({ onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Hi! I'm **Priyanshu's AI Assistant**. Ask me anything about his projects, system design, technical stack, or achievements!",
      suggestions: [
        'Tell me about EdgeMesh CDN',
        'How does ClearPath AI work?',
        'What is your tech stack?',
        'Education & Hackathons',
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Intelligent Knowledge Base & Query Matcher Engine
  const generateResponse = (rawQuery) => {
    const q = rawQuery.toLowerCase().trim();

    // 1. EdgeMesh / CDN / Distributed Systems / Docker
    if (
      q.includes('edgemesh') ||
      q.includes('cdn') ||
      q.includes('minicdn') ||
      q.includes('caching') ||
      q.includes('replication') ||
      q.includes('failover')
    ) {
      return {
        text: "**EdgeMesh** is a distributed CDN simulation engineered with **Node.js, Docker, Redis, and PostgreSQL**.\n\nKey Highlights:\n• **Architecture**: Central Origin Server, Intelligent Load Balancer, and 3 Docker Edge nodes.\n• **Performance**: Multi-layer caching (LRU eviction + TTL expiration) yielding **~31% latency reduction** on cache hits.\n• **High Availability**: Proactive replication across edge tiers and heartbeat-based automatic failover.\n\n🔗 [View EdgeMesh on GitHub](https://github.com/pKm720/MiniCDN)",
        suggestions: ['How does ClearPath AI work?', 'Backend Ledger API', 'Tech Stack'],
      };
    }

    // 2. ClearPath / AI Navigation / Geospatial / XGBoost / Maps
    if (
      q.includes('clearpath') ||
      q.includes('clear_path') ||
      q.includes('navigation') ||
      q.includes('pollution') ||
      q.includes('aqi') ||
      q.includes('pathfinding') ||
      q.includes('xgboost') ||
      q.includes('map') ||
      q.includes('osm')
    ) {
      return {
        text: "**ClearPath** is an AI-powered health-first navigation engine built with **Python FastAPI, XGBoost, Redis, MongoDB, and MapLibre GL JS**.\n\nKey Highlights:\n• **Routing Modes**: Cleanest, Balanced, and Fastest routing using custom **A* pathfinding** across a 221K+ node OpenStreetMap graph.\n• **Machine Learning**: Trained XGBoost virtual sensors on 221K+ AQI records (**R² = 0.96** accuracy).\n• **Visualization**: GPU-accelerated real-time pollution heatmaps.\n\n🔗 [View ClearPath on GitHub](https://github.com/pKm720/Clear_Path)",
        suggestions: ['EdgeMesh CDN simulation', 'Backend Ledger API', 'Achievements'],
      };
    }

    // 3. Backend Ledger / Banking API / ACID / PostgreSQL / Knex
    if (
      q.includes('banking') ||
      q.includes('ledger') ||
      q.includes('acid') ||
      q.includes('transaction') ||
      q.includes('knex') ||
      q.includes('concurrency') ||
      q.includes('financial')
    ) {
      return {
        text: "**Backend Ledger** is an ACID-compliant banking API engineered with **Node.js, Express.js, PostgreSQL, Knex.js, Zod, and Swagger**.\n\nKey Highlights:\n• **Atomic Transfers**: Double-entry bookkeeping with strict database transactions and row-level locking for concurrency.\n• **Data Integrity**: Append-only immutability enforced by custom **PL/pgSQL triggers**.\n• **Security**: JWT authentication with token blacklisting and role-based access control.\n\n🔗 [View Backend Ledger on GitHub](https://github.com/pKm720/Banking-Backend-Ledger)",
        suggestions: ['Tell me about EdgeMesh', 'Technical Skills', 'Contact Priyanshu'],
      };
    }

    // 4. All Projects / Portfolio Overview
    if (q.includes('project') || q.includes('work') || q.includes('build') || q.includes('portfolio') || q.includes('repo')) {
      return {
        text: "Priyanshu has engineered 3 major software systems in 2026:\n\n1. **EdgeMesh** — Distributed CDN Simulation (*Node.js, Redis, Docker, PostgreSQL*)\n2. **ClearPath** — AI Health-First Navigation (*FastAPI, XGBoost, MapLibre, A**)\n3. **Backend Ledger** — ACID Financial Banking API (*Express, PostgreSQL, Knex.js*)\n\nWhich project would you like to explore in detail?",
        suggestions: ['EdgeMesh CDN', 'ClearPath AI', 'Backend Ledger API'],
      };
    }

    // 5. Technical Stack & Skills
    if (
      q.includes('stack') ||
      q.includes('skill') ||
      q.includes('tech') ||
      q.includes('language') ||
      q.includes('framework') ||
      q.includes('database') ||
      q.includes('tool') ||
      q.includes('java') ||
      q.includes('python') ||
      q.includes('node') ||
      q.includes('react')
    ) {
      return {
        text: "Here is Priyanshu's technical stack:\n\n• **Languages**: Java, Python, C, JavaScript (ES6+), SQL\n• **Backend & APIs**: Node.js, Express.js, FastAPI, RESTful APIs, Microservices, BullMQ, WebSockets\n• **Databases & Caching**: PostgreSQL, Redis, MongoDB, MySQL, Pinecone\n• **Frontend**: React.js, Tailwind CSS, Zustand, React Flow\n• **DevOps & Tools**: Docker, Git, Postman, Swagger, OAuth 2.0, Zod\n• **Core CS**: System Design, Distributed Systems, DSA, OOP, DBMS, OS",
        suggestions: ['Top Projects', 'Education & College', 'LeetCode DSA'],
      };
    }

    // 6. Education & College
    if (
      q.includes('education') ||
      q.includes('college') ||
      q.includes('study') ||
      q.includes('degree') ||
      q.includes('school') ||
      q.includes('cgpa') ||
      q.includes('dsce') ||
      q.includes('dayananda')
    ) {
      return {
        text: "🎓 **Academic Background**:\n\n• **Dayananda Sagar College of Engineering, Bangalore** (2023 — Present)\n  B.E. in Information Science and Engineering\n  **CGPA: 8.34 / 10**\n\n• **Delhi Public School, Siliguri** (2019 — 2022)\n  Secondary & Senior Secondary (CBSE) — **88.8% & 83%**\n\nCore Coursework: Distributed Systems, System Design, Data Structures & Algorithms, Operating Systems, DBMS, and Computer Networks.",
        suggestions: ['Hackathons & Awards', 'Technical Stack', 'Contact Priyanshu'],
      };
    }

    // 7. Achievements / Hackathon / LeetCode / Hacktoberfest
    if (
      q.includes('achievement') ||
      q.includes('hackathon') ||
      q.includes('sih') ||
      q.includes('smart india') ||
      q.includes('winner') ||
      q.includes('leetcode') ||
      q.includes('dsa') ||
      q.includes('hacktoberfest') ||
      q.includes('gfg')
    ) {
      return {
        text: "🏆 **Key Milestones & Achievements**:\n\n1. **Winner (Internal Round) — Smart India Hackathon 2025**\n   Selected 1st out of **200+ competing engineering teams** at DSCE.\n\n2. **100+ DSA Problems Solved**\n   Active problem solver on [LeetCode Profile](https://leetcode.com/u/Priyanshu_km/) and GeeksforGeeks.\n\n3. **Hacktoberfest 2025 Contributor**\n   Contributed **7+ merged pull requests** across open-source developer tooling.",
        suggestions: ['View LeetCode Profile', 'Top Projects', 'Contact Priyanshu'],
      };
    }

    // 8. Contact / Hire / Email / Socials
    if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('hire') ||
      q.includes('reach') ||
      q.includes('linkedin') ||
      q.includes('whatsapp') ||
      q.includes('phone') ||
      q.includes('github')
    ) {
      return {
        text: "📬 **Get in Touch with Priyanshu**:\n\n• **Email**: [priyanshumahato0210@gmail.com](mailto:priyanshumahato0210@gmail.com)\n• **LinkedIn**: [linkedin.com/in/priyanshumahato](https://www.linkedin.com/in/priyanshumahato/)\n• **GitHub**: [github.com/pKm720](https://github.com/pKm720)\n• **WhatsApp**: [+91 9749616578](https://wa.me/919749616578)\n\nYou can also click the **'Connect'** button in the header to send a message directly!",
        suggestions: ['Send Direct Message', 'Top Projects', 'Tech Stack'],
      };
    }

    // 9. Easter Egg / Tony Stark / Iron Man / Music
    if (
      q.includes('easter') ||
      q.includes('iron man') ||
      q.includes('tony stark') ||
      q.includes('secret') ||
      q.includes('music') ||
      q.includes('song') ||
      q.includes('audio') ||
      q.includes('egg')
    ) {
      return {
        text: "⚡ **Easter Egg Unlocked!**\n\nClick on Priyanshu's avatar picture on the Hero section (top of the page) to activate the **Tony Stark Arc Reactor HUD** and play AC/DC's *Back in Black*! 🎸",
        suggestions: ['Tell me about EdgeMesh', 'What is your tech stack?'],
      };
    }

    // 10. Greetings / Hello
    if (
      q === 'hi' ||
      q === 'hello' ||
      q === 'hey' ||
      q === 'sup' ||
      q.startsWith('hello') ||
      q.startsWith('hi ') ||
      q.startsWith('hey ') ||
      q.includes('good morning') ||
      q.includes('good evening')
    ) {
      return {
        text: "Hello! Great to meet you. I can tell you all about Priyanshu's backend systems, distributed architectures, academic milestones, or contact details. What interests you?",
        suggestions: ['Top Projects', 'Tech Stack', 'SIH 2025 Winner', 'Contact Priyanshu'],
      };
    }

    // 11. Location / Availability
    if (q.includes('location') || q.includes('where') || q.includes('available') || q.includes('remote') || q.includes('relocate')) {
      return {
        text: "📍 Priyanshu is based in **Bengaluru, Karnataka, India**.\n\nHe is actively seeking **Software Engineering Internships** and **Full-Stack / Backend Developer** roles, open to remote, hybrid, or on-site opportunities.",
        suggestions: ['Contact Priyanshu', 'View Resume Projects', 'Technical Skills'],
      };
    }

    // 12. Thanks / Gratitude
    if (q.includes('thank') || q.includes('awesome') || q.includes('cool') || q.includes('great') || q.includes('nice')) {
      return {
        text: "You're very welcome! Feel free to reach out directly to Priyanshu if you'd like to collaborate or discuss an opportunity. 🚀",
        suggestions: ['Contact Priyanshu', 'Top Projects', 'GitHub Profile'],
      };
    }

    // Default Fallback with Contextual Smart Guidance
    return {
      text: "I can help you with anything related to Priyanshu's engineering background! Here are a few popular questions to get started:\n\n• **Projects**: EdgeMesh CDN, ClearPath AI Navigation, Backend Ledger API\n• **Technical Skills**: Java, Python, Node.js, FastAPI, Docker, Redis, PostgreSQL\n• **Academics**: DSCE Bangalore (8.34 CGPA), SIH 2025 Winner\n• **Contact**: Email, LinkedIn, WhatsApp",
      suggestions: ['Tell me about EdgeMesh', 'What is your tech stack?', 'How to contact?'],
    };
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim() || isTyping) return;

    if (text === 'Send Direct Message') {
      setIsOpen(false);
      onOpenContact && onOpenContact();
      return;
    }

    // Append user message
    const userMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setIsTyping(true);

    // Dynamic typing delay based on query complexity (350ms - 700ms)
    const delay = Math.min(700, Math.max(350, text.length * 15));

    setTimeout(() => {
      const response = generateResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: response.text,
          suggestions: response.suggestions,
        },
      ]);
      setIsTyping(false);
    }, delay);
  };

  // Helper to render markdown-like formatting (bold, bullet points, links)
  const renderFormattedText = (rawText) => {
    // Split by lines
    const lines = rawText.split('\n');

    return lines.map((line, lineIdx) => {
      // Parse markdown links [text](url) and bold **text**
      const parts = [];
      let lastIndex = 0;
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;

      const formatSegment = (str, keyPrefix) => {
        const boldParts = str.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((bPart, bIdx) => {
          if (bPart.startsWith('**') && bPart.endsWith('**')) {
            return (
              <strong key={`${keyPrefix}-${bIdx}`} className="font-bold text-[#ff4d00] dark:text-[#ff6a2b]">
                {bPart.slice(2, -2)}
              </strong>
            );
          }
          return bPart;
        });
      };

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(formatSegment(line.substring(lastIndex, match.index), `txt-${lastIndex}`));
        }
        parts.push(
          <a
            key={`link-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#ff4d00] font-semibold underline underline-offset-2 hover:text-[#e04400] transition-colors"
          >
            <span>{match[1]}</span>
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < line.length) {
        parts.push(formatSegment(line.substring(lastIndex), `txt-end`));
      }

      return (
        <span key={lineIdx} className="block min-h-[1.2em]">
          {parts.length > 0 ? parts : formatSegment(line, `line-${lineIdx}`)}
        </span>
      );
    });
  };

  const handleResetChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "👋 Chat reset! How else can I assist you with Priyanshu's portfolio?",
        suggestions: [
          'Tell me about EdgeMesh CDN',
          'How does ClearPath AI work?',
          'What is your tech stack?',
          'Education & Hackathons',
        ],
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1a1a1a] dark:bg-[#fffcf3] text-white dark:text-black flex items-center justify-center shadow-2xl hover:bg-[#ff4d00] dark:hover:bg-[#ff4d00] dark:hover:text-white transition-all duration-300"
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ff4d00] ring-2 ring-white dark:ring-black animate-pulse" />
          </div>
        )}
      </motion.button>

      {/* Chat Dialog Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 left-0 w-[320px] sm:w-[380px] max-w-[calc(100vw-2rem)] rounded-3xl bg-[#fffcf3] dark:bg-[#141414] border border-black/10 dark:border-white/15 shadow-2xl overflow-hidden flex flex-col z-50 text-[#1a1a1a] dark:text-white"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-black/[0.03] dark:bg-white/[0.04] border-b border-black/10 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#ff4d00]/40 flex-shrink-0 shadow-md">
                  <img
                    src="/priyanshu.jpg"
                    alt="Priyanshu"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold font-Whyte leading-none">
                      Priyanshu AI
                    </h4>
                    <span className="px-1.5 py-0.2 rounded bg-orange-100 dark:bg-orange-950/70 text-[#ff4d00] font-mono text-[9px] font-bold">
                      PRO
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-mono font-medium flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Interactive Portfolio Engine
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="p-3.5 sm:p-4 h-[300px] sm:h-[340px] overflow-y-auto space-y-3.5 text-xs sm:text-sm scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  } space-y-1.5`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-2xl leading-relaxed font-Ovo shadow-sm ${
                      m.sender === 'user'
                        ? 'bg-[#ff4d00] text-white rounded-br-none font-medium'
                        : 'bg-black/[0.04] dark:bg-white/[0.06] text-gray-800 dark:text-gray-100 rounded-bl-none border border-black/5 dark:border-white/5'
                    }`}
                  >
                    {renderFormattedText(m.text)}
                  </div>

                  {/* Contextual Suggestion Chips attached to bot message */}
                  {m.sender === 'bot' && m.suggestions && m.suggestions.length > 0 && i === messages.length - 1 && !isTyping && (
                    <div className="flex flex-wrap gap-1.5 pt-1 pl-1 max-w-[95%]">
                      {m.suggestions.map((sug) => (
                        <button
                          key={sug}
                          onClick={() => handleSend(sug)}
                          className="px-2.5 py-1 rounded-full border border-black/10 dark:border-white/15 bg-[#fffcf3] dark:bg-[#1c1c1c] text-gray-700 dark:text-gray-300 text-[10.5px] font-mono hover:border-[#ff4d00] hover:text-[#ff4d00] dark:hover:text-[#ff4d00] transition-colors shadow-2xs text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Live Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] w-16 border border-black/5 dark:border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] animate-bounce" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-black/10 dark:border-white/10 flex items-center gap-2 bg-black/[0.02] dark:bg-white/[0.02]"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about projects, stack, college..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent text-xs sm:text-sm px-3.5 py-2 rounded-full border border-black/10 dark:border-white/15 focus:outline-none focus:border-[#ff4d00] text-gray-900 dark:text-white placeholder-gray-400 font-Ovo"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                aria-label="Send message"
                className="w-8 h-8 rounded-full bg-[#ff4d00] text-white flex items-center justify-center hover:bg-[#e04400] disabled:opacity-40 disabled:hover:bg-[#ff4d00] transition-colors flex-shrink-0 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
