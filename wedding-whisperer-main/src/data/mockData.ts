export interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  priceLabel: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  tags: string[];
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  category: "Family" | "Friends" | "VIP" | "Colleagues";
  rsvp: "Pending" | "Accepted" | "Declined";
  plusOne: boolean;
  tableNumber?: number;
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  dueDate: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  estimated: number;
  actual: number;
  paid: boolean;
}

export interface TimelineEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: string;
}

export const vendors: Vendor[] = [
  { id: "1", name: "The Grand Estate", category: "Venues", location: "Beverly Hills, CA", price: 15000, priceLabel: "$15,000+", rating: 4.9, reviews: 128, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400", description: "Luxurious estate venue with stunning gardens", tags: ["Outdoor", "Luxury", "Garden"] },
  { id: "2", name: "Rosewood Manor", category: "Venues", location: "Napa Valley, CA", price: 12000, priceLabel: "$12,000+", rating: 4.8, reviews: 95, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400", description: "Vineyard wedding venue with panoramic views", tags: ["Vineyard", "Scenic", "Elegant"] },
  { id: "3", name: "Elena Rose Photography", category: "Photographers", location: "Los Angeles, CA", price: 5000, priceLabel: "$5,000+", rating: 5.0, reviews: 210, image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400", description: "Fine art wedding photography", tags: ["Fine Art", "Editorial", "Natural"] },
  { id: "4", name: "Golden Hour Studios", category: "Photographers", location: "San Francisco, CA", price: 3500, priceLabel: "$3,500+", rating: 4.7, reviews: 87, image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400", description: "Cinematic wedding photography & videography", tags: ["Cinematic", "Video", "Modern"] },
  { id: "5", name: "La Belle Cuisine", category: "Caterers", location: "Los Angeles, CA", price: 8000, priceLabel: "$80/person", rating: 4.9, reviews: 156, image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400", description: "Gourmet French-inspired wedding catering", tags: ["French", "Gourmet", "Custom Menu"] },
  { id: "6", name: "Petal & Bloom", category: "Decorators", location: "Santa Monica, CA", price: 6000, priceLabel: "$6,000+", rating: 4.8, reviews: 74, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400", description: "Luxury floral design and event styling", tags: ["Floral", "Luxury", "Custom"] },
  { id: "7", name: "Glow Beauty Studio", category: "Makeup Artists", location: "West Hollywood, CA", price: 1500, priceLabel: "$1,500+", rating: 4.9, reviews: 192, image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400", description: "Bridal beauty and hair styling team", tags: ["Bridal", "Natural", "Airbrush"] },
  { id: "8", name: "DJ Harmony", category: "DJs", location: "Los Angeles, CA", price: 2500, priceLabel: "$2,500+", rating: 4.6, reviews: 63, image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400", description: "Wedding DJ and entertainment specialist", tags: ["MC", "Lighting", "Live Mix"] },
];

export const guests: Guest[] = [
  { id: "1", name: "Sarah & James Mitchell", email: "sarah@email.com", category: "Family", rsvp: "Accepted", plusOne: true, tableNumber: 1 },
  { id: "2", name: "David Chen", email: "david@email.com", category: "Friends", rsvp: "Accepted", plusOne: true, tableNumber: 2 },
  { id: "3", name: "Emma Rodriguez", email: "emma@email.com", category: "VIP", rsvp: "Pending", plusOne: false },
  { id: "4", name: "Michael & Lisa Park", email: "michael@email.com", category: "Family", rsvp: "Accepted", plusOne: true, tableNumber: 1 },
  { id: "5", name: "Olivia Thompson", email: "olivia@email.com", category: "Friends", rsvp: "Declined", plusOne: false },
  { id: "6", name: "Robert Williams", email: "robert@email.com", category: "Colleagues", rsvp: "Pending", plusOne: true },
  { id: "7", name: "Jennifer & Mark Davis", email: "jen@email.com", category: "Family", rsvp: "Accepted", plusOne: true, tableNumber: 3 },
  { id: "8", name: "Alex Nguyen", email: "alex@email.com", category: "Friends", rsvp: "Accepted", plusOne: false, tableNumber: 2 },
  { id: "9", name: "Patricia Moore", email: "pat@email.com", category: "VIP", rsvp: "Accepted", plusOne: true, tableNumber: 1 },
  { id: "10", name: "Chris & Amy Foster", email: "chris@email.com", category: "Colleagues", rsvp: "Pending", plusOne: true },
];

export const checklist: ChecklistItem[] = [
  { id: "1", title: "Book ceremony venue", category: "6 Months Before", completed: true, dueDate: "2026-08-15" },
  { id: "2", title: "Hire wedding photographer", category: "6 Months Before", completed: true, dueDate: "2026-08-15" },
  { id: "3", title: "Choose wedding party", category: "6 Months Before", completed: true, dueDate: "2026-08-15" },
  { id: "4", title: "Book caterer & tasting", category: "6 Months Before", completed: false, dueDate: "2026-08-20" },
  { id: "5", title: "Order wedding invitations", category: "3 Months Before", completed: false, dueDate: "2026-11-15" },
  { id: "6", title: "Plan honeymoon", category: "3 Months Before", completed: false, dueDate: "2026-11-15" },
  { id: "7", title: "Book florist", category: "3 Months Before", completed: false, dueDate: "2026-11-20" },
  { id: "8", title: "Choose wedding cake", category: "3 Months Before", completed: false, dueDate: "2026-11-25" },
  { id: "9", title: "Final dress fitting", category: "1 Month Before", completed: false, dueDate: "2027-01-15" },
  { id: "10", title: "Confirm vendor details", category: "1 Month Before", completed: false, dueDate: "2027-01-15" },
  { id: "11", title: "Prepare seating chart", category: "1 Month Before", completed: false, dueDate: "2027-01-20" },
  { id: "12", title: "Wedding rehearsal", category: "1 Week Before", completed: false, dueDate: "2027-02-08" },
  { id: "13", title: "Pack for honeymoon", category: "1 Week Before", completed: false, dueDate: "2027-02-10" },
  { id: "14", title: "Prepare emergency kit", category: "1 Week Before", completed: false, dueDate: "2027-02-14" },
];

export const budgetItems: BudgetItem[] = [
  { id: "1", category: "Venue", estimated: 15000, actual: 14500, paid: true },
  { id: "2", category: "Catering", estimated: 8000, actual: 7800, paid: false },
  { id: "3", category: "Photography", estimated: 5000, actual: 5000, paid: true },
  { id: "4", category: "Flowers & Decor", estimated: 6000, actual: 0, paid: false },
  { id: "5", category: "Music & DJ", estimated: 2500, actual: 2500, paid: true },
  { id: "6", category: "Wedding Dress", estimated: 3000, actual: 2800, paid: true },
  { id: "7", category: "Hair & Makeup", estimated: 1500, actual: 0, paid: false },
  { id: "8", category: "Invitations", estimated: 800, actual: 0, paid: false },
  { id: "9", category: "Transportation", estimated: 1200, actual: 0, paid: false },
  { id: "10", category: "Miscellaneous", estimated: 2000, actual: 500, paid: false },
];

export const timelineEvents: TimelineEvent[] = [
  { id: "1", title: "Bridal Preparation", time: "10:00 AM", duration: "2 hours", type: "Preparation" },
  { id: "2", title: "Guest Arrival", time: "2:00 PM", duration: "30 min", type: "Ceremony" },
  { id: "3", title: "Wedding Ceremony", time: "2:30 PM", duration: "45 min", type: "Ceremony" },
  { id: "4", title: "Cocktail Hour", time: "3:30 PM", duration: "1 hour", type: "Reception" },
  { id: "5", title: "Photography Session", time: "3:30 PM", duration: "1.5 hours", type: "Photography" },
  { id: "6", title: "Grand Entrance", time: "5:00 PM", duration: "15 min", type: "Reception" },
  { id: "7", title: "First Dance", time: "5:15 PM", duration: "10 min", type: "Reception" },
  { id: "8", title: "Dinner Service", time: "5:30 PM", duration: "1.5 hours", type: "Dinner" },
  { id: "9", title: "Speeches & Toasts", time: "7:00 PM", duration: "30 min", type: "Reception" },
  { id: "10", title: "Cake Cutting", time: "7:30 PM", duration: "15 min", type: "Reception" },
  { id: "11", title: "Dance Party", time: "8:00 PM", duration: "2 hours", type: "Party" },
  { id: "12", title: "Sparkler Send-Off", time: "10:00 PM", duration: "15 min", type: "Farewell" },
];

export const weddingDetails = {
  coupleName: "Emma & Alexander",
  weddingDate: "2027-02-14",
  venue: "The Grand Estate, Beverly Hills",
  totalBudget: 45000,
  guestCount: 150,
};
