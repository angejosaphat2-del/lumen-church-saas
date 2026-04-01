import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  LayoutDashboard, Users, UserPlus, Calendar, DollarSign, Church, Settings,
  Menu, X, LogOut, ChevronDown, ChevronRight, Search, Plus, Edit, Trash2,
  Phone, Mail, TrendingUp, TrendingDown, Bell, Shield, Heart, BookOpen,
  MapPin, Filter, Download, Eye, Check, AlertCircle, Star, Gift,
  ArrowUpCircle, ArrowDownCircle, Briefcase, Target, MessageSquare,
  Sun, Moon, BarChart3, PieChart as PieChartIcon, Activity, Clock,
  Home, Layers, UserCheck, UsersRound, CreditCard, ChevronLeft,
  MoreHorizontal, Wallet, Receipt, Building2, Network, Globe, Lock
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

// ═══════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════
const MOCK_MEMBERS = [
  { id: 1, first_name: "Jean", last_name: "Kouadio", gender: "M", phone: "+225 07 08 09 10", email: "jean.k@email.com", status: "actif", role: "pasteur", department: "Direction", join_date: "2020-01-15", photo: null, birthday_day: 15, birthday_month: 3, address: "Cocody, Abidjan", baptise: true, date_bapteme: "2020-04-12", bapteme_type: "eaux" },
  { id: 2, first_name: "Marie", last_name: "Bamba", gender: "F", phone: "+225 05 12 34 56", email: "marie.b@email.com", status: "actif", role: "tresorier", department: "Finances", join_date: "2021-03-20", photo: null, birthday_day: 8, birthday_month: 7, address: "Plateau, Abidjan", baptise: true, date_bapteme: "2021-06-20", bapteme_type: "eaux" },
  { id: 3, first_name: "Paul", last_name: "Yao", gender: "M", phone: "+225 01 23 45 67", email: "paul.y@email.com", status: "actif", role: "membre", department: "Louange", join_date: "2022-06-10", photo: null, birthday_day: 22, birthday_month: 11, address: "Yopougon, Abidjan", baptise: true, date_bapteme: "2022-09-04", bapteme_type: "eaux" },
  { id: 4, first_name: "Esther", last_name: "Koné", gender: "F", phone: "+225 07 98 76 54", email: "esther.k@email.com", status: "actif", role: "secretaire", department: "Administration", join_date: "2021-09-05", photo: null, birthday_day: 3, birthday_month: 1, address: "Marcory, Abidjan", baptise: false, date_bapteme: "", bapteme_type: "" },
  { id: 5, first_name: "David", last_name: "Tra", gender: "M", phone: "+225 05 55 66 77", email: "david.t@email.com", status: "inactif", role: "membre", department: "Jeunesse", join_date: "2023-01-12", photo: null, birthday_day: 19, birthday_month: 5, address: "Treichville, Abidjan", baptise: false, date_bapteme: "", bapteme_type: "" },
  { id: 6, first_name: "Ruth", last_name: "Diallo", gender: "F", phone: "+225 01 44 55 66", email: "ruth.d@email.com", status: "actif", role: "membre", department: "Enfants", join_date: "2022-11-30", photo: null, birthday_day: 28, birthday_month: 9, address: "Abobo, Abidjan", baptise: true, date_bapteme: "2023-01-08", bapteme_type: "eaux" },
  { id: 7, first_name: "Samuel", last_name: "Ouattara", gender: "M", phone: "+225 07 11 22 33", email: "samuel.o@email.com", status: "actif", role: "responsable_dept", department: "Intercession", join_date: "2020-08-18", photo: null, birthday_day: 12, birthday_month: 4, address: "Cocody, Abidjan", baptise: true, date_bapteme: "2020-10-18", bapteme_type: "eaux" },
  { id: 8, first_name: "Grace", last_name: "Achi", gender: "F", phone: "+225 05 99 88 77", email: "grace.a@email.com", status: "actif", role: "membre", department: "Accueil", join_date: "2023-04-22", photo: null, birthday_day: 7, birthday_month: 12, address: "Adjamé, Abidjan", baptise: false, date_bapteme: "", bapteme_type: "" },
];

const MOCK_VISITORS = [
  { id: 1, first_name: "Adama", last_name: "Sanogo", phone: "+225 07 00 11 22", visit_date: "2026-03-16", source: "Invitation", status: "nouveau", notes: "Intéressé par le groupe de prière" },
  { id: 2, first_name: "Fatou", last_name: "Coulibaly", phone: "+225 05 33 44 55", visit_date: "2026-03-09", source: "En ligne", status: "suivi", notes: "Souhaite rejoindre le département louange" },
  { id: 3, first_name: "Ibrahim", last_name: "Touré", phone: "+225 01 66 77 88", visit_date: "2026-03-02", source: "Voisinage", status: "converti", notes: "A accepté Christ le 02/03" },
];

const MOCK_FINANCES = [
  { id: 1, type: "entree", category: "dimes", amount: 250000, date: "2026-03-17", description: "Dîmes dimanche", method: "especes" },
  { id: 2, type: "entree", category: "offrandes_culte", amount: 180000, date: "2026-03-17", description: "Offrandes du culte", method: "mobile_money" },
  { id: 3, type: "sortie", category: "loyer", amount: 350000, date: "2026-03-15", description: "Loyer mensuel mars", method: "virement" },
  { id: 4, type: "entree", category: "dons", amount: 500000, date: "2026-03-10", description: "Don spécial construction", method: "virement" },
  { id: 5, type: "sortie", category: "electricite_eau", amount: 45000, date: "2026-03-12", description: "Facture électricité", method: "mobile_money" },
  { id: 6, type: "entree", category: "dimes", amount: 310000, date: "2026-03-10", description: "Dîmes dimanche", method: "especes" },
  { id: 7, type: "sortie", category: "equipements", amount: 120000, date: "2026-03-08", description: "Achat microphones", method: "especes" },
  { id: 8, type: "entree", category: "offrandes_speciales", amount: 750000, date: "2026-03-03", description: "Offrande de bâtir", method: "especes" },
];

const MOCK_EVENTS = [
  { id: 1, title: "Culte du dimanche", date: "2026-03-22", time: "09:00", type: "culte", location: "Temple principal" },
  { id: 2, title: "Réunion de prière", date: "2026-03-25", time: "18:30", type: "priere", location: "Salle annexe" },
  { id: 3, title: "Étude biblique", date: "2026-03-26", time: "19:00", type: "etude", location: "Temple principal" },
  { id: 4, title: "Répétition chorale", date: "2026-03-27", time: "17:00", type: "repetition", location: "Salle de musique" },
  { id: 5, title: "Jeûne et prière", date: "2026-03-28", time: "06:00", type: "priere", location: "Temple principal" },
  { id: 6, title: "Conférence de Pâques", date: "2026-04-05", time: "09:00", type: "evenement", location: "Temple principal" },
];

const MOCK_DEPARTMENTS = [
  { id: 1, name: "Louange & Adoration", members_count: 24, leader: "Paul Yao", color: "#8b5cf6" },
  { id: 2, name: "Intercession", members_count: 18, leader: "Samuel Ouattara", color: "#3b82f6" },
  { id: 3, name: "Jeunesse", members_count: 35, leader: "David Tra", color: "#f59e0b" },
  { id: 4, name: "Enfants", members_count: 28, leader: "Ruth Diallo", color: "#ec4899" },
  { id: 5, name: "Accueil & Protocole", members_count: 15, leader: "Grace Achi", color: "#10b981" },
  { id: 6, name: "Diaconie", members_count: 12, leader: "Esther Koné", color: "#ef4444" },
];

const INITIAL_CAROUSEL_SLIDES = [
  { id: 1, title: "Conférence de Pâques 2026", subtitle: "5 Avril — Temple principal · Invité spécial Pasteur Abraham", gradient: "linear-gradient(135deg, #0d9488, #065f46)", emoji: "✝️", cta: "Voir le programme" },
  { id: 2, title: "Campagne de dons — Bâtir ensemble", subtitle: "Objectif : 10 000 000 FCFA pour la nouvelle salle", gradient: "linear-gradient(135deg, #3b82f6, #1e40af)", emoji: "🏗️", cta: "Participer" },
  { id: 3, title: "Baptême des eaux — 12 Avril", subtitle: "Inscriptions ouvertes · Contactez le secrétariat", gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)", emoji: "💧", cta: "S'inscrire" },
  { id: 4, title: "Nuit de louange & adoration", subtitle: "Vendredi 4 Avril à 21h · Venez comme vous êtes", gradient: "linear-gradient(135deg, #ec4899, #be185d)", emoji: "🎵", cta: "En savoir plus" },
];

const MOCK_CELLS = [
  { id: 1, name: "Cellule Cocody-Angré", quartier: "Cocody", leader: "Jean Kouadio", members: ["Paul Yao", "Grace Achi", "David Tra"], day: "Mardi", time: "19h00", members_count: 12, presences: [{ date: "2026-03-18", present: 9, absent: 3 }, { date: "2026-03-11", present: 11, absent: 1 }] },
  { id: 2, name: "Cellule Yopougon-Selmer", quartier: "Yopougon", leader: "Samuel Ouattara", members: ["Ruth Diallo", "Marie Bamba"], day: "Jeudi", time: "18h30", members_count: 10, presences: [{ date: "2026-03-20", present: 8, absent: 2 }] },
  { id: 3, name: "Cellule Marcory-Zone 4", quartier: "Marcory", leader: "Esther Koné", members: ["Grace Achi"], day: "Mercredi", time: "19h30", members_count: 8, presences: [{ date: "2026-03-19", present: 6, absent: 2 }] },
  { id: 4, name: "Cellule Abobo-Baoulé", quartier: "Abobo", leader: "Ruth Diallo", members: [], day: "Vendredi", time: "18h00", members_count: 15, presences: [] },
];

const MONTHS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const DAYS_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const GROWTH_DATA = MONTHS_FR.slice(0, 6).map((m, i) => ({
  month: m, membres: 180 + i * 12, visiteurs: 15 + Math.floor(Math.random() * 10),
  cultes: 4 + Math.floor(Math.random() * 2)
}));

const FINANCE_CHART = MONTHS_FR.slice(0, 6).map((m, i) => ({
  month: m, entrees: 800000 + Math.floor(Math.random() * 400000),
  sorties: 400000 + Math.floor(Math.random() * 200000)
}));

const ATTENDANCE_DATA = ["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map((s, i) => ({
  semaine: s, presences: 180 + Math.floor(Math.random() * 60), objectif: 250
}));

// ═══════════════════════════════════════════════════════
// SUPABASE SERVICE LAYER
// ═══════════════════════════════════════════════════════
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || "";
const SUPABASE_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || "";

const supabase = (() => {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  const headers = { "Content-Type": "application/json", apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };
  const req = async (path, opts = {}) => {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: { ...headers, ...(opts.headers||{}) }, ...opts });
    if (!res.ok) throw new Error(await res.text());
    return res.status === 204 ? null : res.json();
  };
  return {
    from: (table) => ({
      select: (cols = "*") => req(`${table}?select=${cols}&order=created_at.desc`),
      insert: (data) => req(`${table}`, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(data) }),
      update: (id, data) => req(`${table}?id=eq.${id}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(data) }),
      delete: (id) => req(`${table}?id=eq.${id}`, { method: "DELETE" }),
      upsert: (data) => req(`${table}`, { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(data) }),
    }),
    isReady: true,
  };
})();

// Hook: use Supabase if configured, fallback to mock data
const useSupabaseTable = (table, mockData, transform = x => x) => {
  const [data, setData] = useState(mockData.map(transform));
  const [loading, setLoading] = useState(false);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    setLoading(true);
    supabase.from(table).select()
      .then(rows => { if (rows?.length) { setData(rows.map(transform)); setSynced(true); } })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [table]);

  const save = async (item) => {
    if (!supabase) return item;
    try {
      const [result] = await (item.id ? supabase.from(table).update(item.id, item) : supabase.from(table).insert(item));
      return result || item;
    } catch { return item; }
  };

  const remove = async (id) => {
    if (supabase) { try { await supabase.from(table).delete(id); } catch {} }
  };

  return { data, setData, loading, synced, save, remove };
};

// ── BAPTISM CONSTANTS ──
const BAPTEME_TYPES = {
  eaux: { label: "Baptême des eaux", emoji: "💧", color: "#3b82f6" },
};

// ═══════════════════════════════════════════════════════
// THEME & STYLES
// ═══════════════════════════════════════════════════════
const COLORS_CHART = ["#0d9488", "#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899", "#10b981", "#ef4444"];

// ═══════════════════════════════════════════════════════
// UTILITY COMPONENTS
// ═══════════════════════════════════════════════════════
const Avatar = ({ name, size = 40, color = "#0d9488" }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: `linear-gradient(135deg, ${color}, ${color}dd)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 700, fontSize: size * 0.4,
    flexShrink: 0, letterSpacing: "0.5px"
  }}>
    {name?.charAt(0)?.toUpperCase() || "?"}
  </div>
);

const Badge = ({ children, variant = "default", style = {} }) => {
  const variants = {
    default: { background: "#0d948815", color: "#0d9488" },
    success: { background: "#10b98115", color: "#10b981" },
    warning: { background: "#f59e0b15", color: "#f59e0b" },
    danger: { background: "#ef444415", color: "#ef4444" },
    info: { background: "#3b82f615", color: "#3b82f6" },
    purple: { background: "#8b5cf615", color: "#8b5cf6" },
  };
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
      letterSpacing: "0.3px", ...variants[variant], ...style
    }}>{children}</span>
  );
};

const StatCard = ({ icon: Icon, title, value, change, positive, color = "#0d9488", onClick }) => (
  <div onClick={onClick} style={{
    background: "#fff", borderRadius: 16, padding: "22px 24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)", border: "1px solid #f1f5f9",
    cursor: onClick ? "pointer" : "default", transition: "all 0.2s",
    position: "relative", overflow: "hidden"
  }}
  onMouseEnter={e => { if(onClick) e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)"; }}
  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
  >
    <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `${color}08`, borderRadius: "0 0 0 80px" }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", margin: 0 }}>{title}</p>
        <p style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", margin: "6px 0 0", letterSpacing: "-0.5px" }}>{value}</p>
        {change && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
            {positive ? <TrendingUp size={13} color="#10b981" /> : <TrendingDown size={13} color="#ef4444" />}
            <span style={{ fontSize: 12, fontWeight: 600, color: positive ? "#10b981" : "#ef4444" }}>{change}</span>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>vs mois dernier</span>
          </div>
        )}
      </div>
      <div style={{
        width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(135deg, ${color}15, ${color}25)`
      }}>
        <Icon size={22} color={color} />
      </div>
    </div>
  </div>
);

const Btn = ({ children, variant = "primary", size = "md", onClick, style = {}, icon: Icon, disabled }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6, border: "none", cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 600, borderRadius: 10, transition: "all 0.2s", opacity: disabled ? 0.5 : 1,
    fontSize: size === "sm" ? 12 : 13,
    padding: size === "sm" ? "6px 12px" : "9px 18px",
  };
  const variants = {
    primary: { background: "linear-gradient(135deg, #0d9488, #0f766e)", color: "#fff" },
    secondary: { background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0" },
    danger: { background: "#fef2f2", color: "#ef4444" },
    ghost: { background: "transparent", color: "#64748b" },
  };
  return (
    <button disabled={disabled} onClick={onClick} style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={e => { if(!disabled) e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {Icon && <Icon size={size === "sm" ? 14 : 16} />}{children}
    </button>
  );
};

const Modal = ({ open, onClose, title, children, width = 520 }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)"
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20, width: "90%", maxWidth: width, maxHeight: "85vh",
        overflow: "auto", boxShadow: "0 25px 50px rgba(0,0,0,0.15)", animation: "modalIn 0.25s ease"
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 24px", borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, background: "#fff", zIndex: 1, borderRadius: "20px 20px 0 0"
        }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{title}</h3>
          <button onClick={onClose} style={{
            background: "#f8fafc", border: "none", borderRadius: 8, width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
          }}><X size={16} color="#64748b" /></button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
};

const FormField = ({ label, children, required }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 6, letterSpacing: "0.3px" }}>
      {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0",
  fontSize: 13, color: "#0f172a", outline: "none", transition: "all 0.2s",
  background: "#fafbfc", boxSizing: "border-box"
};

const selectStyle = { ...inputStyle, appearance: "none", cursor: "pointer" };

const EmptyState = ({ icon: Icon, title, description }) => (
  <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
    <div style={{
      width: 64, height: 64, borderRadius: 16, background: "#f1f5f9", display: "flex",
      alignItems: "center", justifyContent: "center", margin: "0 auto 16px"
    }}><Icon size={28} color="#cbd5e1" /></div>
    <p style={{ fontWeight: 700, color: "#64748b", fontSize: 15, margin: "0 0 4px" }}>{title}</p>
    <p style={{ fontSize: 13, margin: 0 }}>{description}</p>
  </div>
);

const TabBar = ({ tabs, active, onChange }) => (
  <div style={{ display: "flex", gap: 4, background: "#f1f5f9", borderRadius: 12, padding: 4, marginBottom: 20 }}>
    {tabs.map(t => (
      <button key={t.key} onClick={() => onChange(t.key)} style={{
        flex: 1, padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
        background: active === t.key ? "#fff" : "transparent",
        color: active === t.key ? "#0f172a" : "#64748b",
        fontWeight: active === t.key ? 700 : 500, fontSize: 13,
        boxShadow: active === t.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.2s"
      }}>{t.label}</button>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════

// DASHBOARD PAGE
const DashboardPage = ({ onNavigate, carouselSlides: propSlides }) => {
  const [period, setPeriod] = useState("month");
  const totalEntrees = MOCK_FINANCES.filter(f => f.type === "entree").reduce((s, f) => s + f.amount, 0);
  const totalSorties = MOCK_FINANCES.filter(f => f.type === "sortie").reduce((s, f) => s + f.amount, 0);
  const solde = totalEntrees - totalSorties;
  const upcomingEvents = MOCK_EVENTS.filter(e => new Date(e.date) >= new Date()).slice(0, 4);
  const birthdays = MOCK_MEMBERS.filter(m => m.birthday_month === 3).slice(0, 3);
  const deptData = [
    { name: "Hommes", value: 85, color: "#3b82f6" },
    { name: "Femmes", value: 95, color: "#ec4899" },
    { name: "Jeunes", value: 45, color: "#f59e0b" },
    { name: "Enfants", value: 25, color: "#10b981" },
  ];

  // Carousel state — use props if provided, else fallback
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselSlides = (propSlides && propSlides.length > 0) ? propSlides : INITIAL_CAROUSEL_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (i) => setCarouselIndex(i);
  const goPrev = () => setCarouselIndex(prev => prev === 0 ? carouselSlides.length - 1 : prev - 1);
  const goNext = () => setCarouselIndex(prev => (prev + 1) % carouselSlides.length);
  const currentSlide = carouselSlides[carouselIndex];
  const periodLabels = { day: "Aujourd'hui", week: "Cette semaine", month: "Ce mois", year: "Cette année" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.3px" }}>Tableau de bord</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>Vue d'ensemble — {periodLabels[period]}</p>
        </div>
        <div style={{ display: "flex", gap: 4, background: "#f1f5f9", borderRadius: 10, padding: 3 }}>
          {[{k:"day",l:"Jour"},{k:"week",l:"Semaine"},{k:"month",l:"Mois"},{k:"year",l:"Année"}].map(p => (
            <button key={p.k} onClick={() => setPeriod(p.k)} style={{
              padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: period === p.k ? "#fff" : "transparent", color: period === p.k ? "#0f172a" : "#64748b",
              boxShadow: period === p.k ? "0 1px 3px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s"
            }}>{p.l}</button>
          ))}
        </div>
      </div>

      {/* ═══ CAROUSEL ═══ */}
      <div style={{
        position: "relative", borderRadius: 20, overflow: "hidden", marginBottom: 28,
        background: currentSlide.gradient, transition: "background 0.6s ease",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
      }}>
        {/* Background pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px, 40px 40px" }} />
        <div style={{ position: "absolute", top: -40, right: -20, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -60, left: "30%", width: 250, height: 250, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <div style={{ position: "relative", padding: "36px 40px", minHeight: 180, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Left arrow */}
          <button onClick={goPrev} style={{
            width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            flexShrink: 0, transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            <ChevronLeft size={18} color="#fff" />
          </button>

          {/* Content */}
          <div style={{ flex: 1, textAlign: "center", padding: "0 24px", animation: "fadeIn 0.4s ease" }} key={carouselIndex}>
            <div style={{ fontSize: 42, marginBottom: 12 }}>{currentSlide.emoji}</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>
              {currentSlide.title}
            </h3>
            <p style={{ margin: "0 0 18px", fontSize: 14, color: "rgba(255,255,255,0.8)", maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
              {currentSlide.subtitle}
            </p>
            <button style={{
              padding: "10px 24px", borderRadius: 12, border: "2px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)",
              color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s", letterSpacing: "0.3px"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            >
              {currentSlide.cta}
            </button>
          </div>

          {/* Right arrow */}
          <button onClick={goNext} style={{
            width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            flexShrink: 0, transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            <ChevronRight size={18} color="#fff" />
          </button>
        </div>

        {/* Dots indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, paddingBottom: 18 }}>
          {carouselSlides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} style={{
              width: i === carouselIndex ? 24 : 8, height: 8, borderRadius: 4,
              background: i === carouselIndex ? "#fff" : "rgba(255,255,255,0.35)",
              border: "none", cursor: "pointer", transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
        <StatCard icon={Users} title="Membres" value={MOCK_MEMBERS.length} change="+12%" positive color="#0d9488" onClick={() => onNavigate("members")} />
        <StatCard icon={UserPlus} title="Visiteurs" value={MOCK_VISITORS.length} change="+8%" positive color="#3b82f6" onClick={() => onNavigate("visitors")} />
        <StatCard icon={ArrowUpCircle} title="Entrées" value={`${(totalEntrees/1000).toFixed(0)}k`} change="+15%" positive color="#10b981" onClick={() => onNavigate("finances")} />
        <StatCard icon={Wallet} title="Solde" value={`${(solde/1000).toFixed(0)}k F`} change={solde > 0 ? "+5%" : "-3%"} positive={solde > 0} color="#8b5cf6" onClick={() => onNavigate("finances")} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 20px" }}>📈 Croissance des membres</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={GROWTH_DATA}>
              <defs>
                <linearGradient id="gMembres" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#0d9488" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Area type="monotone" dataKey="membres" stroke="#0d9488" fill="url(#gMembres)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="visiteurs" stroke="#3b82f6" fill="#3b82f610" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 16px" }}>👥 Répartition</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={deptData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {deptData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: "none", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {deptData.slice(0, 4).map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#64748b" }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 16px" }}>💰 Finances du mois</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={FINANCE_CHART.slice(-3)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "none", fontSize: 11 }} formatter={v => `${v.toLocaleString()} F`} />
              <Bar dataKey="entrees" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="sorties" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 16px" }}>📅 Prochains événements</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {upcomingEvents.map(ev => (
              <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", background: "#0d948810", flexShrink: 0
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#0d9488", lineHeight: 1 }}>
                    {MONTHS_FR[new Date(ev.date).getMonth()]}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#0d9488", lineHeight: 1.1 }}>
                    {new Date(ev.date).getDate()}
                  </span>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{ev.title}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{ev.time} · {ev.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 16px" }}>🎂 Anniversaires ce mois</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {birthdays.length > 0 ? birthdays.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name={m.first_name} size={36} color="#f59e0b" />
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{m.first_name} {m.last_name}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{m.birthday_day} mars</p>
                </div>
                <Gift size={16} color="#f59e0b" style={{ marginLeft: "auto" }} />
              </div>
            )) : <p style={{ fontSize: 12, color: "#94a3b8" }}>Aucun anniversaire ce mois</p>}
          </div>

          <div style={{ marginTop: 20, padding: 14, background: "#f0fdfa", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Activity size={14} color="#0d9488" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#0d9488" }}>Présences dimanche</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>215</span>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>/ 250 places</span>
            </div>
            <div style={{ width: "100%", height: 6, background: "#e2e8f0", borderRadius: 3, marginTop: 8 }}>
              <div style={{ width: "86%", height: "100%", background: "linear-gradient(90deg, #0d9488, #10b981)", borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MEMBERS PAGE
const MembersPage = ({ userRole, churchName }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(null);
  const [notification, setNotification] = useState(null);

  const transformMember = m => ({
    ...m,
    category: m.category || (m.gender === "F" ? "femme" : "homme"),
    status: m.status || "actif",
    departments: m.departments || [m.department].filter(Boolean),
    committees: m.committees || [],
    groups: m.groups || [],
    parcours: m.parcours || "actif",
    baptise: m.baptise ?? false,
    date_bapteme: m.date_bapteme || "",
    bapteme_type: m.bapteme_type || "",
  });

  const { data: members, setData: setMembers, loading: membersLoading, synced, save: saveMember, remove: removeMember } = useSupabaseTable("members", MOCK_MEMBERS, transformMember);

  const [editing, setEditing] = useState(null);
  const emptyForm = { first_name: "", last_name: "", gender: "M", phone: "", email: "", departments: [], committees: [], groups: [], status: "actif", category: "homme", birth_date: "", parcours: "nouveau", baptise: false, date_bapteme: "", bapteme_type: "" };
  const [form, setForm] = useState(emptyForm);
  const parcoursSteps = ["nouveau", "integration", "actif", "serviteur", "leader"];
  const parcoursLabels = { nouveau: "Nouveau converti", integration: "En intégration", actif: "Membre actif", serviteur: "Serviteur", leader: "Leader" };
  const parcoursColors = { nouveau: "#3b82f6", integration: "#f59e0b", actif: "#10b981", serviteur: "#8b5cf6", leader: "#ec4899" };
  const mockDepts = MOCK_DEPARTMENTS.map(d => d.name);
  const mockComites = ["Comité d'organisation", "Service d'ordre", "Équipe média", "Secrétariat"];
  const mockGroups = ["Groupe Alpha", "Groupe Béthel", "Groupe Cana"];

  const filtered = members.filter(m => {
    const matchSearch = `${m.first_name} ${m.last_name}`.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || m.status === filter || m.parcours === filter;
    const matchDept = deptFilter === "all" || (m.departments||[]).includes(deptFilter);
    return matchSearch && matchFilter && matchDept;
  });

  const statusOptions = ["actif", "passif", "sympathisant", "nouveau_converti"];
  const openNew = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (m) => { setEditing(m); setForm({ ...emptyForm, ...m, departments: m.departments||[], committees: m.committees||[], groups: m.groups||[] }); setShowModal(true); };

  const handleSave = async () => {
    const payload = { ...form, id: editing?.id || Date.now(), join_date: editing?.join_date || new Date().toISOString().split("T")[0], role: editing?.role || "membre" };
    const saved = await saveMember(payload);
    const final = { ...payload, ...saved };
    if (editing) {
      setMembers(prev => prev.map(m => m.id === editing.id ? final : m));
    } else {
      setMembers(prev => [...prev, final]);
      setNotification(`✅ ${form.first_name} ${form.last_name} a été ajouté(e) avec succès !`);
      setTimeout(() => setNotification(null), 4000);
    }
    setShowModal(false);
  };

  const canDelete = userRole === "pasteur" || userRole === "admin" || userRole === "super_admin";
  const handleDelete = async (id) => {
    if (!canDelete || !confirm("Supprimer ce membre ?")) return;
    await removeMember(id);
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const changeStatus = async (id, newStatus) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    await saveMember({ id, status: newStatus });
  };

  // Photo upload → base64
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Photo trop lourde (max 2 Mo)"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const toggleArray = (arr, value) => arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
  const statusColors = { actif: "success", passif: "warning", sympathisant: "info", nouveau_converti: "purple" };

  // Baptism badge mini component
  const BaptismBadge = ({ m }) => {
    if (!m.baptise) return null;
    const bt = BAPTEME_TYPES[m.bapteme_type] || BAPTEME_TYPES.eaux;
    return (
      <span title={`${bt.label}${m.date_bapteme ? " · " + new Date(m.date_bapteme).toLocaleDateString("fr") : ""}`}
        style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "1px 7px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: `${bt.color}15`, color: bt.color, border: `1px solid ${bt.color}30`, cursor: "default" }}>
        {bt.emoji} Baptisé{m.gender === "F" ? "e" : ""}
      </span>
    );
  };

  // Avatar with photo support
  const MemberAvatar = ({ m, size = 36 }) => {
    if (m.photo) return (
      <img src={m.photo} alt={m.first_name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
    );
    return <Avatar name={m.first_name} size={size} color={m.gender === "F" ? "#ec4899" : "#0d9488"} />;
  };

  return (
    <div>
      {/* Supabase sync indicator */}
      {synced && (
        <div style={{ padding: "8px 14px", background: "#f0fdfa", border: "1px solid #0d948830", borderRadius: 10, marginBottom: 12, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#0d9488", fontWeight: 600 }}>
          <span>🔄</span> Données synchronisées avec Supabase
        </div>
      )}

      {notification && (
        <div style={{ padding: "12px 20px", background: "#f0fdfa", border: "1px solid #0d948830", borderRadius: 12, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#0d9488" }}>{notification}</span>
          <button onClick={() => setNotification(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}><X size={14} /></button>
        </div>
      )}

      {/* ── STATS BAPTÊME ── */}
      {(() => {
        const total = members.length;
        const baptises = members.filter(m => m.baptise);
        const nonBaptises = members.filter(m => !m.baptise);
        const pct = total ? Math.round((baptises.length / total) * 100) : 0;
        return (
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #f1f5f9", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>💧 Baptêmes des eaux</h3>
              <button onClick={() => setFilter(filter === "baptise" ? "all" : "baptise")} style={{
                padding: "5px 14px", borderRadius: 8, border: "1px solid #3b82f640",
                background: filter === "baptise" ? "#3b82f6" : "#eff6ff",
                color: filter === "baptise" ? "#fff" : "#2563eb", fontSize: 11, fontWeight: 700, cursor: "pointer"
              }}>
                {filter === "baptise" ? "✓ Filtre actif" : "Voir les baptisés →"}
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 14 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>{baptises.length}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>baptisés</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 6 }}>
                  <span>{pct}% de l'église</span>
                  <span>{nonBaptises.length} non baptisés</span>
                </div>
                <div style={{ height: 10, background: "#f1f5f9", borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, borderRadius: 5, background: "linear-gradient(90deg, #3b82f6, #0d9488)", transition: "width 0.6s ease" }} />
                </div>
              </div>
            </div>

            {/* Derniers baptêmes */}
            {baptises.filter(m => m.date_bapteme).length > 0 && (
              <div style={{ paddingTop: 14, borderTop: "1px solid #f1f5f9" }}>
                <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Derniers baptêmes</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {baptises
                    .filter(m => m.date_bapteme)
                    .sort((a, b) => new Date(b.date_bapteme) - new Date(a.date_bapteme))
                    .slice(0, 3)
                    .map(m => (
                      <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <MemberAvatar m={m} size={28} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", flex: 1 }}>{m.first_name} {m.last_name}</span>
                        <span style={{ fontSize: 11, color: "#94a3b8" }}>{new Date(m.date_bapteme).toLocaleDateString("fr")}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Parcours member bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {parcoursSteps.map(p => {
          const count = members.filter(m => m.parcours === p).length;
          return (
            <div key={p} onClick={() => setFilter(filter === p ? "all" : p)} style={{
              padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600,
              background: filter === p ? `${parcoursColors[p]}15` : "#f8fafc",
              border: filter === p ? `1px solid ${parcoursColors[p]}40` : "1px solid #f1f5f9",
              color: filter === p ? parcoursColors[p] : "#64748b"
            }}>
              {parcoursLabels[p]} ({count})
            </div>
          );
        })}
        {/* Baptism filter shortcut */}
        <div onClick={() => setFilter(filter === "baptise" ? "all" : "baptise")} style={{
          padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600,
          background: filter === "baptise" ? "#3b82f615" : "#f8fafc",
          border: filter === "baptise" ? "1px solid #3b82f640" : "1px solid #f1f5f9",
          color: filter === "baptise" ? "#3b82f6" : "#64748b"
        }}>
          💧 Baptisés ({members.filter(m => m.baptise).length})
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Membres</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{members.length} membres · {filtered.length} affichés</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Btn variant="secondary" size="sm" icon={Download} onClick={() => {
            const csv = "\uFEFFN°,Prénom,Nom,Genre,Téléphone,Email,Départements,Comités,Groupes,Statut,Parcours,Baptisé,Date Baptême,Date inscription\n" + filtered.map((m,i) => `${i+1},${m.first_name},${m.last_name},${m.gender === "F" ? "Femme" : "Homme"},${m.phone},${m.email},"${(m.departments||[]).join(";")}","${(m.committees||[]).join(";")}","${(m.groups||[]).join(";")}",${m.status},${m.parcours||""},${m.baptise?"Oui":"Non"},${m.date_bapteme||""},${m.join_date}`).join("\n");
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `membres.csv`; a.click();
          }}>Excel/CSV</Btn>
          <Btn variant="secondary" size="sm" icon={Download} onClick={() => {
            const text = `LISTE DES MEMBRES — ${filtered.length} membres\n${"=".repeat(60)}\nDate: ${new Date().toLocaleDateString("fr")}\n${"─".repeat(60)}\n\n` + filtered.map((m,i) => `${String(i+1).padStart(3)}. ${m.first_name} ${m.last_name}${m.baptise ? " 💧" : ""}\n     Tél: ${m.phone} | Parcours: ${parcoursLabels[m.parcours]||""}\n     Dept: ${(m.departments||[]).join(", ")||"—"}\n`).join("\n");
            const blob = new Blob([text], { type: "text/plain" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `rapport_membres.txt`; a.click();
          }}>Rapport</Btn>
          <Btn icon={Plus} onClick={openNew}>Nouveau membre</Btn>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Search size={16} color="#94a3b8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un membre..."
            style={{ ...inputStyle, paddingLeft: 36 }} />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ ...selectStyle, width: 160 }}>
          <option value="all">Tous les statuts</option>
          <option value="actif">Actifs</option>
          <option value="passif">Passifs</option>
          <option value="sympathisant">Sympathisants</option>
          <option value="baptise">💧 Baptisés</option>
        </select>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} style={{ ...selectStyle, width: 180 }}>
          <option value="all">Tous les départements</option>
          {MOCK_DEPARTMENTS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
        </select>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: "#f8fafc" }}>
              {["Membre", "Contact", "Département", "Badges", "Statut", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.filter(m => filter === "baptise" ? m.baptise : true).map(m => (
                <tr key={m.id} style={{ borderTop: "1px solid #f1f5f9" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafbfc"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <MemberAvatar m={m} size={38} />
                      <div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{m.first_name} {m.last_name}</p>
                        <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>Depuis {new Date(m.join_date).toLocaleDateString("fr")} · {parcoursLabels[m.parcours] || ""}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontSize: 12, color: "#475569" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Phone size={11} />{m.phone}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}><Mail size={11} />{m.email}</div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {(m.departments||[m.department]).filter(Boolean).map((d,i) => <Badge key={i} variant="purple">{d}</Badge>)}
                      {!(m.departments||[m.department]).filter(Boolean).length && <span style={{ color: "#94a3b8", fontSize: 12 }}>—</span>}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <BaptismBadge m={m} />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <select value={m.status} onChange={e => changeStatus(m.id, e.target.value)} style={{ ...selectStyle, width: 130, fontSize: 11, padding: "4px 8px" }}>
                      {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Btn variant="ghost" size="sm" icon={Edit} onClick={() => openEdit(m)} />
                      {canDelete && <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => handleDelete(m.id)} />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <EmptyState icon={Users} title="Aucun membre trouvé" description="Modifiez vos critères de recherche" />}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#94a3b8" }}>
          <span>{filtered.length} membre{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}</span>
          <span>Actifs: {members.filter(m => m.status === "actif").length} · Baptisés: {members.filter(m => m.baptise).length} 💧</span>
        </div>
      </div>

      {/* ── MODAL NOUVEAU/MODIFIER MEMBRE ── */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? "Modifier le membre" : "Nouveau membre"} width={620}>

        {/* Photo de profil */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: 16, background: "#f8fafc", borderRadius: 12 }}>
          <div style={{ position: "relative" }}>
            {form.photo
              ? <img src={form.photo} alt="Photo" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "3px solid #0d9488" }} />
              : <div style={{ width: 72, height: 72, borderRadius: "50%", background: form.gender === "F" ? "#ec489920" : "#0d948820", border: "3px dashed #d1d5db", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                  {form.gender === "F" ? "👩" : "👨"}
                </div>
            }
          </div>
          <div>
            <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Photo de profil</p>
            <p style={{ margin: "0 0 8px", fontSize: 11, color: "#94a3b8" }}>JPG, PNG · max 2 Mo</p>
            <div style={{ display: "flex", gap: 6 }}>
              <label style={{ padding: "6px 12px", borderRadius: 8, background: "#0d9488", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                📷 Choisir une photo
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
              </label>
              {form.photo && <Btn variant="secondary" size="sm" onClick={() => setForm(f => ({ ...f, photo: null }))}>Supprimer</Btn>}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormField label="Prénom *"><input style={inputStyle} value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} /></FormField>
          <FormField label="Nom *"><input style={inputStyle} value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} /></FormField>
          <FormField label="Genre">
            <select style={selectStyle} value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
              <option value="M">Homme</option><option value="F">Femme</option>
            </select>
          </FormField>
          <FormField label="Catégorie">
            <select style={selectStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="homme">Homme</option><option value="femme">Femme</option><option value="jeune">Jeune</option><option value="enfant">Enfant</option>
            </select>
          </FormField>
          <FormField label="Téléphone"><input style={inputStyle} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></FormField>
          <FormField label="Email"><input style={inputStyle} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></FormField>
          <FormField label="Date de naissance"><input style={inputStyle} type="date" value={form.birth_date} onChange={e => setForm({ ...form, birth_date: e.target.value })} /></FormField>
          <FormField label="Parcours membre">
            <select style={selectStyle} value={form.parcours} onChange={e => setForm({ ...form, parcours: e.target.value })}>
              {parcoursSteps.map(p => <option key={p} value={p}>{parcoursLabels[p]}</option>)}
            </select>
          </FormField>
        </div>

        {/* ── SECTION BAPTÊME ── */}
        <div style={{ marginTop: 16, padding: 16, background: "#eff6ff", borderRadius: 12, border: "1px solid #bfdbfe" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: form.baptise ? 14 : 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>💧</span>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Baptême des eaux</p>
                <p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>Marquer ce membre comme baptisé</p>
              </div>
            </div>
            <div onClick={() => setForm(f => ({ ...f, baptise: !f.baptise, bapteme_type: "eaux" }))} style={{
              width: 44, height: 24, borderRadius: 12, padding: 3, cursor: "pointer", transition: "all 0.2s",
              background: form.baptise ? "#3b82f6" : "#e2e8f0", display: "flex", alignItems: "center",
              justifyContent: form.baptise ? "flex-end" : "flex-start"
            }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
            </div>
          </div>
          {form.baptise && (
            <FormField label="Date du baptême">
              <input style={inputStyle} type="date" value={form.date_bapteme} onChange={e => setForm({ ...form, date_bapteme: e.target.value })} />
            </FormField>
          )}
        </div>

        {/* Multi-select departments */}
        <div style={{ marginTop: 12, padding: 16, background: "#f8fafc", borderRadius: 12 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Départements (plusieurs possibles)</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {mockDepts.map(d => (
              <label key={d} onClick={() => setForm({...form, departments: toggleArray(form.departments||[], d)})} style={{
                padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600,
                background: (form.departments||[]).includes(d) ? "#0d948815" : "#fff",
                border: (form.departments||[]).includes(d) ? "1px solid #0d948840" : "1px solid #e2e8f0",
                color: (form.departments||[]).includes(d) ? "#0d9488" : "#94a3b8"
              }}>{(form.departments||[]).includes(d) ? "✓ " : ""}{d}</label>
            ))}
          </div>
        </div>

        {/* Multi-select committees */}
        <div style={{ marginTop: 10, padding: 16, background: "#f8fafc", borderRadius: 12 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Comités</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {mockComites.map(c => (
              <label key={c} onClick={() => setForm({...form, committees: toggleArray(form.committees||[], c)})} style={{
                padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600,
                background: (form.committees||[]).includes(c) ? "#8b5cf615" : "#fff",
                border: (form.committees||[]).includes(c) ? "1px solid #8b5cf640" : "1px solid #e2e8f0",
                color: (form.committees||[]).includes(c) ? "#8b5cf6" : "#94a3b8"
              }}>{(form.committees||[]).includes(c) ? "✓ " : ""}{c}</label>
            ))}
          </div>
        </div>

        {/* Multi-select groups */}
        <div style={{ marginTop: 10, padding: 16, background: "#f8fafc", borderRadius: 12 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Groupes</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {mockGroups.map(g => (
              <label key={g} onClick={() => setForm({...form, groups: toggleArray(form.groups||[], g)})} style={{
                padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600,
                background: (form.groups||[]).includes(g) ? "#3b82f615" : "#fff",
                border: (form.groups||[]).includes(g) ? "1px solid #3b82f640" : "1px solid #e2e8f0",
                color: (form.groups||[]).includes(g) ? "#3b82f6" : "#94a3b8"
              }}>{(form.groups||[]).includes(g) ? "✓ " : ""}{g}</label>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={handleSave} disabled={!form.first_name || !form.last_name}>{editing ? "Enregistrer" : "Ajouter"}</Btn>
        </div>
      </Modal>
    </div>
  );
};

// VISITORS PAGE
const VisitorsPage = () => {
  const [visitors, setVisitors] = useState(MOCK_VISITORS.map(v => ({...v, email: "", address: "", followups: [], status: v.status || "nouveau" })));
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [showFollowup, setShowFollowup] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ first_name: "", last_name: "", phone: "", email: "", address: "", source: "", notes: "" });
  const [followForm, setFollowForm] = useState({ type: "Appel téléphonique", notes: "", next_date: "" });
  const statusMap = { nouveau: { label: "Nouveau", variant: "info" }, suivi: { label: "En suivi", variant: "warning" }, regulier: { label: "Régulier", variant: "purple" }, converti: { label: "Converti", variant: "success" } };
  const statusFlow = ["nouveau", "suivi", "regulier", "converti"];

  const handleSave = () => {
    if (editing) { setVisitors(prev => prev.map(v => v.id === editing.id ? {...v, ...form} : v)); }
    else { setVisitors(prev => [...prev, { ...form, id: Date.now(), visit_date: new Date().toISOString().split("T")[0], status: "nouveau", followups: [] }]); }
    setShowModal(false); setEditing(null);
  };
  const addFollowup = () => {
    if (!showDetail) return;
    setVisitors(prev => prev.map(v => v.id === showDetail.id ? {...v, followups: [...(v.followups||[]), { ...followForm, date: new Date().toISOString().split("T")[0], id: Date.now() }]} : v));
    setShowDetail(prev => ({...prev, followups: [...(prev.followups||[]), { ...followForm, date: new Date().toISOString().split("T")[0], id: Date.now() }]}));
    setShowFollowup(false); setFollowForm({ type: "Appel téléphonique", notes: "", next_date: "" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Fiche Visiteur et Suivi</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{visitors.length} visiteurs · {visitors.filter(v=>v.status==="converti").length} convertis</p></div>
        <Btn icon={Plus} onClick={() => { setEditing(null); setForm({ first_name: "", last_name: "", phone: "", email: "", address: "", source: "", notes: "" }); setShowModal(true); }}>Nouveau visiteur</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: showDetail ? "1fr 1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {visitors.map(v => (
            <div key={v.id} onClick={() => setShowDetail(v)} style={{ background: "#fff", borderRadius: 14, padding: 18, border: showDetail?.id === v.id ? "2px solid #0d9488" : "1px solid #f1f5f9", cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={v.first_name} size={36} color="#3b82f6" />
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{v.first_name} {v.last_name}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{v.phone} · {new Date(v.visit_date).toLocaleDateString("fr")}</p>
                  </div>
                </div>
                <Badge variant={statusMap[v.status]?.variant}>{statusMap[v.status]?.label}</Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {showDetail && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", padding: 24, position: "sticky", top: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name={showDetail.first_name} size={48} color="#3b82f6" />
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{showDetail.first_name} {showDetail.last_name}</h3>
                  <Badge variant={statusMap[showDetail.status]?.variant}>{statusMap[showDetail.status]?.label}</Badge>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <Btn variant="ghost" size="sm" icon={Edit} onClick={() => { setEditing(showDetail); setForm({...showDetail}); setShowModal(true); }} />
                <Btn variant="ghost" size="sm" icon={X} onClick={() => setShowDetail(null)} />
              </div>
            </div>

            {/* Status change */}
            <FormField label="Changer le statut">
              <select style={selectStyle} value={showDetail.status} onChange={e => { const ns = e.target.value; setVisitors(prev => prev.map(v => v.id === showDetail.id ? {...v, status: ns} : v)); setShowDetail(prev => ({...prev, status: ns})); }}>
                {statusFlow.map(s => <option key={s} value={s}>{statusMap[s]?.label}</option>)}
              </select>
            </FormField>
            <p style={{ fontSize: 10, color: "#94a3b8", margin: "-8px 0 12px" }}>Nouveau → En suivi → Régulier → Converti</p>

            {/* Infos */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, padding: 14, background: "#f8fafc", borderRadius: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#475569" }}><Phone size={12} />{showDetail.phone || "—"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#475569" }}><Mail size={12} />{showDetail.email || "—"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#475569" }}><MapPin size={12} />{showDetail.address || "—"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#475569" }}><Calendar size={12} />Première visite : {showDetail.visit_date ? new Date(showDetail.visit_date).toLocaleDateString("fr") : "Inconnue"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#475569" }}><Users size={12} />Source : {showDetail.source || "—"}</div>
            </div>
            {showDetail.notes && <p style={{ padding: 12, background: "#fffbeb", borderRadius: 8, fontSize: 12, color: "#92400e", margin: "0 0 16px" }}>📝 {showDetail.notes}</p>}

            {/* Followup history */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Historique de suivi ({(showDetail.followups||[]).length})</h4>
              <Btn size="sm" icon={Plus} onClick={() => setShowFollowup(true)}>Ajouter</Btn>
            </div>
            {(showDetail.followups||[]).length === 0 && <p style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>Aucune action de suivi enregistrée</p>}
            {(showDetail.followups||[]).map(f => (
              <div key={f.id} style={{ padding: 10, borderLeft: "3px solid #0d9488", background: "#f8fafc", borderRadius: "0 8px 8px 0", marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                  <span style={{ fontWeight: 700, color: "#0d9488" }}>{f.type}</span>
                  <span style={{ color: "#94a3b8" }}>{f.date}</span>
                </div>
                {f.notes && <p style={{ margin: "4px 0 0", fontSize: 11, color: "#475569" }}>{f.notes}</p>}
                {f.next_date && <p style={{ margin: "2px 0 0", fontSize: 10, color: "#f59e0b" }}>Prochaine action : {f.next_date}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New/Edit visitor modal */}
      <Modal open={showModal} onClose={() => { setShowModal(false); setEditing(null); }} title={editing ? "Modifier le visiteur" : "Nouveau visiteur"}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormField label="Prénom *"><input style={inputStyle} value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} /></FormField>
          <FormField label="Nom *"><input style={inputStyle} value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} /></FormField>
          <FormField label="Téléphone"><input style={inputStyle} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></FormField>
          <FormField label="Email"><input style={inputStyle} value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></FormField>
        </div>
        <FormField label="Adresse"><input style={inputStyle} value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></FormField>
        <FormField label="Source / Comment nous a-t-il connu ?">
          <select style={selectStyle} value={form.source} onChange={e => setForm({...form, source: e.target.value})}>
            <option value="">— Sélectionner —</option>
            <option value="Bouche à oreille">Bouche à oreille</option>
            <option value="Invitation d'un membre">Invitation d'un membre</option>
            <option value="Réseaux sociaux">Réseaux sociaux</option>
            <option value="Événement">Événement</option>
            <option value="Passage devant l'église">Passage devant l'église</option>
            <option value="Autre">Autre</option>
          </select>
        </FormField>
        <FormField label="Notes"><textarea style={{...inputStyle, minHeight: 60, resize: "vertical"}} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => { setShowModal(false); setEditing(null); }}>Annuler</Btn>
          <Btn onClick={handleSave}>{editing ? "Enregistrer" : "Ajouter"}</Btn>
        </div>
      </Modal>

      {/* Followup modal */}
      <Modal open={showFollowup} onClose={() => setShowFollowup(false)} title="Ajouter une action de suivi">
        <FormField label="Type d'action">
          <select style={selectStyle} value={followForm.type} onChange={e => setFollowForm({...followForm, type: e.target.value})}>
            <option>Appel téléphonique</option><option>Visite à domicile</option><option>Email</option><option>SMS</option><option>WhatsApp</option>
          </select>
        </FormField>
        <FormField label="Notes / Commentaires"><textarea style={{...inputStyle, minHeight: 60, resize: "vertical"}} value={followForm.notes} onChange={e => setFollowForm({...followForm, notes: e.target.value})} /></FormField>
        <FormField label="Prochaine action prévue (optionnel)"><input style={inputStyle} type="date" value={followForm.next_date} onChange={e => setFollowForm({...followForm, next_date: e.target.value})} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowFollowup(false)}>Annuler</Btn>
          <Btn onClick={addFollowup}>Enregistrer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// FINANCES PAGE
const FinancesPage = () => {
  const [tab, setTab] = useState("overview");
  const [period, setPeriod] = useState("month");
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState(MOCK_FINANCES);
  const [form, setForm] = useState({ type: "entree", category: "dimes", subcategory: "", amount: "", description: "", method: "especes" });

  const totalEntrees = transactions.filter(t => t.type === "entree").reduce((s, t) => s + t.amount, 0);
  const totalSorties = transactions.filter(t => t.type === "sortie").reduce((s, t) => s + t.amount, 0);
  const solde = totalEntrees - totalSorties;

  const categoryLabels = {
    dimes: "Dîmes", offrandes_culte: "Offrandes culte", offrandes_speciales: "Offrandes spéciales",
    dons: "Dons", loyer: "Loyer", electricite_eau: "Électricité/Eau", salaires: "Salaires",
    equipements: "Équipements", quete: "Quête", transport: "Transport", entretien: "Entretien",
    fournitures: "Fournitures", oeuvres_sociales: "Œuvres sociales", construction: "Construction",
    projet_special: "Projet spécial", communication: "Communication", autres_depenses: "Autres"
  };
  const subcategories = {
    construction: ["Terrain", "Fondation", "Murs", "Toiture", "Finition", "Peinture"],
    equipements: ["Sonorisation", "Instruments", "Mobilier", "Informatique", "Véhicule"],
    projet_special: ["Évangélisation", "Camp de jeunes", "Convention", "Mission"],
  };

  const periodLabels = { day: "Aujourd'hui", week: "Cette semaine", month: "Ce mois", year: "Cette année" };

  const handleSave = () => {
    setTransactions(prev => [...prev, { ...form, id: Date.now(), amount: parseInt(form.amount) || 0, date: new Date().toISOString().split("T")[0] }]);
    setShowModal(false);
    setForm({ type: "entree", category: "dimes", subcategory: "", amount: "", description: "", method: "especes" });
  };

  const exportCSV = () => {
    const csv = "\uFEFFDate,Type,Catégorie,Sous-catégorie,Description,Montant,Méthode\n" + transactions.map(t => `${t.date},${t.type},${categoryLabels[t.category]||t.category},${t.subcategory||""},${t.description||""},${t.amount},${t.method||""}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `finances_${period}.csv`; a.click();
  };

  const exportReport = () => {
    const text = `RAPPORT FINANCIER — ${periodLabels[period]}\n${"=".repeat(55)}\nDate: ${new Date().toLocaleDateString("fr")}\n\nRÉSUMÉ\n${"─".repeat(40)}\n  Entrées:  ${totalEntrees.toLocaleString()} FCFA\n  Sorties:  ${totalSorties.toLocaleString()} FCFA\n  Solde:    ${solde.toLocaleString()} FCFA\n\nDÉTAIL DES TRANSACTIONS\n${"─".repeat(55)}\n` + transactions.map((t,i) => `${i+1}. [${t.type.toUpperCase()}] ${categoryLabels[t.category]||t.category} — ${t.amount.toLocaleString()} F\n   ${t.description || "—"} | ${t.date}`).join("\n") + `\n\n${"─".repeat(55)}\nTotal: ${transactions.length} transactions`;
    const blob = new Blob([text], { type: "text/plain" }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `rapport_finances.txt`; a.click();
  };

  const pieData = useMemo(() => {
    const cats = {};
    transactions.filter(t => t.type === "entree").forEach(t => {
      cats[t.category] = (cats[t.category] || 0) + t.amount;
    });
    return Object.entries(cats).map(([k, v], i) => ({ name: categoryLabels[k] || k, value: v, color: COLORS_CHART[i % COLORS_CHART.length] }));
  }, [transactions]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Finances</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Trésorerie — {periodLabels[period]}</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 3, background: "#f1f5f9", borderRadius: 10, padding: 3 }}>
            {[{k:"day",l:"Jour"},{k:"week",l:"Sem."},{k:"month",l:"Mois"},{k:"year",l:"Année"}].map(p => (
              <button key={p.k} onClick={() => setPeriod(p.k)} style={{
                padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600,
                background: period === p.k ? "#fff" : "transparent", color: period === p.k ? "#0f172a" : "#64748b",
                boxShadow: period === p.k ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
              }}>{p.l}</button>
            ))}
          </div>
          <Btn variant="secondary" size="sm" icon={Download} onClick={exportCSV}>Excel</Btn>
          <Btn variant="secondary" size="sm" icon={Download} onClick={exportReport}>Rapport</Btn>
          <Btn icon={Plus} onClick={() => setShowModal(true)}>Nouvelle transaction</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard icon={ArrowUpCircle} title="Total Entrées" value={`${totalEntrees.toLocaleString()} F`} color="#10b981" />
        <StatCard icon={ArrowDownCircle} title="Total Sorties" value={`${totalSorties.toLocaleString()} F`} color="#ef4444" />
        <StatCard icon={Wallet} title="Solde" value={`${solde.toLocaleString()} F`} color={solde >= 0 ? "#0d9488" : "#ef4444"} />
      </div>

      <TabBar tabs={[
        { key: "overview", label: "Vue d'ensemble" },
        { key: "transactions", label: "Transactions" },
      ]} active={tab} onChange={setTab} />

      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 20px" }}>Évolution mensuelle</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={FINANCE_CHART}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickFormatter={v => `${v/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "none", fontSize: 12 }} formatter={v => `${v.toLocaleString()} F`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="entrees" name="Entrées" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="sorties" name="Sorties" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 20px" }}>Répartition des entrées</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, border: "none", fontSize: 12 }} formatter={v => `${v.toLocaleString()} F`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              {pieData.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: d.color }} />
                    <span style={{ color: "#475569" }}>{d.name}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>{d.value.toLocaleString()} F</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "transactions" && (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Date", "Type", "Catégorie", "Description", "Montant", "Méthode"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).map(t => (
                <tr key={t.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569" }}>{new Date(t.date).toLocaleDateString("fr")}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <Badge variant={t.type === "entree" ? "success" : "danger"}>{t.type === "entree" ? "Entrée" : "Sortie"}</Badge>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569" }}>{categoryLabels[t.category] || t.category}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#475569" }}>{t.description}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: t.type === "entree" ? "#10b981" : "#ef4444" }}>
                    {t.type === "entree" ? "+" : "-"}{t.amount.toLocaleString()} F
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#94a3b8" }}>{t.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouvelle transaction">
        <FormField label="Type">
          <select style={selectStyle} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option value="entree">Entrée</option><option value="sortie">Sortie</option>
          </select>
        </FormField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormField label="Catégorie">
            <select style={selectStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value, subcategory: "" })}>
              {form.type === "entree" ? (
                <>
                  <option value="dimes">Dîmes</option><option value="offrandes_culte">Offrandes culte</option>
                  <option value="offrandes_speciales">Offrandes spéciales</option><option value="dons">Dons</option>
                  <option value="quete">Quête</option><option value="projet_special">Projet spécial</option>
                </>
              ) : (
                <>
                  <option value="loyer">Loyer</option><option value="electricite_eau">Électricité/Eau</option>
                  <option value="salaires">Salaires</option><option value="equipements">Équipements</option>
                  <option value="construction">Construction</option><option value="transport">Transport</option>
                  <option value="entretien">Entretien</option><option value="fournitures">Fournitures</option>
                  <option value="communication">Communication</option><option value="oeuvres_sociales">Œuvres sociales</option>
                  <option value="projet_special">Projet spécial</option><option value="autres_depenses">Autres</option>
                </>
              )}
            </select>
          </FormField>
          <FormField label="Montant (F CFA) *">
            <input style={inputStyle} type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
          </FormField>
        </div>
        {subcategories[form.category] && (
          <FormField label="Sous-catégorie">
            <select style={selectStyle} value={form.subcategory} onChange={e => setForm({ ...form, subcategory: e.target.value })}>
              <option value="">— Sélectionner —</option>
              {subcategories[form.category].map(sc => <option key={sc} value={sc}>{sc}</option>)}
            </select>
          </FormField>
        )}
        <FormField label="Description"><input style={inputStyle} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></FormField>
        <FormField label="Mode de paiement">
          <select style={selectStyle} value={form.method} onChange={e => setForm({ ...form, method: e.target.value })}>
            <option value="especes">Espèces</option><option value="mobile_money">Mobile Money</option>
            <option value="virement">Virement</option><option value="cheque">Chèque</option>
          </select>
        </FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={handleSave}>Enregistrer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// EVENTS / AGENDA PAGE
const AgendaPage = () => {
  const [events, setEvents] = useState([...MOCK_EVENTS.map(e => ({...e, scope: "eglise"})),
    { id: 901, title: "RDV Pasteur Bamba", date: "2026-03-25", time: "10:00", type: "evenement", location: "Bureau", scope: "pasteur", description: "Discussion partenariat" },
    { id: 902, title: "Invitation conférence Bouaké", date: "2026-03-28", time: "08:00", type: "evenement", location: "Bouaké", scope: "pasteur", description: "" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("calendar");
  const [agendaScope, setAgendaScope] = useState("eglise");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1));
  const [selectedDate, setSelectedDate] = useState("2026-03-21");
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({ title: "", date: "", time: "", type: "culte", location: "", description: "", scope: "eglise" });
  const typeColors = { culte: "#0d9488", priere: "#3b82f6", etude: "#8b5cf6", repetition: "#f59e0b", evenement: "#ec4899" };
  const typeLabels = { culte: "Culte", priere: "Prière", etude: "Étude", repetition: "Répétition", evenement: "Événement" };
  const typeIcons = { culte: "⛪", priere: "🙏", etude: "📖", repetition: "🎵", evenement: "🎉" };
  const MONTHS_FULL = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const weekDayHeaders = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
  const todayStr = "2026-03-21";

  // Filter events by scope
  const scopedEvents = events.filter(e => e.scope === agendaScope);

  const handleSave = () => {
    if (editingEvent) {
      setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? { ...ev, ...form } : ev));
    } else {
      setEvents(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setShowModal(false); setEditingEvent(null);
    setForm({ title: "", date: "", time: "", type: "culte", location: "", description: "", scope: agendaScope });
  };
  const handleDelete = (id) => { if(confirm("Supprimer cet événement ?")) setEvents(prev => prev.filter(ev => ev.id !== id)); };
  const openNewOnDate = (d) => { setEditingEvent(null); setForm({ title:"", date:d, time:"09:00", type:"culte", location:"", description:"", scope: agendaScope }); setShowModal(true); };
  const openEdit = (ev) => { setEditingEvent(ev); setForm({ title:ev.title, date:ev.date, time:ev.time, type:ev.type, location:ev.location, description:ev.description||"", scope: ev.scope||"eglise" }); setShowModal(true); };

  const calendarCells = useMemo(() => {
    const y = currentMonth.getFullYear(), m = currentMonth.getMonth();
    const first = new Date(y, m, 1), last = new Date(y, m+1, 0);
    const startOff = first.getDay() === 0 ? 6 : first.getDay() - 1;
    const prevLast = new Date(y, m, 0).getDate();
    const cells = [];
    for (let i = startOff-1; i >= 0; i--) { const dd = new Date(y, m-1, prevLast-i); cells.push({ day: prevLast-i, dateStr: dd.toISOString().split("T")[0], cur: false }); }
    for (let d = 1; d <= last.getDate(); d++) { const dd = new Date(y, m, d); cells.push({ day: d, dateStr: dd.toISOString().split("T")[0], cur: true }); }
    const rem = 42 - cells.length;
    for (let d = 1; d <= rem; d++) { const dd = new Date(y, m+1, d); cells.push({ day: d, dateStr: dd.toISOString().split("T")[0], cur: false }); }
    return cells;
  }, [currentMonth]);

  const evMap = useMemo(() => { const m = {}; scopedEvents.forEach(e => { if(!m[e.date]) m[e.date]=[]; m[e.date].push(e); }); return m; }, [scopedEvents]);

  const grouped = useMemo(() => {
    const sorted = [...scopedEvents].sort((a,b) => new Date(a.date)-new Date(b.date));
    const g = {}; sorted.forEach(e => { const d = new Date(e.date); const k = `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]}`; if(!g[k]) g[k]=[]; g[k].push(e); }); return g;
  }, [scopedEvents]);

  const goP = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()-1, 1));
  const goN = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1, 1));
  const selectedEvts = selectedDate ? (evMap[selectedDate] || []) : [];

  return (
    <div>
      {/* Scope tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[{key:"eglise", label:"⛪ Agenda Église", desc:"Visible par tous"}, {key:"pasteur", label:"🔒 Agenda Pasteur", desc:"RDVs, invitations, privé"}].map(s => (
          <div key={s.key} onClick={() => setAgendaScope(s.key)} style={{
            padding: "10px 18px", borderRadius: 12, cursor: "pointer", flex: 1, textAlign: "center",
            background: agendaScope === s.key ? (s.key === "pasteur" ? "#eff6ff" : "#f0fdfa") : "#fafbfc",
            border: agendaScope === s.key ? (s.key === "pasteur" ? "2px solid #3b82f6" : "2px solid #0d9488") : "1px solid #f1f5f9"
          }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: agendaScope === s.key ? "#0f172a" : "#94a3b8" }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: 10, color: "#94a3b8" }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:800, color:"#0f172a", margin:0 }}>{agendaScope === "pasteur" ? "Agenda Pasteur" : "Agenda Église"}</h2>
          <p style={{ fontSize:13, color:"#94a3b8", margin:"4px 0 0" }}>{scopedEvents.length} événements</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ display:"flex", background:"#f1f5f9", borderRadius:10, padding:3 }}>
            {[{k:"calendar",l:"Calendrier",i:Calendar},{k:"list",l:"Liste",i:Layers}].map(v=>(
              <button key={v.k} onClick={()=>setViewMode(v.k)} style={{
                padding:"7px 14px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
                background:viewMode===v.k?"#fff":"transparent", color:viewMode===v.k?"#0f172a":"#64748b",
                boxShadow:viewMode===v.k?"0 1px 3px rgba(0,0,0,0.08)":"none", display:"flex", alignItems:"center", gap:5, transition:"all 0.15s"
              }}><v.i size={14}/>{v.l}</button>
            ))}
          </div>
          <Btn icon={Plus} onClick={()=>openNewOnDate(todayStr)}>Nouvel événement</Btn>
        </div>
      </div>

      {/* LEGEND */}
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {Object.entries(typeLabels).map(([k,v])=>(
          <div key={k} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:20, background:`${typeColors[k]}10`, fontSize:11, fontWeight:600, color:typeColors[k] }}>
            <span>{typeIcons[k]}</span>{v}
          </div>
        ))}
      </div>

      {/* ═══ CALENDAR VIEW ═══ */}
      {viewMode === "calendar" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>
          <div style={{ background:"#fff", borderRadius:18, border:"1px solid #f1f5f9", overflow:"hidden" }}>
            {/* Month nav */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 24px", borderBottom:"1px solid #f1f5f9" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <button onClick={goP} style={{ width:34,height:34,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}><ChevronLeft size={16} color="#475569"/></button>
                <h3 style={{ margin:0, fontSize:17, fontWeight:800, color:"#0f172a", minWidth:180, textAlign:"center" }}>{MONTHS_FULL[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                <button onClick={goN} style={{ width:34,height:34,borderRadius:10,border:"1px solid #e2e8f0",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}><ChevronRight size={16} color="#475569"/></button>
              </div>
              <button onClick={()=>{setCurrentMonth(new Date(2026,2,1));setSelectedDate(todayStr);}} style={{ padding:"6px 14px",borderRadius:8,border:"1px solid #e2e8f0",background:"#fff",fontSize:12,fontWeight:600,color:"#0d9488",cursor:"pointer" }}>Aujourd'hui</button>
            </div>
            {/* Weekday headers */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", borderBottom:"1px solid #f1f5f9" }}>
              {weekDayHeaders.map((d,i)=>(
                <div key={d} style={{ padding:"10px 0",textAlign:"center",fontSize:11,fontWeight:700,color:i>=5?"#ef4444":"#94a3b8",textTransform:"uppercase",letterSpacing:"0.8px" }}>{d}</div>
              ))}
            </div>
            {/* Grid */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
              {calendarCells.map((cell,idx)=>{
                const dayEvts = evMap[cell.dateStr]||[];
                const isToday = cell.dateStr===todayStr;
                const isSel = cell.dateStr===selectedDate;
                const isWknd = idx%7>=5;
                return(
                  <div key={idx} onClick={()=>setSelectedDate(cell.dateStr)} onDoubleClick={()=>openNewOnDate(cell.dateStr)} style={{
                    minHeight:88, padding:"6px 8px", cursor:"pointer",
                    borderRight:(idx+1)%7!==0?"1px solid #f8fafc":"none",
                    borderBottom:idx<35?"1px solid #f8fafc":"none",
                    background:isSel?"#f0fdfa":isToday?"#fefce8":isWknd&&cell.cur?"#fafbfc":"transparent",
                    transition:"background 0.15s", opacity:cell.cur?1:0.3
                  }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                      <span style={{
                        fontSize:12, fontWeight:isToday?800:600,
                        color:isToday?"#fff":isSel?"#0d9488":"#0f172a",
                        width:isToday?24:"auto", height:isToday?24:"auto",
                        borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                        background:isToday?"linear-gradient(135deg,#0d9488,#10b981)":"transparent"
                      }}>{cell.day}</span>
                      {dayEvts.length>0&&!isToday&&<span style={{width:6,height:6,borderRadius:"50%",background:typeColors[dayEvts[0].type]||"#94a3b8"}}/>}
                    </div>
                    {dayEvts.slice(0,2).map(ev=>(
                      <div key={ev.id} style={{
                        padding:"2px 6px",borderRadius:4,marginBottom:2,
                        background:`${typeColors[ev.type]}18`,fontSize:10,fontWeight:600,
                        color:typeColors[ev.type],whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",lineHeight:"16px"
                      }}>{ev.time?.slice(0,5)} {ev.title}</div>
                    ))}
                    {dayEvts.length>2&&<div style={{fontSize:9,fontWeight:700,color:"#94a3b8",paddingLeft:4}}>+{dayEvts.length-2} de plus</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {/* Selected day events */}
            <div style={{ background:"#fff", borderRadius:16, padding:22, border:"1px solid #f1f5f9" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <h3 style={{ margin:0, fontSize:15, fontWeight:700, color:"#0f172a" }}>
                  {selectedDate?(()=>{const d=new Date(selectedDate);return`${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FULL[d.getMonth()]}`;})():"Sélectionnez un jour"}
                </h3>
                {selectedDate&&<button onClick={()=>openNewOnDate(selectedDate)} style={{
                  width:30,height:30,borderRadius:8,border:"1px solid #e2e8f0",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"
                }}><Plus size={14} color="#0d9488"/></button>}
              </div>

              {selectedDate && selectedEvts.length===0 && (
                <div style={{ textAlign:"center", padding:"24px 12px" }}>
                  <div style={{ width:48,height:48,borderRadius:14,background:"#f1f5f9",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",fontSize:22 }}>📭</div>
                  <p style={{ fontSize:13,fontWeight:600,color:"#64748b",margin:"0 0 4px" }}>Aucun événement</p>
                  <p style={{ fontSize:11,color:"#94a3b8",margin:"0 0 12px" }}>Double-cliquez sur un jour pour ajouter</p>
                  <Btn size="sm" icon={Plus} onClick={()=>openNewOnDate(selectedDate)}>Ajouter</Btn>
                </div>
              )}

              {selectedEvts.length>0 && (
                <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                  {selectedEvts.sort((a,b)=>(a.time||"").localeCompare(b.time||"")).map(ev=>(
                    <div key={ev.id} style={{
                      padding:"12px 14px",borderRadius:12,border:"1px solid #f1f5f9",borderLeft:`4px solid ${typeColors[ev.type]}`,background:"#fafbfc",transition:"all 0.15s"
                    }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:4 }}>
                            <span style={{fontSize:14}}>{typeIcons[ev.type]}</span>
                            <span style={{fontSize:13,fontWeight:700,color:"#0f172a"}}>{ev.title}</span>
                          </div>
                          <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#64748b" }}><Clock size={11}/>{ev.time||"—"}</div>
                          <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#64748b",marginTop:2 }}><MapPin size={11}/>{ev.location||"Non défini"}</div>
                        </div>
                        <div style={{ display:"flex",gap:2 }}>
                          <button onClick={()=>openEdit(ev)} style={{width:26,height:26,borderRadius:6,border:"none",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Edit size={12} color="#64748b"/></button>
                          <button onClick={()=>handleDelete(ev.id)} style={{width:26,height:26,borderRadius:6,border:"none",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Trash2 size={12} color="#ef4444"/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!selectedDate&&(
                <div style={{textAlign:"center",padding:"28px 12px"}}>
                  <div style={{width:48,height:48,borderRadius:14,background:"#f1f5f9",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",fontSize:22}}>👈</div>
                  <p style={{fontSize:13,fontWeight:600,color:"#64748b",margin:0}}>Cliquez sur un jour</p>
                  <p style={{fontSize:12,color:"#94a3b8",margin:"4px 0 0"}}>pour voir ou ajouter des événements</p>
                </div>
              )}
            </div>

            {/* Month summary */}
            <div style={{ background:"#fff",borderRadius:16,padding:22,border:"1px solid #f1f5f9" }}>
              <h4 style={{ margin:"0 0 14px",fontSize:13,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px" }}>Ce mois</h4>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {Object.entries(typeLabels).map(([k,v])=>{
                  const count=events.filter(ev=>{const d=new Date(ev.date);return ev.type===k&&d.getMonth()===currentMonth.getMonth()&&d.getFullYear()===currentMonth.getFullYear();}).length;
                  if(!count)return null;
                  return(<div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:28,height:28,borderRadius:8,background:`${typeColors[k]}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{typeIcons[k]}</div>
                      <span style={{fontSize:12,fontWeight:600,color:"#475569"}}>{v}</span>
                    </div>
                    <span style={{fontSize:13,fontWeight:800,color:typeColors[k],background:`${typeColors[k]}10`,padding:"2px 10px",borderRadius:8}}>{count}</span>
                  </div>);
                })}
              </div>
            </div>

            {/* Upcoming */}
            <div style={{ background:"#fff",borderRadius:16,padding:22,border:"1px solid #f1f5f9" }}>
              <h4 style={{ margin:"0 0 14px",fontSize:13,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.5px" }}>Prochains</h4>
              {events.filter(ev=>ev.date>=todayStr).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,4).map(ev=>(
                <div key={ev.id} onClick={()=>setSelectedDate(ev.date)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #f8fafc",cursor:"pointer"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:`${typeColors[ev.type]}10`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:8,fontWeight:700,color:typeColors[ev.type],lineHeight:1}}>{MONTHS_FR[new Date(ev.date).getMonth()]}</span>
                    <span style={{fontSize:14,fontWeight:800,color:typeColors[ev.type],lineHeight:1.1}}>{new Date(ev.date).getDate()}</span>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{margin:0,fontSize:12,fontWeight:600,color:"#0f172a",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ev.title}</p>
                    <p style={{margin:0,fontSize:10,color:"#94a3b8"}}>{ev.time} · {ev.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ LIST VIEW ═══ */}
      {viewMode === "list" && (
        <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
          {Object.entries(grouped).map(([date,evts])=>(
            <div key={date}>
              <h4 style={{fontSize:13,fontWeight:700,color:"#64748b",margin:"0 0 10px",textTransform:"capitalize"}}>{date}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {evts.map(e=>(
                  <div key={e.id} style={{
                    background:"#fff",borderRadius:14,padding:"16px 20px",border:"1px solid #f1f5f9",
                    display:"flex",alignItems:"center",gap:16,borderLeft:`4px solid ${typeColors[e.type]||"#94a3b8"}`,transition:"all 0.15s"
                  }}>
                    <div style={{width:44,height:44,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",background:`${typeColors[e.type]}12`,flexShrink:0,fontSize:20}}>{typeIcons[e.type]}</div>
                    <div style={{flex:1}}>
                      <p style={{margin:0,fontSize:14,fontWeight:700,color:"#0f172a"}}>{e.title}</p>
                      <p style={{margin:"2px 0 0",fontSize:12,color:"#94a3b8"}}>{e.time} · {e.location}</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <Badge variant="default" style={{background:`${typeColors[e.type]}12`,color:typeColors[e.type]}}>{typeLabels[e.type]}</Badge>
                      <button onClick={()=>openEdit(e)} style={{width:30,height:30,borderRadius:8,border:"none",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Edit size={14} color="#64748b"/></button>
                      <button onClick={()=>handleDelete(e.id)} style={{width:30,height:30,borderRadius:8,border:"none",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><Trash2 size={14} color="#ef4444"/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {events.length===0&&<EmptyState icon={Calendar} title="Aucun événement" description="Créez votre premier événement"/>}
        </div>
      )}

      {/* ═══ CREATE / EDIT MODAL ═══ */}
      <Modal open={showModal} onClose={()=>{setShowModal(false);setEditingEvent(null);}} title={editingEvent?"Modifier l'événement":"Nouvel événement"} width={540}>
        <FormField label="Titre de l'événement" required>
          <input style={inputStyle} placeholder="Ex: Culte du dimanche, Veillée de prière..." value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        </FormField>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <FormField label="Date" required><input style={inputStyle} type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></FormField>
          <FormField label="Heure"><input style={inputStyle} type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></FormField>
          <FormField label="Type d'événement">
            <select style={selectStyle} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              {Object.entries(typeLabels).map(([k,v])=><option key={k} value={k}>{typeIcons[k]} {v}</option>)}
            </select>
          </FormField>
          <FormField label="Lieu"><input style={inputStyle} placeholder="Ex: Temple principal" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/></FormField>
          <FormField label="Visibilité">
            <select style={selectStyle} value={form.scope} onChange={e=>setForm({...form,scope:e.target.value})}>
              <option value="eglise">⛪ Agenda Église (visible par tous)</option>
              <option value="pasteur">🔒 Agenda Pasteur (privé)</option>
            </select>
          </FormField>
        </div>
        <FormField label="Description (optionnel)">
          <textarea style={{...inputStyle,minHeight:65,resize:"vertical"}} placeholder="Détails supplémentaires..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        </FormField>
        {form.title&&(
          <div style={{padding:"12px 16px",borderRadius:12,background:"#f8fafc",border:"1px solid #f1f5f9",borderLeft:`4px solid ${typeColors[form.type]}`,marginTop:4,marginBottom:8}}>
            <p style={{margin:0,fontSize:11,fontWeight:600,color:"#94a3b8",marginBottom:4}}>Aperçu</p>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:16}}>{typeIcons[form.type]}</span>
              <div>
                <p style={{margin:0,fontSize:13,fontWeight:700,color:"#0f172a"}}>{form.title}</p>
                <p style={{margin:0,fontSize:11,color:"#64748b"}}>{form.date?new Date(form.date).toLocaleDateString("fr"):"—"} · {form.time||"—"} · {form.location||"—"}</p>
              </div>
            </div>
          </div>
        )}
        <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:12}}>
          <Btn variant="secondary" onClick={()=>{setShowModal(false);setEditingEvent(null);}}>Annuler</Btn>
          <Btn onClick={handleSave} disabled={!form.title||!form.date}>{editingEvent?"Enregistrer":"Créer l'événement"}</Btn>
        </div>
      </Modal>
    </div>
  );
};

// DEPARTMENTS PAGE
const DepartmentsPage = () => {
  const [departments, setDepartments] = useState(MOCK_DEPARTMENTS.map(d => ({...d, members: ["Jean Kouadio", "Marie Bamba", "Grace Achi"].slice(0, Math.min(3, d.members_count)) })));
  const [showModal, setShowModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [form, setForm] = useState({ name: "", leader: "", color: "#0d9488" });
  const totalMembers = departments.reduce((s, d) => s + d.members_count, 0);

  const moveDept = (idx, dir) => {
    const arr = [...departments];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setDepartments(arr);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Départements</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{departments.length} départements · {totalMembers} membres</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="secondary" size="sm" icon={Download} onClick={() => {
            const csv = "\uFEFFDépartement,Responsable,Membres\n" + departments.map(d => `${d.name},${d.leader},${d.members_count}`).join("\n");
            const b = new Blob([csv], {type:"text/csv;charset=utf-8;"}); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href=u; a.download="departements.csv"; a.click();
          }}>Exporter</Btn>
          <Btn icon={Plus} onClick={() => { setForm({ name: "", leader: "", color: "#0d9488" }); setShowModal(true); }}>Nouveau département</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedDept ? "1fr 1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: selectedDept ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {departments.map((d, idx) => (
            <div key={d.id} onClick={() => setSelectedDept(d)} style={{
              background: "#fff", borderRadius: 14, padding: 20, cursor: "pointer",
              border: selectedDept?.id === d.id ? `2px solid ${d.color}` : "1px solid #f1f5f9",
              borderTop: `4px solid ${d.color}`, transition: "all 0.15s"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `${d.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}><Building2 size={20} color={d.color} /></div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{d.name}</h3>
                    <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>Resp: {d.leader} · {d.members_count} membres</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 2 }} onClick={e => e.stopPropagation()}>
                  <button onClick={() => moveDept(idx, -1)} disabled={idx === 0} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: idx === 0 ? "not-allowed" : "pointer", opacity: idx === 0 ? 0.3 : 1, fontSize: 10 }}>▲</button>
                  <button onClick={() => moveDept(idx, 1)} disabled={idx === departments.length - 1} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: idx === departments.length - 1 ? "not-allowed" : "pointer", opacity: idx === departments.length - 1 ? 0.3 : 1, fontSize: 10 }}>▼</button>
                  <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => { if(confirm(`Supprimer ${d.name} ?`)) setDepartments(prev => prev.filter(x => x.id !== d.id)); }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedDept && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${selectedDept.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}><Building2 size={18} color={selectedDept.color} /></div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{selectedDept.name}</h3>
              </div>
              <Btn variant="ghost" size="sm" icon={X} onClick={() => setSelectedDept(null)} />
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px" }}>Responsable : {selectedDept.leader} · {selectedDept.members_count} membres</p>
            <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700 }}>Membres du département</h4>
            {(selectedDept.members||[]).map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar name={m} size={28} color={selectedDept.color} />
                  <span style={{ fontSize: 13, color: "#0f172a" }}>{m}</span>
                </div>
                <Badge variant="success">Actif</Badge>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <Btn variant="secondary" size="sm" icon={Download} onClick={() => {
                const csv = `Département: ${selectedDept.name}\nResponsable: ${selectedDept.leader}\n\nMembres:\n` + (selectedDept.members||[]).map((m,i) => `${i+1}. ${m}`).join("\n");
                const b = new Blob([csv], {type:"text/plain"}); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href=u; a.download=`dept_${selectedDept.name}.txt`; a.click();
              }}>Exporter ce département</Btn>
            </div>
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouveau département">
        <FormField label="Nom *"><input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></FormField>
        <FormField label="Responsable"><input style={inputStyle} value={form.leader} onChange={e => setForm({...form, leader: e.target.value})} /></FormField>
        <FormField label="Couleur"><input type="color" value={form.color} onChange={e => setForm({...form, color: e.target.value})} style={{ width: 50, height: 36, border: "none", cursor: "pointer", borderRadius: 8 }} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(form.name) { setDepartments(prev => [...prev, { ...form, id: Date.now(), members_count: 0, members: [] }]); setShowModal(false); } }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// CULTES PAGE (Church Services) — with nominal attendance roll call
const CultesPage = () => {
  const [cultes, setCultes] = useState([
    { id: 1, date: "2026-03-22", type: "Culte dominical", hommes: 82, femmes: 95, jeunes: 28, enfants: 10, offrande: 180000, theme: "La foi qui déplace les montagnes", predicateur: "Pasteur Kouadio" },
    { id: 2, date: "2026-03-15", type: "Culte dominical", hommes: 75, femmes: 88, jeunes: 25, enfants: 10, offrande: 165000, theme: "Marcher dans la lumière", predicateur: "Pasteur Kouadio" },
    { id: 3, date: "2026-03-19", type: "Culte du soir", hommes: 35, femmes: 42, jeunes: 15, enfants: 0, offrande: 45000, theme: "La prière efficace", predicateur: "Pasteur assistant Bamba" },
    { id: 4, date: "2026-03-12", type: "Culte du soir", hommes: 30, femmes: 38, jeunes: 12, enfants: 0, offrande: 38000, theme: "La puissance du Saint-Esprit", predicateur: "Pasteur Kouadio" },
  ]);
  const [culteTypes, setCulteTypes] = useState(["Culte dominical", "Culte du soir", "Prière du matin", "Veillée de prière", "Culte d'action de grâce"]);
  const [showModal, setShowModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showAppelModal, setShowAppelModal] = useState(false);
  const [newType, setNewType] = useState("");
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ date: "", type: "Culte dominical", hommes: "", femmes: "", jeunes: "", enfants: "", offrande: "", theme: "", predicateur: "" });
  const [appelSearch, setAppelSearch] = useState("");
  const [appelDept, setAppelDept] = useState("all");
  const [appelList, setAppelList] = useState([]);

  const filtered = filter === "all" ? cultes : cultes.filter(c => c.type === filter);
  const totalPres = (c) => (c.hommes||0) + (c.femmes||0) + (c.jeunes||0) + (c.enfants||0);

  const openAppel = () => {
    setAppelList(MOCK_MEMBERS.map(m => ({ ...m, present: true })));
    setAppelSearch("");
    setAppelDept("all");
    setShowAppelModal(true);
  };

  const filteredAppel = appelList.filter(m => {
    const matchSearch = `${m.first_name} ${m.last_name}`.toLowerCase().includes(appelSearch.toLowerCase());
    const matchDept = appelDept === "all" || m.department === appelDept;
    return matchSearch && matchDept;
  });

  const nbPresents = appelList.filter(m => m.present).length;
  const nbAbsents = appelList.filter(m => !m.present).length;
  const autoCountFromAppel = () => {
    const hommes = appelList.filter(m => m.present && m.gender === "M").length;
    const femmes = appelList.filter(m => m.present && m.gender === "F").length;
    setForm(f => ({ ...f, hommes: String(hommes), femmes: String(femmes) }));
    setShowAppelModal(false);
    setShowModal(true);
  };

  const depts = [...new Set(MOCK_MEMBERS.map(m => m.department).filter(Boolean))];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Cultes</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Enregistrement des présences et finances</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="secondary" size="sm" icon={Settings} onClick={() => setShowTypeModal(true)}>Types de culte</Btn>
          <Btn variant="secondary" size="sm" icon={UserCheck} onClick={openAppel}>Appel nominal</Btn>
          <Btn icon={Plus} onClick={() => { setForm({ date: new Date().toISOString().split("T")[0], type: culteTypes[0], hommes: "", femmes: "", jeunes: "", enfants: "", offrande: "", theme: "", predicateur: "" }); setShowModal(true); }}>Enregistrer un culte</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <StatCard icon={Users} title="Moy. présences" value={cultes.length ? Math.round(cultes.reduce((s,c) => s+totalPres(c), 0)/cultes.length) : 0} color="#0d9488" />
        <StatCard icon={DollarSign} title="Moy. offrandes" value={cultes.length ? `${Math.round(cultes.reduce((s,c) => s+c.offrande, 0)/cultes.length/1000)}k F` : "0"} color="#10b981" />
        <StatCard icon={Calendar} title="Cultes enregistrés" value={cultes.length} color="#3b82f6" />
        <StatCard icon={TrendingUp} title="Total offrandes" value={`${(cultes.reduce((s,c) => s+c.offrande, 0)/1000).toFixed(0)}k F`} color="#8b5cf6" />
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <select style={{ ...selectStyle, width: 200 }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Tous les types</option>
          {culteTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <Btn variant="secondary" size="sm" icon={Download} onClick={() => {
          const csv = "\uFEFFDate,Type,Thème,Prédicateur,Hommes,Femmes,Jeunes,Enfants,Total,Offrande\n" + filtered.map(c => `${c.date},${c.type},${c.theme},${c.predicateur},${c.hommes},${c.femmes},${c.jeunes},${c.enfants},${totalPres(c)},${c.offrande}`).join("\n");
          const b = new Blob([csv], {type:"text/csv;charset=utf-8;"}); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href=u; a.download="cultes.csv"; a.click();
        }}>Exporter</Btn>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#f8fafc" }}>
            {["Date", "Type", "Thème", "H", "F", "J", "E", "Total", "Offrande"].map(h => (
              <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.sort((a,b) => b.date.localeCompare(a.date)).map(c => (
              <tr key={c.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{new Date(c.date).toLocaleDateString("fr")}</td>
                <td style={{ padding: "10px 12px" }}><Badge variant="default">{c.type}</Badge></td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#475569" }}>{c.theme}<br/><span style={{ fontSize: 10, color: "#94a3b8" }}>{c.predicateur}</span></td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#3b82f6", fontWeight: 600 }}>{c.hommes}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#ec4899", fontWeight: 600 }}>{c.femmes}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#f59e0b", fontWeight: 600 }}>{c.jeunes}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#10b981", fontWeight: 600 }}>{c.enfants}</td>
                <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 800, color: "#0f172a" }}>{totalPres(c)}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, fontWeight: 700, color: "#10b981" }}>{c.offrande.toLocaleString()} F</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* APPEL NOMINAL MODAL */}
      <Modal open={showAppelModal} onClose={() => setShowAppelModal(false)} title="Appel nominal du culte" width={620}>
        {/* Sticky header with counters */}
        <div style={{ padding: "14px 16px", background: "#f0fdfa", borderRadius: 12, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0d9488" }}>{nbPresents}</div>
              <div style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>PRÉSENTS</div>
            </div>
            <div style={{ width: 1, background: "#e2e8f0" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#ef4444" }}>{nbAbsents}</div>
              <div style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>ABSENTS</div>
            </div>
            <div style={{ width: 1, background: "#e2e8f0" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{appelList.length}</div>
              <div style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>TOTAL</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Btn size="sm" variant="secondary" onClick={() => setAppelList(l => l.map(m => ({ ...m, present: true })))}>Tout cocher ✓</Btn>
            <Btn size="sm" variant="secondary" onClick={() => setAppelList(l => l.map(m => ({ ...m, present: false })))}>Tout décocher</Btn>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={14} color="#94a3b8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input value={appelSearch} onChange={e => setAppelSearch(e.target.value)} placeholder="Rechercher un membre..."
              style={{ ...inputStyle, paddingLeft: 32, fontSize: 12 }} />
          </div>
          <select value={appelDept} onChange={e => setAppelDept(e.target.value)} style={{ ...selectStyle, width: 160, fontSize: 12 }}>
            <option value="all">Tous les depts</option>
            {depts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Members list — all checked by default, uncheck absents */}
        <div style={{ maxHeight: 340, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredAppel.map(m => (
            <div key={m.id} onClick={() => setAppelList(l => l.map(x => x.id === m.id ? { ...x, present: !x.present } : x))}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                background: m.present ? "#f0fdfa" : "#fff8f8",
                border: `1px solid ${m.present ? "#0d948820" : "#ef444420"}`,
                transition: "all 0.15s"
              }}>
              {/* Checkbox */}
              <div style={{
                width: 22, height: 22, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                background: m.present ? "#0d9488" : "#fff", border: m.present ? "none" : "2px solid #d1d5db",
                transition: "all 0.15s"
              }}>
                {m.present && <Check size={13} color="#fff" />}
              </div>
              <Avatar name={m.first_name} size={32} color={m.present ? "#0d9488" : "#94a3b8"} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: m.present ? "#0f172a" : "#94a3b8" }}>
                  {m.first_name} {m.last_name}
                </p>
                <p style={{ margin: 0, fontSize: 10, color: "#94a3b8" }}>{m.department} · {m.gender === "F" ? "Femme" : "Homme"}</p>
              </div>
              <Badge variant={m.present ? "success" : "danger"}>{m.present ? "Présent" : "Absent"}</Badge>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
          <Btn variant="secondary" onClick={() => setShowAppelModal(false)}>Annuler</Btn>
          <Btn onClick={autoCountFromAppel}>Valider et enregistrer le culte →</Btn>
        </div>
      </Modal>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Enregistrer un culte" width={550}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormField label="Date *"><input style={inputStyle} type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></FormField>
          <FormField label="Type de culte">
            <select style={selectStyle} value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              {culteTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </FormField>
        </div>
        <FormField label="Thème / Sujet"><input style={inputStyle} value={form.theme} onChange={e => setForm({...form, theme: e.target.value})} /></FormField>
        <FormField label="Prédicateur"><input style={inputStyle} value={form.predicateur} onChange={e => setForm({...form, predicateur: e.target.value})} /></FormField>
        <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: 10, marginBottom: 12 }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Présences par catégorie</p>
          {form.hommes && <p style={{ margin: "0 0 8px", fontSize: 11, color: "#0d9488" }}>✓ Pré-rempli depuis l'appel nominal</p>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
            <FormField label="Hommes"><input style={inputStyle} type="number" value={form.hommes} onChange={e => setForm({...form, hommes: e.target.value})} /></FormField>
            <FormField label="Femmes"><input style={inputStyle} type="number" value={form.femmes} onChange={e => setForm({...form, femmes: e.target.value})} /></FormField>
            <FormField label="Jeunes"><input style={inputStyle} type="number" value={form.jeunes} onChange={e => setForm({...form, jeunes: e.target.value})} /></FormField>
            <FormField label="Enfants"><input style={inputStyle} type="number" value={form.enfants} onChange={e => setForm({...form, enfants: e.target.value})} /></FormField>
          </div>
        </div>
        <FormField label="Offrande (FCFA)"><input style={inputStyle} type="number" value={form.offrande} onChange={e => setForm({...form, offrande: e.target.value})} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(form.date) { setCultes(prev => [...prev, { ...form, id: Date.now(), hommes: parseInt(form.hommes)||0, femmes: parseInt(form.femmes)||0, jeunes: parseInt(form.jeunes)||0, enfants: parseInt(form.enfants)||0, offrande: parseInt(form.offrande)||0 }]); setShowModal(false); } }}>Enregistrer</Btn>
        </div>
      </Modal>

      <Modal open={showTypeModal} onClose={() => setShowTypeModal(false)} title="Types de culte personnalisables">
        <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 12px" }}>Définissez les types de culte de votre église</p>
        {culteTypes.map((t, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#f8fafc", borderRadius: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: "#0f172a" }}>{t}</span>
            <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => setCulteTypes(prev => prev.filter(x => x !== t))} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input style={{ ...inputStyle, flex: 1 }} value={newType} onChange={e => setNewType(e.target.value)} placeholder="Ex: Nuit de prière" />
          <Btn onClick={() => { if(newType.trim()) { setCulteTypes(prev => [...prev, newType.trim()]); setNewType(""); } }}>Ajouter</Btn>
        </div>
      </Modal>
    </div>
  );
};

// SETTINGS PAGE
const SettingsPage = ({ seasons, setSeasons, terminology, setTerminology, carouselSlides: propSlides, setCarouselSlides: propSetSlides }) => {
  const [churchName, setChurchName] = useState("Église Foursquare Lumière");
  const [denomination, setDenomination] = useState("Foursquare");
  const [pasteur, setPasteur] = useState("Jean Kouadio");
  const [saved, setSaved] = useState(false);
  const ss = seasons || []; const setS = setSeasons || (() => {});
  const tm = terminology || { departments: "Départements", committees: "Comités & Services" }; const setT = setTerminology || (() => {});
  const slides = propSlides || INITIAL_CAROUSEL_SLIDES;
  const setSlides = propSetSlides || (() => {});
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [slideForm, setSlideForm] = useState({ title: "", subtitle: "", emoji: "✝️", gradient: "linear-gradient(135deg, #0d9488, #065f46)", cta: "En savoir plus" });
  const gradientPresets = [
    { label: "Vert Émeraude", value: "linear-gradient(135deg, #0d9488, #065f46)" },
    { label: "Bleu Royal", value: "linear-gradient(135deg, #3b82f6, #1e40af)" },
    { label: "Violet Mystique", value: "linear-gradient(135deg, #8b5cf6, #6d28d9)" },
    { label: "Rose Vif", value: "linear-gradient(135deg, #ec4899, #be185d)" },
    { label: "Orange Ardent", value: "linear-gradient(135deg, #f59e0b, #b45309)" },
    { label: "Rouge Feu", value: "linear-gradient(135deg, #ef4444, #b91c1c)" },
  ];
  const moveSlide = (idx, dir) => {
    const arr = [...slides];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= arr.length) return;
    [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
    setSlides(arr);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Paramètres</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Configuration de votre église</p>
      </div>

      <div style={{ maxWidth: 640 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8 }}>
            <Church size={18} color="#0d9488" /> Informations de l'église
          </h3>
          <FormField label="Nom de l'église" required>
            <input style={inputStyle} value={churchName} onChange={e => setChurchName(e.target.value)} />
          </FormField>
          <FormField label="Dénomination">
            <input style={inputStyle} value={denomination} onChange={e => setDenomination(e.target.value)} />
          </FormField>
          <FormField label="Pasteur principal">
            <input style={inputStyle} value={pasteur} onChange={e => setPasteur(e.target.value)} />
          </FormField>
          <Btn onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
            {saved ? "✓ Enregistré" : "Enregistrer"}
          </Btn>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            🏷️ Terminologie de l'église
          </h3>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 16px" }}>Adaptez les noms des modules selon les appellations utilisées dans votre église.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <FormField label="Nom pour 'Départements'">
              <input style={inputStyle} value={tm.departments} onChange={e => setT(prev => ({...prev, departments: e.target.value}))} placeholder="Ex: Départements, Ministères, Commissions..." />
            </FormField>
            <FormField label="Nom pour 'Comités & Services'">
              <input style={inputStyle} value={tm.committees} onChange={e => setT(prev => ({...prev, committees: e.target.value}))} placeholder="Ex: Comités, Services, Équipes..." />
            </FormField>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 11, color: "#94a3b8" }}>Ces noms apparaîtront dans la sidebar et les pages correspondantes.</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            📅 Saisons de l'église
          </h3>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 16px" }}>Personnalisez les saisons et périodes liturgiques de votre église. Elles apparaîtront dans la gamification et le tableau de bord.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {ss.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: s.active ? "#f0fdfa" : "#f8fafc", borderRadius: 10, border: s.active ? "1px solid #0d948830" : "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{s.emoji}</span>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{s.name}</span>
                    {s.custom && <span style={{ fontSize: 9, color: "#94a3b8", marginLeft: 6 }}>Personnalisé</span>}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {s.active && <Badge variant="success">Active</Badge>}
                  <button onClick={() => setS(prev => prev.map(x => ({...x, active: x.id === s.id})))} style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #e2e8f0", background: s.active ? "#0d9488" : "#fff", color: s.active ? "#fff" : "#64748b", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>
                    {s.active ? "✓ Active" : "Activer"}
                  </button>
                  {s.custom && <button onClick={() => setS(prev => prev.filter(x => x.id !== s.id))} style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.4 }}><Trash2 size={14} /></button>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input id="newSeason" placeholder="Nom de la saison (ex: Camp de jeunes)" style={{ ...inputStyle, flex: 1 }} />
            <input id="newSeasonEmoji" placeholder="Emoji" style={{ ...inputStyle, width: 60 }} />
            <Btn size="sm" onClick={() => {
              const name = document.getElementById("newSeason").value;
              const emoji = document.getElementById("newSeasonEmoji").value || "🗓️";
              if (name.trim()) {
                setS(prev => [...prev, { id: Date.now(), name: name.trim(), emoji, start: "", end: "", active: false, custom: true }]);
                document.getElementById("newSeason").value = "";
                document.getElementById("newSeasonEmoji").value = "";
              }
            }}>Ajouter</Btn>
          </div>
        </div>

        {/* ═══ CAROUSEL ADMIN ═══ */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
              🎠 Carrousel du tableau de bord
            </h3>
            <Btn size="sm" icon={Plus} onClick={() => { setSlideForm({ title: "", subtitle: "", emoji: "✝️", gradient: gradientPresets[0].value, cta: "En savoir plus" }); setShowSlideModal(true); }}>Ajouter un slide</Btn>
          </div>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 16px" }}>Gérez les annonces affichées sur le tableau de bord. Utilisez ▲▼ pour réordonner.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {slides.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9" }}>
                {/* Mini preview */}
                <div style={{ width: 52, height: 36, borderRadius: 8, background: s.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.subtitle}</p>
                </div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  <button onClick={() => moveSlide(i, -1)} disabled={i === 0} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: i === 0 ? "not-allowed" : "pointer", opacity: i === 0 ? 0.3 : 1, fontSize: 11 }}>▲</button>
                  <button onClick={() => moveSlide(i, 1)} disabled={i === slides.length - 1} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: i === slides.length - 1 ? "not-allowed" : "pointer", opacity: i === slides.length - 1 ? 0.3 : 1, fontSize: 11 }}>▼</button>
                  <button onClick={() => setSlides(prev => prev.filter(x => x.id !== s.id))} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid #fecaca", background: "#fef2f2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={12} color="#ef4444" /></button>
                </div>
              </div>
            ))}
            {slides.length === 0 && <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", padding: "20px 0" }}>Aucun slide. Ajoutez-en un !</p>}
          </div>
        </div>

        <Modal open={showSlideModal} onClose={() => setShowSlideModal(false)} title="Nouveau slide du carrousel">
          <FormField label="Titre *"><input style={inputStyle} value={slideForm.title} onChange={e => setSlideForm({...slideForm, title: e.target.value})} placeholder="Ex: Conférence de Pâques 2026" /></FormField>
          <FormField label="Sous-titre"><input style={inputStyle} value={slideForm.subtitle} onChange={e => setSlideForm({...slideForm, subtitle: e.target.value})} placeholder="Ex: 5 Avril — Temple principal" /></FormField>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FormField label="Emoji"><input style={inputStyle} value={slideForm.emoji} onChange={e => setSlideForm({...slideForm, emoji: e.target.value})} placeholder="✝️" /></FormField>
            <FormField label="Texte du bouton"><input style={inputStyle} value={slideForm.cta} onChange={e => setSlideForm({...slideForm, cta: e.target.value})} placeholder="En savoir plus" /></FormField>
          </div>
          <FormField label="Couleur de fond">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {gradientPresets.map(g => (
                <button key={g.value} onClick={() => setSlideForm({...slideForm, gradient: g.value})} style={{
                  width: 40, height: 28, borderRadius: 8, background: g.value, border: slideForm.gradient === g.value ? "3px solid #0f172a" : "2px solid transparent", cursor: "pointer", transition: "all 0.15s"
                }} title={g.label} />
              ))}
            </div>
          </FormField>
          {/* Live preview */}
          <div style={{ marginTop: 14, borderRadius: 12, overflow: "hidden", background: slideForm.gradient, padding: "18px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{slideForm.emoji || "✝️"}</div>
            <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 800, color: "#fff" }}>{slideForm.title || "Titre du slide"}</p>
            <p style={{ margin: "0 0 10px", fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{slideForm.subtitle || "Sous-titre"}</p>
            <span style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 11, fontWeight: 600 }}>{slideForm.cta || "Bouton"}</span>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
            <Btn variant="secondary" onClick={() => setShowSlideModal(false)}>Annuler</Btn>
            <Btn onClick={() => { if(slideForm.title.trim()) { setSlides(prev => [...prev, { ...slideForm, id: Date.now() }]); setShowSlideModal(false); } }}>Ajouter</Btn>
          </div>
        </Modal>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8 }}>
            <CreditCard size={18} color="#8b5cf6" /> Abonnement
          </h3>
          <div style={{ padding: 16, background: "#f0fdfa", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Plan Pro</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748b" }}>Renouvelé le 01/04/2026 · 25 000 F/mois</p>
            </div>
            <Badge variant="success">Actif</Badge>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8 }}>
            <Shield size={18} color="#ef4444" /> Sécurité
          </h3>
          <Btn variant="secondary" icon={Lock}>Changer le mot de passe</Btn>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginTop: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8 }}>
            📋 Mentions légales & Confidentialité
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { title: "Conditions d'utilisation", desc: "Cadre juridique d'utilisation de la plateforme Lumen Church" },
              { title: "Politique de confidentialité", desc: "Comment nous protégeons et traitons les données personnelles de vos membres" },
              { title: "Protection des données (RGPD)", desc: "Conformité aux normes de protection des données personnelles" },
              { title: "Politique de cookies", desc: "Utilisation des cookies et traceurs sur la plateforme" },
              { title: "Mentions légales", desc: "Informations légales sur l'éditeur de la plateforme" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "14px 16px", background: "#f8fafc", borderRadius: 10, cursor: "pointer", transition: "all 0.15s", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f0fdfa"}
                onMouseLeave={e => e.currentTarget.style.background = "#f8fafc"}>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{item.title}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8" }}>{item.desc}</p>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginTop: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
            🔧 Fonctionnalités
          </h3>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 16px" }}>Activez ou désactivez des fonctionnalités spécifiques</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { key: "subdivisions", label: "Subdivisions de départements", desc: "Permet de créer des sous-groupes dans les départements (ex: Jeunesse → Ados, Jeunes Adultes)", default: false },
              { key: "attendance", label: "Suivi des présences", desc: "Active le suivi automatique des présences dans les cultes", default: true },
              { key: "gamification", label: "Gamification & Badges", desc: "Active le système de badges et récompenses pour l'engagement", default: true },
              { key: "formations", label: "Parcours de formation", desc: "Active les parcours de formation personnalisés", default: true },
              { key: "quiz", label: "Quiz & Concours", desc: "Active les quiz bibliques et le classement", default: true },
              { key: "testimonials_media", label: "Témoignages vidéo/audio", desc: "Permet d'ajouter des liens vidéo et audio aux témoignages", default: true },
            ].map(feat => {
              const [on, setOn] = useState(feat.default);
              return (
                <div key={feat.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#f8fafc", borderRadius: 10 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{feat.label}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8" }}>{feat.desc}</p>
                  </div>
                  <div onClick={() => setOn(!on)} style={{
                    width: 44, height: 24, borderRadius: 12, padding: 3, cursor: "pointer", transition: "all 0.2s",
                    background: on ? "#0d9488" : "#e2e8f0", display: "flex", alignItems: "center",
                    justifyContent: on ? "flex-end" : "flex-start"
                  }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginTop: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
            📋 Qui peut marquer les présences ?
          </h3>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 16px" }}>Définissez qui a le droit de marquer les présences lors des cultes</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["Pasteur", "Administrateur", "Secrétaire", "Responsable Département", "Comité des présences"].map((role, i) => {
              const [checked, setChecked] = useState(i < 3);
              return (
                <label key={role} onClick={() => setChecked(!checked)} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, cursor: "pointer",
                  background: checked ? "#f0fdfa" : "#fafbfc", border: checked ? "1px solid #0d948830" : "1px solid #f1f5f9"
                }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, background: checked ? "#0d9488" : "#fff", border: checked ? "none" : "2px solid #d1d5db", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {checked && <Check size={12} color="#fff" />}
                  </div>
                  <span style={{ fontSize: 13, color: checked ? "#0f172a" : "#94a3b8", fontWeight: checked ? 600 : 400 }}>{role}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginTop: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8 }}>
            ⚙️ Données & Export
          </h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Btn variant="secondary" icon={Download}>Exporter toutes les données</Btn>
            <Btn variant="secondary" icon={Trash2} style={{ borderColor: "#fecaca", color: "#ef4444" }}>Supprimer le compte</Btn>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 11, color: "#94a3b8" }}>La suppression est irréversible. Toutes les données de l'église seront définitivement effacées après 30 jours.</p>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// LOGIN PAGE — with member join option
// ═══════════════════════════════════════════════════════
const LoginPage = ({ onLogin, onRegister, onJoinChurch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const DEMO_ACCOUNTS = {
    "superadmin@lumenchurch.com": { password: "super123", role: "super_admin" },
    "pasteur@eglise.org": { password: "pasteur123", role: "pasteur" },
    "admin@eglise.org": { password: "admin123", role: "admin" },
    "tresorier@eglise.org": { password: "tresorier123", role: "tresorier" },
    "secretaire@eglise.org": { password: "secretaire123", role: "secretaire" },
    "responsable@eglise.org": { password: "responsable123", role: "responsable_dept" },
    "membre@eglise.org": { password: "membre123", role: "membre" },
  };

  const handleLogin = () => {
    setError("");
    if (!email || !password) { setError("Veuillez remplir tous les champs"); return; }
    setLoading(true);
    setTimeout(() => {
      const account = DEMO_ACCOUNTS[email.toLowerCase()];
      if (account && account.password === password) {
        setLoading(false);
        onLogin(email);
      } else {
        setLoading(false);
        setError("Email ou mot de passe incorrect");
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "url('data:image/svg+xml,...')", backgroundSize: "30px 30px" }} />
      <div style={{ position: "absolute", top: "10%", left: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #0d948830, transparent)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "15%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, #3b82f620, transparent)", filter: "blur(60px)" }} />

      <div style={{
        width: "90%", maxWidth: 420, background: "rgba(255,255,255,0.03)", borderRadius: 24,
        backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)",
        padding: "48px 40px", boxShadow: "0 25px 50px rgba(0,0,0,0.3)", position: "relative", zIndex: 1
      }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, margin: "0 auto 16px",
            background: "linear-gradient(135deg, #0d9488, #10b981)", display: "flex",
            alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(13,148,136,0.4)"
          }}>
            <Church size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
            Lumen Church
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Plateforme de gestion d'église
          </p>
        </div>

        {error && (
          <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <AlertCircle size={14} color="#ef4444" />
            <span style={{ fontSize: 12, color: "#fca5a5" }}>{error}</span>
          </div>
        )}

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Email</label>
          <input value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder="votre@email.com"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Mot de passe</label>
          <input value={password} onChange={e => { setPassword(e.target.value); setError(""); }} type="password"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>

        <button onClick={handleLogin} disabled={loading} style={{
          width: "100%", padding: "14px", borderRadius: 12, border: "none",
          background: "linear-gradient(135deg, #0d9488, #10b981)", color: "#fff",
          fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
          boxShadow: "0 4px 15px rgba(13,148,136,0.4)", letterSpacing: "0.3px",
          opacity: loading ? 0.7 : 1
        }}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {/* Demo accounts */}
        <details style={{ marginTop: 18 }}>
          <summary style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", cursor: "pointer", textAlign: "center" }}>Comptes de démo</summary>
          <div style={{ marginTop: 8, padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
            {Object.entries(DEMO_ACCOUNTS).map(([em, { password: pw, role }]) => (
              <div key={em} onClick={() => { setEmail(em); setPassword(pw); setError(""); }} style={{
                padding: "6px 8px", cursor: "pointer", borderRadius: 6, fontSize: 10, color: "rgba(255,255,255,0.5)",
                display: "flex", justifyContent: "space-between", transition: "background 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span>{em}</span>
                <span style={{ color: "#0d9488", fontWeight: 600 }}>{role}</span>
              </div>
            ))}
          </div>
        </details>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          Pasteur / Admin ? <span onClick={onRegister} style={{ color: "#0d9488", cursor: "pointer", fontWeight: 600 }}>Inscrire mon église</span>
        </p>
        <p style={{ textAlign: "center", marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          Membre ? <span onClick={onJoinChurch} style={{ color: "#3b82f6", cursor: "pointer", fontWeight: 600 }}>Rejoindre une église</span>
        </p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// REGISTER PAGE (Church Registration)
// ═══════════════════════════════════════════════════════
const RegisterPage = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ church_name: "", denomination: "", pasteur: "", email: "", phone: "", password: "", country: "Côte d'Ivoire", city: "" });

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)", position: "relative"
    }}>
      <div style={{ position: "absolute", top: "10%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #0d948825, transparent)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, #3b82f620, transparent)", filter: "blur(60px)" }} />

      <div style={{
        width: "90%", maxWidth: 500, background: "rgba(255,255,255,0.03)", borderRadius: 24,
        backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)",
        padding: "40px 36px", boxShadow: "0 25px 50px rgba(0,0,0,0.3)", position: "relative", zIndex: 1
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, margin: "0 auto 14px", background: "linear-gradient(135deg, #0d9488, #10b981)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Church size={28} color="#fff" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Inscrire mon église</h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0 }}>Étape {step}/2 — {step === 1 ? "Informations de l'église" : "Compte administrateur"}</p>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 14 }}>
            {[1, 2].map(s => (
              <div key={s} style={{ width: s <= step ? 60 : 40, height: 5, borderRadius: 3, background: s <= step ? "#0d9488" : "rgba(255,255,255,0.15)", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Nom de l'église *</label>
              <input value={form.church_name} onChange={e => setForm({...form, church_name: e.target.value})} placeholder="Ex: Église Foursquare Lumière"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Dénomination</label>
                <input value={form.denomination} onChange={e => setForm({...form, denomination: e.target.value})} placeholder="Ex: Foursquare"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Pasteur principal</label>
                <input value={form.pasteur} onChange={e => setForm({...form, pasteur: e.target.value})} placeholder="Nom complet"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Pays</label>
                <input value={form.country} onChange={e => setForm({...form, country: e.target.value})}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Ville</label>
                <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="Ex: Abidjan"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <button onClick={() => setStep(2)} disabled={!form.church_name} style={{
              width: "100%", padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(135deg, #0d9488, #10b981)",
              color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: form.church_name ? 1 : 0.5
            }}>Continuer</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Email *</label>
              <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" placeholder="pasteur@eglise.com"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Téléphone</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+225 07 00 00 00"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Mot de passe *</label>
              <input value={form.password} onChange={e => setForm({...form, password: e.target.value})} type="password" placeholder="Minimum 8 caractères"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: 14, borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Retour</button>
              <button onClick={() => onComplete({ name: form.church_name, denomination: form.denomination, pasteur: form.pasteur })} style={{
                flex: 2, padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(135deg, #0d9488, #10b981)",
                color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer"
              }}>Créer mon église 🎉</button>
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", marginTop: 18, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          Déjà inscrit ? <span onClick={onBack} style={{ color: "#0d9488", cursor: "pointer", fontWeight: 600 }}>Se connecter</span>
        </p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// ONBOARDING FLOW
// ═══════════════════════════════════════════════════════
const OnboardingFlow = ({ step, setStep, churchName, onComplete }) => {
  const steps = [
    { title: "Bienvenue sur Lumen Church ! 🎉", subtitle: `${churchName || "Votre église"} est prête à être gérée`, desc: "Lumen Church vous aide à gérer vos membres, finances, événements et bien plus. Suivez ces quelques étapes pour bien démarrer.", emoji: "⛪", action: "Commencer la visite" },
    { title: "Ajoutez vos premiers membres 👥", subtitle: "Importez ou ajoutez vos fidèles", desc: "Commencez par ajouter les leaders et membres clés. Vous pourrez toujours en ajouter plus tard. Chaque membre peut avoir un rôle, un département et des infos de contact.", emoji: "👥", action: "Continuer" },
    { title: "Configurez vos finances 💰", subtitle: "Dîmes, offrandes et dépenses", desc: "Suivez chaque entrée et sortie d'argent. Générez des rapports automatiques pour votre trésorier et votre conseil d'administration.", emoji: "💰", action: "Continuer" },
    { title: "Planifiez vos événements 📅", subtitle: "Cultes, prières, événements spéciaux", desc: "Utilisez le calendrier interactif pour planifier tous vos événements. Les membres pourront voir le programme à venir.", emoji: "📅", action: "Continuer" },
    { title: "Vous êtes prêt ! 🚀", subtitle: "Explorez votre tableau de bord", desc: "Votre église est configurée. Explorez les différentes sections et n'hésitez pas à consulter la documentation si besoin. Que Dieu bénisse votre ministère !", emoji: "🙏", action: "Accéder au tableau de bord" },
  ];
  const s = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #f0fdfa, #f8fafc, #eff6ff)"
    }}>
      <div style={{ width: "90%", maxWidth: 560, textAlign: "center" }}>
        {/* Progress bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>Étape {step + 1}/{steps.length}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d9488" }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: "100%", height: 6, background: "#e2e8f0", borderRadius: 3 }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #0d9488, #10b981)", borderRadius: 3, transition: "width 0.5s ease" }} />
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: 24, padding: "48px 40px", boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
          border: "1px solid #f1f5f9", animation: "fadeIn 0.4s ease"
        }} key={step}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>{s.emoji}</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.3px" }}>{s.title}</h2>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#0d9488", margin: "0 0 16px" }}>{s.subtitle}</p>
          <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 32px", lineHeight: 1.7, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>{s.desc}</p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} style={{
                padding: "12px 28px", borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff",
                color: "#64748b", fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}>Retour</button>
            )}
            <button onClick={() => { step < steps.length - 1 ? setStep(step + 1) : onComplete(); }} style={{
              padding: "12px 32px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #0d9488, #10b981)", color: "#fff",
              fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 15px rgba(13,148,136,0.3)",
              transition: "all 0.2s"
            }}>{s.action}</button>
          </div>

          {step < steps.length - 1 && (
            <p onClick={onComplete} style={{ marginTop: 20, fontSize: 12, color: "#94a3b8", cursor: "pointer" }}>Passer l'introduction →</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// FAMILIES PAGE
// ═══════════════════════════════════════════════════════
const FamiliesPage = () => {
  const [families, setFamilies] = useState([
    { id: 1, name: "Famille Kouadio", description: "Famille pastorale", members: ["Jean Kouadio", "Marie Bamba"] },
    { id: 2, name: "Famille Yao-Koné", description: "", members: ["Paul Yao", "Esther Koné"] },
    { id: 3, name: "Famille Tra-Diallo", description: "", members: ["David Tra", "Ruth Diallo"] },
    { id: 4, name: "Famille Ouattara-Achi", description: "", members: ["Samuel Ouattara", "Grace Achi"] },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFam, setSelectedFam] = useState(null);
  const [form, setForm] = useState({ name: "", description: "" });
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Familles</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{families.length} familles</p></div>
        <Btn icon={Plus} onClick={() => { setForm({ name: "", description: "" }); setShowModal(true); }}>Nouvelle famille</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: selectedFam ? "1fr 1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {families.map(f => (
            <div key={f.id} onClick={() => setSelectedFam(f)} style={{ background: "#fff", borderRadius: 14, padding: 20, border: selectedFam?.id === f.id ? "2px solid #ec4899" : "1px solid #f1f5f9", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#ec489915", display: "flex", alignItems: "center", justifyContent: "center" }}><Heart size={18} color="#ec4899" /></div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{f.name}</h3>
                    <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{f.members.length} membres{f.description ? ` · ${f.description}` : ""}</p>
                  </div>
                </div>
                <Btn variant="ghost" size="sm" icon={Trash2} onClick={(e) => { e.stopPropagation(); if(confirm(`Supprimer ${f.name} ?`)) setFamilies(prev => prev.filter(x => x.id !== f.id)); }} />
              </div>
            </div>
          ))}
        </div>
        {selectedFam && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{selectedFam.name}</h3>
              <Btn variant="ghost" size="sm" icon={X} onClick={() => setSelectedFam(null)} />
            </div>
            {selectedFam.description && <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px" }}>{selectedFam.description}</p>}
            <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700 }}>Membres ({selectedFam.members.length})</h4>
            {selectedFam.members.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                <Avatar name={m} size={28} color={i === 0 ? "#0d9488" : "#ec4899"} />
                <span style={{ fontSize: 13, color: "#0f172a" }}>{m}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouvelle famille">
        <FormField label="Nom" required><input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></FormField>
        <FormField label="Description"><textarea style={{...inputStyle, minHeight: 60, resize: "vertical"}} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(form.name) { setFamilies(prev => [...prev, { ...form, id: Date.now(), members: [] }]); setShowModal(false); } }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// GROUPS PAGE
// ═══════════════════════════════════════════════════════
const GroupsPage = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "Groupe Alpha", description: "Croissance spirituelle", leader: "Jean Kouadio", members: ["David Tra", "Grace Achi", "Paul Yao"], members_count: 15 },
    { id: 2, name: "Groupe Béthel", description: "Prière et partage", leader: "Marie Bamba", members: ["Sarah Touré", "Ruth Diallo"], members_count: 12 },
    { id: 3, name: "Groupe Cana", description: "Groupe de couples", leader: "Samuel Ouattara", members: ["Moïse Dembélé", "Esther Koné"], members_count: 18 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", leader: "" });
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Groupes</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{groups.length} groupes actifs</p></div>
        <Btn icon={Plus} onClick={() => { setForm({ name: "", description: "", leader: "" }); setShowModal(true); }}>Nouveau groupe</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: selectedGroup ? "1fr 1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {groups.map(g => (
            <div key={g.id} onClick={() => setSelectedGroup(g)} style={{ background: "#fff", borderRadius: 14, padding: 20, border: selectedGroup?.id === g.id ? "2px solid #3b82f6" : "1px solid #f1f5f9", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "#3b82f615", display: "flex", alignItems: "center", justifyContent: "center" }}><UsersRound size={20} color="#3b82f6" /></div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{g.name}</h3>
                    <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{g.description} · {g.members_count} membres</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <Btn variant="ghost" size="sm" icon={Trash2} onClick={(e) => { e.stopPropagation(); if(confirm(`Supprimer ${g.name} ?`)) setGroups(prev => prev.filter(x => x.id !== g.id)); }} />
                </div>
              </div>
              <div style={{ padding: "8px 0 0", fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 6 }}>
                <Avatar name={g.leader} size={20} color="#3b82f6" />Responsable : {g.leader}
              </div>
            </div>
          ))}
        </div>
        {selectedGroup && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{selectedGroup.name}</h3>
              <Btn variant="ghost" size="sm" icon={X} onClick={() => setSelectedGroup(null)} />
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px" }}>Responsable : {selectedGroup.leader} · {selectedGroup.members_count} membres</p>
            <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Membres du groupe</h4>
            {(selectedGroup.members||[]).map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar name={m} size={28} color="#3b82f6" />
                  <span style={{ fontSize: 13, color: "#0f172a", cursor: "pointer" }}>{m}</span>
                </div>
                <Badge variant="success">Actif</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouveau groupe">
        <FormField label="Nom" required><input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></FormField>
        <FormField label="Description"><input style={inputStyle} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></FormField>
        <FormField label="Responsable"><input style={inputStyle} value={form.leader} onChange={e => setForm({...form, leader: e.target.value})} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(form.name) { setGroups(prev => [...prev, { ...form, id: Date.now(), members_count: 0, members: [] }]); setShowModal(false); } }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// ANNEXES (Cells/Structure) PAGE — with separate Cellules tab
const AnnexesPage = () => {
  const [mainTab, setMainTab] = useState("cellules");
  const [tab, setTab] = useState("carte");
  const [cells, setCells] = useState(MOCK_CELLS);
  const [units, setUnits] = useState([
    { id: 4, name: "Annexe Bouaké", type: "Annexe", address: "Bouaké, Centre", leader: "Daniel Konan", members_count: 45, lat: 7.694, lng: -5.030, finances: { entrees: 350000, sorties: 120000 }, presences: [] },
    { id: 5, name: "Église fille Yamoussoukro", type: "Église fille", address: "Yamoussoukro", leader: "Moïse Dembélé", members_count: 60, lat: 6.827, lng: -5.276, finances: { entrees: 520000, sorties: 180000 }, presences: [] },
  ]);
  const [unitTypes, setUnitTypes] = useState(["Annexe", "Église fille", "Point de prière"]);
  const [showModal, setShowModal] = useState(false);
  const [showCellModal, setShowCellModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [newType, setNewType] = useState("");
  const [form, setForm] = useState({ name: "", type: "Annexe", address: "", leader: "" });
  const [cellForm, setCellForm] = useState({ name: "", quartier: "", leader: "", day: "Mardi", time: "19h00" });
  const [showCellPresenceModal, setShowCellPresenceModal] = useState(false);
  const [presenceForm, setPresenceForm] = useState({ present: "", absent: "" });
  const [showPresenceModal, setShowPresenceModal] = useState(false);

  const typeColors = { "Annexe": "#3b82f6", "Église fille": "#8b5cf6", "Point de prière": "#f59e0b" };
  const cellColor = "#0d9488";
  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  const totalCellMembers = cells.reduce((s, c) => s + c.members_count, 0);
  const totalMembers = units.reduce((s, u) => s + u.members_count, 0);
  const totalEntrees = units.reduce((s, u) => s + u.finances.entrees, 0);
  const totalSorties = units.reduce((s, u) => s + u.finances.sorties, 0);

  const moveCell = (idx, dir) => {
    const arr = [...cells];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= arr.length) return;
    [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
    setCells(arr);
  };
  const moveUnit = (idx, dir) => {
    const arr = [...units];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= arr.length) return;
    [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
    setUnits(arr);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Structure & Réseau</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>
            {cells.length} cellules ({totalCellMembers} membres) · {units.length} annexes ({totalMembers} membres)
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {mainTab === "cellules" && <Btn icon={Plus} onClick={() => { setCellForm({ name: "", quartier: "", leader: "", day: "Mardi", time: "19h00" }); setShowCellModal(true); }}>Nouvelle cellule</Btn>}
          {mainTab === "annexes" && (
            <>
              <Btn variant="secondary" size="sm" icon={Settings} onClick={() => setShowTypeModal(true)}>Types</Btn>
              <Btn icon={Plus} onClick={() => { setForm({ name: "", type: "Annexe", address: "", leader: "" }); setShowModal(true); }}>Nouvelle annexe</Btn>
            </>
          )}
        </div>
      </div>

      {/* Main Tab — Cellules vs Annexes */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        {[
          { key: "cellules", label: `🏘️ Cellules (${cells.length})` },
          { key: "annexes", label: `⛪ Annexes & Églises filles (${units.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => setMainTab(t.key)} style={{
            padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: mainTab === t.key ? 700 : 500,
            background: mainTab === t.key ? "#0d9488" : "#f1f5f9",
            color: mainTab === t.key ? "#fff" : "#64748b", transition: "all 0.2s"
          }}>{t.label}</button>
        ))}
      </div>

      {/* ═══ CELLULES TAB ═══ */}
      {mainTab === "cellules" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
            <StatCard icon={Home} title="Cellules actives" value={cells.length} color="#0d9488" />
            <StatCard icon={Users} title="Membres en cellules" value={totalCellMembers} color="#3b82f6" />
            <StatCard icon={Activity} title="Taux moyen de présence" value={(() => {
              const allPres = cells.flatMap(c => c.presences);
              if (!allPres.length) return "—";
              const moy = allPres.reduce((s, p) => s + (p.present / (p.present + p.absent || 1)), 0) / allPres.length;
              return `${Math.round(moy * 100)}%`;
            })()} color="#8b5cf6" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: selectedCell ? "1fr 1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cells.map((c, idx) => (
                <div key={c.id} onClick={() => setSelectedCell(c)} style={{
                  background: "#fff", borderRadius: 14, padding: 18, border: selectedCell?.id === c.id ? `2px solid ${cellColor}` : "1px solid #f1f5f9",
                  borderLeft: `4px solid ${cellColor}`, cursor: "pointer", transition: "all 0.15s"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 16 }}>🏘️</span>
                        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{c.name}</h3>
                      </div>
                      <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>
                        {c.quartier} · {c.day} {c.time} · Resp: {c.leader}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                        <Badge variant="default">{c.members_count} membres</Badge>
                        {c.presences.length > 0 && (
                          <span style={{ fontSize: 10, color: "#0d9488", fontWeight: 600 }}>
                            Dernière réunion: {c.presences[0].present} présents
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, marginLeft: 8 }}>
                      <button onClick={(e) => { e.stopPropagation(); moveCell(idx, -1); }} style={{ background: "#f1f5f9", border: "none", borderRadius: 4, width: 24, height: 20, cursor: "pointer", fontSize: 10 }}>▲</button>
                      <button onClick={(e) => { e.stopPropagation(); moveCell(idx, 1); }} style={{ background: "#f1f5f9", border: "none", borderRadius: 4, width: 24, height: 20, cursor: "pointer", fontSize: 10 }}>▼</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCell && (
              <div style={{ background: "#fff", borderRadius: 16, border: `2px solid ${cellColor}`, padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{selectedCell.name}</h3>
                    <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{selectedCell.quartier} · {selectedCell.day} à {selectedCell.time}</p>
                  </div>
                  <Btn variant="ghost" size="sm" icon={X} onClick={() => setSelectedCell(null)} />
                </div>

                <div style={{ padding: "10px 14px", background: "#f0fdfa", borderRadius: 10, marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
                  <div><p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>Responsable</p><p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{selectedCell.leader}</p></div>
                  <div><p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>Membres</p><p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0d9488" }}>{selectedCell.members_count}</p></div>
                </div>

                <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Membres ({selectedCell.members.length})</h4>
                {selectedCell.members.length === 0 && <p style={{ fontSize: 12, color: "#94a3b8" }}>Aucun membre assigné</p>}
                {selectedCell.members.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #f8fafc" }}>
                    <Avatar name={m} size={28} color={cellColor} />
                    <span style={{ fontSize: 13, color: "#0f172a" }}>{m}</span>
                  </div>
                ))}

                <h4 style={{ margin: "14px 0 10px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Historique des présences</h4>
                {selectedCell.presences.length === 0 && <p style={{ fontSize: 12, color: "#94a3b8" }}>Aucune réunion enregistrée</p>}
                {selectedCell.presences.map((p, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                    <span style={{ fontSize: 12, color: "#475569" }}>{new Date(p.date).toLocaleDateString("fr")}</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Badge variant="success">{p.present} présents</Badge>
                      <Badge variant="danger">{p.absent} absents</Badge>
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                  <Btn size="sm" icon={Check} onClick={() => { setShowCellPresenceModal(true); setPresenceForm({ present: "", absent: "" }); }}>Marquer présence</Btn>
                  <Btn size="sm" variant="danger" onClick={() => { if(confirm(`Promouvoir "${selectedCell.name}" en annexe ?`)) { setUnits(prev => [...prev, { id: Date.now(), name: selectedCell.name, type: "Annexe", address: selectedCell.quartier, leader: selectedCell.leader, members_count: selectedCell.members_count, finances: { entrees: 0, sorties: 0 }, presences: [] }]); setCells(prev => prev.filter(x => x.id !== selectedCell.id)); setSelectedCell(null); setMainTab("annexes"); } }}>↑ Promouvoir en annexe</Btn>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ ANNEXES TAB ═══ */}
      {mainTab === "annexes" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            <StatCard icon={Network} title="Annexes" value={units.length} color="#3b82f6" />
            <StatCard icon={Users} title="Membres total" value={totalMembers} color="#8b5cf6" />
            <StatCard icon={ArrowUpCircle} title="Entrées" value={`${(totalEntrees/1000).toFixed(0)}k F`} color="#10b981" />
            <StatCard icon={Wallet} title="Solde" value={`${((totalEntrees-totalSorties)/1000).toFixed(0)}k F`} color="#0d9488" />
          </div>

          <TabBar tabs={[{ key: "carte", label: "Cartographie" }, { key: "liste", label: "Liste & Priorité" }, { key: "finances", label: "Finances" }]} active={tab} onChange={setTab} />

          {tab === "liste" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 8px" }}>Utilisez les flèches ▲▼ pour réordonner la priorité d'affichage</p>
              {units.map((u, idx) => (
                <div key={u.id} style={{ background: "#fff", borderRadius: 14, padding: 18, border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <button onClick={() => moveUnit(idx, -1)} style={{ background: "#f1f5f9", border: "none", borderRadius: 4, width: 28, height: 22, cursor: "pointer", fontSize: 11 }}>▲</button>
                    <button onClick={() => moveUnit(idx, 1)} style={{ background: "#f1f5f9", border: "none", borderRadius: 4, width: 28, height: 22, cursor: "pointer", fontSize: 11 }}>▼</button>
                  </div>
                  <div style={{ width: 8, height: 40, borderRadius: 4, background: typeColors[u.type] || "#64748b", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{u.name}</h3>
                      <Badge variant="info">{u.type}</Badge>
                    </div>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8" }}>{u.address} · Resp: {u.leader} · {u.members_count} membres</p>
                  </div>
                  <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => { if(confirm(`Supprimer ${u.name} ?`)) setUnits(prev => prev.filter(x => x.id !== u.id)); }} />
                </div>
              ))}
            </div>
          )}

          {tab === "carte" && (() => {
            // Leaflet map — rendered via useEffect, markers draggable
            const mapRef = useRef(null);
            const leafletMap = useRef(null);
            const markersRef = useRef({});

            // L'église mère (fixe, marqueur spécial)
            const EGLISE_MERE = { id: "mere", name: "Église Foursquare Lumière", type: "Église mère", lat: 5.354, lng: -4.008, color: "#0d9488", icon: "⛪" };

            // Tous les points sur la carte = église mère + annexes
            const allPoints = [EGLISE_MERE, ...units];

            useEffect(() => {
              if (leafletMap.current || !mapRef.current) return;

              // Inject Leaflet CSS
              if (!document.getElementById("leaflet-css")) {
                const link = document.createElement("link");
                link.id = "leaflet-css";
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(link);
              }

              const initMap = () => {
                if (typeof L === "undefined") { setTimeout(initMap, 200); return; }
                const map = L.map(mapRef.current, { center: [6.5, -5.5], zoom: 7 });
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
                leafletMap.current = map;
                renderMarkers();
              };

              const script = document.createElement("script");
              script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
              script.onload = initMap;
              document.head.appendChild(script);

              return () => { if (leafletMap.current) { leafletMap.current.remove(); leafletMap.current = null; } };
            }, []);

            const renderMarkers = () => {
              const map = leafletMap.current;
              if (!map || typeof L === "undefined") return;

              // Clear existing markers
              Object.values(markersRef.current).forEach(m => map.removeLayer(m));
              markersRef.current = {};

              allPoints.forEach(pt => {
                const color = pt.id === "mere" ? "#0d9488" : (typeColors[pt.type] || "#64748b");
                const isMere = pt.id === "mere";
                const icon = L.divIcon({
                  html: `<div style="
                    width:${isMere ? 44 : 36}px; height:${isMere ? 44 : 36}px;
                    border-radius:50%; background:${color};
                    border:3px solid #fff; box-shadow:0 3px 12px rgba(0,0,0,0.3);
                    display:flex; align-items:center; justify-content:center;
                    font-size:${isMere ? 20 : 16}px; cursor:${isMere ? "default" : "grab"};
                    position:relative;
                  ">${isMere ? "⛪" : (pt.type === "Annexe" ? "🏛️" : pt.type === "Église fille" ? "⛪" : "🙏")}
                  <div style="
                    position:absolute; bottom:-22px; left:50%; transform:translateX(-50%);
                    white-space:nowrap; background:#fff; padding:2px 7px; border-radius:5px;
                    font-size:10px; font-weight:700; color:#0f172a;
                    box-shadow:0 2px 6px rgba(0,0,0,0.15); pointer-events:none;
                  ">${pt.name.length > 20 ? pt.name.slice(0,18)+"…" : pt.name}</div></div>`,
                  className: "", iconSize: [isMere ? 44 : 36, 60], iconAnchor: [isMere ? 22 : 18, isMere ? 22 : 18],
                });

                const marker = L.marker([pt.lat, pt.lng], {
                  icon, draggable: !isMere, autoPan: true
                }).addTo(map);

                if (!isMere) {
                  marker.on("dragend", (e) => {
                    const { lat, lng } = e.target.getLatLng();
                    setUnits(prev => prev.map(u => u.id === pt.id ? { ...u, lat, lng } : u));
                  });
                  marker.on("click", () => setSelectedUnit(pt));
                }

                // Draw line from mère to each point
                if (!isMere) {
                  L.polyline([[EGLISE_MERE.lat, EGLISE_MERE.lng], [pt.lat, pt.lng]], {
                    color, weight: 1.5, dashArray: "6 4", opacity: 0.5
                  }).addTo(map);
                }

                markersRef.current[pt.id] = marker;
              });
            };

            // Re-render markers when units change
            useEffect(() => { renderMarkers(); }, [units]);

            // Add point by clicking on map
            const [addMode, setAddMode] = useState(false);
            useEffect(() => {
              const map = leafletMap.current;
              if (!map) return;
              if (addMode) {
                map.getContainer().style.cursor = "crosshair";
                const handler = (e) => {
                  setForm(f => ({ ...f, lat: e.latlng.lat.toFixed(5), lng: e.latlng.lng.toFixed(5) }));
                  setShowModal(true);
                  setAddMode(false);
                };
                map.once("click", handler);
                return () => map.off("click", handler);
              } else {
                map.getContainer().style.cursor = "";
              }
            }, [addMode]);

            return (
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #f1f5f9" }}>
                {/* Toolbar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[
                      { col: "#0d9488", label: "⛪ Église mère" },
                      ...unitTypes.map(t => ({ col: typeColors[t] || "#64748b", label: t + " (" + units.filter(u => u.type === t).length + ")" }))
                    ].map(lg => (
                      <div key={lg.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: lg.col, background: `${lg.col}12`, padding: "4px 10px", borderRadius: 20, border: `1px solid ${lg.col}25` }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: lg.col }} />{lg.label}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn size="sm" variant={addMode ? "primary" : "secondary"}
                      onClick={() => setAddMode(a => !a)}>
                      {addMode ? "🖱️ Cliquer sur la carte..." : "+ Ajouter une unité"}
                    </Btn>
                  </div>
                </div>

                {/* Leaflet map container */}
                <div ref={mapRef} style={{ height: 460, width: "100%", zIndex: 0 }} />

                {/* Drag hint */}
                <div style={{ padding: "8px 16px", background: "#f8fafc", borderTop: "1px solid #f1f5f9", fontSize: 11, color: "#94a3b8", display: "flex", justifyContent: "space-between" }}>
                  <span>🖱️ Glissez un marqueur pour changer sa position · Cliquez pour voir le détail</span>
                  <span>{units.length} unité{units.length > 1 ? "s" : ""} · {cells.length} cellule{cells.length > 1 ? "s" : ""}</span>
                </div>

                {/* Selected unit detail */}
                {selectedUnit && selectedUnit.id !== "mere" && (
                  <div style={{ padding: "16px 20px", background: "#fff", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${typeColors[selectedUnit.type] || "#64748b"}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏛️</div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{selectedUnit.name}</h3>
                        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{selectedUnit.type} · {selectedUnit.address} · Resp: {selectedUnit.leader}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 10, color: "#cbd5e1" }}>📍 {selectedUnit.lat?.toFixed ? selectedUnit.lat.toFixed(4) : selectedUnit.lat}, {selectedUnit.lng?.toFixed ? selectedUnit.lng.toFixed(4) : selectedUnit.lng}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <Badge variant="info">{selectedUnit.members_count} membres</Badge>
                      <Badge variant="success">{((selectedUnit.finances.entrees - selectedUnit.finances.sorties)/1000).toFixed(0)}k F</Badge>
                      <Btn size="sm" variant="danger" icon={Trash2} onClick={() => {
                        if (confirm(`Supprimer ${selectedUnit.name} ?`)) {
                          setUnits(prev => prev.filter(u => u.id !== selectedUnit.id));
                          setSelectedUnit(null);
                        }
                      }}>Supprimer</Btn>
                      <Btn variant="ghost" size="sm" icon={X} onClick={() => setSelectedUnit(null)} />
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {tab === "finances" && (
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ background: "#f8fafc" }}>
                  {["Unité", "Type", "Entrées", "Sorties", "Solde"].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {units.map(u => (
                    <tr key={u.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{u.name}</td>
                      <td style={{ padding: "12px 16px" }}><Badge variant="info">{u.type}</Badge></td>
                      <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#10b981" }}>{u.finances.entrees.toLocaleString()} F</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#ef4444" }}>{u.finances.sorties.toLocaleString()} F</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 800, color: (u.finances.entrees - u.finances.sorties) >= 0 ? "#10b981" : "#ef4444" }}>{(u.finances.entrees - u.finances.sorties).toLocaleString()} F</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODALS */}
      <Modal open={showCellModal} onClose={() => setShowCellModal(false)} title="Nouvelle cellule">
        <FormField label="Nom de la cellule *"><input style={inputStyle} value={cellForm.name} onChange={e => setCellForm({...cellForm, name: e.target.value})} placeholder="Ex: Cellule Riviera-Golf" /></FormField>
        <FormField label="Quartier"><input style={inputStyle} value={cellForm.quartier} onChange={e => setCellForm({...cellForm, quartier: e.target.value})} placeholder="Ex: Riviera" /></FormField>
        <FormField label="Responsable"><input style={inputStyle} value={cellForm.leader} onChange={e => setCellForm({...cellForm, leader: e.target.value})} /></FormField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FormField label="Jour de réunion">
            <select style={selectStyle} value={cellForm.day} onChange={e => setCellForm({...cellForm, day: e.target.value})}>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </FormField>
          <FormField label="Heure"><input style={inputStyle} value={cellForm.time} onChange={e => setCellForm({...cellForm, time: e.target.value})} placeholder="19h00" /></FormField>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowCellModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(cellForm.name) { setCells(prev => [...prev, { ...cellForm, id: Date.now(), members: [], members_count: 0, presences: [] }]); setShowCellModal(false); } }}>Créer</Btn>
        </div>
      </Modal>

      <Modal open={showCellPresenceModal} onClose={() => setShowCellPresenceModal(false)} title={`Présence cellule — ${selectedCell?.name || ""}`}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormField label="Présents"><input style={inputStyle} type="number" value={presenceForm.present} onChange={e => setPresenceForm({...presenceForm, present: e.target.value})} /></FormField>
          <FormField label="Absents"><input style={inputStyle} type="number" value={presenceForm.absent} onChange={e => setPresenceForm({...presenceForm, absent: e.target.value})} /></FormField>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowCellPresenceModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(selectedCell && presenceForm.present) { const updated = { ...selectedCell, presences: [{ date: new Date().toISOString().split("T")[0], present: parseInt(presenceForm.present)||0, absent: parseInt(presenceForm.absent)||0 }, ...selectedCell.presences] }; setCells(prev => prev.map(c => c.id === selectedCell.id ? updated : c)); setSelectedCell(updated); setShowCellPresenceModal(false); } }}>Enregistrer</Btn>
        </div>
      </Modal>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouvelle annexe">
        <FormField label="Nom *"><input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></FormField>
        <FormField label="Type">
          <select style={selectStyle} value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            {unitTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </FormField>
        <FormField label="Responsable"><input style={inputStyle} value={form.leader} onChange={e => setForm({...form, leader: e.target.value})} /></FormField>
        <FormField label="Adresse"><input style={inputStyle} value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></FormField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormField label="Latitude">
            <input style={inputStyle} type="number" step="0.0001" value={form.lat || ""} onChange={e => setForm({...form, lat: parseFloat(e.target.value)})} placeholder="Ex: 5.354" />
          </FormField>
          <FormField label="Longitude">
            <input style={inputStyle} type="number" step="0.0001" value={form.lng || ""} onChange={e => setForm({...form, lng: parseFloat(e.target.value)})} placeholder="Ex: -4.008" />
          </FormField>
        </div>
        {form.lat && <p style={{ fontSize: 11, color: "#0d9488", margin: "0 0 4px" }}>📍 Position sélectionnée sur la carte</p>}
        <FormField label="Nombre de membres"><input style={inputStyle} type="number" value={form.members_count || ""} onChange={e => setForm({...form, members_count: parseInt(e.target.value)||0})} placeholder="0" /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => {
            if (!form.name) return;
            setUnits(prev => [...prev, {
              ...form,
              id: Date.now(),
              members_count: form.members_count || 0,
              lat: parseFloat(form.lat) || 5.354 + (Math.random()-0.5)*2,
              lng: parseFloat(form.lng) || -4.008 + (Math.random()-0.5)*2,
              finances: { entrees: 0, sorties: 0 },
              presences: []
            }]);
            setShowModal(false);
            setForm({ name: "", type: "Annexe", address: "", leader: "" });
          }}>Créer</Btn>
        </div>
      </Modal>

      <Modal open={showTypeModal} onClose={() => setShowTypeModal(false)} title="Types d'unités">
        {unitTypes.map((t, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#f8fafc", borderRadius: 8, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: typeColors[t] || "#64748b" }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>{t}</span>
            </div>
            <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => setUnitTypes(prev => prev.filter(x => x !== t))} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input style={{ ...inputStyle, flex: 1 }} value={newType} onChange={e => setNewType(e.target.value)} placeholder="Ex: Mission" />
          <Btn onClick={() => { if(newType.trim()) { setUnitTypes(prev => [...prev, newType.trim()]); setNewType(""); } }}>Ajouter</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// COMMITTEES PAGE
// ═══════════════════════════════════════════════════════
const CommitteesPage = () => {
  const [committees, setCommittees] = useState([
    { id: 1, name: "Comité d'organisation", description: "Organisation des événements", leader: "Esther Koné", members: ["Grace Achi", "David Tra", "Paul Yao", "Ruth Diallo"], color: "#8b5cf6" },
    { id: 2, name: "Service d'ordre", description: "Sécurité pendant les cultes", leader: "Moïse Dembélé", members: ["Samuel Ouattara", "Daniel Konan", "Jean Kouadio"], color: "#f59e0b" },
    { id: 3, name: "Équipe média", description: "Sonorisation, vidéo, réseaux sociaux", leader: "Daniel Konan", members: ["Sarah Touré", "Paul Yao"], color: "#3b82f6" },
    { id: 4, name: "Secrétariat", description: "Administration et documentation", leader: "Esther Koné", members: ["Marie Bamba", "Grace Achi"], color: "#10b981" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCom, setSelectedCom] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", leader: "" });
  const comColors = ["#8b5cf6", "#f59e0b", "#3b82f6", "#10b981", "#ec4899", "#0d9488"];

  const moveCom = (idx, dir) => {
    const arr = [...committees];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setCommittees(arr);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Comités & Services</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{committees.length} comités</p></div>
        <Btn icon={Plus} onClick={() => { setForm({ name: "", description: "", leader: "" }); setShowModal(true); }}>Nouveau comité</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: selectedCom ? "1fr 1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {committees.map((c, idx) => (
            <div key={c.id} onClick={() => setSelectedCom(c)} style={{ background: "#fff", borderRadius: 14, padding: 20, border: selectedCom?.id === c.id ? `2px solid ${c.color}` : "1px solid #f1f5f9", borderLeft: `4px solid ${c.color}`, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{c.name}</h3>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8" }}>{c.description}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={e => e.stopPropagation()}>
                  <Badge variant="default">{(c.members||[]).length} membres</Badge>
                  <button onClick={() => moveCom(idx, -1)} disabled={idx === 0} style={{ width: 24, height: 24, borderRadius: 5, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: idx === 0 ? "not-allowed" : "pointer", opacity: idx === 0 ? 0.3 : 1, fontSize: 10 }}>▲</button>
                  <button onClick={() => moveCom(idx, 1)} disabled={idx === committees.length - 1} style={{ width: 24, height: 24, borderRadius: 5, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: idx === committees.length - 1 ? "not-allowed" : "pointer", opacity: idx === committees.length - 1 ? 0.3 : 1, fontSize: 10 }}>▼</button>
                  <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => { if(confirm(`Supprimer ${c.name} ?`)) setCommittees(prev => prev.filter(x => x.id !== c.id)); }} />
                </div>
              </div>
              <div style={{ padding: "8px 0 0", fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 6 }}>
                <Avatar name={c.leader} size={20} color={c.color} />Responsable : {c.leader}
              </div>
            </div>
          ))}
        </div>
        {selectedCom && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{selectedCom.name}</h3>
              <Btn variant="ghost" size="sm" icon={X} onClick={() => setSelectedCom(null)} />
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px" }}>{selectedCom.description} · Resp: {selectedCom.leader}</p>
            <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Membres ({(selectedCom.members||[]).length})</h4>
            {(selectedCom.members||[]).map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                <Avatar name={m} size={28} color={selectedCom.color} />
                <span style={{ fontSize: 13, color: "#0f172a" }}>{m}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouveau comité">
        <FormField label="Nom *"><input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ex: Service d'ordre" /></FormField>
        <FormField label="Description"><input style={inputStyle} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></FormField>
        <FormField label="Responsable"><input style={inputStyle} value={form.leader} onChange={e => setForm({...form, leader: e.target.value})} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(form.name) { setCommittees(prev => [...prev, { ...form, id: Date.now(), members: [], color: comColors[prev.length % comColors.length] }]); setShowModal(false); } }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// GOALS PAGE
// ═══════════════════════════════════════════════════════
const GoalsPage = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: "300 membres actifs", description: "Atteindre 300 membres actifs d'ici fin 2026", goal_type: "members", target: 300, current: 240, icon: Users, color: "#0d9488" },
    { id: 2, title: "Budget annuel 15M", description: "Collecter 15 millions FCFA en 2026", goal_type: "finances", target: 15000000, current: 5200000, icon: DollarSign, color: "#10b981" },
    { id: 3, title: "5 nouvelles cellules", description: "Ouvrir 5 nouvelles cellules de maison", goal_type: "cells", target: 5, current: 2, icon: Network, color: "#3b82f6" },
    { id: 4, title: "Taux de présence 85%", description: "Taux moyen de présence de 85% aux cultes", goal_type: "attendance", target: 85, current: 78, icon: Activity, color: "#8b5cf6" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", target: "", current: "0", goal_type: "members" });
  const typeIcons = { members: Users, finances: DollarSign, cells: Network, attendance: Activity };
  const typeColors = { members: "#0d9488", finances: "#10b981", cells: "#3b82f6", attendance: "#8b5cf6" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Objectifs</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Suivi des objectifs de l'église</p></div>
        <Btn icon={Plus} onClick={() => { setForm({ title: "", description: "", target: "", current: "0", goal_type: "members" }); setShowModal(true); }}>Nouvel objectif</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {goals.map(g => {
          const pct = Math.round((g.current / g.target) * 100);
          const Ic = g.icon || typeIcons[g.goal_type] || Target;
          const col = g.color || typeColors[g.goal_type] || "#0d9488";
          return (
            <div key={g.id} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9", position: "relative" }}>
              <button onClick={() => { if(confirm("Voulez-vous vraiment supprimer cet objectif ?")) setGoals(prev => prev.filter(x => x.id !== g.id)); }} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", opacity: 0.4 }}><Trash2 size={14} color="#ef4444" /></button>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${col}15`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic size={22} color={col} /></div>
                <div><h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{g.title}</h3>
                <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{g.description}</p></div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: "#64748b" }}>Progression</span>
                  <span style={{ fontWeight: 700, color: col }}>{pct}%</span>
                </div>
                <div style={{ width: "100%", height: 8, background: "#f1f5f9", borderRadius: 4 }}>
                  <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: `linear-gradient(90deg, ${col}, ${col}cc)`, borderRadius: 4, transition: "width 0.5s" }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8" }}>
                <span>Actuel: <strong style={{ color: "#0f172a" }}>{g.goal_type === "finances" ? `${(g.current/1000000).toFixed(1)}M` : g.current}</strong></span>
                <span>Objectif: <strong style={{ color: "#0f172a" }}>{g.goal_type === "finances" ? `${(g.target/1000000).toFixed(0)}M` : g.target}{g.goal_type === "attendance" ? "%" : ""}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouvel objectif">
        <FormField label="Titre" required><input style={inputStyle} value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Ex: 300 membres actifs" /></FormField>
        <FormField label="Description"><input style={inputStyle} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></FormField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <FormField label="Type">
            <select style={selectStyle} value={form.goal_type} onChange={e => setForm({...form, goal_type: e.target.value})}>
              <option value="members">Membres</option><option value="finances">Finances</option>
              <option value="cells">Cellules</option><option value="attendance">Présence</option>
            </select>
          </FormField>
          <FormField label="Objectif"><input style={inputStyle} type="number" value={form.target} onChange={e => setForm({...form, target: e.target.value})} /></FormField>
          <FormField label="Actuel"><input style={inputStyle} type="number" value={form.current} onChange={e => setForm({...form, current: e.target.value})} /></FormField>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { setGoals(prev => [...prev, { ...form, id: Date.now(), target: parseFloat(form.target)||0, current: parseFloat(form.current)||0, icon: typeIcons[form.goal_type], color: typeColors[form.goal_type] }]); setShowModal(false); }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// TESTIMONIALS PAGE
// ═══════════════════════════════════════════════════════
const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([
    { id: 1, title: "Guérison miraculeuse", content: "Après 3 ans de maladie, Dieu m'a guéri lors de la veillée de prière. Je rends gloire à Dieu pour sa fidélité.", author: "Grace Achi", date: "2026-03-15", category: "guerison", media: "texte" },
    { id: 2, title: "Emploi retrouvé", content: "Après 8 mois de chômage et beaucoup de prières, j'ai obtenu un emploi. Dieu est fidèle !", author: "David Tra", date: "2026-03-10", category: "provision", media: "texte" },
    { id: 3, title: "Réconciliation familiale", content: "Ma famille était divisée depuis 5 ans. Grâce aux prières de l'église, nous nous sommes réconciliés.", author: "Ruth Diallo", date: "2026-02-28", category: "famille", media: "video", mediaUrl: "https://youtube.com/watch?v=exemple" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchT, setSearchT] = useState("");
  const [periodT, setPeriodT] = useState("all");
  const [form, setForm] = useState({ title: "", content: "", author: "", category: "autre", media: "texte", mediaUrl: "" });
  const catColors = { guerison: "#10b981", provision: "#f59e0b", famille: "#ec4899", autre: "#3b82f6" };
  const catLabels = { guerison: "Guérison", provision: "Provision", famille: "Famille", autre: "Autre" };
  const mediaIcons = { texte: "📝", video: "🎥", audio: "🎙️" };

  const filtered = testimonials.filter(t => {
    const matchSearch = !searchT || `${t.title} ${t.author}`.toLowerCase().includes(searchT.toLowerCase());
    const matchPeriod = periodT === "all" || t.category === periodT;
    return matchSearch && matchPeriod;
  });

  const openNew = () => { setEditing(null); setForm({ title: "", content: "", author: "", category: "autre", media: "texte", mediaUrl: "" }); setShowModal(true); };
  const openEdit = (t) => { setEditing(t); setForm({ title: t.title, content: t.content, author: t.author, category: t.category, media: t.media || "texte", mediaUrl: t.mediaUrl || "" }); setShowModal(true); };
  const handleSave = () => {
    if (editing) {
      setTestimonials(prev => prev.map(t => t.id === editing.id ? { ...t, ...form } : t));
    } else {
      setTestimonials(prev => [...prev, { ...form, id: Date.now(), date: new Date().toISOString().split("T")[0] }]);
    }
    setShowModal(false); setEditing(null);
  };
  const handleDelete = (id) => { if(confirm("Supprimer ce témoignage ?")) setTestimonials(prev => prev.filter(t => t.id !== id)); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div><h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Témoignages</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{filtered.length} témoignages</p></div>
        <Btn icon={Plus} onClick={openNew}>Nouveau témoignage</Btn>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Search size={15} color="#94a3b8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input value={searchT} onChange={e => setSearchT(e.target.value)} placeholder="Rechercher par titre ou nom..." style={{ ...inputStyle, paddingLeft: 36 }} />
        </div>
        <select value={periodT} onChange={e => setPeriodT(e.target.value)} style={{ ...selectStyle, width: 160 }}>
          <option value="all">Toutes catégories</option>
          {Object.entries(catLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map(t => (
          <div key={t.id} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9", borderLeft: `4px solid ${catColors[t.category] || "#3b82f6"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{t.title}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <Avatar name={t.author} size={20} color={catColors[t.category]} />
                  <span style={{ fontSize: 12, color: "#64748b" }}>{t.author} · {new Date(t.date).toLocaleDateString("fr")}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>{mediaIcons[t.media] || "📝"}</span>
                <Badge variant="default" style={{ background: `${catColors[t.category]}15`, color: catColors[t.category] }}>{catLabels[t.category]}</Badge>
                <Btn variant="ghost" size="sm" icon={Edit} onClick={() => openEdit(t)} />
                <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => handleDelete(t.id)} />
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#475569", lineHeight: 1.6, fontStyle: "italic" }}>"{t.content}"</p>
            {t.media !== "texte" && t.mediaUrl && (
              <div style={{ marginTop: 10, padding: "8px 12px", background: t.media === "video" ? "#eff6ff" : "#fdf4ff", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{mediaIcons[t.media]}</span>
                <span style={{ fontSize: 11, color: "#64748b" }}>{t.media === "video" ? "Vidéo" : "Audio"} : </span>
                <span style={{ fontSize: 11, color: "#3b82f6", fontWeight: 600 }}>{t.mediaUrl}</span>
              </div>
            )}
          </div>
        ))}
        {testimonials.length === 0 && <EmptyState icon={MessageSquare} title="Aucun témoignage" description="Ajoutez le premier témoignage de votre église" />}
      </div>
      <Modal open={showModal} onClose={() => { setShowModal(false); setEditing(null); }} title={editing ? "Modifier le témoignage" : "Nouveau témoignage"}>
        <FormField label="Titre" required><input style={inputStyle} value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></FormField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormField label="Auteur"><input style={inputStyle} value={form.author} onChange={e => setForm({...form, author: e.target.value})} /></FormField>
          <FormField label="Catégorie">
            <select style={selectStyle} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              {Object.entries(catLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </FormField>
        </div>
        <FormField label="Témoignage" required><textarea style={{...inputStyle, minHeight: 100, resize: "vertical"}} value={form.content} onChange={e => setForm({...form, content: e.target.value})} /></FormField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
          <FormField label="Type de média">
            <select style={selectStyle} value={form.media} onChange={e => setForm({...form, media: e.target.value})}>
              <option value="texte">📝 Texte</option>
              <option value="video">🎥 Vidéo</option>
              <option value="audio">🎙️ Audio</option>
            </select>
          </FormField>
          {form.media !== "texte" && (
            <FormField label={form.media === "video" ? "Lien vidéo (YouTube, etc.)" : "Lien audio"}>
              <input style={inputStyle} value={form.mediaUrl} onChange={e => setForm({...form, mediaUrl: e.target.value})} placeholder={form.media === "video" ? "https://youtube.com/watch?v=..." : "https://drive.google.com/..."} />
            </FormField>
          )}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => { setShowModal(false); setEditing(null); }}>Annuler</Btn>
          <Btn onClick={handleSave}>{editing ? "Enregistrer" : "Publier"}</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// MENTORSHIPS PAGE
// ═══════════════════════════════════════════════════════
const MentorshipsPage = () => {
  const [tab, setTab] = useState("mentorat");
  const [mentorships, setMentorships] = useState([
    { id: 1, mentor: "Jean Kouadio", mentee: "David Tra", status: "actif", topic: "Leadership chrétien", sessions: 8, start: "2026-01-15" },
    { id: 2, mentor: "Jean Kouadio", mentee: "Paul Yao", status: "actif", topic: "Leadership chrétien", sessions: 5, start: "2026-02-10" },
    { id: 3, mentor: "Marie Bamba", mentee: "Sarah Touré", status: "actif", topic: "Bases de la foi", sessions: 4, start: "2026-02-20" },
    { id: 4, mentor: "Samuel Ouattara", mentee: "Ruth Diallo", status: "termine", topic: "Ministère de louange", sessions: 20, start: "2025-06-01" },
  ]);
  const [formations, setFormations] = useState([
    { id: 1, title: "Parcours Nouveau Croyant", description: "12 semaines pour poser les fondations de la foi", steps: ["Qui est Dieu ?", "La prière", "La Bible", "Le baptême", "La communion", "Le service"], enrolled: ["David Tra", "Sarah Touré", "Grace Achi"], color: "#0d9488" },
    { id: 2, title: "Formation Leaders", description: "8 semaines pour former les futurs responsables", steps: ["Vision", "Intégrité", "Communication", "Gestion d'équipe"], enrolled: ["Paul Yao", "Jean Kouadio"], color: "#3b82f6" },
    { id: 3, title: "Parcours Mariage", description: "Préparation au mariage chrétien en 6 sessions", steps: ["Fondement biblique", "Communication", "Finances", "Intimité", "Famille", "Engagement"], enrolled: ["Moïse Dembélé"], color: "#ec4899" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [form, setForm] = useState({ mentor: "", mentee: "", topic: "" });
  const [formForm, setFormForm] = useState({ title: "", description: "", steps: "", enrolled: "" });
  const statusMap = { actif: { label: "En cours", variant: "success" }, termine: { label: "Terminé", variant: "default" } };

  // Group mentorships by mentor
  const grouped = {};
  mentorships.forEach(m => { if (!grouped[m.mentor]) grouped[m.mentor] = []; grouped[m.mentor].push(m); });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Mentorat & Formation</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{mentorships.length} parcours · {formations.length} formations</p></div>
        <div style={{ display: "flex", gap: 8 }}>
          {tab === "mentorat" && <Btn icon={Plus} onClick={() => { setForm({ mentor: "", mentee: "", topic: "" }); setShowModal(true); }}>Nouveau mentorat</Btn>}
          {tab === "formation" && <Btn icon={Plus} onClick={() => { setFormForm({ title: "", description: "", steps: "", enrolled: "" }); setShowFormModal(true); }}>Nouvelle formation</Btn>}
        </div>
      </div>

      <TabBar tabs={[{ key: "mentorat", label: "Mentorat" }, { key: "formation", label: "Parcours de formation" }]} active={tab} onChange={setTab} />

      {tab === "mentorat" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {Object.entries(grouped).map(([mentor, mentees]) => (
            <div key={mentor} style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", background: "#f8fafc", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #f1f5f9" }}>
                <Avatar name={mentor} size={40} color="#0d9488" />
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{mentor}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>Mentor · {mentees.length} mentoré{mentees.length > 1 ? "s" : ""}</p>
                </div>
              </div>
              {mentees.map(m => (
                <div key={m.id} style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f8fafc" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar name={m.mentee} size={32} color="#3b82f6" />
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{m.mentee}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{m.topic} · {m.sessions} sessions</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Badge variant={statusMap[m.status]?.variant}>{statusMap[m.status]?.label}</Badge>
                    {m.status === "actif" && <Btn variant="ghost" size="sm" onClick={() => setMentorships(prev => prev.map(x => x.id === m.id ? {...x, sessions: x.sessions+1} : x))}>+1</Btn>}
                    <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => setMentorships(prev => prev.filter(x => x.id !== m.id))} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "formation" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {formations.map(f => (
            <div key={f.id} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9", borderTop: `4px solid ${f.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{f.title}</h3>
                <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => { if(confirm(`Supprimer le parcours "${f.title}" ?`)) setFormations(prev => prev.filter(x => x.id !== f.id)); }} />
              </div>
              <p style={{ margin: "0 0 14px", fontSize: 12, color: "#64748b" }}>{f.description}</p>
              <div style={{ marginBottom: 14 }}>
                <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Étapes du parcours</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {f.steps.map((s, i) => (
                    <span key={i} style={{ padding: "3px 10px", background: `${f.color}10`, color: f.color, borderRadius: 8, fontSize: 10, fontWeight: 600, border: `1px solid ${f.color}20` }}>{i+1}. {s}</span>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
                <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Inscrits ({f.enrolled.length})</p>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {f.enrolled.map((e, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", background: "#f8fafc", borderRadius: 6, fontSize: 11, color: "#475569" }}>
                      <Avatar name={e} size={18} color={f.color} />{e}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouveau mentorat">
        <FormField label="Mentor" required><input style={inputStyle} value={form.mentor} onChange={e => setForm({...form, mentor: e.target.value})} placeholder="Nom du mentor" /></FormField>
        <FormField label="Mentoré(s)" required>
          <input style={inputStyle} value={form.mentee} onChange={e => setForm({...form, mentee: e.target.value})} placeholder="Nom du mentoré" />
          <p style={{ margin: "4px 0 0", fontSize: 10, color: "#94a3b8" }}>Un mentor peut avoir plusieurs mentorés — créez un mentorat par personne</p>
        </FormField>
        <FormField label="Sujet"><input style={inputStyle} value={form.topic} onChange={e => setForm({...form, topic: e.target.value})} placeholder="Ex: Leadership chrétien" /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(form.mentor && form.mentee) { setMentorships(prev => [...prev, { ...form, id: Date.now(), sessions: 0, status: "actif", start: new Date().toISOString().split("T")[0] }]); setShowModal(false); } }}>Créer</Btn>
        </div>
      </Modal>

      <Modal open={showFormModal} onClose={() => setShowFormModal(false)} title="Nouveau parcours de formation" width={550}>
        <FormField label="Titre" required><input style={inputStyle} value={formForm.title} onChange={e => setFormForm({...formForm, title: e.target.value})} placeholder="Ex: Parcours Nouveau Croyant" /></FormField>
        <FormField label="Description"><textarea style={{...inputStyle, minHeight: 60, resize: "vertical"}} value={formForm.description} onChange={e => setFormForm({...formForm, description: e.target.value})} /></FormField>
        <FormField label="Étapes (une par ligne)"><textarea style={{...inputStyle, minHeight: 80, resize: "vertical"}} value={formForm.steps} onChange={e => setFormForm({...formForm, steps: e.target.value})} placeholder={"Qui est Dieu ?\nLa prière\nLa Bible"} /></FormField>
        <FormField label="Inscrits (noms séparés par des virgules)"><input style={inputStyle} value={formForm.enrolled} onChange={e => setFormForm({...formForm, enrolled: e.target.value})} placeholder="David Tra, Sarah Touré" /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowFormModal(false)}>Annuler</Btn>
          <Btn onClick={() => {
            if(formForm.title) {
              setFormations(prev => [...prev, { id: Date.now(), title: formForm.title, description: formForm.description, steps: formForm.steps.split("\n").filter(Boolean), enrolled: formForm.enrolled.split(",").map(s => s.trim()).filter(Boolean), color: ["#0d9488","#3b82f6","#8b5cf6","#ec4899","#f59e0b"][prev.length % 5] }]);
              setShowFormModal(false);
            }
          }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// QUIZ PAGE
// ═══════════════════════════════════════════════════════
const QuizPage = () => {
  const [tab, setTab] = useState("quiz");
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: "Les patriarches de la Bible", category: "Ancien Testament", difficulty: "facile", questions: 10, plays: 45, avg_score: 72 },
    { id: 2, title: "Les miracles de Jésus", category: "Nouveau Testament", difficulty: "moyen", questions: 15, plays: 38, avg_score: 65 },
    { id: 3, title: "Les épîtres de Paul", category: "Nouveau Testament", difficulty: "difficile", questions: 20, plays: 22, avg_score: 58 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Ancien Testament", difficulty: "facile", questions: "10" });
  const diffColors = { facile: "#10b981", moyen: "#f59e0b", difficile: "#ef4444" };

  // Mock rankings
  const topScorers = [
    { name: "Grace Achi", score: 920, group: "Flamme de Feu", avatar: "G" },
    { name: "David Tra", score: 870, group: "Les Conquérants", avatar: "D" },
    { name: "Ruth Diallo", score: 845, group: "Flamme de Feu", avatar: "R" },
    { name: "Paul Yao", score: 810, group: "Les Conquérants", avatar: "P" },
    { name: "Sarah Touré", score: 790, group: "Armée de Dieu", avatar: "S" },
  ];
  const groupRanking = [
    { name: "Flamme de Feu", total: 4200, members: 12, avg: 350, color: "#ef4444" },
    { name: "Les Conquérants", total: 3800, members: 10, avg: 380, color: "#3b82f6" },
    { name: "Armée de Dieu", total: 3500, members: 11, avg: 318, color: "#10b981" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Jeux & Quiz</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Quiz bibliques · Concours · Classements</p></div>
        <Btn icon={Plus} onClick={() => { setForm({ title: "", category: "Ancien Testament", difficulty: "facile", questions: "10" }); setShowModal(true); }}>Créer un quiz</Btn>
      </div>

      <TabBar tabs={[{ key: "quiz", label: "Quiz" }, { key: "classement", label: "Classement individuel" }, { key: "groupes", label: "Classement groupes" }]} active={tab} onChange={setTab} />

      {tab === "quiz" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {quizzes.map(q => (
            <div key={q.id} style={{ background: "#fff", borderRadius: 16, padding: 22, border: "1px solid #f1f5f9", position: "relative" }}>
              <button onClick={() => setQuizzes(prev => prev.filter(x => x.id !== q.id))} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", opacity: 0.3 }}><Trash2 size={14} /></button>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: "#f59e0b15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📝</div>
                <Badge variant="default" style={{ background: `${diffColors[q.difficulty]}15`, color: diffColors[q.difficulty] }}>{q.difficulty}</Badge>
              </div>
              <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{q.title}</h3>
              <p style={{ margin: "0 0 12px", fontSize: 12, color: "#94a3b8" }}>{q.category} · {q.questions} questions</p>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #f1f5f9", fontSize: 12 }}>
                <span style={{ color: "#64748b" }}>{q.plays} parties</span>
                <span style={{ fontWeight: 700, color: "#0d9488" }}>Moy: {q.avg_score}%</span>
              </div>
            </div>
          ))}
          {quizzes.length === 0 && <EmptyState icon={Star} title="Aucun quiz" description="Créez votre premier quiz" />}
        </div>
      )}

      {tab === "classement" && (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>🏆 Top scoreurs individuels</h3>
            <Btn variant="secondary" size="sm" icon={Download} onClick={() => {
              const csv = "Rang,Nom,Score,Groupe\n" + topScorers.map((s,i) => `${i+1},${s.name},${s.score},${s.group}`).join("\n");
              const b = new Blob([csv], {type:"text/csv"}); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href=u; a.download="classement_individuel.csv"; a.click();
            }}>Export</Btn>
          </div>
          {topScorers.map((s, i) => (
            <div key={i} style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #f8fafc", background: i < 3 ? "#fffbeb" : "transparent" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: i < 3 ? 18 : 13, fontWeight: 800, color: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#b45309" : "#64748b", background: i < 3 ? `${i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : "#b45309"}15` : "#f8fafc" }}>
                {i < 3 ? ["🥇","🥈","🥉"][i] : i + 1}
              </div>
              <Avatar name={s.name} size={36} color={i === 0 ? "#f59e0b" : "#0d9488"} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{s.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{s.group}</p>
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: i === 0 ? "#f59e0b" : "#0f172a" }}>{s.score} pts</span>
            </div>
          ))}
        </div>
      )}

      {tab === "groupes" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
            {groupRanking.map((g, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9", borderTop: `4px solid ${g.color}`, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{["🥇","🥈","🥉"][i]}</div>
                <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800, color: "#0f172a" }}>{g.name}</h3>
                <div style={{ fontSize: 28, fontWeight: 900, color: g.color, margin: "8px 0" }}>{g.total} pts</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 12, color: "#64748b" }}>
                  <span>{g.members} membres</span>
                  <span>Moy: {g.avg} pts</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="secondary" size="sm" icon={Download} onClick={() => {
              const csv = "Rang,Groupe,Total,Membres,Moyenne\n" + groupRanking.map((g,i) => `${i+1},${g.name},${g.total},${g.members},${g.avg}`).join("\n");
              const b = new Blob([csv], {type:"text/csv"}); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href=u; a.download="classement_groupes.csv"; a.click();
            }}>Exporter classement</Btn>
          </div>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Créer un quiz">
        <FormField label="Titre" required><input style={inputStyle} value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Ex: Les patriarches de la Bible" /></FormField>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <FormField label="Catégorie">
            <select style={selectStyle} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option>Ancien Testament</option><option>Nouveau Testament</option><option>Culture générale</option><option>Doctrine</option>
            </select>
          </FormField>
          <FormField label="Difficulté">
            <select style={selectStyle} value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}>
              <option value="facile">Facile</option><option value="moyen">Moyen</option><option value="difficile">Difficile</option>
            </select>
          </FormField>
          <FormField label="Nb questions"><input style={inputStyle} type="number" value={form.questions} onChange={e => setForm({...form, questions: e.target.value})} /></FormField>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(form.title) { setQuizzes(prev => [...prev, { ...form, id: Date.now(), questions: parseInt(form.questions)||10, plays: 0, avg_score: 0 }]); setShowModal(false); } }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// ROLE MANAGEMENT PAGE
// ═══════════════════════════════════════════════════════
const RoleManagementPage = () => {
  const modules = [
    { key: "members", label: "Membres", actions: ["Voir les membres", "Créer des membres", "Modifier les membres", "Supprimer les membres"] },
    { key: "finances", label: "Finances", actions: ["Voir les finances", "Créer des transactions", "Modifier les transactions", "Supprimer les transactions"] },
    { key: "events", label: "Événements", actions: ["Voir les événements", "Créer des événements", "Modifier les événements", "Supprimer les événements"] },
    { key: "cultes", label: "Cultes", actions: ["Voir les cultes", "Créer des cultes", "Modifier les cultes", "Supprimer les cultes", "Gérer les présences"] },
    { key: "communication", label: "Communication", actions: ["Gérer le carrousel", "Envoyer des messages"] },
    { key: "visitors", label: "Visiteurs", actions: ["Voir les visiteurs", "Créer des visiteurs", "Modifier les visiteurs"] },
    { key: "params", label: "Paramètres", actions: ["Voir les paramètres", "Modifier les paramètres"] },
    { key: "reports", label: "Rapports", actions: ["Voir les rapports", "Exporter les données"] },
  ];

  const [roles, setRoles] = useState([
    { id: 1, name: "Administrateur", color: "#3b82f6", permissions: modules.reduce((acc, m) => { m.actions.forEach(a => acc[a] = true); return acc; }, {}), custom: false },
    { id: 2, name: "Trésorier", color: "#10b981", permissions: { "Voir les membres": true, "Voir les finances": true, "Créer des transactions": true, "Modifier les transactions": true, "Voir les cultes": true, "Voir les rapports": true, "Exporter les données": true }, custom: false },
    { id: 3, name: "Secrétaire", color: "#f59e0b", permissions: { "Voir les membres": true, "Créer des membres": true, "Modifier les membres": true, "Voir les événements": true, "Créer des événements": true, "Modifier les événements": true, "Voir les visiteurs": true, "Créer des visiteurs": true, "Modifier les visiteurs": true, "Voir les paramètres": true, "Voir les rapports": true, "Exporter les données": true, "Envoyer des messages": true }, custom: false },
    { id: 4, name: "Responsable Département", color: "#0d9488", permissions: { "Voir les membres": true, "Voir les cultes": true, "Gérer les présences": true, "Voir les rapports": true }, custom: false },
    { id: 5, name: "Membre", color: "#64748b", permissions: { "Voir les cultes": true }, custom: false },
  ]);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [showNewRole, setShowNewRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [saved, setSaved] = useState(false);

  const togglePerm = (action) => {
    setRoles(prev => prev.map(r => r.id === selectedRole.id ? { ...r, permissions: { ...r.permissions, [action]: !r.permissions[action] } } : r));
    setSelectedRole(prev => ({ ...prev, permissions: { ...prev.permissions, [action]: !prev.permissions[action] } }));
  };
  const activeCount = Object.values(selectedRole.permissions || {}).filter(Boolean).length;
  const roleColors = ["#3b82f6", "#10b981", "#f59e0b", "#0d9488", "#8b5cf6", "#ec4899", "#ef4444"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Gestion des Rôles & Permissions</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Le pasteur a accès à tout · Configurez les accès par rôle</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="secondary" icon={Plus} onClick={() => setShowNewRole(true)}>Créer un rôle</Btn>
          <Btn onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>{saved ? "✓ Sauvegardé" : "Enregistrer"}</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
        {/* Role list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ padding: "14px 16px", background: "#f0fdfa", borderRadius: 12, border: "2px solid #0d9488" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={16} color="#8b5cf6" />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Pasteur</span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 10, color: "#64748b" }}>Accès complet — non modifiable</p>
          </div>
          {roles.map(r => (
            <div key={r.id} onClick={() => setSelectedRole(r)} style={{
              padding: "14px 16px", borderRadius: 12, cursor: "pointer",
              background: selectedRole.id === r.id ? "#fff" : "#fafbfc",
              border: selectedRole.id === r.id ? `2px solid ${r.color}` : "1px solid #f1f5f9"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${r.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}><Shield size={13} color={r.color} /></div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{r.name}</span>
                </div>
                {r.custom && <Btn variant="ghost" size="sm" icon={Trash2} onClick={(e) => { e.stopPropagation(); if(confirm(`Supprimer le rôle ${r.name} ?`)) setRoles(prev => prev.filter(x => x.id !== r.id)); }} />}
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 10, color: "#94a3b8" }}>{Object.values(r.permissions || {}).filter(Boolean).length} permission(s) active(s)</p>
            </div>
          ))}
        </div>

        {/* Permissions detail */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${selectedRole.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}><Shield size={18} color={selectedRole.color} /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{selectedRole.name}</h3>
              <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{activeCount} permission(s) active(s)</p>
            </div>
          </div>

          {modules.map(mod => (
            <div key={mod.key} style={{ marginBottom: 20 }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{mod.label}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {mod.actions.map(action => {
                  const checked = selectedRole.permissions?.[action] || false;
                  return (
                    <label key={action} onClick={() => togglePerm(action)} style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                      background: checked ? "#f0fdfa" : "#fafbfc", border: checked ? "1px solid #0d948830" : "1px solid #f1f5f9"
                    }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                        background: checked ? "#0d9488" : "#fff", border: checked ? "none" : "2px solid #d1d5db"
                      }}>
                        {checked && <Check size={12} color="#fff" />}
                      </div>
                      <span style={{ fontSize: 12, color: checked ? "#0f172a" : "#94a3b8", fontWeight: checked ? 600 : 400 }}>{action}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={showNewRole} onClose={() => setShowNewRole(false)} title="Créer un nouveau rôle">
        <FormField label="Nom du rôle *"><input style={inputStyle} value={newRoleName} onChange={e => setNewRoleName(e.target.value)} placeholder="Ex: Responsable Jeunesse" /></FormField>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 12px" }}>Le rôle sera créé sans aucune permission. Vous pourrez les configurer ensuite.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn variant="secondary" onClick={() => setShowNewRole(false)}>Annuler</Btn>
          <Btn onClick={() => { if(newRoleName.trim()) { const nr = { id: Date.now(), name: newRoleName.trim(), color: roleColors[roles.length % roleColors.length], permissions: {}, custom: true }; setRoles(prev => [...prev, nr]); setSelectedRole(nr); setNewRoleName(""); setShowNewRole(false); } }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// USER MANAGEMENT PAGE
// ═══════════════════════════════════════════════════════
const UserManagementPage = () => {
  const [users, setUsers] = useState(MOCK_MEMBERS.filter(m => m.role !== "membre").map(m => ({ ...m, last_login: "2026-03-20" })));
  const [churchCode, setChurchCode] = useState("EGLISE-" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ role: "" });
  const allRoles = ["pasteur", "admin", "tresorier", "secretaire", "responsable_dept", "agent_service_ordre", "membre"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Gestion Utilisateurs</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{users.length} utilisateurs avec accès</p>
        </div>
        <Btn variant="secondary" size="sm" icon={Download} onClick={() => {
          const csv = "\uFEFFNom,Prénom,Email,Rôle,Dernière connexion\n" + users.map(u => `${u.last_name},${u.first_name},${u.email},${u.role},${u.last_login}`).join("\n");
          const b = new Blob([csv], {type:"text/csv;charset=utf-8;"}); const url = URL.createObjectURL(b);
          const a = document.createElement("a"); a.href = url; a.download = "utilisateurs.csv"; a.click();
        }}>Exporter la liste</Btn>
      </div>

      {/* Church code section */}
      <div style={{ background: "#f0fdfa", borderRadius: 14, padding: "18px 22px", border: "1px solid #ccfbf1", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>🔑 Code d'inscription de votre église</p>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748b" }}>Partagez ce code avec vos membres pour qu'ils puissent s'inscrire</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ padding: "10px 20px", background: "#fff", borderRadius: 10, border: "2px dashed #0d9488", fontFamily: "monospace", fontSize: 18, fontWeight: 800, color: "#0d9488", letterSpacing: "2px" }}>{churchCode}</div>
          <Btn variant="secondary" size="sm" onClick={() => { navigator.clipboard?.writeText(churchCode); }}>Copier</Btn>
          <Btn variant="ghost" size="sm" onClick={() => setChurchCode("EGLISE-" + Math.random().toString(36).substring(2, 8).toUpperCase())}>Régénérer</Btn>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: "#f8fafc" }}>
            {["Utilisateur", "Rôle", "Email", "Dernière connexion", "Actions"].map(h => (
              <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar name={u.first_name} size={32} color="#0d9488" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{u.first_name} {u.last_name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}><Badge variant="purple">{u.role}</Badge></td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748b" }}>{u.email}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "#94a3b8" }}>{u.last_login}</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Btn variant="ghost" size="sm" icon={Edit} onClick={() => { setEditingUser(u); setEditForm({ role: u.role }); setShowEditModal(true); }} />
                    <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => { if(confirm(`Supprimer l'utilisateur ${u.first_name} ${u.last_name} ?`)) setUsers(prev => prev.filter(x => x.id !== u.id)); }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={showEditModal} onClose={() => setShowEditModal(false)} title={`Modifier — ${editingUser?.first_name} ${editingUser?.last_name}`}>
        <FormField label="Rôle">
          <select style={selectStyle} value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})}>
            {allRoles.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1).replace("_", " ")}</option>)}
          </select>
        </FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Btn>
          <Btn onClick={() => { setUsers(prev => prev.map(u => u.id === editingUser?.id ? {...u, role: editForm.role} : u)); setShowEditModal(false); }}>Enregistrer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// SUBSCRIPTION PAGE
// ═══════════════════════════════════════════════════════
const SubscriptionPage = () => {
  const plans = [
    { name: "Starter", price: "5 000", desc: "Idéal pour les petites églises", features: ["200 membres", "3 comptes staff", "Dashboard basique", "Gestion membres", "Finances de base"], current: false, color: "#64748b", icon: "🌱" },
    { name: "Growth", price: "15 000", desc: "Pour les églises en croissance", features: ["500 membres", "10 comptes staff", "Toutes fonctionnalités", "Quiz & gamification", "Export PDF/Excel", "Support email"], current: true, color: "#0d9488", icon: "🚀", popular: true },
    { name: "Pro", price: "25 000", desc: "Gestion complète & Intelligente", features: ["Membres illimités", "Comptes staff illimités", "Mentorat avancé", "Alertes intelligentes", "Rapports avancés", "Support prioritaire", "Cartographie"], current: false, color: "#3b82f6", icon: "⚡" },
    { name: "Alliance", price: "50 000", desc: "Multi-sites & Dénominations", features: ["Multi-églises", "Utilisateurs illimités", "API personnalisée", "Formation dédiée", "Support WhatsApp 24/7", "Personnalisation totale", "Gestion dénomination"], current: false, color: "#8b5cf6", icon: "👑" },
  ];
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>Choisissez votre plan</h2>
        <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>En FCFA · 30 jours d'essai · Annulez à tout moment</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {plans.map(p => (
          <div key={p.name} style={{
            background: "#fff", borderRadius: 20, padding: "32px 24px", position: "relative",
            border: p.popular ? `2px solid ${p.color}` : "1px solid #f1f5f9",
            transform: p.popular ? "scale(1.03)" : "scale(1)",
            boxShadow: p.popular ? `0 12px 40px ${p.color}20` : "0 2px 8px rgba(0,0,0,0.03)",
            transition: "all 0.3s"
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = p.popular ? "scale(1.05)" : "scale(1.02)"; e.currentTarget.style.boxShadow = `0 12px 40px ${p.color}25`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = p.popular ? "scale(1.03)" : "scale(1)"; e.currentTarget.style.boxShadow = p.popular ? `0 12px 40px ${p.color}20` : "0 2px 8px rgba(0,0,0,0.03)"; }}
          >
            {p.popular && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: p.color, color: "#fff", padding: "4px 16px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.5px" }}>LE PLUS POPULAIRE</div>}
            {p.current && <div style={{ position: "absolute", top: 12, right: 12 }}><Badge variant="success">Actuel</Badge></div>}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 32 }}>{p.icon}</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "8px 0 4px" }}>{p.name}</h3>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{p.desc}</p>
            </div>
            <div style={{ textAlign: "center", marginBottom: 20, padding: "16px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: p.color }}>{p.price}</span>
              <span style={{ fontSize: 14, color: "#94a3b8" }}> F/mois</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {p.features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569" }}>
                  <Check size={14} color={p.color} />{f}
                </div>
              ))}
            </div>
            <button style={{
              width: "100%", padding: 14, borderRadius: 12, border: p.current ? "2px solid #e2e8f0" : "none",
              background: p.current ? "#fff" : p.color, color: p.current ? "#64748b" : "#fff",
              fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
            }}>{p.current ? "Plan actuel" : "Choisir ce plan"}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// SUPPORT PAGE
// ═══════════════════════════════════════════════════════
const SupportPage = () => (
  <div>
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Support</h2>
      <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Besoin d'aide ? Contactez-nous</p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
      {[
        { icon: Mail, title: "Email", desc: "support@lumenchurch.com", color: "#3b82f6" },
        { icon: Phone, title: "WhatsApp / Téléphone", desc: "+225 07 87 45 08 32", color: "#10b981" },
        { icon: MessageSquare, title: "Chat en direct", desc: "Disponible lun-ven 8h-18h", color: "#8b5cf6" },
      ].map((s, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9", textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><s.icon size={24} color={s.color} /></div>
          <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{s.title}</h3>
          <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>{s.desc}</p>
        </div>
      ))}
    </div>
    <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginTop: 20 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 16px" }}>Envoyer un message</h3>
      <FormField label="Sujet"><input style={inputStyle} placeholder="Décrivez votre problème..." /></FormField>
      <FormField label="Message"><textarea style={{...inputStyle, minHeight: 100, resize: "vertical"}} placeholder="Donnez-nous plus de détails..." /></FormField>
      <Btn icon={Mail}>Envoyer</Btn>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════
// DOCUMENTATION PAGE
// ═══════════════════════════════════════════════════════
const DocumentationPage = () => {
  const [openDoc, setOpenDoc] = useState(null);
  const docs = [
    { title: "Premiers pas", icon: "🚀", content: "1. Créez votre compte église en renseignant le nom, la dénomination et le pasteur principal.\n2. Complétez l'onboarding en 5 étapes pour configurer votre espace.\n3. Ajoutez vos premiers membres manuellement ou par import CSV.\n4. Configurez vos départements et comités.\n5. Partagez le code d'inscription à vos membres pour qu'ils rejoignent." },
    { title: "Gestion des membres", icon: "👥", content: "• Ajoutez des membres avec prénom, nom, téléphone, email, genre, catégorie (H/F/Jeune/Enfant).\n• Filtrez par statut : Actif, Passif, Sympathisant, Nouveau converti.\n• Changez le statut directement depuis le tableau.\n• Seuls le pasteur et l'admin peuvent supprimer un membre.\n• Exportez la liste en CSV ou rapport texte.\n• Un membre peut appartenir à plusieurs départements/comités." },
    { title: "Finances", icon: "💰", content: "• Enregistrez les entrées (dîmes, offrandes, dons, quêtes) et sorties (loyer, électricité, salaires...).\n• Filtrez par période : Jour, Semaine, Mois, Année.\n• Exportez le rapport financier en CSV.\n• Les graphiques montrent la répartition et l'évolution.\n• Créez des sous-catégories pour les projets (construction, équipements...)." },
    { title: "Agenda & Cultes", icon: "📅", content: "• Le calendrier affiche tous les événements en vue mensuelle.\n• Double-cliquez sur un jour pour créer un événement.\n• Les cultes ont un enregistrement détaillé : présences (H/F/J/E), offrandes, thème, prédicateur.\n• Créez vos propres types de culte (dominical, du soir, prière, veillée...).\n• Exportez l'historique des cultes en CSV." },
    { title: "Départements & Comités", icon: "🏛️", content: "• La terminologie est personnalisable dans Paramètres.\n• Cliquez sur un département/comité pour voir la liste des membres.\n• Créez de nouveaux départements/comités avec un responsable.\n• Un membre peut faire partie de plusieurs départements/comités." },
    { title: "Rôles & Permissions", icon: "🔐", content: "• Le pasteur a accès complet (non modifiable).\n• Configurez les permissions par action : Voir, Créer, Modifier, Supprimer.\n• Modules configurables : Membres, Finances, Événements, Cultes, Communication, Visiteurs, Paramètres, Rapports.\n• Créez des rôles personnalisés (ex: Responsable Jeunesse, Comité présences)." },
    { title: "Quiz & Concours", icon: "📝", content: "• Créez des quiz bibliques avec titre, catégorie, difficulté et nombre de questions.\n• Consultez le classement individuel (top 5 avec médailles).\n• Consultez le classement par groupes de l'église.\n• Exportez les classements en CSV." },
    { title: "Mentorat & Formation", icon: "🤝", content: "• Un mentor peut avoir plusieurs mentorés.\n• Suivez les sessions avec le bouton +1.\n• Créez des parcours de formation avec étapes personnalisées.\n• Voyez qui est inscrit dans chaque parcours." },
    { title: "Export & Rapports", icon: "📊", content: "• Exportez les membres en CSV avec toutes les informations.\n• Exportez les finances par période.\n• Exportez l'historique des cultes.\n• Exportez les classements quiz.\n• Tous les exports sont au format CSV, compatible Excel." },
  ];
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Documentation</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Guide d'utilisation de Lumen Church</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {docs.map((d, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", overflow: "hidden" }}>
            <div onClick={() => setOpenDoc(openDoc === i ? null : i)} style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fafbfc"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>{d.icon}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{d.title}</h3>
                </div>
              </div>
              <ChevronDown size={18} color="#94a3b8" style={{ transform: openDoc === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
            </div>
            {openDoc === i && (
              <div style={{ padding: "0 20px 18px", borderTop: "1px solid #f1f5f9" }}>
                <pre style={{ margin: "12px 0 0", fontSize: 13, color: "#475569", lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{d.content}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// JOIN CHURCH PAGE — Member registration
// ═══════════════════════════════════════════════════════
const JoinChurchPage = ({ onBack, onComplete }) => {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", church_code: "", password: "" });
  const [step, setStep] = useState(1);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", position: "relative"
    }}>
      <div style={{ position: "absolute", top: "15%", right: "10%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, #3b82f620, transparent)", filter: "blur(60px)" }} />
      <div style={{
        width: "90%", maxWidth: 480, background: "rgba(255,255,255,0.03)", borderRadius: 24,
        backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)",
        padding: "40px 36px", boxShadow: "0 25px 50px rgba(0,0,0,0.3)", position: "relative", zIndex: 1
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, margin: "0 auto 14px", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>👤</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Rejoindre une église</h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0 }}>Créez votre compte membre · En attente de validation du pasteur</p>
        </div>

        <div style={{ padding: "12px 16px", background: "rgba(59,130,246,0.1)", borderRadius: 12, marginBottom: 20, border: "1px solid rgba(59,130,246,0.2)" }}>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
            ℹ️ Votre compte sera créé en attente de validation. Le pasteur et l'administrateur de votre église recevront une notification pour approuver votre inscription.
          </p>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Code de l'église *</label>
          <input value={form.church_code} onChange={e => setForm({...form, church_code: e.target.value})} placeholder="Ex: EGLISE-ABC123"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          <p style={{ margin: "4px 0 0", fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Demandez ce code à votre pasteur ou secrétaire</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Prénom *</label>
            <input value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Nom *</label>
            <input value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Téléphone *</label>
          <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+225 07 00 00 00"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Email</label>
          <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" placeholder="mon.email@exemple.com"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Mot de passe *</label>
          <input value={form.password} onChange={e => setForm({...form, password: e.target.value})} type="password" placeholder="Minimum 6 caractères"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>

        <button onClick={() => { if(form.first_name && form.church_code && form.phone) onComplete(form); }} disabled={!form.first_name || !form.church_code || !form.phone} style={{
          width: "100%", padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: form.first_name && form.church_code && form.phone ? 1 : 0.5
        }}>Demander à rejoindre</button>

        <p style={{ textAlign: "center", marginTop: 18, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          <span onClick={onBack} style={{ color: "#3b82f6", cursor: "pointer", fontWeight: 600 }}>← Retour à la connexion</span>
        </p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// LANDING PAGE ADMIN — Edit landing page content
// ═══════════════════════════════════════════════════════
const LandingAdminPage = ({ landingData, setLandingData }) => {
  const [tab, setTab] = useState("hero");
  const [editModal, setEditModal] = useState(null); // { section, index, data }
  const [editForm, setEditForm] = useState({});
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const openEdit = (section, index, data) => { setEditModal({ section, index }); setEditForm({ ...data }); };
  const closeEdit = () => { setEditModal(null); setEditForm({}); };

  const saveEdit = () => {
    if (!editModal) return;
    const { section, index } = editModal;
    if (section === "stats") {
      const updated = [...landingData.stats]; updated[index] = { ...updated[index], ...editForm };
      setLandingData(prev => ({ ...prev, stats: updated }));
    } else if (section === "features") {
      const updated = [...landingData.features]; updated[index] = { ...updated[index], ...editForm };
      setLandingData(prev => ({ ...prev, features: updated }));
    } else if (section === "testimonials") {
      const updated = [...landingData.testimonials]; updated[index] = { ...updated[index], ...editForm };
      setLandingData(prev => ({ ...prev, testimonials: updated }));
    } else if (section === "plans") {
      const updated = [...landingData.plans]; updated[index] = { ...updated[index], ...editForm };
      setLandingData(prev => ({ ...prev, plans: updated }));
    } else if (section === "faqs") {
      const updated = [...landingData.faqs]; updated[index] = { ...updated[index], ...editForm };
      setLandingData(prev => ({ ...prev, faqs: updated }));
    }
    closeEdit(); save();
  };

  const deleteItem = (section, index) => {
    const updated = [...landingData[section]]; updated.splice(index, 1);
    setLandingData(prev => ({ ...prev, [section]: updated })); save();
  };

  const addItem = (section) => {
    const templates = {
      stats: { value: "0", label: "Nouveau" },
      features: { icon: "⭐", title: "Nouvelle fonctionnalité", desc: "Description..." },
      testimonials: { name: "Nom", role: "Rôle", text: "Témoignage...", avatar: "N" },
      plans: { name: "Nouveau plan", price: "0", period: "/mois", desc: "Description", features: ["Feature 1"], cta: "Choisir", popular: false },
      faqs: { q: "Nouvelle question ?", a: "Réponse..." },
    };
    setLandingData(prev => ({ ...prev, [section]: [...prev[section], templates[section]] })); save();
  };

  const tabs = [
    { key: "hero", label: "Hero & Général" },
    { key: "stats", label: "Statistiques" },
    { key: "features", label: "Fonctionnalités" },
    { key: "testimonials", label: "Témoignages" },
    { key: "plans", label: "Tarifs" },
    { key: "faqs", label: "FAQ" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Landing Page</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Gérez le contenu de votre page d'accueil marketing</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {saved && <span style={{ fontSize: 12, fontWeight: 600, color: "#10b981", animation: "fadeIn 0.3s ease" }}>✓ Sauvegardé</span>}
          <Btn variant="secondary" icon={Eye} onClick={() => window.open("/landing", "_blank")}>Prévisualiser</Btn>
        </div>
      </div>

      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {/* ═══ HERO SECTION ═══ */}
      {tab === "hero" && (
        <div style={{ maxWidth: 640 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8 }}>
              🏠 Section Hero
            </h3>
            <FormField label="Badge (sous-titre)">
              <input style={inputStyle} value={landingData.hero.badge} onChange={e => setLandingData(prev => ({ ...prev, hero: { ...prev.hero, badge: e.target.value } }))} />
            </FormField>
            <FormField label="Titre principal (ligne 1)">
              <input style={inputStyle} value={landingData.hero.title1} onChange={e => setLandingData(prev => ({ ...prev, hero: { ...prev.hero, title1: e.target.value } }))} />
            </FormField>
            <FormField label="Titre animé (ligne 2)">
              <input style={inputStyle} value={landingData.hero.title2} onChange={e => setLandingData(prev => ({ ...prev, hero: { ...prev.hero, title2: e.target.value } }))} />
            </FormField>
            <FormField label="Description">
              <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={landingData.hero.description} onChange={e => setLandingData(prev => ({ ...prev, hero: { ...prev.hero, description: e.target.value } }))} />
            </FormField>
            <FormField label="Texte du bouton principal">
              <input style={inputStyle} value={landingData.hero.ctaText} onChange={e => setLandingData(prev => ({ ...prev, hero: { ...prev.hero, ctaText: e.target.value } }))} />
            </FormField>
            <Btn onClick={save}>{saved ? "✓ Enregistré" : "Enregistrer"}</Btn>
          </div>
        </div>
      )}

      {/* ═══ STATS ═══ */}
      {tab === "stats" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>📊 Statistiques ({landingData.stats.length})</h3>
            <Btn size="sm" icon={Plus} onClick={() => addItem("stats")}>Ajouter</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {landingData.stats.map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #f1f5f9", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#0d9488", marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>{s.label}</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                  <Btn variant="ghost" size="sm" icon={Edit} onClick={() => openEdit("stats", i, s)} />
                  <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => deleteItem("stats", i)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ FEATURES ═══ */}
      {tab === "features" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>⚡ Fonctionnalités ({landingData.features.length})</h3>
            <Btn size="sm" icon={Plus} onClick={() => addItem("features")}>Ajouter</Btn>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {landingData.features.map((f, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "16px 20px", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#f0fdfa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{f.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{f.title}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#94a3b8" }}>{f.desc}</p>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <Btn variant="ghost" size="sm" icon={Edit} onClick={() => openEdit("features", i, f)} />
                  <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => deleteItem("features", i)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ TESTIMONIALS ═══ */}
      {tab === "testimonials" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>💬 Témoignages ({landingData.testimonials.length})</h3>
            <Btn size="sm" icon={Plus} onClick={() => addItem("testimonials")}>Ajouter</Btn>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {landingData.testimonials.map((t, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <Avatar name={t.name} size={32} color="#0d9488" />
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{t.name}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{t.role}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Btn variant="ghost" size="sm" icon={Edit} onClick={() => openEdit("testimonials", i, t)} />
                    <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => deleteItem("testimonials", i)} />
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "#475569", fontStyle: "italic" }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ PLANS ═══ */}
      {tab === "plans" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>💳 Plans tarifaires ({landingData.plans.length})</h3>
            <Btn size="sm" icon={Plus} onClick={() => addItem("plans")}>Ajouter</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
            {landingData.plans.map((p, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 20, border: p.popular ? "2px solid #0d9488" : "1px solid #f1f5f9" }}>
                {p.popular && <Badge variant="success" style={{ marginBottom: 8 }}>Populaire</Badge>}
                <h4 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{p.name}</h4>
                <p style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#0d9488" }}>{p.price} F<span style={{ fontSize: 12, color: "#94a3b8" }}>{p.period}</span></p>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: "#64748b" }}>{p.features.length} fonctionnalités incluses</p>
                <div style={{ display: "flex", gap: 4 }}>
                  <Btn variant="ghost" size="sm" icon={Edit} onClick={() => openEdit("plans", i, p)} />
                  <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => deleteItem("plans", i)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ FAQ ═══ */}
      {tab === "faqs" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>❓ FAQ ({landingData.faqs.length})</h3>
            <Btn size="sm" icon={Plus} onClick={() => addItem("faqs")}>Ajouter</Btn>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {landingData.faqs.map((f, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "16px 20px", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{f.q}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>{f.a.slice(0, 80)}...</p>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <Btn variant="ghost" size="sm" icon={Edit} onClick={() => openEdit("faqs", i, f)} />
                  <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => deleteItem("faqs", i)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ EDIT MODAL ═══ */}
      <Modal open={!!editModal} onClose={closeEdit} title="Modifier" width={500}>
        {editModal?.section === "stats" && (<>
          <FormField label="Valeur"><input style={inputStyle} value={editForm.value || ""} onChange={e => setEditForm({...editForm, value: e.target.value})} /></FormField>
          <FormField label="Label"><input style={inputStyle} value={editForm.label || ""} onChange={e => setEditForm({...editForm, label: e.target.value})} /></FormField>
        </>)}
        {editModal?.section === "features" && (<>
          <FormField label="Icône (emoji)"><input style={inputStyle} value={editForm.icon || ""} onChange={e => setEditForm({...editForm, icon: e.target.value})} /></FormField>
          <FormField label="Titre"><input style={inputStyle} value={editForm.title || ""} onChange={e => setEditForm({...editForm, title: e.target.value})} /></FormField>
          <FormField label="Description"><textarea style={{...inputStyle, minHeight: 70, resize: "vertical"}} value={editForm.desc || ""} onChange={e => setEditForm({...editForm, desc: e.target.value})} /></FormField>
        </>)}
        {editModal?.section === "testimonials" && (<>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Nom"><input style={inputStyle} value={editForm.name || ""} onChange={e => setEditForm({...editForm, name: e.target.value, avatar: e.target.value?.charAt(0) || "?"})} /></FormField>
            <FormField label="Rôle/Église"><input style={inputStyle} value={editForm.role || ""} onChange={e => setEditForm({...editForm, role: e.target.value})} /></FormField>
          </div>
          <FormField label="Témoignage"><textarea style={{...inputStyle, minHeight: 80, resize: "vertical"}} value={editForm.text || ""} onChange={e => setEditForm({...editForm, text: e.target.value})} /></FormField>
        </>)}
        {editModal?.section === "plans" && (<>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Nom du plan"><input style={inputStyle} value={editForm.name || ""} onChange={e => setEditForm({...editForm, name: e.target.value})} /></FormField>
            <FormField label="Prix (FCFA)"><input style={inputStyle} value={editForm.price || ""} onChange={e => setEditForm({...editForm, price: e.target.value})} /></FormField>
          </div>
          <FormField label="Description"><input style={inputStyle} value={editForm.desc || ""} onChange={e => setEditForm({...editForm, desc: e.target.value})} /></FormField>
          <FormField label="Texte du bouton"><input style={inputStyle} value={editForm.cta || ""} onChange={e => setEditForm({...editForm, cta: e.target.value})} /></FormField>
          <FormField label="Fonctionnalités (une par ligne)">
            <textarea style={{...inputStyle, minHeight: 80, resize: "vertical"}} value={(editForm.features || []).join("\n")} onChange={e => setEditForm({...editForm, features: e.target.value.split("\n").filter(Boolean)})} />
          </FormField>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <input type="checkbox" checked={editForm.popular || false} onChange={e => setEditForm({...editForm, popular: e.target.checked})} />
            <span style={{ fontSize: 13, color: "#475569" }}>Plan le plus populaire</span>
          </div>
        </>)}
        {editModal?.section === "faqs" && (<>
          <FormField label="Question"><input style={inputStyle} value={editForm.q || ""} onChange={e => setEditForm({...editForm, q: e.target.value})} /></FormField>
          <FormField label="Réponse"><textarea style={{...inputStyle, minHeight: 80, resize: "vertical"}} value={editForm.a || ""} onChange={e => setEditForm({...editForm, a: e.target.value})} /></FormField>
        </>)}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={closeEdit}>Annuler</Btn>
          <Btn onClick={saveEdit}>Enregistrer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// REWARDS / GAMIFICATION PAGE
// ═══════════════════════════════════════════════════════
const RewardsPage = ({ achievements = [], xp = 0, level = 1 }) => {
  const xpForNextLevel = level * 500;
  const xpProgress = ((xp % 500) / 500) * 100;
  const done = achievements.filter(a => a.done);
  const pending = achievements.filter(a => !a.done);

  const leaderboard = [
    { name: "Jean Kouadio", role: "Pasteur", xp: 980, level: 2, badges: 6 },
    { name: "Marie Bamba", role: "Trésorière", xp: 720, level: 2, badges: 4 },
    { name: "Samuel Ouattara", role: "Responsable", xp: 540, level: 2, badges: 3 },
    { name: "Esther Koné", role: "Secrétaire", xp: 420, level: 1, badges: 2 },
    { name: "Paul Yao", role: "Membre", xp: 310, level: 1, badges: 2 },
  ];

  const levelNames = { 1: "Semeur", 2: "Berger", 3: "Serviteur", 4: "Leader", 5: "Apôtre" };
  const levelColors = { 1: "#3b82f6", 2: "#0d9488", 3: "#8b5cf6", 4: "#f59e0b", 5: "#ec4899" };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Récompenses & Badges</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>{done.length}/{achievements.length} badges obtenus · Niveau {level}</p>
      </div>

      {/* XP Bar */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9", marginBottom: 20, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg, ${levelColors[level] || "#0d9488"}, ${levelColors[level] || "#0d9488"}aa)`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 20px ${levelColors[level] || "#0d9488"}40`
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", opacity: 0.8 }}>NIV.</span>
          <span style={{ fontSize: 26, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{level}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>{levelNames[level] || "Fidèle"}</span>
              <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 8 }}>→ {levelNames[level + 1] || "Niveau max"}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0d9488" }}>{xp} / {xpForNextLevel} XP</span>
          </div>
          <div style={{ width: "100%", height: 10, background: "#f1f5f9", borderRadius: 5, overflow: "hidden" }}>
            <div style={{
              width: `${xpProgress}%`, height: "100%", borderRadius: 5,
              background: `linear-gradient(90deg, ${levelColors[level] || "#0d9488"}, ${levelColors[level] || "#10b981"})`,
              transition: "width 0.5s ease"
            }} />
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 11, color: "#94a3b8" }}>
            {xpForNextLevel - xp} XP pour atteindre le niveau {level + 1} — {levelNames[level + 1] || "Niveau maximum"}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Badges obtenus */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            🏆 Badges obtenus <Badge variant="success">{done.length}</Badge>
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {done.length === 0 && <p style={{ fontSize: 12, color: "#94a3b8" }}>Complétez des actions pour débloquer des badges !</p>}
            {done.map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#f0fdfa", borderRadius: 10, border: "1px solid #0d948820" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #f59e0b, #f97316)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{a.name}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>{a.desc}</p>
                </div>
                <Badge variant="warning">+{a.xp} XP</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Badges à débloquer */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            🔒 À débloquer <Badge variant="info">{pending.length}</Badge>
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pending.map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#f8fafc", borderRadius: 10, border: "1px solid #f1f5f9", opacity: 0.7 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, filter: "grayscale(1)" }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#64748b" }}>{a.name}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{a.desc}</p>
                </div>
                <Badge variant="default">+{a.xp} XP</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Classement */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 16px" }}>🏅 Classement de l'église</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {leaderboard.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 12,
              background: i === 0 ? "linear-gradient(135deg, #fefce8, #fef9c3)" : "#fafbfc",
              border: i === 0 ? "1px solid #f59e0b30" : "1px solid #f1f5f9"
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#b45309" : "#f1f5f9",
                color: i < 3 ? "#fff" : "#64748b", fontSize: 12, fontWeight: 800, flexShrink: 0
              }}>{i + 1}</div>
              <Avatar name={p.name} size={36} color={levelColors[p.level] || "#0d9488"} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{p.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{p.role} · Niv. {p.level} {levelNames[p.level]}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#0d9488" }}>{p.xp} XP</p>
                <p style={{ margin: 0, fontSize: 10, color: "#94a3b8" }}>{p.badges} badges</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════
const PAGES = {
  dashboard: { label: "Tableau de bord", icon: LayoutDashboard, component: DashboardPage },
  members: { label: "Membres", icon: Users, component: MembersPage },
  visitors: { label: "Visiteurs", icon: UserPlus, component: VisitorsPage },
  mentorships: { label: "Mentorat", icon: UsersRound, component: MentorshipsPage },
  annexes: { label: "Structure", icon: Network, component: AnnexesPage },
  departments: { label: "Départements", icon: Building2, component: DepartmentsPage },
  committees: { label: "Comités & Services", icon: Briefcase, component: CommitteesPage },
  families: { label: "Familles", icon: Heart, component: FamiliesPage },
  groups: { label: "Groupes", icon: UsersRound, component: GroupsPage },
  quiz: { label: "Jeux & Quiz", icon: Star, component: QuizPage },
  rewards: { label: "Récompenses", icon: Star, component: null }, // needs props
  agenda: { label: "Agenda", icon: Calendar, component: AgendaPage },
  finances: { label: "Finances", icon: DollarSign, component: FinancesPage },
  goals: { label: "Objectifs", icon: Target, component: GoalsPage },
  cultes: { label: "Cultes", icon: BookOpen, component: CultesPage },
  testimonials: { label: "Témoignages", icon: MessageSquare, component: TestimonialsPage },
  landing: { label: "Landing Page", icon: Globe, component: null }, // special — needs props
  roles: { label: "Gestion Rôles", icon: Shield, component: RoleManagementPage },
  users: { label: "Utilisateurs", icon: Users, component: UserManagementPage },
  subscription: { label: "Abonnement", icon: CreditCard, component: SubscriptionPage },
  documentation: { label: "Documentation", icon: Receipt, component: DocumentationPage },
  support: { label: "Support", icon: Mail, component: SupportPage },
  settings: { label: "Paramètres", icon: Settings, component: null }, // needs props
};

export default function App() {
  const [appState, setAppState] = useState("login");
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(3);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [userRole, setUserRole] = useState("pasteur");
  const [terminology, setTerminology] = useState({ departments: "Départements", committees: "Comités & Services" });
  const [churchData, setChurchData] = useState({ name: "Mon Église", denomination: "", pasteur: "" });
  const [carouselSlides, setCarouselSlides] = useState(INITIAL_CAROUSEL_SLIDES);

  // PWA install prompt
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); setShowInstallBanner(true); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [xp, setXp] = useState(320);
  const [level, setLevel] = useState(2);
  const [showXpInfo, setShowXpInfo] = useState(false);
  const [seasons, setSeasons] = useState([
    { id: 1, name: "Pâques / Semaine Sainte", emoji: "✝️", start: "2026-04-01", end: "2026-04-20", active: true, custom: false },
    { id: 2, name: "Pentecôte", emoji: "🔥", start: "2026-05-20", end: "2026-06-10", active: false, custom: false },
    { id: 3, name: "Jeûne annuel", emoji: "🙏", start: "2026-01-05", end: "2026-01-26", active: false, custom: false },
    { id: 4, name: "Rentrée pastorale", emoji: "📖", start: "2026-09-01", end: "2026-10-15", active: false, custom: false },
    { id: 5, name: "Convention annuelle", emoji: "🏛️", start: "2026-07-15", end: "2026-07-22", active: false, custom: false },
    { id: 6, name: "Évangélisation", emoji: "📢", start: "2026-11-01", end: "2026-11-30", active: false, custom: false },
  ]);
  const currentSeason = seasons.find(s => s.active) || seasons[0];
  const [alerts] = useState([
    { id: 1, type: "birthday", title: "🎂 3 anniversaires cette semaine", desc: "Grace Achi (7 mars), Paul Yao (12 mars)", read: false, date: "2026-03-21" },
    { id: 2, type: "visitor", title: "👤 Nouveau visiteur non suivi", desc: "Adama Sanogo — visite il y a 5 jours, aucun suivi", read: false, date: "2026-03-21" },
    { id: 3, type: "finance", title: "💰 Objectif dîmes atteint à 85%", desc: "Il manque 150 000 F pour atteindre l'objectif mensuel", read: true, date: "2026-03-20" },
    { id: 4, type: "attendance", title: "📉 Baisse de présence -12%", desc: "La présence au culte a diminué par rapport au mois dernier", read: false, date: "2026-03-19" },
    { id: 5, type: "member", title: "⚠️ 2 membres inactifs depuis 30j", desc: "David Tra, Moïse Dembélé — aucune présence depuis 1 mois", read: true, date: "2026-03-18" },
  ]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [achievements, setAchievements] = useState([
    { id: 1, name: "Premier pas", desc: "Créer votre compte", done: true, icon: "🎯", xp: 50 },
    { id: 2, name: "Bienvenue", desc: "Compléter l'onboarding", done: true, icon: "🏠", xp: 100 },
    { id: 3, name: "Berger fidèle", desc: "Suivre 10 membres", done: false, icon: "🐑", xp: 150 },
    { id: 4, name: "Intendant", desc: "Enregistrer 5 transactions", done: false, icon: "💰", xp: 100 },
    { id: 5, name: "Organisateur", desc: "Planifier 3 événements", done: false, icon: "📅", xp: 100 },
    { id: 6, name: "Accueillant", desc: "Accueillir 5 visiteurs", done: false, icon: "🤗", xp: 150 },
    { id: 7, name: "Bâtisseur", desc: "Structurer 3 départements", done: false, icon: "🏗️", xp: 200 },
    { id: 8, name: "Formateur", desc: "Créer un parcours de formation", done: false, icon: "📖", xp: 100 },
  ]);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [landingData, setLandingData] = useState({
    hero: { badge: "La plateforme #1 de gestion d'église en Afrique", title1: "Gérez votre église", title2: "comme jamais", description: "Membres, finances, événements, mentorat, quiz — tout dans une seule plateforme.", ctaText: "Découvrir les offres →" },
    stats: [
      { value: "500+", label: "Églises inscrites" },
      { value: "50 000+", label: "Membres gérés" },
      { value: "99.9%", label: "Disponibilité" },
      { value: "4.9/5", label: "Satisfaction" },
    ],
    features: [
      { icon: "👥", title: "Gestion des Membres", desc: "Ajoutez, suivez et organisez vos fidèles. Départements, familles, groupes, cellules — tout en un." },
      { icon: "💰", title: "Finances Transparentes", desc: "Dîmes, offrandes, dépenses. Rapports automatiques, graphiques clairs, Mobile Money intégré." },
      { icon: "📅", title: "Calendrier Interactif", desc: "Planifiez cultes, prières, événements. Vue mensuelle, création en un clic." },
      { icon: "📊", title: "Dashboard Intelligent", desc: "KPIs en temps réel, croissance, présences, finances." },
      { icon: "🎮", title: "Quiz & Gamification", desc: "Quiz bibliques interactifs, système XP, niveaux, achievements." },
      { icon: "🤝", title: "Mentorat & Suivi", desc: "Binômes, trinômes, suivi des nouveaux convertis." },
    ],
    testimonials: [
      { name: "Pasteur Jean K.", role: "Église Foursquare, Abidjan", text: "Avant Lumen Church, je passais mes lundis à trier des papiers. Maintenant, tout est automatique.", avatar: "J" },
      { name: "Sœur Marie B.", role: "Trésorière, Assemblée de Dieu", text: "Les rapports financiers sont clairs et professionnels. Les dons ont augmenté de 30%.", avatar: "M" },
      { name: "Frère Samuel O.", role: "Responsable Jeunesse", text: "Les quiz bibliques ont transformé notre département. Les jeunes sont plus engagés que jamais.", avatar: "S" },
    ],
    plans: [
      { name: "Starter", price: "5 000", period: "/mois", desc: "Idéal pour les petites églises", features: ["200 membres", "3 comptes staff", "Dashboard", "Finances de base"], cta: "Choisir Starter", popular: false },
      { name: "Growth", price: "15 000", period: "/mois", desc: "Pour les églises en croissance", features: ["500 membres", "10 comptes staff", "Toutes fonctionnalités", "Quiz & gamification", "Export PDF/Excel"], cta: "Choisir Growth", popular: true },
      { name: "Pro", price: "25 000", period: "/mois", desc: "Gestion complète & Intelligente", features: ["Membres illimités", "Comptes staff illimités", "Mentorat avancé", "Rapports avancés", "Cartographie"], cta: "Choisir Pro", popular: false },
      { name: "Alliance", price: "50 000", period: "/mois", desc: "Multi-sites & Dénominations", features: ["Multi-églises", "Illimité", "API", "Formation dédiée", "Support 24/7"], cta: "Nous contacter", popular: false },
    ],
    faqs: [
      { q: "Est-ce que mes données sont en sécurité ?", a: "Absolument. Architecture multi-tenant, mots de passe cryptés, HTTPS." },
      { q: "Faut-il être bon en informatique ?", a: "Non ! Aussi simple qu'utiliser WhatsApp. Support disponible par WhatsApp." },
      { q: "Peut-on payer par Mobile Money ?", a: "Oui ! Wave, Orange Money, MTN Money, virements et Visa/Mastercard." },
      { q: "Y a-t-il une période d'essai ?", a: "Oui, 30 jours d'essai sur chaque plan payant." },
    ],
  });

  const addXp = (amount) => {
    setXp(prev => {
      const newXp = prev + amount;
      const newLevel = Math.floor(newXp / 500) + 1;
      if (newLevel > level) setLevel(newLevel);
      return newXp;
    });
    setXpGained(amount);
    setShowXpPopup(true);
    setTimeout(() => setShowXpPopup(false), 2000);
  };

  const xpForNextLevel = level * 500;
  const xpProgress = ((xp % 500) / 500) * 100;

  // Role-based page access
  const ROLE_PAGES = {
    super_admin: ["dashboard", "landing", "users", "subscription", "support", "settings"],
    pasteur: Object.keys(PAGES).filter(k => k !== "landing"),
    admin: Object.keys(PAGES).filter(k => k !== "landing" && k !== "roles"),
    tresorier: ["dashboard", "members", "finances", "goals", "cultes", "quiz", "settings"],
    secretaire: ["dashboard", "members", "visitors", "families", "groups", "agenda", "cultes", "testimonials", "quiz", "settings"],
    responsable_dept: ["dashboard", "members", "departments", "quiz", "cultes", "settings"],
    agent_service_ordre: ["dashboard", "members", "visitors", "cultes", "quiz"],
    membre: ["dashboard", "quiz", "agenda", "testimonials", "cultes"],
  };

  const allowedPages = ROLE_PAGES[userRole] || ROLE_PAGES.membre;
  const filteredPages = Object.fromEntries(Object.entries(PAGES).filter(([k]) => allowedPages.includes(k)));
  const unreadAlerts = alerts.filter(a => !a.read).length;

  // ═══ LOGIN ═══
  if (appState === "login") return <LoginPage onLogin={(email) => {
    const roleMap = {
      "superadmin@lumenchurch.com": "super_admin",
      "pasteur@eglise.org": "pasteur",
      "admin@eglise.org": "admin",
      "tresorier@eglise.org": "tresorier",
      "secretaire@eglise.org": "secretaire",
      "responsable@eglise.org": "responsable_dept",
      "membre@eglise.org": "membre",
    };
    setUserRole(roleMap[email?.toLowerCase()] || "pasteur");
    setAppState("app");
  }} onRegister={() => setAppState("register")} onJoinChurch={() => setAppState("joinChurch")} />;

  // ═══ REGISTER ═══
  if (appState === "register") return (
    <RegisterPage onComplete={(data) => { setChurchData(data); setAppState("onboarding"); setOnboardingStep(0); }} onBack={() => setAppState("login")} />
  );

  // ═══ JOIN CHURCH ═══
  if (appState === "joinChurch") return (
    <JoinChurchPage onBack={() => setAppState("login")} onComplete={() => setAppState("joinSuccess")} />
  );

  // ═══ JOIN SUCCESS ═══
  if (appState === "joinSuccess") return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0f172a, #134e4a, #0f172a)" }}>
      <div style={{ textAlign: "center", padding: 40, maxWidth: 440 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>Demande envoyée !</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 28px" }}>
          Votre demande d'inscription a été envoyée au pasteur et à l'administrateur de l'église. Ils recevront une notification sur leur compte. Vous serez notifié une fois votre inscription approuvée.
        </p>
        <button onClick={() => setAppState("login")} style={{ padding: "14px 32px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #0d9488, #10b981)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Retour à la connexion
        </button>
      </div>
    </div>
  );

  // ═══ ONBOARDING ═══
  if (appState === "onboarding") return (
    <OnboardingFlow step={onboardingStep} setStep={setOnboardingStep} churchName={churchData.name}
      onComplete={() => { addXp(100); setAppState("app"); }} />
  );

  const CurrentPage = page === "landing" 
    ? () => <LandingAdminPage landingData={landingData} setLandingData={setLandingData} />
    : page === "settings"
    ? () => <SettingsPage seasons={seasons} setSeasons={setSeasons} terminology={terminology} setTerminology={setTerminology} carouselSlides={carouselSlides} setCarouselSlides={setCarouselSlides} />
    : page === "rewards"
    ? () => <RewardsPage achievements={achievements} xp={xp} level={level} />
    : page === "dashboard"
    ? () => <DashboardPage onNavigate={setPage} carouselSlides={carouselSlides} />
    : PAGES[page]?.component || DashboardPage;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex" }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes xpPop { 0% { opacity:0; transform:translateY(10px) scale(0.8); } 50% { opacity:1; transform:translateY(-10px) scale(1.1); } 100% { opacity:0; transform:translateY(-30px) scale(0.9); } }
      `}</style>

      {/* XP Popup */}
      {showXpPopup && (
        <div style={{
          position: "fixed", top: 80, right: 32, zIndex: 9999,
          background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#fff",
          padding: "10px 20px", borderRadius: 14, fontWeight: 800, fontSize: 15,
          boxShadow: "0 8px 30px rgba(245,158,11,0.4)",
          animation: "xpPop 2s ease forwards", display: "flex", alignItems: "center", gap: 8
        }}>
          ⭐ +{xpGained} XP
        </div>
      )}

      {/* SIDEBAR - Desktop */}
      <div className="sidebar-desktop" style={{
        width: 260, position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50,
        background: "linear-gradient(180deg, #0f4f4a 0%, #0a3632 100%)",
        display: "flex", flexDirection: "column", boxShadow: "4px 0 20px rgba(0,0,0,0.1)"
      }}>
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #0d9488, #10b981)", boxShadow: "0 4px 12px rgba(13,148,136,0.3)"
            }}>
              <Church size={20} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0 }}>Lumen Church</h1>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", margin: 0, letterSpacing: "0.5px" }}>SaaS Gestion d'Église</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          {Object.entries(filteredPages).map(([key, { label, icon: Icon }]) => {
            const displayLabel = key === "departments" ? terminology.departments : key === "committees" ? terminology.committees : label;
            const active = page === key;
            return (
              <button key={key} onClick={() => setPage(key)} style={{
                display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "11px 14px",
                borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 3, transition: "all 0.15s",
                background: active ? "rgba(13,148,136,0.2)" : "transparent",
                color: active ? "#5eead4" : "rgba(255,255,255,0.55)",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon size={18} />
                <span style={{ fontSize: 13, fontWeight: active ? 700 : 500 }}>{displayLabel}</span>
                {key === "finances" && <Badge variant="success" style={{ marginLeft: "auto", fontSize: 9, padding: "2px 6px" }}>NEW</Badge>}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "16px 16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {/* XP mini bar */}
          <div style={{ marginBottom: 12, padding: "8px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 10, cursor: "pointer" }} onClick={() => setPage("rewards")}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px" }}>NIVEAU {level}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#0d9488" }}>{xp} XP</span>
            </div>
            <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${xpProgress}%`, height: "100%", background: "linear-gradient(90deg, #0d9488, #10b981)", borderRadius: 2, transition: "width 0.5s" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name="Jean" size={36} color="#0d9488" />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#fff" }}>Pasteur Jean</p>
              <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{userRole === "super_admin" ? "Super Admin" : userRole.charAt(0).toUpperCase() + userRole.slice(1).replace("_", " ")}</p>
            </div>
            <button onClick={() => setAppState("login")} style={{
              background: "rgba(255,255,255,0.05)", border: "none", borderRadius: 8,
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
            }}>
              <LogOut size={14} color="rgba(255,255,255,0.5)" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="mobile-header" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, height: 56,
        background: "#fff", borderBottom: "1px solid #f1f5f9", display: "flex",
        alignItems: "center", justifyContent: "space-between", padding: "0 16px"
      }}>
        <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Menu size={22} color="#0f172a" />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Church size={18} color="#0d9488" />
          <span style={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>Lumen Church</span>
        </div>
        <div style={{ position: "relative" }}>
          <Bell size={20} color="#64748b" />
          {notifications > 0 && (
            <div style={{
              position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%",
              background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>{notifications}</div>
          )}
        </div>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div className="mobile-overlay" style={{ position: "fixed", inset: 0, zIndex: 60 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setSidebarOpen(false)} />
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: 280,
            background: "linear-gradient(180deg, #0f4f4a, #0a3632)",
            padding: "20px 12px", overflowY: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 8px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Church size={20} color="#0d9488" />
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>Lumen Church</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} color="#fff" /></button>
            </div>
            {Object.entries(PAGES).map(([key, { label, icon: Icon }]) => (
              <button key={key} onClick={() => { setPage(key); setSidebarOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 14px",
                borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 3,
                background: page === key ? "rgba(13,148,136,0.2)" : "transparent",
                color: page === key ? "#5eead4" : "rgba(255,255,255,0.55)", fontSize: 13,
                fontWeight: page === key ? 700 : 500
              }}>
                <Icon size={18} />{label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="main-content" style={{ flex: 1, marginLeft: 260, minHeight: "100vh" }}>
        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 30, background: "rgba(248,250,252,0.85)",
          backdropFilter: "blur(10px)", borderBottom: "1px solid #f1f5f9",
          padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>⛪</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>{churchData.name || "Mon Église"}</span>
            <span style={{ color: "#e2e8f0" }}>·</span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{PAGES[page]?.label || "Tableau de bord"}</h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <div onClick={() => setShowAlerts(!showAlerts)} style={{ cursor: "pointer", position: "relative" }}>
                <Bell size={19} color="#64748b" />
                {unreadAlerts > 0 && (
                  <div style={{
                    position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%",
                    background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>{unreadAlerts}</div>
                )}
              </div>
              {showAlerts && (
                <div style={{
                  position: "absolute", top: "calc(100% + 12px)", right: -80, width: 380, maxHeight: 420,
                  background: "#fff", borderRadius: 16, boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                  border: "1px solid #f1f5f9", overflow: "hidden", zIndex: 100
                }}>
                  <div style={{ padding: "14px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Alertes ({unreadAlerts} non lues)</h4>
                    <span style={{ fontSize: 11, color: "#0d9488", cursor: "pointer", fontWeight: 600 }}>Tout marquer lu</span>
                  </div>
                  <div style={{ overflowY: "auto", maxHeight: 340 }}>
                    {alerts.map(a => (
                      <div key={a.id} style={{
                        padding: "12px 18px", borderBottom: "1px solid #f8fafc", cursor: "pointer",
                        background: a.read ? "transparent" : "#f0fdfa"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: a.read ? 500 : 700, color: "#0f172a" }}>{a.title}</p>
                          {!a.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0d9488", flexShrink: 0 }} />}
                        </div>
                        <p style={{ margin: "3px 0 0", fontSize: 11, color: "#94a3b8" }}>{a.desc}</p>
                        <p style={{ margin: "3px 0 0", fontSize: 10, color: "#cbd5e1" }}>{a.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={{ width: 1, height: 24, background: "#e2e8f0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <Avatar name="Jean" size={32} color="#0d9488" />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Pasteur Jean</span>
              <ChevronDown size={14} color="#94a3b8" />
            </div>
          </div>
        </div>

        {/* PWA Install Banner */}
        {showInstallBanner && (
          <div style={{ margin: "16px 32px 0", padding: "14px 20px", background: "linear-gradient(135deg, #0d9488, #10b981)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 15px rgba(13,148,136,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>📱</span>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>Installer Lumen Church</p>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Accédez à l'app depuis votre écran d'accueil</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowInstallBanner(false)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Plus tard</button>
              <button onClick={() => { if (installPrompt) { installPrompt.prompt(); installPrompt.userChoice.then(() => setShowInstallBanner(false)); } }} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#fff", color: "#0d9488", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Installer</button>
            </div>
          </div>
        )}

        {/* Page content */}
        <div style={{ padding: "28px 32px", animation: "fadeIn 0.3s ease" }}>
          <CurrentPage onNavigate={setPage} userRole={userRole} />
        </div>
      </div>
    </div>
  );
}
