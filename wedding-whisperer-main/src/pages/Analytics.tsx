import { motion } from "framer-motion";
import { BarChart3, CheckCircle2, DollarSign, Users, Store } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { budgetItems, checklist, guests } from "@/data/mockData";

export default function Analytics() {
  const completedTasks = checklist.filter((c) => c.completed).length;
  const taskPct = Math.round((completedTasks / checklist.length) * 100);
  const accepted = guests.filter((g) => g.rsvp === "Accepted").length;
  const rsvpPct = Math.round((accepted / guests.length) * 100);
  const totalSpent = budgetItems.reduce((s, b) => s + b.actual, 0);
  const budgetPct = Math.round((totalSpent / 45000) * 100);

  const chartData = budgetItems.map((b) => ({ name: b.category, estimated: b.estimated, actual: b.actual }));

  const stats = [
    { label: "Vendors Booked", value: "3 / 6", pct: 50, icon: Store, color: "text-accent" },
    { label: "Budget Used", value: `${budgetPct}%`, pct: budgetPct, icon: DollarSign, color: "text-primary" },
    { label: "Guest RSVPs", value: `${rsvpPct}%`, pct: rsvpPct, icon: Users, color: "text-accent" },
    { label: "Checklist Done", value: `${taskPct}%`, pct: taskPct, icon: CheckCircle2, color: "text-primary" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-1">Analytics Dashboard</h1>
        <p className="text-muted-foreground mb-6">Your wedding planning at a glance</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, pct, icon: Icon, color }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-5"
          >
            <Icon className={`w-5 h-5 mb-3 ${color}`} />
            <div className="font-display text-2xl font-bold mb-1">{value}</div>
            <p className="text-sm text-muted-foreground mb-3">{label}</p>
            <Progress value={pct} className="h-1.5" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm font-semibold">Budget: Estimated vs Actual</h3>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} barGap={4}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v: number) => `$${v.toLocaleString()}`}
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
            />
            <Bar dataKey="estimated" fill="hsl(350, 45%, 65%)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="actual" fill="hsl(38, 60%, 55%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
