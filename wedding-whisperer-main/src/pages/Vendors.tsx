import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, MapPin, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { vendors } from "@/data/mockData";

const categories = ["All", "Venues", "Photographers", "Caterers", "Decorators", "Makeup Artists", "DJs"];

export default function Vendors() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const filtered = vendors.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || v.category === activeCategory;
    return matchSearch && matchCat;
  });

  const vendor = vendors.find((v) => v.id === selectedVendor);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-1">Vendor Marketplace</h1>
        <p className="text-muted-foreground mb-6">Find and book the perfect vendors for your dream wedding</p>
      </motion.div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vendor Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((v) => (
            <motion.div
              key={v.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedVendor(v.id)}
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-semibold text-lg">{v.name}</h3>
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-sm font-medium">{v.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {v.location}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{v.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {v.tags.slice(0, 2).map((t) => (
                      <Badge key={t} variant="secondary" className="text-[11px]">{t}</Badge>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-primary">{v.priceLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Vendor Detail Modal */}
      <AnimatePresence>
        {vendor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
            onClick={() => setSelectedVendor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-lg w-full overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-52">
                <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-foreground/30 text-primary-foreground hover:bg-foreground/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-display text-2xl font-bold">{vendor.name}</h2>
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{vendor.rating}</span>
                    <span className="text-muted-foreground text-sm">({vendor.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {vendor.location}
                </div>
                <p className="text-muted-foreground mb-4">{vendor.description}</p>
                <div className="flex gap-2 mb-5">
                  {vendor.tags.map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-primary">{vendor.priceLabel}</span>
                  <Button className="rose-gradient text-primary-foreground border-0">
                    Request Booking
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
