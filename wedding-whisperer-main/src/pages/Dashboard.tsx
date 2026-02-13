import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Users, DollarSign, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { weddingDetails, checklist, guests, budgetItems } from "@/data/mockData";
import weddingHero from "@/assets/wedding-hero.jpg";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const i = setInterval(calc, 1000);
    return () => clearInterval(i);
  }, [targetDate]);
  return timeLeft;
}

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.08 } } },
  item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
};

export default function Dashboard() {
  const countdown = useCountdown(weddingDetails.weddingDate);
  const completedTasks = checklist.filter((c) => c.completed).length;
  const totalTasks = checklist.length;
  const taskProgress = Math.round((completedTasks / totalTasks) * 100);
  const acceptedGuests = guests.filter((g) => g.rsvp === "Accepted").length;
  const totalSpent = budgetItems.reduce((s, b) => s + b.actual, 0);
  const budgetPercent = Math.round((totalSpent / weddingDetails.totalBudget) * 100);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-56 rounded-2xl overflow-hidden"
      >
        <img src={weddingHero} alt="Wedding" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
        <div className="absolute inset-0 flex items-center p-8">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium tracking-widest uppercase mb-1">The Wedding of</p>
            <h1 className="font-display text-4xl font-bold text-primary-foreground mb-3">
              {weddingDetails.coupleName}
            </h1>
            <div className="flex items-center gap-4 text-primary-foreground/80 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Feb 14, 2027</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {weddingDetails.venue}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">Countdown to Your Big Day</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Days", value: countdown.days },
            { label: "Hours", value: countdown.hours },
            { label: "Minutes", value: countdown.minutes },
            { label: "Seconds", value: countdown.seconds },
          ].map(({ label, value }) => (
            <div key={label} className="text-center p-4 rounded-xl bg-secondary">
              <div className="font-display text-3xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: CheckCircle2, label: "Checklist Progress", value: `${taskProgress}%`, sub: `${completedTasks}/${totalTasks} tasks`, color: "text-primary", progress: taskProgress },
          { icon: DollarSign, label: "Budget Used", value: `$${totalSpent.toLocaleString()}`, sub: `of $${weddingDetails.totalBudget.toLocaleString()}`, color: "text-accent", progress: budgetPercent },
          { icon: Users, label: "Guest RSVPs", value: `${acceptedGuests}`, sub: `of ${guests.length} invited`, color: "text-primary", progress: Math.round((acceptedGuests / guests.length) * 100) },
          { icon: TrendingUp, label: "Vendors Booked", value: "3", sub: "of 6 categories", color: "text-accent", progress: 50 },
        ].map(({ icon: Icon, label, value, sub, color, progress }) => (
          <motion.div key={label} variants={stagger.item} className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <Icon className={`w-5 h-5 ${color}`} />
              <span className="text-xs text-muted-foreground">{sub}</span>
            </div>
            <div className="font-display text-2xl font-bold mb-2">{value}</div>
            <p className="text-sm text-muted-foreground mb-3">{label}</p>
            <Progress value={progress} className="h-1.5" />
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { title: "Upcoming Tasks", items: checklist.filter(c => !c.completed).slice(0, 3).map(c => c.title), icon: Clock },
          { title: "Recent RSVPs", items: guests.filter(g => g.rsvp === "Accepted").slice(0, 3).map(g => g.name), icon: Users },
          { title: "Pending Payments", items: budgetItems.filter(b => !b.paid).slice(0, 3).map(b => `${b.category} — $${b.estimated.toLocaleString()}`), icon: DollarSign },
        ].map(({ title, items, icon: Icon }) => (
          <div key={title} className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-4 h-4 text-primary" />
              <h3 className="font-display text-sm font-semibold">{title}</h3>
            </div>
            <ul className="space-y-2.5">
              {items.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
