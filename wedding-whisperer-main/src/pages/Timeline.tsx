import { motion } from "framer-motion";
import { Clock, Camera, Music, Utensils, Heart, PartyPopper, Sparkles } from "lucide-react";
import { timelineEvents } from "@/data/mockData";

const typeIcons: Record<string, typeof Clock> = {
  Preparation: Sparkles,
  Ceremony: Heart,
  Reception: PartyPopper,
  Photography: Camera,
  Dinner: Utensils,
  Party: Music,
  Farewell: Heart,
};

const typeColors: Record<string, string> = {
  Preparation: "bg-accent/10 text-accent border-accent/30",
  Ceremony: "bg-primary/10 text-primary border-primary/30",
  Reception: "bg-gold/10 text-gold border-gold/30",
  Photography: "bg-accent/10 text-accent border-accent/30",
  Dinner: "bg-primary/10 text-primary border-primary/30",
  Party: "bg-gold/10 text-gold border-gold/30",
  Farewell: "bg-primary/10 text-primary border-primary/30",
};

export default function Timeline() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-1">Event Timeline</h1>
        <p className="text-muted-foreground mb-8">Your wedding day schedule at a glance</p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[100px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {timelineEvents.map((event, i) => {
            const Icon = typeIcons[event.type] || Clock;
            const colorClass = typeColors[event.type] || "bg-secondary text-foreground border-border";

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4"
              >
                {/* Time */}
                <div className="w-[80px] text-right">
                  <span className="text-sm font-semibold">{event.time}</span>
                </div>

                {/* Dot */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Card */}
                <div className="flex-1 glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold">{event.title}</h3>
                    <span className="text-xs text-muted-foreground">{event.duration}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{event.type}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
