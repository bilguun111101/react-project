import { useState } from "react";

const tasks = [
  { id: 1, title: "Sharpen the longsword", priority: "urgent", done: false },
  { id: 2, title: "Polish the knight's armor", priority: "normal", done: false },
  { id: 3, title: "Feed the warhorses", priority: "urgent", done: true },
  { id: 4, title: "Deliver the royal scroll", priority: "normal", done: false },
  { id: 5, title: "Mend the battle standard", priority: "low", done: true },
];

const priorityStyles = {
  urgent: "bg-red-900/30 text-red-300 border border-red-800/50",
  normal: "bg-amber-900/30 text-amber-300 border border-amber-800/50",
  low: "bg-stone-700/40 text-stone-400 border border-stone-600/50",
};

export default function Squire() {
  const [quests, setQuests] = useState(tasks);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("normal");

  const toggle = (id) =>
    setQuests((q) => q.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const addQuest = () => {
    if (!input.trim()) return;
    setQuests((q) => [
      ...q,
      { id: Date.now(), title: input.trim(), priority, done: false },
    ]);
    setInput("");
  };

  const remove = (id) => setQuests((q) => q.filter((t) => t.id !== id));

  const done = quests.filter((q) => q.done).length;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #1c1008 0%, #0d0a06 70%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Parchment card */}
      <div
        className="w-full max-w-md rounded-sm relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #2a1f0e 0%, #1a1208 100%)",
          border: "1px solid #5a3e1b",
          boxShadow: "0 0 60px #7c4f1a33, 0 20px 60px #00000088, inset 0 1px 0 #7c4f1a44",
        }}
      >
        {/* Top ornament bar */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, transparent, #c8922a, #f5c842, #c8922a, transparent)" }}
        />

        {/* Header */}
        <div className="px-7 pt-6 pb-4 border-b border-amber-900/40">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">⚔️</span>
            <h1
              className="text-2xl font-bold tracking-widest uppercase"
              style={{ color: "#f5c842", textShadow: "0 0 20px #f5c84266", letterSpacing: "0.18em" }}
            >
              Squire
            </h1>
            <span className="text-2xl">🛡️</span>
          </div>
          <p className="text-xs tracking-widest uppercase" style={{ color: "#8a6a3a" }}>
            Quest Board of the Realm
          </p>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1" style={{ color: "#8a6a3a" }}>
              <span>Duties fulfilled</span>
              <span style={{ color: "#c8922a" }}>{done} / {quests.length}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1a1208", border: "1px solid #3a2a10" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${quests.length ? (done / quests.length) * 100 : 0}%`,
                  background: "linear-gradient(90deg, #7c4f1a, #f5c842)",
                  boxShadow: "0 0 8px #f5c84288",
                }}
              />
            </div>
          </div>
        </div>

        {/* Quest list */}
        <ul className="px-7 py-4 space-y-2 max-h-72 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {quests.map((q) => (
            <li
              key={q.id}
              className="flex items-center gap-3 group rounded-sm px-3 py-2.5 transition-all duration-200"
              style={{
                background: q.done ? "transparent" : "#ffffff06",
                border: q.done ? "1px solid transparent" : "1px solid #3a2a1044",
              }}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggle(q.id)}
                className="w-5 h-5 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-200"
                style={{
                  background: q.done ? "#c8922a22" : "transparent",
                  border: `1.5px solid ${q.done ? "#c8922a" : "#5a3e1b"}`,
                  boxShadow: q.done ? "0 0 8px #c8922a44" : "none",
                }}
              >
                {q.done && <span className="text-xs" style={{ color: "#f5c842" }}>✓</span>}
              </button>

              {/* Title */}
              <span
                className="flex-1 text-sm transition-all duration-200"
                style={{
                  color: q.done ? "#4a3a20" : "#d4b07a",
                  textDecoration: q.done ? "line-through" : "none",
                }}
              >
                {q.title}
              </span>

              {/* Priority badge */}
              <span className={`text-xs px-2 py-0.5 rounded-sm font-mono uppercase tracking-wider ${priorityStyles[q.priority]}`}>
                {q.priority}
              </span>

              {/* Remove */}
              <button
                onClick={() => remove(q.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs w-5 h-5 flex items-center justify-center rounded-sm"
                style={{ color: "#5a3e1b", background: "#ffffff08" }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Add quest */}
        <div className="px-7 pb-6 pt-3 border-t border-amber-900/30 space-y-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addQuest()}
            placeholder="Declare a new duty..."
            className="w-full bg-transparent text-sm px-3 py-2.5 rounded-sm outline-none placeholder:italic transition-all duration-200"
            style={{
              color: "#d4b07a",
              border: "1px solid #3a2a10",
              background: "#ffffff04",
              placeholderColor: "#5a4020",
            }}
          />
          <div className="flex gap-2">
            {["urgent", "normal", "low"].map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 text-xs py-1.5 rounded-sm uppercase tracking-widest transition-all duration-200 ${priorityStyles[p]}`}
                style={{
                  opacity: priority === p ? 1 : 0.4,
                  transform: priority === p ? "scale(1)" : "scale(0.97)",
                  fontWeight: priority === p ? "bold" : "normal",
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={addQuest}
            className="w-full py-2.5 text-sm font-bold uppercase tracking-widest rounded-sm transition-all duration-200 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c4f1a, #c8922a)",
              color: "#f5e8c0",
              border: "1px solid #c8922a44",
              boxShadow: "0 0 20px #c8922a22",
              letterSpacing: "0.2em",
            }}
          >
            ⚔ Assign Quest
          </button>
        </div>

        {/* Bottom ornament */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, transparent, #c8922a, #f5c842, #c8922a, transparent)" }}
        />
      </div>
    </div>
  );
}