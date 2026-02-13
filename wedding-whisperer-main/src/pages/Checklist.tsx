import { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare, Square, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { checklist as initialChecklist, type ChecklistItem } from "@/data/mockData";

const categoryOrder = ["6 Months Before", "3 Months Before", "1 Month Before", "1 Week Before"];

export default function Checklist() {
  const [items, setItems] = useState<ChecklistItem[]>(initialChecklist);
  const completed = items.filter((c) => c.completed).length;
  const progress = Math.round((completed / items.length) * 100);

  const toggle = (id: string) => {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c)));
  };

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    items: items.filter((c) => c.category === cat),
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-display text-3xl font-bold">Wedding Checklist</h1>
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <p className="text-muted-foreground mb-6">AI-generated tasks tailored to your wedding</p>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-5 mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="font-display text-lg font-bold text-primary">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">{completed} of {items.length} tasks completed</p>
      </motion.div>

      {/* Grouped Checklist */}
      <div className="space-y-6">
        {grouped.map(({ category, items: catItems }) => {
          const catCompleted = catItems.filter((c) => c.completed).length;
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-lg font-semibold">{category}</h2>
                <span className="text-xs text-muted-foreground">{catCompleted}/{catItems.length}</span>
              </div>
              <div className="space-y-2">
                {catItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                      item.completed ? "bg-secondary/50" : "glass-card hover:bg-secondary/30"
                    }`}
                  >
                    {item.completed ? (
                      <CheckSquare className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={`text-sm flex-1 ${item.completed ? "line-through text-muted-foreground" : "font-medium"}`}>
                      {item.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
