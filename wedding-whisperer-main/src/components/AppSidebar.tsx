import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, LayoutDashboard, Store, DollarSign, Users,
  CheckSquare, Clock, FileText, BarChart3, ChevronLeft,
  ChevronRight, Sparkles
} from "lucide-react";

const navItems = [
  { path: "/", label: "Overview", icon: LayoutDashboard },
  { path: "/vendors", label: "Vendor Marketplace", icon: Store },
  { path: "/budget", label: "Budget Planner", icon: DollarSign },
  { path: "/guests", label: "Guest Management", icon: Users },
  { path: "/checklist", label: "Wedding Checklist", icon: CheckSquare },
  { path: "/timeline", label: "Event Timeline", icon: Clock },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg rose-gradient flex items-center justify-center flex-shrink-0">
          <Heart className="w-5 h-5 text-primary-foreground" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden"
            >
              <h1 className="font-display text-lg font-semibold text-sidebar-foreground leading-tight">
                WedPlan
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase">Smart Planning</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-primary"
                />
              )}
              <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* AI Badge */}
      {!collapsed && (
        <div className="mx-3 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">AI-Powered</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Smart suggestions & auto-generated checklists</p>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-3 mb-4 flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-muted-foreground"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.aside>
  );
}
