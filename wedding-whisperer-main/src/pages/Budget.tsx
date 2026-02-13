import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, AlertTriangle, CheckCircle, PieChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PieChart as RPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { budgetItems as initialBudget, weddingDetails } from "@/data/mockData";

const COLORS = [
  "hsl(350, 45%, 65%)", "hsl(38, 60%, 55%)", "hsl(200, 50%, 55%)",
  "hsl(160, 45%, 50%)", "hsl(280, 40%, 60%)", "hsl(20, 55%, 55%)",
  "hsl(330, 50%, 70%)", "hsl(50, 60%, 50%)", "hsl(180, 40%, 50%)", "hsl(10, 50%, 55%)",
];

export default function Budget() {
  const [items] = useState(initialBudget);
  const totalEstimated = items.reduce((s, b) => s + b.estimated, 0);
  const totalActual = items.reduce((s, b) => s + b.actual, 0);
  const remaining = weddingDetails.totalBudget - totalActual;
  const overBudget = totalActual > weddingDetails.totalBudget;

  const pieData = items.map((b) => ({ name: b.category, value: b.estimated }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-1">Budget Planner</h1>
        <p className="text-muted-foreground mb-6">Track and manage your wedding expenses</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Budget", value: `$${weddingDetails.totalBudget.toLocaleString()}`, icon: DollarSign, variant: "default" as const },
          { label: "Amount Spent", value: `$${totalActual.toLocaleString()}`, icon: overBudget ? AlertTriangle : CheckCircle, variant: overBudget ? ("destructive" as const) : ("default" as const) },
          { label: "Remaining", value: `$${remaining.toLocaleString()}`, icon: DollarSign, variant: "default" as const },
        ].map(({ label, value, icon: Icon }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            <div className="font-display text-2xl font-bold">{value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-5 lg:col-span-1"
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-4 h-4 text-primary" />
            <h3 className="font-display text-sm font-semibold">Budget Breakdown</h3>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <RPieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
              />
            </RPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-muted-foreground truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Expense Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-xl p-5 lg:col-span-2"
        >
          <h3 className="font-display text-sm font-semibold mb-4">Expense Details</h3>
          <div className="space-y-3">
            {items.map((item, i) => {
              const pct = item.estimated > 0 ? Math.round((item.actual / item.estimated) * 100) : 0;
              return (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium truncate">{item.category}</span>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-muted-foreground">${item.actual.toLocaleString()}</span>
                        <span className="text-muted-foreground/50">/</span>
                        <span className="font-medium">${item.estimated.toLocaleString()}</span>
                      </div>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                  </div>
                  {item.paid && (
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
