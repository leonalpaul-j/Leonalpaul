import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, UserX, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { guests as initialGuests, type Guest } from "@/data/mockData";

const categoryColors: Record<string, string> = {
  Family: "bg-primary/10 text-primary",
  Friends: "bg-accent/10 text-accent",
  VIP: "bg-gold/10 text-gold",
  Colleagues: "bg-muted text-muted-foreground",
};

const rsvpConfig = {
  Accepted: { icon: UserCheck, color: "text-accent" },
  Declined: { icon: UserX, color: "text-destructive" },
  Pending: { icon: Clock, color: "text-muted-foreground" },
};

export default function Guests() {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const filtered = guests.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || g.category === filterCat;
    return matchSearch && matchCat;
  });

  const accepted = guests.filter((g) => g.rsvp === "Accepted").length;
  const declined = guests.filter((g) => g.rsvp === "Declined").length;
  const pending = guests.filter((g) => g.rsvp === "Pending").length;

  const toggleRsvp = (id: string) => {
    setGuests((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const next = g.rsvp === "Pending" ? "Accepted" : g.rsvp === "Accepted" ? "Declined" : "Pending";
        return { ...g, rsvp: next as Guest["rsvp"] };
      })
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-1">Guest Management</h1>
        <p className="text-muted-foreground mb-6">Manage your guest list and track RSVPs</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Guests", value: guests.length, icon: Users, color: "text-primary" },
          { label: "Accepted", value: accepted, icon: UserCheck, color: "text-accent" },
          { label: "Declined", value: declined, icon: UserX, color: "text-destructive" },
          { label: "Pending", value: pending, icon: Clock, color: "text-muted-foreground" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card rounded-xl p-4 text-center">
            <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
            <div className="font-display text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search guests..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2">
          {["All", "Family", "Friends", "VIP", "Colleagues"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filterCat === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Guest List */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_100px_80px] gap-4 px-5 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Guest</span>
          <span>Category</span>
          <span>RSVP</span>
          <span>Plus One</span>
        </div>
        {filtered.map((guest) => {
          const { icon: RsvpIcon, color } = rsvpConfig[guest.rsvp];
          return (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-[1fr_120px_100px_80px] gap-4 px-5 py-3 border-b border-border/50 items-center hover:bg-secondary/30 transition-colors"
            >
              <div>
                <div className="font-medium text-sm">{guest.name}</div>
                <div className="text-xs text-muted-foreground">{guest.email}</div>
              </div>
              <Badge variant="secondary" className={`w-fit text-[11px] ${categoryColors[guest.category]}`}>
                {guest.category}
              </Badge>
              <button onClick={() => toggleRsvp(guest.id)} className={`flex items-center gap-1.5 text-sm font-medium ${color}`}>
                <RsvpIcon className="w-3.5 h-3.5" />
                {guest.rsvp}
              </button>
              <span className="text-sm text-muted-foreground">{guest.plusOne ? "Yes" : "No"}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
