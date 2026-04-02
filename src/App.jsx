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
  { id: 1, first_name: "Jean", last_name: "Kouadio", gender: "M", phone: "+225 07 08 09 10", email: "jean.k@email.com", status: "actif", role: "pasteur", department: "Direction", join_date: "2020-01-15", photo: null, birthday_day: 15, birthday_month: 3, address: "Cocody, Abidjan", baptise: true, date_bapteme: "2020-04-12", bapteme_type: "eaux", presence_pct: 96, quiz_points: 980, badges: ["🎯","🐑","💰","📅","🤗","🏗️"] },
  { id: 2, first_name: "Marie", last_name: "Bamba", gender: "F", phone: "+225 05 12 34 56", email: "marie.b@email.com", status: "actif", role: "tresorier", department: "Finances", join_date: "2021-03-20", photo: null, birthday_day: 8, birthday_month: 7, address: "Plateau, Abidjan", baptise: true, date_bapteme: "2021-06-20", bapteme_type: "eaux", presence_pct: 88, quiz_points: 720, badges: ["🎯","🏠","💰"] },
  { id: 3, first_name: "Paul", last_name: "Yao", gender: "M", phone: "+225 01 23 45 67", email: "paul.y@email.com", status: "actif", role: "membre", department: "Louange", join_date: "2022-06-10", photo: null, birthday_day: 22, birthday_month: 11, address: "Yopougon, Abidjan", baptise: true, date_bapteme: "2022-09-04", bapteme_type: "eaux", presence_pct: 74, quiz_points: 540, badges: ["🎯","🏠"] },
  { id: 4, first_name: "Esther", last_name: "Koné", gender: "F", phone: "+225 07 98 76 54", email: "esther.k@email.com", status: "actif", role: "secretaire", department: "Administration", join_date: "2021-09-05", photo: null, birthday_day: 3, birthday_month: 1, address: "Marcory, Abidjan", baptise: false, date_bapteme: "", bapteme_type: "", presence_pct: 82, quiz_points: 420, badges: ["🎯","🏠","📅"] },
  { id: 5, first_name: "David", last_name: "Tra", gender: "M", phone: "+225 05 55 66 77", email: "david.t@email.com", status: "inactif", role: "membre", department: "Jeunesse", join_date: "2023-01-12", photo: null, birthday_day: 19, birthday_month: 5, address: "Treichville, Abidjan", baptise: false, date_bapteme: "", bapteme_type: "", presence_pct: 35, quiz_points: 310, badges: ["🎯"] },
  { id: 6, first_name: "Ruth", last_name: "Diallo", gender: "F", phone: "+225 01 44 55 66", email: "ruth.d@email.com", status: "actif", role: "membre", department: "Enfants", join_date: "2022-11-30", photo: null, birthday_day: 28, birthday_month: 9, address: "Abobo, Abidjan", baptise: true, date_bapteme: "2023-01-08", bapteme_type: "eaux", presence_pct: 91, quiz_points: 845, badges: ["🎯","🏠","🐑","📅"] },
  { id: 7, first_name: "Samuel", last_name: "Ouattara", gender: "M", phone: "+225 07 11 22 33", email: "samuel.o@email.com", status: "actif", role: "responsable_dept", department: "Intercession", join_date: "2020-08-18", photo: null, birthday_day: 12, birthday_month: 4, address: "Cocody, Abidjan", baptise: true, date_bapteme: "2020-10-18", bapteme_type: "eaux", presence_pct: 95, quiz_points: 540, badges: ["🎯","🏠","🐑","💰"] },
  { id: 8, first_name: "Grace", last_name: "Achi", gender: "F", phone: "+225 05 99 88 77", email: "grace.a@email.com", status: "actif", role: "membre", department: "Accueil", join_date: "2023-04-22", photo: null, birthday_day: 7, birthday_month: 12, address: "Adjamé, Abidjan", baptise: false, date_bapteme: "", bapteme_type: "", presence_pct: 78, quiz_points: 310, badges: ["🎯"] },
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
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════
const DS = {
  // Refined teal palette
  teal50:  "#f0fdfa",
  teal100: "#ccfbf1",
  teal400: "#2dd4bf",
  teal600: "#0d9488",
  teal700: "#0f766e",
  teal900: "#064e3b",
  // Neutrals
  slate50:  "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate400: "#94a3b8",
  slate600: "#475569",
  slate800: "#1e293b",
  slate900: "#0f172a",
  // Radius
  r8:  "8px",
  r10: "10px",
  r12: "12px",
  r16: "16px",
  r20: "20px",
  // Shadows
  shadowSm: "0 1px 2px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
  shadowLg: "0 12px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.04)",
  shadowXl: "0 24px 60px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.06)",
};

// ═══════════════════════════════════════════════════════
// UTILITY COMPONENTS — Design upgraded
// ═══════════════════════════════════════════════════════
const Avatar = ({ name, size = 40, color = "#0d9488" }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: `linear-gradient(145deg, ${color}ee, ${color}99)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 700, fontSize: size * 0.38,
    flexShrink: 0, letterSpacing: "0.3px",
    boxShadow: `0 2px 8px ${color}40`,
  }}>
    {name?.charAt(0)?.toUpperCase() || "?"}
  </div>
);

const Badge = ({ children, variant = "default", style = {} }) => {
  const variants = {
    default: { background: "#0d948812", color: "#0d9488", border: "1px solid #0d948825" },
    success: { background: "#10b98112", color: "#059669", border: "1px solid #10b98125" },
    warning: { background: "#f59e0b12", color: "#d97706", border: "1px solid #f59e0b25" },
    danger:  { background: "#ef444412", color: "#dc2626", border: "1px solid #ef444425" },
    info:    { background: "#3b82f612", color: "#2563eb", border: "1px solid #3b82f625" },
    purple:  { background: "#8b5cf612", color: "#7c3aed", border: "1px solid #8b5cf625" },
  };
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
      letterSpacing: "0.2px", display: "inline-flex", alignItems: "center",
      ...variants[variant], ...style
    }}>{children}</span>
  );
};

const StatCard = ({ icon: Icon, title, value, change, positive, color = "#0d9488", onClick }) => (
  <div onClick={onClick} style={{
    background: "#fff", borderRadius: DS.r16, padding: "22px 24px",
    boxShadow: DS.shadowSm, border: `1px solid ${DS.slate100}`,
    cursor: onClick ? "pointer" : "default", transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
    position: "relative", overflow: "hidden",
  }}
  onMouseEnter={e => {
    if(onClick) e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = DS.shadowLg;
    e.currentTarget.style.borderColor = `${color}30`;
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = DS.shadowSm;
    e.currentTarget.style.borderColor = DS.slate100;
  }}
  >
    {/* Decorative top accent */}
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${color}, ${color}60)`, borderRadius: "16px 16px 0 0" }} />
    {/* Background glow */}
    <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, background: `radial-gradient(circle, ${color}10, transparent 70%)`, borderRadius: "50%" }} />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: 11, color: DS.slate400, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>{title}</p>
        <p style={{ fontSize: 30, fontWeight: 800, color: DS.slate900, margin: "8px 0 0", letterSpacing: "-1px", lineHeight: 1 }}>{value}</p>
        {change && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
            {positive ? <TrendingUp size={12} color="#059669" /> : <TrendingDown size={12} color="#dc2626" />}
            <span style={{ fontSize: 12, fontWeight: 700, color: positive ? "#059669" : "#dc2626" }}>{change}</span>
            <span style={{ fontSize: 11, color: DS.slate400 }}>vs mois dernier</span>
          </div>
        )}
      </div>
      <div style={{
        width: 46, height: 46, borderRadius: DS.r12, display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(145deg, ${color}18, ${color}08)`,
        border: `1px solid ${color}20`,
      }}>
        <Icon size={22} color={color} />
      </div>
    </div>
  </div>
);

const Btn = ({ children, variant = "primary", size = "md", onClick, style = {}, icon: Icon, disabled }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6,
    border: "none", cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 600, transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
    opacity: disabled ? 0.45 : 1, letterSpacing: "0.1px",
    fontSize: size === "sm" ? 12 : 13,
    padding: size === "sm" ? "6px 13px" : "9px 20px",
    borderRadius: size === "sm" ? DS.r8 : DS.r12,
  };
  const variants = {
    primary: {
      background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
      color: "#fff",
      boxShadow: "0 2px 8px rgba(13,148,136,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
    },
    secondary: {
      background: "#fff",
      color: DS.slate600,
      border: `1px solid ${DS.slate200}`,
      boxShadow: DS.shadowSm,
    },
    danger: { background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" },
    ghost: { background: "transparent", color: DS.slate400 },
  };
  return (
    <button disabled={disabled} onClick={onClick} style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={e => {
        if(!disabled) {
          e.currentTarget.style.transform = "translateY(-1px)";
          if(variant === "primary") e.currentTarget.style.boxShadow = "0 4px 16px rgba(13,148,136,0.45), inset 0 1px 0 rgba(255,255,255,0.15)";
          if(variant === "secondary") e.currentTarget.style.boxShadow = DS.shadowMd;
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        if(variant === "primary") e.currentTarget.style.boxShadow = "0 2px 8px rgba(13,148,136,0.35), inset 0 1px 0 rgba(255,255,255,0.15)";
        if(variant === "secondary") e.currentTarget.style.boxShadow = DS.shadowSm;
      }}
    >
      {Icon && <Icon size={size === "sm" ? 13 : 15} />}{children}
    </button>
  );
};

const Modal = ({ open, onClose, title, children, width = 520 }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(15,23,42,0.55)", backdropFilter: "blur(8px)",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: DS.r20, width: "90%", maxWidth: width, maxHeight: "88vh",
        overflow: "auto", boxShadow: DS.shadowXl,
        border: `1px solid ${DS.slate100}`,
        animation: "modalIn 0.22s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "22px 28px", borderBottom: `1px solid ${DS.slate100}`,
          position: "sticky", top: 0, background: "#fff", zIndex: 1,
          borderRadius: `${DS.r20} ${DS.r20} 0 0`,
        }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: DS.slate900, letterSpacing: "-0.3px" }}>{title}</h3>
          <button onClick={onClose} style={{
            background: DS.slate100, border: "none", borderRadius: DS.r8, width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = DS.slate200}
            onMouseLeave={e => e.currentTarget.style.background = DS.slate100}
          ><X size={15} color={DS.slate600} /></button>
        </div>
        <div style={{ padding: "24px 28px" }}>{children}</div>
      </div>
    </div>
  );
};

const FormField = ({ label, children, required }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: DS.slate600, marginBottom: 6, letterSpacing: "0.3px", textTransform: "uppercase" }}>
      {label}{required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: DS.r10,
  border: `1.5px solid ${DS.slate200}`,
  fontSize: 13, color: DS.slate900, outline: "none", transition: "all 0.2s",
  background: "#fff", boxSizing: "border-box",
  fontFamily: "inherit",
};

const selectStyle = { ...inputStyle, appearance: "none", cursor: "pointer" };

const EmptyState = ({ icon: Icon, title, description }) => (
  <div style={{ textAlign: "center", padding: "70px 20px", color: DS.slate400 }}>
    <div style={{
      width: 72, height: 72, borderRadius: 20,
      background: `linear-gradient(145deg, ${DS.slate100}, ${DS.slate50})`,
      border: `1px solid ${DS.slate200}`,
      display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
      boxShadow: DS.shadowSm,
    }}><Icon size={30} color={DS.slate400} /></div>
    <p style={{ fontWeight: 800, color: DS.slate600, fontSize: 15, margin: "0 0 6px", letterSpacing: "-0.2px" }}>{title}</p>
    <p style={{ fontSize: 13, margin: 0, color: DS.slate400, lineHeight: 1.6 }}>{description}</p>
  </div>
);

const TabBar = ({ tabs, active, onChange }) => (
  <div style={{
    display: "flex", gap: 3, background: DS.slate100, borderRadius: DS.r12, padding: 4, marginBottom: 24,
    border: `1px solid ${DS.slate200}`,
  }}>
    {tabs.map(t => (
      <button key={t.key} onClick={() => onChange(t.key)} style={{
        flex: 1, padding: "8px 14px", borderRadius: DS.r10, border: "none", cursor: "pointer",
        background: active === t.key ? "#fff" : "transparent",
        color: active === t.key ? DS.slate900 : DS.slate400,
        fontWeight: active === t.key ? 700 : 500, fontSize: 13,
        boxShadow: active === t.key ? DS.shadowSm : "none",
        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
        letterSpacing: "0.1px",
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
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: DS.slate900, margin: "0 0 3px", letterSpacing: "-0.5px" }}>Tableau de bord</h2>
          <p style={{ fontSize: 13, color: DS.slate400, margin: 0, fontWeight: 500 }}>Vue d'ensemble — {periodLabels[period]}</p>
        </div>
        <div style={{ display: "flex", gap: 3, background: DS.slate100, borderRadius: 12, padding: 4, border: `1px solid ${DS.slate200}` }}>
          {[{k:"day",l:"Jour"},{k:"week",l:"Semaine"},{k:"month",l:"Mois"},{k:"year",l:"Année"}].map(p => (
            <button key={p.k} onClick={() => setPeriod(p.k)} style={{
              padding: "7px 16px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: period === p.k ? "#fff" : "transparent",
              color: period === p.k ? DS.slate900 : DS.slate400,
              boxShadow: period === p.k ? DS.shadowSm : "none",
              transition: "all 0.18s cubic-bezier(0.4,0,0.2,1)",
            }}>{p.l}</button>
          ))}
        </div>
      </div>

      {/* ═══ CAROUSEL ═══ */}
      <div style={{
        position: "relative", borderRadius: 22, overflow: "hidden", marginBottom: 24,
        background: currentSlide.gradient, transition: "background 0.7s ease",
        boxShadow: "0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
      }}>
        {/* Subtle dot pattern overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* Soft glow shapes */}
        <div style={{ position: "absolute", top: -60, right: -30, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -80, left: "25%", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

        <div style={{ position: "relative", padding: "34px 40px", minHeight: 185, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={goPrev} style={{
            width: 40, height: 40, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.28)",
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            flexShrink: 0, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.28)"; e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "scale(1)"; }}
          ><ChevronLeft size={17} color="#fff" /></button>

          <div style={{ flex: 1, textAlign: "center", padding: "0 28px" }} key={carouselIndex}>
            <div style={{ fontSize: 44, marginBottom: 10, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}>{currentSlide.emoji}</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.4px", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
              {currentSlide.title}
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: "rgba(255,255,255,0.82)", maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              {currentSlide.subtitle}
            </p>
            <button style={{
              padding: "10px 26px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.35)",
              background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
              color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s", letterSpacing: "0.2px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.32)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >{currentSlide.cta} →</button>
          </div>

          <button onClick={goNext} style={{
            width: 40, height: 40, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.28)",
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            flexShrink: 0, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.28)"; e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "scale(1)"; }}
          ><ChevronRight size={17} color="#fff" /></button>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 7, paddingBottom: 18 }}>
          {carouselSlides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} style={{
              width: i === carouselIndex ? 26 : 7, height: 7, borderRadius: 4,
              background: i === carouselIndex ? "#fff" : "rgba(255,255,255,0.35)",
              border: "none", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              boxShadow: i === carouselIndex ? "0 2px 6px rgba(0,0,0,0.2)" : "none",
            }} />
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 22 }}>
        <StatCard icon={Users} title="Membres" value={MOCK_MEMBERS.length} change="+12%" positive color="#0d9488" onClick={() => onNavigate("members")} />
        <StatCard icon={UserPlus} title="Visiteurs" value={MOCK_VISITORS.length} change="+8%" positive color="#3b82f6" onClick={() => onNavigate("visitors")} />
        <StatCard icon={ArrowUpCircle} title="Entrées" value={`${(totalEntrees/1000).toFixed(0)}k`} change="+15%" positive color="#10b981" onClick={() => onNavigate("finances")} />
        <StatCard icon={Wallet} title="Solde" value={`${(solde/1000).toFixed(0)}k F`} change={solde > 0 ? "+5%" : "-3%"} positive={solde > 0} color="#8b5cf6" onClick={() => onNavigate("finances")} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: "#fff", borderRadius: DS.r16, padding: 24, border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: DS.slate900, margin: "0 0 20px", letterSpacing: "-0.2px" }}>📈 Croissance des membres</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={GROWTH_DATA}>
              <defs>
                <linearGradient id="gMembres" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity={0.25}/>
                  <stop offset="100%" stopColor="#0d9488" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 14, border: "none", boxShadow: DS.shadowLg, fontSize: 12, fontFamily: "inherit" }} />
              <Area type="monotone" dataKey="membres" stroke="#0d9488" fill="url(#gMembres)" strokeWidth={2.5} dot={false} />
              <Area type="monotone" dataKey="visiteurs" stroke="#3b82f6" fill="#3b82f610" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", borderRadius: DS.r16, padding: 24, border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: DS.slate900, margin: "0 0 16px", letterSpacing: "-0.2px" }}>👥 Répartition</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={deptData} cx="50%" cy="50%" innerRadius={52} outerRadius={82} paddingAngle={4} dataKey="value">
                {deptData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12, boxShadow: DS.shadowMd }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {deptData.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: DS.slate600, fontWeight: 500 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", borderRadius: DS.r16, padding: 22, border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: DS.slate900, margin: "0 0 16px", letterSpacing: "-0.2px" }}>💰 Finances du mois</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={FINANCE_CHART.slice(-3)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 11, boxShadow: DS.shadowMd }} formatter={v => `${v.toLocaleString()} F`} />
              <Bar dataKey="entrees" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="sorties" fill="#f87171" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", borderRadius: DS.r16, padding: 22, border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: DS.slate900, margin: "0 0 16px", letterSpacing: "-0.2px" }}>📅 Prochains événements</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {upcomingEvents.map(ev => (
              <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 0", borderBottom: `1px solid ${DS.slate100}` }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(145deg, #f0fdfa, #ccfbf1)", flexShrink: 0,
                  border: "1px solid #0d948820",
                }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: "#0d9488", lineHeight: 1, textTransform: "uppercase" }}>{MONTHS_FR[new Date(ev.date).getMonth()]}</span>
                  <span style={{ fontSize: 16, fontWeight: 900, color: "#0d9488", lineHeight: 1.1 }}>{new Date(ev.date).getDate()}</span>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: DS.slate900 }}>{ev.title}</p>
                  <p style={{ margin: 0, fontSize: 10, color: DS.slate400 }}>{ev.time} · {ev.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: DS.r16, padding: 22, border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: DS.slate900, margin: "0 0 16px", letterSpacing: "-0.2px" }}>🎂 Anniversaires ce mois</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {birthdays.length > 0 ? birthdays.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 12, background: "#fffbeb", border: "1px solid #fef3c7" }}>
                <Avatar name={m.first_name} size={34} color="#f59e0b" />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: DS.slate900 }}>{m.first_name} {m.last_name}</p>
                  <p style={{ margin: 0, fontSize: 10, color: DS.slate400 }}>{m.birthday_day} mars</p>
                </div>
                <Gift size={15} color="#f59e0b" />
              </div>
            )) : <p style={{ fontSize: 12, color: DS.slate400 }}>Aucun anniversaire ce mois</p>}
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
const MembersPage = ({ userRole, churchName, setAlerts = () => {} }) => {
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

  const [selectedMember, setSelectedMember] = useState(null);

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
                <tr key={m.id} style={{ borderTop: "1px solid #f1f5f9", cursor: "pointer" }}
                  onClick={() => setSelectedMember(selectedMember?.id === m.id ? null : m)}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafbfc"}
                  onMouseLeave={e => e.currentTarget.style.background = selectedMember?.id === m.id ? "#f0fdfa" : "transparent"}>
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

      {/* ── PROFIL MEMBRE (panel latéral) ── */}
      {selectedMember && (() => {
        const m = selectedMember;
        const presencePct = m.presence_pct || 0;
        const presenceColor = presencePct >= 80 ? "#10b981" : presencePct >= 50 ? "#f59e0b" : "#ef4444";
        const memberBadges = m.badges || [];
        return (
          <div style={{ background: "#fff", borderRadius: DS.r16, border: `1px solid ${DS.slate100}`, padding: 24, marginTop: 16, boxShadow: DS.shadowMd, animation: "fadeIn 0.2s ease" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <MemberAvatar m={m} size={56} />
                <div>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: DS.slate900, letterSpacing: "-0.4px" }}>{m.first_name} {m.last_name}</h3>
                  <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                    <Badge variant={m.gender === "F" ? "info" : "default"}>{m.gender === "F" ? "Femme" : "Homme"}</Badge>
                    <Badge variant="success">{m.status}</Badge>
                    {m.baptise && <Badge variant="info">💧 Baptisé{m.gender === "F" ? "e" : ""}</Badge>}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Btn variant="secondary" size="sm" icon={Edit} onClick={() => openEdit(m)}>Modifier</Btn>
                <Btn variant="ghost" size="sm" icon={X} onClick={() => setSelectedMember(null)} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
              {/* Présence */}
              <div style={{ background: DS.slate50, borderRadius: DS.r12, padding: "16px 18px", border: `1px solid ${DS.slate100}` }}>
                <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: DS.slate400, textTransform: "uppercase", letterSpacing: "0.8px" }}>Présence</p>
                <div style={{ fontSize: 28, fontWeight: 900, color: presenceColor, lineHeight: 1 }}>{presencePct}%</div>
                <div style={{ height: 5, background: DS.slate200, borderRadius: 4, marginTop: 8, overflow: "hidden" }}>
                  <div style={{ width: `${presencePct}%`, height: "100%", background: `linear-gradient(90deg, ${presenceColor}, ${presenceColor}99)`, borderRadius: 4 }} />
                </div>
                <p style={{ margin: "5px 0 0", fontSize: 10, color: DS.slate400 }}>{presencePct >= 80 ? "Excellent" : presencePct >= 50 ? "Moyen" : "Faible"}</p>
              </div>

              {/* Quiz */}
              <div style={{ background: DS.slate50, borderRadius: DS.r12, padding: "16px 18px", border: `1px solid ${DS.slate100}` }}>
                <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: DS.slate400, textTransform: "uppercase", letterSpacing: "0.8px" }}>Points Quiz</p>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#8b5cf6", lineHeight: 1 }}>{m.quiz_points || 0}</div>
                <p style={{ margin: "8px 0 0", fontSize: 10, color: DS.slate400 }}>pts cumulés · classement</p>
              </div>

              {/* Ancienneté */}
              <div style={{ background: DS.slate50, borderRadius: DS.r12, padding: "16px 18px", border: `1px solid ${DS.slate100}` }}>
                <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: DS.slate400, textTransform: "uppercase", letterSpacing: "0.8px" }}>Ancienneté</p>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#0d9488", lineHeight: 1 }}>
                  {Math.floor((new Date() - new Date(m.join_date)) / (365.25 * 24 * 3600 * 1000))} <span style={{ fontSize: 14, fontWeight: 600 }}>ans</span>
                </div>
                <p style={{ margin: "8px 0 0", fontSize: 10, color: DS.slate400 }}>Depuis {new Date(m.join_date).toLocaleDateString("fr")}</p>
              </div>
            </div>

            {/* Badges */}
            {memberBadges.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: DS.slate600 }}>🏅 Badges obtenus</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {memberBadges.map((b, i) => (
                    <div key={i} style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(145deg, #f59e0b20, #f97316)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: "1px solid #f59e0b25", boxShadow: "0 2px 8px rgba(245,158,11,0.15)" }}>{b}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Infos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, color: DS.slate600, marginBottom: 16 }}>
              {m.phone && <div style={{ display: "flex", gap: 6, alignItems: "center" }}><Phone size={12} color={DS.slate400} />{m.phone}</div>}
              {m.email && <div style={{ display: "flex", gap: 6, alignItems: "center" }}><Mail size={12} color={DS.slate400} />{m.email}</div>}
              {(m.departments||[m.department]).filter(Boolean).length > 0 && <div style={{ display: "flex", gap: 6, alignItems: "center" }}><Building2 size={12} color={DS.slate400} />{(m.departments||[m.department]).filter(Boolean).join(", ")}</div>}
              {m.address && <div style={{ display: "flex", gap: 6, alignItems: "center" }}><MapPin size={12} color={DS.slate400} />{m.address}</div>}
            </div>

            {/* Historique d'actions — panneau enrichi */}
            {(() => {
              const MOCK_HISTORY = [
                { id: 1, type: "visite", text: "Visite à domicile effectuée", date: "2026-03-18", author: "Pasteur Jean" },
                { id: 2, type: "appel", text: "Appel téléphonique — absent au culte du 16/03", date: "2026-03-17", author: "Esther Koné" },
                { id: 3, type: "culte", text: "Présent au culte dominical du 15/03", date: "2026-03-15", author: "Système" },
                { id: 4, type: "note", text: "Traversée une période difficile — besoin de soutien", date: "2026-03-10", author: "Pasteur Jean" },
                { id: 5, type: "statut", text: "Statut changé : inactif → actif", date: "2026-02-28", author: "Secrétaire" },
              ];
              const [history, setHistory] = useState([...(m.action_history || []), ...(m.id === 5 ? MOCK_HISTORY : [])]);
              const [newAction, setNewAction] = useState("");
              const [newType, setNewType] = useState("note");
              const [histFilter, setHistFilter] = useState("all");
              const actionTypes = {
                note: { label: "Note", emoji: "📝", color: "#3b82f6" },
                appel: { label: "Appel", emoji: "📞", color: "#10b981" },
                visite: { label: "Visite", emoji: "🏠", color: "#8b5cf6" },
                culte: { label: "Culte", emoji: "⛪", color: "#0d9488" },
                statut: { label: "Statut", emoji: "🔄", color: "#f59e0b" },
                priere: { label: "Prière", emoji: "🙏", color: "#ec4899" },
              };
              const addAction = () => {
                if (!newAction.trim()) return;
                const entry = { id: Date.now(), type: newType, text: newAction, date: new Date().toISOString().split("T")[0], author: "Pasteur Jean" };
                const updated = [entry, ...history];
                setHistory(updated);
                setMembers(prev => prev.map(x => x.id === m.id ? { ...x, action_history: updated } : x));
                setNewAction("");
                // Résoudre l'alerte persistante pour ce membre
                setAlerts(prev => prev.map(a => {
                  if (a.persistent && a.members?.includes(m.id)) {
                    return { ...a, members: a.members.filter(id => id !== m.id) };
                  }
                  return a;
                }).filter(a => !a.persistent || (a.members?.length || 0) > 0));
              };
              const exportHistory = () => {
                const csv = "\uFEFFDate,Type,Action,Auteur\n" + history.map(e => `${e.date},${actionTypes[e.type]?.label || e.type},"${e.text}",${e.author}`).join("\n");
                const b = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(b);
                const a = document.createElement("a"); a.href = url;
                a.download = `historique-${m.first_name}-${m.last_name}.csv`; a.click();
              };
              const filteredHistory = histFilter === "all" ? history : history.filter(e => e.type === histFilter);
              return (
                <div style={{ borderTop: `1px solid ${DS.slate100}`, paddingTop: 16, marginTop: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: DS.slate900 }}>📋 Historique d'actions</p>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={{ fontSize: 10, color: DS.slate400, fontWeight: 600, padding: "3px 8px", background: DS.slate100, borderRadius: 6 }}>{history.length} action{history.length > 1 ? "s" : ""}</span>
                      {history.length > 0 && <Btn size="sm" variant="ghost" icon={Download} onClick={exportHistory} />}
                    </div>
                  </div>
                  {/* Filtres par type */}
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                    <button onClick={() => setHistFilter("all")} style={{ padding: "3px 10px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 600, background: histFilter === "all" ? DS.slate800 : DS.slate100, color: histFilter === "all" ? "#fff" : DS.slate600 }}>Tout</button>
                    {Object.entries(actionTypes).map(([k, v]) => (
                      <button key={k} onClick={() => setHistFilter(k)} style={{ padding: "3px 10px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 600, background: histFilter === k ? `${v.color}15` : DS.slate100, color: histFilter === k ? v.color : DS.slate600, borderColor: histFilter === k ? v.color : "transparent" }}>
                        {v.emoji} {v.label}
                      </button>
                    ))}
                  </div>
                  {/* Saisie rapide */}
                  <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                    <select value={newType} onChange={e => setNewType(e.target.value)} style={{ ...selectStyle, width: 130, fontSize: 11, padding: "7px 10px" }}>
                      {Object.entries(actionTypes).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
                    </select>
                    <input style={{ ...inputStyle, flex: 1, fontSize: 12, padding: "8px 12px", minWidth: 160 }} value={newAction} onChange={e => setNewAction(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addAction()}
                      placeholder="Décrivez l'action effectuée..." />
                    <Btn size="sm" onClick={addAction} disabled={!newAction.trim()}>+ Ajouter</Btn>
                  </div>
                  {filteredHistory.length === 0 && <p style={{ fontSize: 11, color: DS.slate400, fontStyle: "italic", padding: "12px 0" }}>Aucune action de ce type enregistrée</p>}
                  <div style={{ maxHeight: 200, overflowY: "auto", display: "flex", flexDirection: "column", gap: 5 }}>
                    {filteredHistory.map(entry => {
                      const at = actionTypes[entry.type] || { emoji: "📌", color: "#64748b", label: entry.type };
                      return (
                        <div key={entry.id} style={{ padding: "9px 12px", background: `${at.color}08`, borderRadius: 9, borderLeft: `3px solid ${at.color}`, display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{at.emoji}</span>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: 12, color: DS.slate900, fontWeight: 600 }}>{entry.text}</p>
                            <p style={{ margin: "3px 0 0", fontSize: 10, color: DS.slate400 }}>{at.label} · {entry.author} · {new Date(entry.date).toLocaleDateString("fr")}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        );
      })()}

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
          <FormField label="Date de naissance (jour/mois)">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <select style={selectStyle} value={form.birthday_day || ""} onChange={e => setForm({ ...form, birthday_day: parseInt(e.target.value) })}>
                <option value="">Jour</option>
                {Array.from({length:31},(_,i)=>i+1).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select style={selectStyle} value={form.birthday_month || ""} onChange={e => setForm({ ...form, birthday_month: parseInt(e.target.value) })}>
                <option value="">Mois</option>
                {["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"].map((m,i) => <option key={i+1} value={i+1}>{m}</option>)}
              </select>
            </div>
          </FormField>
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
  const ZONES = [
    { name: "Cocody",      responsable: "Jean Kouadio",    phone: "+225 07 08 09 10", color: "#0d9488" },
    { name: "Yopougon",   responsable: "Paul Yao",         phone: "+225 01 23 45 67", color: "#3b82f6" },
    { name: "Marcory",    responsable: "Esther Koné",      phone: "+225 07 98 76 54", color: "#8b5cf6" },
    { name: "Abobo",      responsable: "Ruth Diallo",      phone: "+225 01 44 55 66", color: "#f59e0b" },
    { name: "Treichville",responsable: "David Tra",        phone: "+225 05 55 66 77", color: "#ec4899" },
    { name: "Plateau",    responsable: "Marie Bamba",      phone: "+225 05 12 34 56", color: "#10b981" },
    { name: "Adjamé",     responsable: "Grace Achi",       phone: "+225 05 99 88 77", color: "#ef4444" },
    { name: "Koumassi",   responsable: "Samuel Ouattara",  phone: "+225 07 11 22 33", color: "#14b8a6" },
    { name: "Autre",      responsable: "Jean Kouadio",     phone: "+225 07 08 09 10", color: "#64748b" },
  ];

  const getZoneFor = (address) => {
    if (!address) return null;
    return ZONES.find(z => address.toLowerCase().includes(z.name.toLowerCase())) || null;
  };

  const [visitors, setVisitors] = useState(MOCK_VISITORS.map(v => ({
    ...v, email: "", address: v.address || "", followups: [], status: v.status || "nouveau",
    zone: v.address ? (ZONES.find(z => v.address?.includes(z.name))?.name || "Autre") : "",
    responsable_suivi: v.address ? (ZONES.find(z => v.address?.includes(z.name))?.responsable || "") : "",
    responsable_phone: v.address ? (ZONES.find(z => v.address?.includes(z.name))?.phone || "") : "",
  })));

  const [showModal, setShowModal]   = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [showFollowup, setShowFollowup] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [dupWarning, setDupWarning] = useState(null);
  const [zoneMatch, setZoneMatch]   = useState(null);
  const [livedup, setLivedup]       = useState(null); // real-time dup while typing
  const [viewMode, setViewMode]     = useState("list"); // "list" | "zones"
  const [filterZone, setFilterZone] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch]         = useState("");

  const emptyForm = { first_name: "", last_name: "", phone: "", email: "", address: "", zone: "", source: "", notes: "" };
  const [form, setForm]         = useState(emptyForm);
  const [followForm, setFollowForm] = useState({ type: "Appel téléphonique", notes: "", next_date: "" });

  const statusMap = {
    nouveau:  { label: "Nouveau",    variant: "info"    },
    suivi:    { label: "En suivi",   variant: "warning" },
    regulier: { label: "Régulier",   variant: "purple"  },
    converti: { label: "Converti",   variant: "success" },
  };
  const statusFlow = ["nouveau", "suivi", "regulier", "converti"];

  // ── Real-time duplicate check while typing ──
  const checkDuplicateRT = (f) => {
    const nameLower = `${f.first_name} ${f.last_name}`.toLowerCase().trim();
    const phoneCleaned = f.phone?.replace(/\s/g, "");
    if (!nameLower && !phoneCleaned) return [];
    return visitors.filter(v => {
      if (editing && v.id === editing.id) return false;
      const vName = `${v.first_name} ${v.last_name}`.toLowerCase().trim();
      const vPhone = v.phone?.replace(/\s/g, "");
      return (nameLower.length > 4 && vName === nameLower) || (phoneCleaned?.length > 7 && vPhone === phoneCleaned);
    });
  };

  const handleFormChange = (field, value) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    const dups = checkDuplicateRT(newForm);
    setLivedup(dups.length > 0 ? dups : null);
  };

  const handleAddressChange = (address) => {
    const newForm = { ...form, address };
    const zone = ZONES.find(z => address.toLowerCase().includes(z.name.toLowerCase()));
    if (zone) { newForm.zone = zone.name; setZoneMatch(zone); }
    else setZoneMatch(null);
    setForm(newForm);
  };

  const handleSave = (force = false) => {
    if (!form.first_name.trim()) return;
    if (livedup?.length > 0 && !force) { setDupWarning(livedup); return; }
    setDupWarning(null);
    const zone = ZONES.find(z => z.name === form.zone) || getZoneFor(form.address);
    const payload = {
      ...form,
      zone: zone?.name || form.zone || "Autre",
      responsable_suivi: zone?.responsable || "",
      responsable_phone: zone?.phone || "",
    };
    if (editing) {
      const updated = { ...editing, ...payload };
      setVisitors(prev => prev.map(v => v.id === editing.id ? updated : v));
      if (showDetail?.id === editing.id) setShowDetail(updated);
    } else {
      setVisitors(prev => [...prev, { ...payload, id: Date.now(), visit_date: new Date().toISOString().split("T")[0], status: "nouveau", followups: [] }]);
    }
    setShowModal(false); setEditing(null); setDupWarning(null); setZoneMatch(null); setLivedup(null);
    setForm(emptyForm);
  };

  const addFollowup = () => {
    if (!showDetail) return;
    const updated = { ...showDetail, followups: [...(showDetail.followups||[]), { ...followForm, date: new Date().toISOString().split("T")[0], id: Date.now() }] };
    setVisitors(prev => prev.map(v => v.id === showDetail.id ? updated : v));
    setShowDetail(updated);
    setShowFollowup(false); setFollowForm({ type: "Appel téléphonique", notes: "", next_date: "" });
  };

  const openNew = () => { setEditing(null); setForm(emptyForm); setDupWarning(null); setZoneMatch(null); setLivedup(null); setShowModal(true); };
  const openEdit = (v) => { setEditing(v); setForm({ ...v }); setDupWarning(null); setZoneMatch(null); setLivedup(null); setShowModal(true); };

  // Filtered list
  const filtered = visitors.filter(v => {
    const matchSearch = !search || `${v.first_name} ${v.last_name} ${v.phone}`.toLowerCase().includes(search.toLowerCase());
    const matchZone = filterZone === "all" || v.zone === filterZone;
    const matchStatus = filterStatus === "all" || v.status === filterStatus;
    return matchSearch && matchZone && matchStatus;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: DS.slate900, margin: 0, letterSpacing: "-0.5px" }}>Visiteurs & Suivi</h2>
          <p style={{ fontSize: 13, color: DS.slate400, margin: "4px 0 0", fontWeight: 500 }}>
            {visitors.length} visiteurs · {visitors.filter(v => v.status === "converti").length} convertis · {visitors.filter(v => v.responsable_suivi).length} assignés à un responsable de zone
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", background: DS.slate100, borderRadius: 10, padding: 3, border: `1px solid ${DS.slate200}` }}>
            {[{k:"list",l:"📋 Liste"},{k:"zones",l:"🗺️ Zones"}].map(m => (
              <button key={m.k} onClick={() => setViewMode(m.k)} style={{
                padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
                background: viewMode === m.k ? "#fff" : "transparent",
                color: viewMode === m.k ? DS.slate900 : DS.slate400,
                boxShadow: viewMode === m.k ? DS.shadowSm : "none", transition: "all 0.18s",
              }}>{m.l}</button>
            ))}
          </div>
          <Btn icon={Plus} onClick={openNew}>Nouveau visiteur</Btn>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
        {["nouveau","suivi","regulier","converti"].map(s => {
          const count = visitors.filter(v => v.status === s).length;
          const colors = { nouveau: "#3b82f6", suivi: "#f59e0b", regulier: "#8b5cf6", converti: "#10b981" };
          const labels = { nouveau: "Nouveaux", suivi: "En suivi", regulier: "Réguliers", converti: "Convertis" };
          return (
            <div key={s} onClick={() => setFilterStatus(filterStatus === s ? "all" : s)} style={{
              background: "#fff", borderRadius: DS.r12, padding: "14px 16px",
              border: filterStatus === s ? `2px solid ${colors[s]}` : `1px solid ${DS.slate100}`,
              boxShadow: DS.shadowSm, borderTop: `3px solid ${colors[s]}`,
              cursor: "pointer", transition: "all 0.18s",
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: colors[s] }}>{count}</div>
              <div style={{ fontSize: 11, color: DS.slate400, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{labels[s]}</div>
            </div>
          );
        })}
      </div>

      {/* ── VUE ZONES ── */}
      {viewMode === "zones" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {ZONES.map(z => {
            const zVisitors = visitors.filter(v => v.zone === z.name);
            const convertis = zVisitors.filter(v => v.status === "converti").length;
            return (
              <div key={z.name} onClick={() => { setViewMode("list"); setFilterZone(z.name); }} style={{
                background: "#fff", borderRadius: DS.r16, padding: 20,
                border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm,
                borderLeft: `4px solid ${z.color}`, cursor: "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = DS.shadowMd; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = DS.shadowSm; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: DS.slate900 }}>{z.name}</h3>
                    <p style={{ margin: 0, fontSize: 11, color: DS.slate400 }}>{zVisitors.length} visiteur{zVisitors.length > 1 ? "s" : ""}</p>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${z.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin size={18} color={z.color} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: `${z.color}08`, borderRadius: 10, border: `1px solid ${z.color}20`, marginBottom: 10 }}>
                  <Avatar name={z.responsable} size={28} color={z.color} />
                  <div>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: DS.slate900 }}>{z.responsable}</p>
                    <p style={{ margin: 0, fontSize: 10, color: DS.slate400 }}>Responsable · {z.phone}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, textAlign: "center", padding: "6px 0", background: DS.slate50, borderRadius: 8 }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: z.color }}>{zVisitors.length}</div>
                    <div style={{ fontSize: 9, color: DS.slate400, textTransform: "uppercase", letterSpacing: "0.5px" }}>Total</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center", padding: "6px 0", background: "#f0fdf4", borderRadius: 8 }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#10b981" }}>{convertis}</div>
                    <div style={{ fontSize: 9, color: DS.slate400, textTransform: "uppercase", letterSpacing: "0.5px" }}>Convertis</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center", padding: "6px 0", background: "#fffbeb", borderRadius: 8 }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#f59e0b" }}>{zVisitors.filter(v => v.status === "suivi").length}</div>
                    <div style={{ fontSize: 9, color: DS.slate400, textTransform: "uppercase", letterSpacing: "0.5px" }}>En suivi</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── VUE LISTE ── */}
      {viewMode === "list" && (
        <>
          {/* Filters */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180, position: "relative" }}>
              <Search size={14} color={DS.slate400} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un visiteur..."
                style={{ ...inputStyle, paddingLeft: 34 }} />
            </div>
            <select style={{ ...selectStyle, width: 160 }} value={filterZone} onChange={e => setFilterZone(e.target.value)}>
              <option value="all">Toutes les zones</option>
              {ZONES.map(z => <option key={z.name} value={z.name}>{z.name}</option>)}
            </select>
            <select style={{ ...selectStyle, width: 140 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">Tous les statuts</option>
              {statusFlow.map(s => <option key={s} value={s}>{statusMap[s].label}</option>)}
            </select>
            {(filterZone !== "all" || filterStatus !== "all" || search) && (
              <Btn variant="secondary" size="sm" onClick={() => { setFilterZone("all"); setFilterStatus("all"); setSearch(""); }}>
                Réinitialiser
              </Btn>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: showDetail ? "1fr 1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.length === 0 && <EmptyState icon={UserPlus} title="Aucun visiteur trouvé" description="Modifiez vos filtres ou ajoutez un nouveau visiteur" />}
              {filtered.map(v => {
                const zone = ZONES.find(z => z.name === v.zone);
                return (
                  <div key={v.id} onClick={() => setShowDetail(v)} style={{
                    background: "#fff", borderRadius: 14, padding: 16,
                    border: showDetail?.id === v.id ? `2px solid #0d9488` : `1px solid ${DS.slate100}`,
                    cursor: "pointer", transition: "all 0.15s", boxShadow: DS.shadowSm,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = DS.shadowMd; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = DS.shadowSm; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar name={v.first_name} size={38} color={zone?.color || "#3b82f6"} />
                        <div>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: DS.slate900 }}>{v.first_name} {v.last_name}</p>
                          <p style={{ margin: 0, fontSize: 11, color: DS.slate400 }}>{v.phone} · {new Date(v.visit_date).toLocaleDateString("fr")}</p>
                        </div>
                      </div>
                      <Badge variant={statusMap[v.status]?.variant}>{statusMap[v.status]?.label}</Badge>
                    </div>
                    {v.zone && (
                      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: `${zone?.color || "#0d9488"}08`, borderRadius: 8, border: `1px solid ${zone?.color || "#0d9488"}20` }}>
                        <MapPin size={12} color={zone?.color || "#0d9488"} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: zone?.color || "#0d9488" }}>{v.zone}</span>
                        {v.responsable_suivi && (
                          <>
                            <span style={{ color: DS.slate200 }}>·</span>
                            <span style={{ fontSize: 11, color: DS.slate600 }}>Suivi : <strong>{v.responsable_suivi}</strong></span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Detail panel */}
            {showDetail && (
              <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${DS.slate100}`, padding: 24, position: "sticky", top: 20, boxShadow: DS.shadowMd, maxHeight: "82vh", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar name={showDetail.first_name} size={48} color={ZONES.find(z => z.name === showDetail.zone)?.color || "#3b82f6"} />
                    <div>
                      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: DS.slate900, letterSpacing: "-0.3px" }}>{showDetail.first_name} {showDetail.last_name}</h3>
                      <Badge variant={statusMap[showDetail.status]?.variant}>{statusMap[showDetail.status]?.label}</Badge>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Btn variant="ghost" size="sm" icon={Edit} onClick={() => openEdit(showDetail)} />
                    <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => { if(confirm(`Supprimer ${showDetail.first_name} ?`)) { setVisitors(prev => prev.filter(v => v.id !== showDetail.id)); setShowDetail(null); } }} />
                    <Btn variant="ghost" size="sm" icon={X} onClick={() => setShowDetail(null)} />
                  </div>
                </div>

                {/* Zone assignment card */}
                {showDetail.zone && (() => {
                  const z = ZONES.find(zz => zz.name === showDetail.zone);
                  return (
                    <div style={{ padding: "14px 16px", background: `linear-gradient(135deg, ${z?.color || "#0d9488"}12, ${z?.color || "#0d9488"}06)`, borderRadius: 14, border: `1px solid ${z?.color || "#0d9488"}30`, marginBottom: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <MapPin size={14} color={z?.color || "#0d9488"} />
                        <span style={{ fontSize: 13, fontWeight: 800, color: z?.color || "#0d9488" }}>Zone : {showDetail.zone}</span>
                      </div>
                      {showDetail.responsable_suivi && (
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Avatar name={showDetail.responsable_suivi} size={34} color={z?.color || "#0d9488"} />
                          <div>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: DS.slate900 }}>{showDetail.responsable_suivi}</p>
                            <p style={{ margin: 0, fontSize: 11, color: DS.slate400 }}>Responsable de zone · {showDetail.responsable_phone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                <FormField label="Changer le statut">
                  <select style={selectStyle} value={showDetail.status} onChange={e => {
                    const updated = { ...showDetail, status: e.target.value };
                    setVisitors(prev => prev.map(v => v.id === showDetail.id ? updated : v));
                    setShowDetail(updated);
                  }}>
                    {statusFlow.map(s => <option key={s} value={s}>{statusMap[s]?.label}</option>)}
                  </select>
                </FormField>

                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14, padding: 12, background: DS.slate50, borderRadius: 10 }}>
                  {[
                    [Phone, showDetail.phone || "—"],
                    [Mail,  showDetail.email || "—"],
                    [MapPin, showDetail.address || "—"],
                    [Calendar, `Visite : ${showDetail.visit_date ? new Date(showDetail.visit_date).toLocaleDateString("fr") : "—"}`],
                    [Users, `Source : ${showDetail.source || "—"}`],
                  ].map(([Icon, text], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: DS.slate600 }}>
                      <Icon size={12} color={DS.slate400} />{text}
                    </div>
                  ))}
                </div>

                {showDetail.notes && <p style={{ padding: "10px 12px", background: "#fffbeb", borderRadius: 9, fontSize: 12, color: "#92400e", margin: "0 0 14px", lineHeight: 1.5, border: "1px solid #fef3c7" }}>📝 {showDetail.notes}</p>}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <h4 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: DS.slate900 }}>Actions de suivi ({(showDetail.followups||[]).length})</h4>
                  <Btn size="sm" icon={Plus} onClick={() => setShowFollowup(true)}>Ajouter</Btn>
                </div>
                {(showDetail.followups||[]).length === 0 && <p style={{ fontSize: 12, color: DS.slate400, fontStyle: "italic" }}>Aucune action enregistrée</p>}
                {(showDetail.followups||[]).map(f => (
                  <div key={f.id} style={{ padding: 10, borderLeft: "3px solid #0d9488", background: DS.slate50, borderRadius: "0 9px 9px 0", marginBottom: 7 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                      <span style={{ fontWeight: 700, color: "#0d9488" }}>{f.type}</span>
                      <span style={{ color: DS.slate400 }}>{f.date}</span>
                    </div>
                    {f.notes && <p style={{ margin: "4px 0 0", fontSize: 11, color: DS.slate600 }}>{f.notes}</p>}
                    {f.next_date && <p style={{ margin: "3px 0 0", fontSize: 10, color: "#d97706", fontWeight: 600 }}>⏰ Prochaine action : {f.next_date}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── MODAL NOUVEAU/MODIFIER VISITEUR ── */}
      <Modal open={showModal} onClose={() => { setShowModal(false); setEditing(null); setDupWarning(null); setZoneMatch(null); setLivedup(null); }} title={editing ? "Modifier le visiteur" : "Nouveau visiteur"}>

        {/* LIVE duplicate alert — shown while typing */}
        {livedup && livedup.length > 0 && !dupWarning && (
          <div style={{ padding: "12px 14px", background: "#fef9c3", border: "2px solid #fde047", borderRadius: 12, marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 800, color: "#92400e" }}>Visiteur potentiellement déjà enregistré</p>
              {livedup.map(d => (
                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: "1px solid #fde68a" }}>
                  <Avatar name={d.first_name} size={24} color="#d97706" />
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e" }}>{d.first_name} {d.last_name}</span>
                    <span style={{ fontSize: 11, color: "#a16207", marginLeft: 8 }}>{d.phone} · visité le {new Date(d.visit_date).toLocaleDateString("fr")}</span>
                  </div>
                  <Badge variant="warning">{statusMap[d.status]?.label}</Badge>
                </div>
              ))}
              <p style={{ margin: "8px 0 0", fontSize: 11, color: "#92400e", fontStyle: "italic" }}>Vérifiez si c'est la même personne avant d'enregistrer.</p>
            </div>
          </div>
        )}

        {/* SAVE-time duplicate confirmation */}
        {dupWarning && dupWarning.length > 0 && (
          <div style={{ padding: "14px 16px", background: "#fff1f2", border: "2px solid #fda4af", borderRadius: 12, marginBottom: 16 }}>
            <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 800, color: "#be123c" }}>🚫 Ce visiteur semble déjà exister. Que voulez-vous faire ?</p>
            {dupWarning.map(d => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
                <Avatar name={d.first_name} size={28} color="#e11d48" />
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#be123c" }}>{d.first_name} {d.last_name}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#9f1239" }}>{d.phone} · Zone : {d.zone} · {statusMap[d.status]?.label}</p>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Btn size="sm" variant="secondary" onClick={() => setDupWarning(null)}>← Corriger les infos</Btn>
              <Btn size="sm" variant="danger" onClick={() => handleSave(true)}>Ajouter quand même</Btn>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FormField label="Prénom *"><input style={inputStyle} value={form.first_name} onChange={e => handleFormChange("first_name", e.target.value)} /></FormField>
          <FormField label="Nom *"><input style={inputStyle} value={form.last_name} onChange={e => handleFormChange("last_name", e.target.value)} /></FormField>
          <FormField label="Téléphone"><input style={inputStyle} value={form.phone} onChange={e => handleFormChange("phone", e.target.value)} placeholder="+225 07 00 00 00" /></FormField>
          <FormField label="Email"><input style={inputStyle} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></FormField>
        </div>

        <FormField label="Adresse / Quartier">
          <input style={inputStyle} value={form.address} onChange={e => handleAddressChange(e.target.value)} placeholder="Ex: Cocody Angré, Yopougon Selmer, Marcory Zone 4..." />
        </FormField>

        {/* Zone auto-match feedback */}
        {zoneMatch ? (
          <div style={{ padding: "12px 14px", background: "linear-gradient(135deg, #f0fdfa, #ccfbf1)", borderRadius: 12, border: `2px solid ${zoneMatch.color}40`, marginTop: -8, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${zoneMatch.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MapPin size={16} color={zoneMatch.color} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: zoneMatch.color }}>✓ Zone détectée : {zoneMatch.name}</p>
              <p style={{ margin: 0, fontSize: 11, color: DS.slate600 }}>Responsable assigné automatiquement : <strong>{zoneMatch.responsable}</strong> ({zoneMatch.phone})</p>
            </div>
          </div>
        ) : form.address ? (
          <div style={{ padding: "10px 14px", background: "#fffbeb", borderRadius: 10, border: "1px solid #fde68a", marginTop: -8, marginBottom: 14 }}>
            <p style={{ margin: 0, fontSize: 11, color: "#92400e" }}>Zone non reconnue automatiquement — sélectionnez manuellement ci-dessous.</p>
          </div>
        ) : null}

        <FormField label="Zone de résidence">
          <select style={selectStyle} value={form.zone} onChange={e => {
            const z = ZONES.find(z => z.name === e.target.value);
            setForm(f => ({ ...f, zone: e.target.value }));
            setZoneMatch(z || null);
          }}>
            <option value="">— Sélectionner une zone —</option>
            {ZONES.map(z => <option key={z.name} value={z.name}>{z.name} → Resp: {z.responsable}</option>)}
          </select>
        </FormField>

        <FormField label="Source / Comment nous a-t-il connu ?">
          <select style={selectStyle} value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}>
            <option value="">— Sélectionner —</option>
            {["Bouche à oreille","Invitation d'un membre","Réseaux sociaux","Événement","Passage devant l'église","Autre"].map(s => <option key={s}>{s}</option>)}
          </select>
        </FormField>

        <FormField label="Notes"><textarea style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></FormField>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => { setShowModal(false); setEditing(null); setDupWarning(null); setZoneMatch(null); setLivedup(null); }}>Annuler</Btn>
          <Btn onClick={() => handleSave(false)} disabled={!form.first_name.trim()}
            style={livedup?.length > 0 ? { background: "linear-gradient(135deg, #d97706, #b45309)" } : {}}>
            {livedup?.length > 0 ? "⚠️ " : ""}{editing ? "Enregistrer" : "Ajouter le visiteur"}
          </Btn>
        </div>
      </Modal>

      {/* Followup modal */}
      <Modal open={showFollowup} onClose={() => setShowFollowup(false)} title="Ajouter une action de suivi">
        <FormField label="Type d'action">
          <select style={selectStyle} value={followForm.type} onChange={e => setFollowForm({ ...followForm, type: e.target.value })}>
            {["Appel téléphonique","Visite à domicile","Email","SMS","WhatsApp","Rencontre en personne"].map(t => <option key={t}>{t}</option>)}
          </select>
        </FormField>
        <FormField label="Notes"><textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={followForm.notes} onChange={e => setFollowForm({ ...followForm, notes: e.target.value })} /></FormField>
        <FormField label="Prochaine action prévue (optionnel)"><input style={inputStyle} type="date" value={followForm.next_date} onChange={e => setFollowForm({ ...followForm, next_date: e.target.value })} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowFollowup(false)}>Annuler</Btn>
          <Btn onClick={addFollowup}>Enregistrer</Btn>
        </div>
      </Modal>
    </div>
  );
};
// FINANCES PAGE
const FinancesPage = ({ userRole = "membre" }) => {
  const [tab, setTab] = useState("overview");
  const [period, setPeriod] = useState("month");
  const [showModal, setShowModal] = useState(false);
  const canSeeDimes = ["pasteur", "tresorier", "super_admin"].includes(userRole);

  // Filter transactions: hide dimes for non-authorized roles
  const [allTransactions, setAllTransactions] = useState(MOCK_FINANCES);
  const transactions = canSeeDimes ? allTransactions : allTransactions.filter(t => t.category !== "dimes");
  const setTransactions = canSeeDimes
    ? setAllTransactions
    : (fn) => setAllTransactions(prev => {
        const updated = typeof fn === "function" ? fn(prev) : fn;
        return updated;
      });

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
      {!canSeeDimes && (
        <div style={{ padding: "10px 16px", background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 12, marginBottom: 16, display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#92400e", fontWeight: 600 }}>
          <Shield size={14} color="#d97706" />
          Les dîmes sont masquées pour votre rôle. Seuls le pasteur et le trésorier peuvent les consulter.
        </div>
      )}
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
                  {canSeeDimes && <option value="dimes">Dîmes</option>}
                  <option value="offrandes_culte">Offrandes culte</option>
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
                <div onClick={e => e.stopPropagation()}>
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
            {(selectedDept.members||[]).map((mName, i) => {
              const fullMember = MOCK_MEMBERS.find(m => `${m.first_name} ${m.last_name}` === mName || m.first_name === mName);
              const pct = fullMember?.presence_pct || Math.floor(60 + Math.random() * 35);
              const pColor = pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444";
              const lvl = fullMember?.quiz_points ? Math.floor(fullMember.quiz_points / 300) + 1 : 1;
              const lvlNames = ["","Semeur","Berger","Serviteur","Leader","Apôtre"];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #f8fafc" }}>
                  <Avatar name={mName} size={30} color={selectedDept.color} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: DS.slate900 }}>{mName}</p>
                    <div style={{ display: "flex", align: "center", gap: 6, marginTop: 3 }}>
                      <span style={{ fontSize: 10, color: DS.slate400 }}>Niv. {lvl} {lvlNames[Math.min(lvl,5)]}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: pColor }}>{pct}%</div>
                    <div style={{ width: 50, height: 3, background: DS.slate100, borderRadius: 2, marginTop: 3, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: pColor, borderRadius: 2 }} />
                    </div>
                    <div style={{ fontSize: 9, color: DS.slate400, marginTop: 2 }}>présence</div>
                  </div>
                </div>
              );
            })}
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
const CultesPage = ({ userRole = "pasteur" }) => {
  // Qui peut marquer les présences
  const canMarkPresence = [
    "pasteur","admin","super_admin","secretaire",
    "responsable_dept","responsable_comite","responsable_groupe",
    "responsable_adjoint_dept","responsable_adjoint_comite","responsable_adjoint_groupe"
  ].includes(userRole);

  // Département/groupe du responsable connecté (simulation)
  const userDept = userRole === "responsable_dept" ? "Louange"
    : userRole === "responsable_comite" ? "Comité d'organisation"
    : userRole === "responsable_groupe" ? "Groupe Alpha"
    : null; // null = voit tout (pasteur/admin/secrétaire)
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
  const [culteDupWarning, setCulteDupWarning] = useState(null); // doublon détecté

  const filtered = filter === "all" ? cultes : cultes.filter(c => c.type === filter);
  const totalPres = (c) => (c.hommes||0) + (c.femmes||0) + (c.jeunes||0) + (c.enfants||0);

  // ── Vérification doublons culte ──
  const checkCulteDuplicate = (date, type) => {
    if (!date || !type) return null;
    return cultes.find(c => c.date === date && c.type === type) || null;
  };

  const handleCulteFormChange = (field, value) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    if (field === "date" || field === "type") {
      const dup = checkCulteDuplicate(newForm.date, newForm.type);
      setCulteDupWarning(dup || null);
    }
  };

  const handleSaveCulte = (force = false) => {
    if (!form.date) return;
    if (!force && culteDupWarning) return; // bloqué par doublon — forcer avec force=true
    const payload = { ...form, id: Date.now(), hommes: parseInt(form.hommes)||0, femmes: parseInt(form.femmes)||0, jeunes: parseInt(form.jeunes)||0, enfants: parseInt(form.enfants)||0, offrande: parseInt(form.offrande)||0 };
    setCultes(prev => [...prev, payload]);
    setShowModal(false);
    setCulteDupWarning(null);
  };

  // ── Export appel nominal CSV ──
  const exportAppelCSV = () => {
    const lines = ["\uFEFFNom,Prénom,Genre,Département,Présence"];
    appelList.forEach(m => {
      lines.push(`${m.last_name},${m.first_name},${m.gender === "F" ? "Femme" : "Homme"},${m.department || ""},${m.present ? "Présent" : "Absent"}`);
    });
    const csv = lines.join("\n");
    const b = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(b);
    const a = document.createElement("a"); a.href = url;
    a.download = `appel-nominal-${new Date().toISOString().split("T")[0]}.csv`; a.click();
  };

  const openAppel = () => {
    // Responsable sees only their dept/comité/groupe; pasteur/admin sees all
    const members = userDept
      ? MOCK_MEMBERS.filter(m =>
          (m.departments||[m.department]).filter(Boolean).includes(userDept) ||
          (m.committees||[]).includes(userDept) ||
          (m.groups||[]).includes(userDept)
        )
      : MOCK_MEMBERS;
    setAppelList(members.map(m => ({ ...m, present: true })));
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
          <Btn icon={Plus} onClick={() => { setForm({ date: new Date().toISOString().split("T")[0], type: culteTypes[0], hommes: "", femmes: "", jeunes: "", enfants: "", offrande: "", theme: "", predicateur: "" }); setCulteDupWarning(null); setShowModal(true); }}>Enregistrer un culte</Btn>
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

        {/* Workflow scope banner */}
        {userDept ? (
          <div style={{ padding: "10px 14px", background: "linear-gradient(135deg, #eff6ff, #dbeafe)", borderRadius: 12, marginBottom: 14, border: "1px solid #bfdbfe", display: "flex", alignItems: "center", gap: 10 }}>
            <Shield size={16} color="#2563eb" />
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: "#1d4ed8" }}>Vue restreinte — {userDept}</p>
              <p style={{ margin: 0, fontSize: 11, color: "#3b82f6" }}>Vous ne voyez que les membres de votre {userRole.includes("comite") ? "comité" : userRole.includes("groupe") ? "groupe" : "département"}.</p>
            </div>
          </div>
        ) : (
          <div style={{ padding: "10px 14px", background: "#f0fdfa", borderRadius: 12, marginBottom: 14, border: "1px solid #0d948820", display: "flex", alignItems: "center", gap: 10 }}>
            <Users size={14} color="#0d9488" />
            <p style={{ margin: 0, fontSize: 11, color: "#0d9488", fontWeight: 600 }}>Vue complète — tous les membres de l'église</p>
          </div>
        )}
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
          <Btn variant="secondary" icon={Download} onClick={exportAppelCSV} disabled={appelList.length === 0}>Exporter CSV</Btn>
          <Btn onClick={autoCountFromAppel}>Valider et enregistrer le culte →</Btn>
        </div>
      </Modal>

      <Modal open={showModal} onClose={() => { setShowModal(false); setCulteDupWarning(null); }} title="Enregistrer un culte" width={550}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormField label="Date *">
            <input style={inputStyle} type="date" value={form.date} onChange={e => handleCulteFormChange("date", e.target.value)} />
          </FormField>
          <FormField label="Type de culte">
            <select style={selectStyle} value={form.type} onChange={e => handleCulteFormChange("type", e.target.value)}>
              {culteTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </FormField>
        </div>

        {/* ── Alerte doublon ── */}
        {culteDupWarning && (
          <div style={{ padding: "12px 16px", background: "#fff8f0", borderRadius: 10, border: "2px solid #f97316", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <AlertCircle size={18} color="#f97316" style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#ea580c" }}>
                  ⚠️ Doublon détecté — {culteDupWarning.type} du {new Date(culteDupWarning.date).toLocaleDateString("fr")} existe déjà
                </p>
                <p style={{ margin: "0 0 8px", fontSize: 11, color: "#78350f" }}>
                  Thème : « {culteDupWarning.theme || "—"} » · {totalPres(culteDupWarning)} présents
                </p>
                <Btn size="sm" variant="secondary" onClick={() => handleSaveCulte(true)}>
                  Enregistrer quand même (doublon assumé)
                </Btn>
              </div>
            </div>
          </div>
        )}
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
          <Btn variant="secondary" onClick={() => { setShowModal(false); setCulteDupWarning(null); }}>Annuler</Btn>
          <Btn onClick={() => handleSaveCulte(false)} disabled={!!culteDupWarning}>
            {culteDupWarning ? "⚠️ Doublon — voir ci-dessus" : "Enregistrer"}
          </Btn>
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
const SettingsPage = ({ seasons, setSeasons, terminology, setTerminology, carouselSlides: propSlides, setCarouselSlides: propSetSlides, churchData, setChurchData, features, setFeatures }) => {
  const churchName = churchData?.name || "Église Foursquare Lumière";
  const denomination = churchData?.denomination || "Foursquare";
  const pasteur = churchData?.pasteur || "Jean Kouadio";
  const updateChurch = (field, value) => setChurchData?.(prev => ({ ...prev, [field]: value }));
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
            <input style={inputStyle} value={churchName} onChange={e => updateChurch("name", e.target.value)} />
          </FormField>
          <FormField label="Dénomination">
            <input style={inputStyle} value={denomination} onChange={e => updateChurch("denomination", e.target.value)} />
          </FormField>
          <FormField label="Pasteur principal">
            <input style={inputStyle} value={pasteur} onChange={e => updateChurch("pasteur", e.target.value)} />
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
              <input style={inputStyle} value={tm.departments} onChange={e => setT(prev => ({...prev, departments: e.target.value}))} placeholder="Ex: Ministères, Commissions..." />
            </FormField>
            <FormField label="Nom pour 'Comités & Services'">
              <input style={inputStyle} value={tm.committees} onChange={e => setT(prev => ({...prev, committees: e.target.value}))} placeholder="Ex: Comités, Services, Équipes..." />
            </FormField>
            <FormField label="Nom pour 'Groupes'">
              <input style={inputStyle} value={tm.groups || "Groupes"} onChange={e => setT(prev => ({...prev, groups: e.target.value}))} placeholder="Ex: Groupes, Cellules, Fraternités..." />
            </FormField>
            <FormField label="Nom pour 'Familles'">
              <input style={inputStyle} value={tm.families || "Familles"} onChange={e => setT(prev => ({...prev, families: e.target.value}))} placeholder="Ex: Familles, Foyers, Maisons..." />
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
          <div style={{ padding: 16, background: "#f0fdfa", borderRadius: 12, border: "1px solid #0d948830", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>🚀 Plan Growth</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748b" }}>Renouvelé le 01/05/2026 · 15 000 F/mois</p>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: "#0d9488", fontWeight: 600 }}>Paiement via Orange Money · CinetPay</p>
              </div>
              <Badge variant="success">Actif</Badge>
            </div>
          </div>
          <div style={{ padding: 14, background: "#fffbeb", borderRadius: 10, border: "1px solid #fde68a", marginBottom: 12 }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, color: "#92400e" }}>💡 Économisez 30 000 F avec le plan annuel</p>
            <p style={{ margin: 0, fontSize: 11, color: "#a16207" }}>Passez au plan Growth annuel à 150 000 F et obtenez 2 mois offerts.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="secondary" size="sm" onClick={() => {}}>Gérer l'abonnement →</Btn>
            <a href="https://wa.me/2250700000000?text=Bonjour%2C%20je%20veux%20passer%20au%20plan%20annuel" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "none", background: "#25D366", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                💬 Plan annuel via WhatsApp
              </button>
            </a>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8 }}>
            <Shield size={18} color="#ef4444" /> Sécurité
          </h3>
          {(() => {
            const [showPwd, setShowPwd] = useState(false);
            const [pwdForm, setPwdForm] = useState({ current: "", next: "", confirm: "" });
            const [pwdMsg, setPwdMsg] = useState(null);
            const handlePwd = () => {
              if (!pwdForm.current) { setPwdMsg({ type: "error", text: "Saisissez votre mot de passe actuel." }); return; }
              if (pwdForm.next.length < 8) { setPwdMsg({ type: "error", text: "Le nouveau mot de passe doit faire au moins 8 caractères." }); return; }
              if (pwdForm.next !== pwdForm.confirm) { setPwdMsg({ type: "error", text: "Les mots de passe ne correspondent pas." }); return; }
              setPwdMsg({ type: "success", text: "✅ Mot de passe modifié avec succès !" });
              setPwdForm({ current: "", next: "", confirm: "" });
              setTimeout(() => { setPwdMsg(null); setShowPwd(false); }, 3000);
            };
            return showPwd ? (
              <div style={{ background: "#f8fafc", borderRadius: 12, padding: 18, border: "1px solid #e2e8f0" }}>
                <FormField label="Mot de passe actuel">
                  <input type="password" style={inputStyle} value={pwdForm.current} onChange={e => setPwdForm(f => ({...f, current: e.target.value}))} placeholder="••••••••" />
                </FormField>
                <FormField label="Nouveau mot de passe">
                  <input type="password" style={inputStyle} value={pwdForm.next} onChange={e => setPwdForm(f => ({...f, next: e.target.value}))} placeholder="Minimum 8 caractères" />
                </FormField>
                <FormField label="Confirmer le nouveau mot de passe">
                  <input type="password" style={inputStyle} value={pwdForm.confirm} onChange={e => setPwdForm(f => ({...f, confirm: e.target.value}))} placeholder="••••••••" />
                </FormField>
                {pwdMsg && (
                  <div style={{ padding: "9px 14px", borderRadius: 10, marginBottom: 12, fontSize: 12, fontWeight: 600, background: pwdMsg.type === "error" ? "#fef2f2" : "#f0fdfa", color: pwdMsg.type === "error" ? "#dc2626" : "#0d9488", border: `1px solid ${pwdMsg.type === "error" ? "#fecaca" : "#0d948830"}` }}>
                    {pwdMsg.text}
                  </div>
                )}
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn onClick={handlePwd}>Enregistrer</Btn>
                  <Btn variant="secondary" onClick={() => { setShowPwd(false); setPwdForm({ current: "", next: "", confirm: "" }); setPwdMsg(null); }}>Annuler</Btn>
                </div>
              </div>
            ) : (
              <Btn variant="secondary" icon={Lock} onClick={() => setShowPwd(true)}>Changer le mot de passe</Btn>
            );
          })()}
        </div>


        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginTop: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8 }}>
            📋 Mentions légales & Confidentialité
          </h3>
          {(() => {
            const [openDoc, setOpenDoc] = useState(null);
            const docs = [
              {
                title: "Conditions d'utilisation",
                desc: "Cadre juridique d'utilisation de la plateforme Lumen Church",
                content: `CONDITIONS GÉNÉRALES D'UTILISATION — Lumen Church SaaS\nVersion en vigueur au 1er avril 2026\n\n1. OBJET\nLumen Church SaaS est une plateforme de gestion d'église à destination des pasteurs, administrateurs et membres d'églises chrétiennes. En accédant à la plateforme, vous acceptez les présentes conditions.\n\n2. ACCÈS AU SERVICE\nL'accès est réservé aux personnes majeures ou aux mineurs sous responsabilité d'un adulte. Chaque église dispose d'un espace isolé (multi-tenant). Le pasteur principal est responsable de la gestion des accès.\n\n3. RESPONSABILITÉS\nLumen Church SaaS met à disposition les outils. L'église est responsable des données qu'elle saisit et de leur exactitude. La plateforme ne saurait être tenue responsable de l'usage qui en est fait.\n\n4. PROPRIÉTÉ INTELLECTUELLE\nLe code, le design et la marque Lumen Church sont protégés. Toute reproduction sans autorisation est interdite.\n\n5. RÉSILIATION\nL'abonnement peut être résilié à tout moment. Les données sont conservées 30 jours après résiliation avant suppression définitive.\n\n6. LOI APPLICABLE\nLes présentes conditions sont régies par le droit ivoirien.`
              },
              {
                title: "Politique de confidentialité",
                desc: "Comment nous protégeons et traitons les données personnelles de vos membres",
                content: `POLITIQUE DE CONFIDENTIALITÉ — Lumen Church SaaS\n\n1. DONNÉES COLLECTÉES\nNous collectons uniquement les données nécessaires au fonctionnement : nom, prénom, téléphone, email, rôle dans l'église, présences aux cultes, données financières (dîmes et offrandes).\n\n2. FINALITÉ\nCes données servent exclusivement à la gestion interne de l'église. Elles ne sont jamais vendues ni partagées avec des tiers.\n\n3. HÉBERGEMENT\nLes données sont hébergées sur des serveurs sécurisés (Supabase/AWS) avec chiffrement en transit (HTTPS) et au repos.\n\n4. DURÉE DE CONSERVATION\nLes données sont conservées pendant toute la durée de l'abonnement + 30 jours après résiliation.\n\n5. DROITS DES UTILISATEURS\nChaque membre peut demander l'accès, la rectification ou la suppression de ses données en contactant l'administrateur de son église ou notre support.\n\n6. CONTACT\nPour toute question : support@lumenchurch.app`
              },
              {
                title: "Protection des données (RGPD)",
                desc: "Conformité aux normes de protection des données personnelles",
                content: `PROTECTION DES DONNÉES PERSONNELLES\n\n1. RESPONSABLE DU TRAITEMENT\nChaque église utilisant Lumen Church est responsable du traitement des données de ses membres. Lumen Church SaaS agit en tant que sous-traitant.\n\n2. BASE LÉGALE\nLe traitement est fondé sur :\n• L'exécution du contrat (gestion des membres)\n• Le consentement explicite pour les données sensibles\n• L'intérêt légitime pour les statistiques internes\n\n3. TRANSFERTS INTERNATIONAUX\nLes données peuvent être stockées dans l'Union Européenne ou aux États-Unis (AWS). Des garanties appropriées sont en place (clauses contractuelles types).\n\n4. SÉCURITÉ\n• Chiffrement TLS pour toutes les communications\n• Mots de passe hachés (bcrypt)\n• Accès basé sur les rôles (RBAC)\n• Journalisation des accès\n\n5. DROITS\nDroit d'accès, rectification, effacement, portabilité, limitation et opposition. Contactez : support@lumenchurch.app`
              },
              {
                title: "Politique de cookies",
                desc: "Utilisation des cookies et traceurs sur la plateforme",
                content: `POLITIQUE DE COOKIES\n\nLumen Church SaaS utilise un nombre minimal de cookies :\n\n• COOKIES ESSENTIELS (obligatoires)\n  - Session utilisateur : maintien de la connexion\n  - Préférences interface : thème, langue\n  Ces cookies ne peuvent pas être désactivés.\n\n• COOKIES ANALYTIQUES (optionnels)\n  - Statistiques d'utilisation anonymisées\n  - Aucune donnée personnelle transmise à des tiers\n  Vous pouvez les désactiver dans les paramètres.\n\n• COOKIES TIERS\n  - Aucun cookie publicitaire ou de tracking tiers\n  - Leaflet (cartes) : données de tuiles sans cookies personnels\n\nConformément à la loi, votre consentement est requis pour les cookies non essentiels.`
              },
              {
                title: "Mentions légales",
                desc: "Informations légales sur l'éditeur de la plateforme",
                content: `MENTIONS LÉGALES\n\nÉDITEUR\nLumen Church SaaS\nPlateforme de gestion d'église pour l'Afrique francophone\nContact : support@lumenchurch.app\n\nHÉBERGEMENT\nSupabase Inc. / Amazon Web Services\nServeurs localisés en Europe (UE)\n\nPROPRIÉTÉ INTELLECTUELLE\nTous les éléments de la plateforme (code, design, marque, contenu) sont protégés par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.\n\nRESPONSABILITÉ\nLumen Church SaaS s'efforce d'assurer l'exactitude des informations présentes sur la plateforme mais ne saurait être tenu responsable des erreurs ou omissions.\n\nLitige : tout litige sera soumis à la juridiction compétente d'Abidjan, Côte d'Ivoire.`
              },
            ];
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {docs.map((item, i) => (
                  <div key={i} style={{ borderRadius: 12, border: "1px solid #f1f5f9", overflow: "hidden" }}>
                    <div onClick={() => setOpenDoc(openDoc === i ? null : i)} style={{
                      padding: "14px 18px", background: openDoc === i ? "#f0fdfa" : "#f8fafc", cursor: "pointer",
                      display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.15s"
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f0fdfa"}
                      onMouseLeave={e => e.currentTarget.style.background = openDoc === i ? "#f0fdfa" : "#f8fafc"}>
                      <div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{item.title}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8" }}>{item.desc}</p>
                      </div>
                      <ChevronDown size={16} color="#94a3b8" style={{ transform: openDoc === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
                    </div>
                    {openDoc === i && (
                      <div style={{ padding: "16px 20px", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
                        <pre style={{ margin: 0, fontSize: 12, color: "#475569", lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{item.content}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginTop: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
            🔧 Fonctionnalités
          </h3>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 16px" }}>Activez ou désactivez des fonctionnalités spécifiques</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { key: "subdivisions", label: "Sous-entités (sous-dept, sous-groupe, sous-famille)", desc: "Permet de créer des sous-entités dans les départements, groupes et familles" },
              { key: "gamification", label: "Gamification & Badges", desc: "Active le système de badges, XP et récompenses pour l'engagement" },
              { key: "formations", label: "Parcours de formation", desc: "Active les parcours de formation personnalisés" },
              { key: "quiz", label: "Quiz & Concours", desc: "Active les quiz bibliques et le classement" },
              { key: "testimonials_media", label: "Témoignages vidéo/audio", desc: "Permet d'ajouter des liens vidéo et audio aux témoignages" },
              { key: "visitors", label: "Module Visiteurs", desc: "Gestion des visiteurs et suivi par zone" },
              { key: "goals", label: "Objectifs & KPIs", desc: "Suivi des objectifs chiffrés de l'église" },
              { key: "cells", label: "Cellules & Annexes", desc: "Gestion des cellules, annexes et églises filles" },
            ].map(feat => {
              const on = features?.[feat.key] !== false; // default true unless explicitly false
              return (
                <div key={feat.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: on ? "#f0fdfa" : "#f8fafc", borderRadius: 10, border: `1px solid ${on ? "#0d948820" : "#f1f5f9"}`, transition: "all 0.2s" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: on ? "#0f172a" : "#94a3b8" }}>{feat.label}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: "#94a3b8" }}>{feat.desc}</p>
                  </div>
                  <div onClick={() => setFeatures?.(prev => ({ ...prev, [feat.key]: !on }))} style={{
                    width: 44, height: 24, borderRadius: 12, padding: 3, cursor: "pointer", transition: "all 0.2s",
                    background: on ? "#0d9488" : "#e2e8f0", display: "flex", alignItems: "center",
                    justifyContent: on ? "flex-end" : "flex-start", flexShrink: 0,
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
            {["Pasteur", "Administrateur", "Secrétaire", "Responsable Département", "Responsable Comité", "Responsable Groupe", "Responsable adjoint département", "Responsable adjoint comité", "Responsable adjoint groupe"].map((role, i) => {
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

  const fieldStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 12,
    border: "1.5px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14,
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", position: "relative", overflow: "hidden",
      background: "linear-gradient(145deg, #040d0b 0%, #071a17 35%, #0a2e28 65%, #040d0b 100%)",
    }}>
      {/* Geometric background pattern */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg, #0d9488 0px, transparent 1px, transparent 60px, #0d9488 60px), repeating-linear-gradient(90deg, #0d9488 0px, transparent 1px, transparent 60px, #0d9488 60px)", backgroundSize: "60px 60px" }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "8%", left: "12%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.15), transparent 70%)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "12%", right: "10%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)", filter: "blur(50px)" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.05), transparent 60%)" }} />

      {/* Left branding panel — only visible on large screens */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 80px", maxWidth: 560, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 64 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(145deg, #0d9488, #10b981)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(13,148,136,0.4)" }}>
            <Church size={24} color="#fff" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>Lumen Church</span>
        </div>

        <h2 style={{ fontSize: 42, fontWeight: 800, color: "#fff", margin: "0 0 20px", lineHeight: 1.15, letterSpacing: "-1px" }}>
          Gérez votre église<br /><span style={{ color: "#2dd4bf" }}>avec clarté.</span>
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: "0 0 48px", maxWidth: 380 }}>
          Membres, finances, cultes, présences — tout ce dont votre communauté a besoin, dans une seule plateforme.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: 32 }}>
          {[["500+","Églises"], ["50k+","Membres gérés"], ["99.9%","Disponibilité"]].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#2dd4bf", letterSpacing: "-0.5px" }}>{val}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2, fontWeight: 500 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right login card */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 480px", padding: "40px 40px", position: "relative", zIndex: 1 }}>
        <div style={{
          width: "100%", maxWidth: 420,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)",
          padding: "44px 40px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
        }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.4px" }}>Connexion</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 32px" }}>Accédez à votre espace de gestion</p>

          {error && (
            <div style={{ padding: "11px 14px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <AlertCircle size={14} color="#f87171" />
              <span style={{ fontSize: 12, color: "#fca5a5", fontWeight: 500 }}>{error}</span>
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 7, letterSpacing: "0.8px", textTransform: "uppercase" }}>Email</label>
            <input value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
              placeholder="votre@email.com" onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={fieldStyle}
              onFocus={e => e.target.style.borderColor = "rgba(13,148,136,0.7)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
            />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 7, letterSpacing: "0.8px", textTransform: "uppercase" }}>Mot de passe</label>
            <input value={password} onChange={e => { setPassword(e.target.value); setError(""); }}
              type="password" onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={fieldStyle}
              onFocus={e => e.target.style.borderColor = "rgba(13,148,136,0.7)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
            />
          </div>

          <button onClick={handleLogin} disabled={loading} style={{
            width: "100%", padding: "14px", borderRadius: 13, border: "none",
            background: "linear-gradient(135deg, #0d9488 0%, #059669 100%)",
            color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "wait" : "pointer",
            transition: "all 0.22s", letterSpacing: "0.2px",
            boxShadow: "0 4px 20px rgba(13,148,136,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
            opacity: loading ? 0.8 : 1,
          }}
            onMouseEnter={e => { if(!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(13,148,136,0.55), inset 0 1px 0 rgba(255,255,255,0.2)"; }}}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,148,136,0.45), inset 0 1px 0 rgba(255,255,255,0.2)"; }}
          >
            {loading ? "Connexion en cours..." : "Se connecter →"}
          </button>

          <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.35)", margin: "0 0 8px" }}>
              Pasteur / Admin ?{" "}
              <span onClick={onRegister} style={{ color: "#2dd4bf", cursor: "pointer", fontWeight: 700 }}>Inscrire mon église</span>
            </p>
            <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
              Membre ?{" "}
              <span onClick={onJoinChurch} style={{ color: "#60a5fa", cursor: "pointer", fontWeight: 700 }}>Rejoindre une église</span>
            </p>
          </div>
        </div>
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

// ═══════════════════════════════════════════════════════
// SHARED ENTITY DETAIL — used by Families, Groups, Committees
// ═══════════════════════════════════════════════════════
const EntityDetail = ({ entity, onBack, setEntities, color, icon: Icon, entityType, features }) => {
  const [tab, setTab] = useState("membres");
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [showPresence, setShowPresence] = useState(false);
  const [presForm, setPresForm] = useState({ date: new Date().toISOString().split("T")[0], type: "Réunion", members: [] });
  const [showSubEntity, setShowSubEntity] = useState(false);
  const [subForm, setSubForm] = useState({ name: "", description: "", leader: "" });
  const ec = entity.color || color;
  const allPresences = entity.presences || [];

  const openPresence = () => {
    setPresForm({ date: new Date().toISOString().split("T")[0], type: "Réunion",
      members: (entity.members||[]).map(m => ({ name: m, status: "present" })) });
    setShowPresence(true);
  };
  const savePresence = () => {
    const rapport = { id: Date.now(), date: presForm.date, type: presForm.type, members: presForm.members };
    setEntities(prev => prev.map(e => e.id === entity.id ? { ...e, presences: [...(e.presences||[]), rapport] } : e));
    setShowPresence(false);
  };
  const addMember = () => {
    if (!newMember.trim()) return;
    setEntities(prev => prev.map(e => e.id === entity.id ? { ...e, members: [...(e.members||[]), newMember.trim()] } : e));
    setNewMember(""); setShowAddMember(false);
  };
  const removeMember = (name) => setEntities(prev => prev.map(e => e.id === entity.id ? { ...e, members: (e.members||[]).filter(m => m !== name) } : e));
  const addSubEntity = () => {
    if (!subForm.name.trim()) return;
    setEntities(prev => prev.map(e => e.id === entity.id ? { ...e, subEntities: [...(e.subEntities||[]), { ...subForm, id: Date.now(), members: [] }] } : e));
    setSubForm({ name: "", description: "", leader: "" }); setShowSubEntity(false);
  };
  const getMemberStats = (mName) => {
    const total = allPresences.length;
    if (!total) return { pct: 0 };
    const present = allPresences.filter(r => r.members?.find(m => m.name === mName && m.status === "present")).length;
    return { pct: Math.round(present / total * 100) };
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: DS.r10, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700, color: DS.slate600, boxShadow: DS.shadowSm }}>← Retour</button>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: DS.slate900, letterSpacing: "-0.4px" }}>{entity.name}</h2>
          {entity.description && <p style={{ margin: 0, fontSize: 13, color: DS.slate400 }}>{entity.description}</p>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {features?.subdivisions && <Btn variant="secondary" size="sm" icon={Plus} onClick={() => setShowSubEntity(true)}>Sous-{entityType}</Btn>}
          <Btn size="sm" icon={UserCheck} onClick={openPresence}>Appel nominal</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Membres", value: (entity.members||[]).length, color: ec },
          { label: "Réunions", value: allPresences.length, color: "#8b5cf6" },
          { label: "Présence moy.", value: allPresences.length ? (() => { const all = allPresences.flatMap(r => r.members||[]); return Math.round(all.filter(m => m.status==="present").length/(all.length||1)*100)+"%"; })() : "—", color: "#10b981" },
          { label: "Responsable", value: null, leader: entity.leader, color: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: DS.r12, padding: "16px 18px", border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm, borderTop: `3px solid ${s.color}` }}>
            <p style={{ margin: "0 0 4px", fontSize: 10, fontWeight: 700, color: DS.slate400, textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label}</p>
            {s.leader !== undefined ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <Avatar name={s.leader} size={24} color={ec} />
                <span style={{ fontSize: 12, fontWeight: 700, color: DS.slate900 }}>{s.leader || "—"}</span>
              </div>
            ) : <p style={{ margin: 0, fontSize: 24, fontWeight: 900, color: s.color }}>{s.value}</p>}
          </div>
        ))}
      </div>

      <TabBar tabs={[
        { key: "membres", label: "👥 Membres" },
        { key: "presences", label: `📋 Présences (${allPresences.length})` },
        ...(features?.subdivisions ? [{ key: "sub", label: `🔗 Sous-${entityType}s` }] : []),
      ]} active={tab} onChange={setTab} />

      {tab === "membres" && (
        <div style={{ background: "#fff", borderRadius: DS.r16, border: `1px solid ${DS.slate100}`, overflow: "hidden", boxShadow: DS.shadowSm }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${DS.slate100}`, display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: DS.slate900 }}>Membres ({(entity.members||[]).length})</h3>
            <Btn size="sm" icon={Plus} onClick={() => setShowAddMember(true)}>Ajouter</Btn>
          </div>
          {showAddMember && (
            <div style={{ padding: "12px 20px", background: DS.slate50, borderBottom: `1px solid ${DS.slate100}`, display: "flex", gap: 8 }}>
              <input style={{ ...inputStyle, flex: 1 }} value={newMember} onChange={e => setNewMember(e.target.value)} placeholder="Nom du membre..." autoFocus onKeyDown={e => e.key === "Enter" && addMember()} />
              <Btn size="sm" onClick={addMember}>Ajouter</Btn>
              <Btn size="sm" variant="secondary" onClick={() => setShowAddMember(false)}>Annuler</Btn>
            </div>
          )}
          {(entity.members||[]).map((mName, i) => {
            const stats = getMemberStats(mName);
            const fullM = MOCK_MEMBERS.find(m => `${m.first_name} ${m.last_name}` === mName || m.first_name === mName);
            const lvl = fullM?.quiz_points ? Math.floor(fullM.quiz_points/300)+1 : 1;
            const lvlNames = ["","Semeur","Berger","Serviteur","Leader","Apôtre"];
            const pColor = stats.pct >= 80 ? "#10b981" : stats.pct >= 50 ? "#f59e0b" : "#ef4444";
            return (
              <div key={i} style={{ padding: "12px 20px", borderBottom: `1px solid ${DS.slate50}`, display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name={mName} size={34} color={ec} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: DS.slate900 }}>{mName}</p>
                  <p style={{ margin: 0, fontSize: 10, color: DS.slate400 }}>Niv. {lvl} {lvlNames[Math.min(lvl,5)]}</p>
                </div>
                {allPresences.length > 0 && (
                  <div style={{ textAlign: "center", minWidth: 60 }}>
                    <div style={{ fontSize: 13, fontWeight: 900, color: pColor }}>{stats.pct}%</div>
                    <div style={{ width: 48, height: 3, background: DS.slate100, borderRadius: 2, margin: "3px auto 0", overflow: "hidden" }}>
                      <div style={{ width: `${stats.pct}%`, height: "100%", background: pColor }} />
                    </div>
                    <div style={{ fontSize: 9, color: DS.slate400, marginTop: 2 }}>présence</div>
                  </div>
                )}
                <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => removeMember(mName)} />
              </div>
            );
          })}
          {!(entity.members||[]).length && <EmptyState icon={Users} title="Aucun membre" description="Ajoutez des membres" />}
        </div>
      )}

      {tab === "presences" && (
        <div>
          {!allPresences.length && <EmptyState icon={Activity} title="Aucune réunion" description="Faites un appel nominal pour commencer" />}
          {allPresences.map(r => (
            <div key={r.id} style={{ background: "#fff", borderRadius: DS.r12, padding: 18, border: `1px solid ${DS.slate100}`, marginBottom: 10, boxShadow: DS.shadowSm }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: DS.slate900 }}>{r.type}</h4>
                  <p style={{ margin: 0, fontSize: 11, color: DS.slate400 }}>{new Date(r.date).toLocaleDateString("fr", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}</p>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ padding: "3px 10px", background: "#f0fdf4", color: "#10b981", borderRadius: 8, fontSize: 11, fontWeight: 700 }}>✓ {r.members?.filter(m => m.status==="present").length}</span>
                  <span style={{ padding: "3px 10px", background: "#fffbeb", color: "#d97706", borderRadius: 8, fontSize: 11, fontWeight: 700 }}>~ {r.members?.filter(m => m.status==="absent_justifie").length}</span>
                  <span style={{ padding: "3px 10px", background: "#fef2f2", color: "#ef4444", borderRadius: 8, fontSize: 11, fontWeight: 700 }}>✗ {r.members?.filter(m => m.status==="absent").length}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {r.members?.map((m, j) => (
                  <span key={j} style={{ padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                    background: m.status==="present" ? "#f0fdf4" : m.status==="absent_justifie" ? "#fffbeb" : "#fef2f2",
                    color: m.status==="present" ? "#10b981" : m.status==="absent_justifie" ? "#d97706" : "#ef4444",
                    border: `1px solid ${m.status==="present" ? "#bbf7d0" : m.status==="absent_justifie" ? "#fde68a" : "#fecaca"}`,
                  }}>{m.status==="present" ? "✓" : m.status==="absent_justifie" ? "~" : "✗"} {m.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "sub" && features?.subdivisions && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          {(entity.subEntities||[]).map((se, i) => (
            <div key={se.id} style={{ background: "#fff", borderRadius: DS.r12, padding: 18, border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm, borderLeft: `4px solid ${ec}` }}>
              <h4 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 800, color: DS.slate900 }}>{se.name}</h4>
              {se.description && <p style={{ margin: "0 0 8px", fontSize: 11, color: DS.slate400 }}>{se.description}</p>}
              {se.leader && <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: DS.slate600 }}><Avatar name={se.leader} size={20} color={ec} /> {se.leader}</div>}
            </div>
          ))}
          {!(entity.subEntities||[]).length && <EmptyState icon={Plus} title="Aucun sous-groupe" description="Créez votre premier sous-groupe" />}
        </div>
      )}

      <Modal open={showPresence} onClose={() => setShowPresence(false)} title={`Appel nominal — ${entity.name}`} width={540}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <FormField label="Date"><input style={inputStyle} type="date" value={presForm.date} onChange={e => setPresForm(f => ({...f, date: e.target.value}))} /></FormField>
          <FormField label="Type"><input style={inputStyle} value={presForm.type} onChange={e => setPresForm(f => ({...f, type: e.target.value}))} /></FormField>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <Btn size="sm" variant="secondary" onClick={() => setPresForm(f => ({...f, members: f.members.map(m => ({...m, status: "present"}))})}>Tout présent</Btn>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 320, overflowY: "auto", marginBottom: 14 }}>
          {presForm.members.map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10,
              background: m.status==="present" ? "#f0fdf4" : m.status==="absent_justifie" ? "#fffbeb" : "#fef2f2",
              border: `1px solid ${m.status==="present" ? "#bbf7d0" : m.status==="absent_justifie" ? "#fde68a" : "#fecaca"}` }}>
              <Avatar name={m.name} size={30} color={ec} />
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: DS.slate900 }}>{m.name}</span>
              <select value={m.status} onChange={e => setPresForm(f => ({...f, members: f.members.map((x,j) => j===i ? {...x, status: e.target.value} : x)}))}
                style={{ ...selectStyle, width: 170, fontSize: 12 }}>
                <option value="present">✓ Présent</option>
                <option value="absent_justifie">~ Absent justifié</option>
                <option value="absent">✗ Absent</option>
              </select>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Btn variant="secondary" onClick={() => setShowPresence(false)}>Annuler</Btn>
          <Btn onClick={savePresence}>Valider</Btn>
        </div>
      </Modal>

      <Modal open={showSubEntity} onClose={() => setShowSubEntity(false)} title={`Nouveau sous-${entityType}`}>
        <FormField label="Nom *"><input style={inputStyle} value={subForm.name} onChange={e => setSubForm(f => ({...f, name: e.target.value}))} /></FormField>
        <FormField label="Description"><input style={inputStyle} value={subForm.description} onChange={e => setSubForm(f => ({...f, description: e.target.value}))} /></FormField>
        <FormField label="Responsable"><input style={inputStyle} value={subForm.leader} onChange={e => setSubForm(f => ({...f, leader: e.target.value}))} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowSubEntity(false)}>Annuler</Btn>
          <Btn onClick={addSubEntity}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// FAMILIES PAGE
// ═══════════════════════════════════════════════════════
// FAMILIES PAGE
const FamiliesPage = ({ features }) => {
  const famColors = ["#ec4899","#8b5cf6","#f59e0b","#10b981","#3b82f6","#ef4444"];
  const [families, setFamilies] = useState([
    { id: 1, name: "Famille Kouadio", description: "Famille pastorale", leader: "Jean Kouadio", color: "#ec4899", members: ["Jean Kouadio", "Marie Bamba"], presences: [], subEntities: [] },
    { id: 2, name: "Famille Yao-Koné", description: "", leader: "Paul Yao", color: "#8b5cf6", members: ["Paul Yao", "Esther Koné"], presences: [], subEntities: [] },
    { id: 3, name: "Famille Tra-Diallo", description: "", leader: "David Tra", color: "#f59e0b", members: ["David Tra", "Ruth Diallo"], presences: [], subEntities: [] },
    { id: 4, name: "Famille Ouattara-Achi", description: "", leader: "Samuel Ouattara", color: "#10b981", members: ["Samuel Ouattara", "Grace Achi"], presences: [], subEntities: [] },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFam, setSelectedFam] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", leader: "" });
  const [search, setSearch] = useState("");

  if (selectedFam) {
    const current = families.find(f => f.id === selectedFam.id) || selectedFam;
    return <EntityDetail entity={current} onBack={() => setSelectedFam(null)} setEntities={setFamilies} color="#ec4899" icon={Heart} entityType="famille" features={features} />;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: DS.slate900, margin: 0, letterSpacing: "-0.5px" }}>Familles</h2>
          <p style={{ fontSize: 13, color: DS.slate400, margin: "4px 0 0" }}>{families.length} familles</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color={DS.slate400} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." style={{ ...inputStyle, paddingLeft: 30, width: 180 }} />
          </div>
          <Btn icon={Plus} onClick={() => { setForm({ name: "", description: "", leader: "" }); setShowModal(true); }}>Nouvelle famille</Btn>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {families.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).map(f => (
          <div key={f.id} onClick={() => setSelectedFam(f)} style={{ background: "#fff", borderRadius: DS.r16, padding: 22, cursor: "pointer", border: `1px solid ${DS.slate100}`, borderTop: `4px solid ${f.color}`, boxShadow: DS.shadowSm, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = DS.shadowMd; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = DS.shadowSm; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}><Heart size={20} color={f.color} /></div>
              <ChevronRight size={16} color={DS.slate400} />
            </div>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 800, color: DS.slate900 }}>{f.name}</h3>
            {f.description && <p style={{ margin: "0 0 10px", fontSize: 11, color: DS.slate400 }}>{f.description}</p>}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Avatar name={f.leader} size={22} color={f.color} />
              <span style={{ fontSize: 12, color: DS.slate600, fontWeight: 600 }}>{f.leader}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, textAlign: "center", padding: "6px 0", background: DS.slate50, borderRadius: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: f.color }}>{(f.members||[]).length}</div>
                <div style={{ fontSize: 9, color: DS.slate400, textTransform: "uppercase", letterSpacing: "0.5px" }}>Membres</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: "6px 0", background: DS.slate50, borderRadius: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#8b5cf6" }}>{(f.presences||[]).length}</div>
                <div style={{ fontSize: 9, color: DS.slate400, textTransform: "uppercase", letterSpacing: "0.5px" }}>Réunions</div>
              </div>
            </div>
          </div>
        ))}
        {families.length === 0 && <EmptyState icon={Heart} title="Aucune famille" description="Créez votre première famille" />}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouvelle famille">
        <FormField label="Nom *"><input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></FormField>
        <FormField label="Description"><input style={inputStyle} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></FormField>
        <FormField label="Responsable"><input style={inputStyle} value={form.leader} onChange={e => setForm({...form, leader: e.target.value})} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(form.name) { setFamilies(prev => [...prev, { ...form, id: Date.now(), members: [], presences: [], subEntities: [], color: famColors[prev.length % famColors.length] }]); setShowModal(false); } }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// GROUPS PAGE
const GroupsPage = ({ features }) => {
  const grpColors = ["#3b82f6","#8b5cf6","#10b981","#f59e0b","#ec4899","#0d9488"];
  const [groups, setGroups] = useState([
    { id: 1, name: "Groupe Alpha", description: "Croissance spirituelle", leader: "Jean Kouadio", color: "#3b82f6", members: ["David Tra", "Grace Achi", "Paul Yao"], presences: [], subEntities: [] },
    { id: 2, name: "Groupe Béthel", description: "Prière et partage", leader: "Marie Bamba", color: "#8b5cf6", members: ["Sarah Touré", "Ruth Diallo"], presences: [], subEntities: [] },
    { id: 3, name: "Groupe Cana", description: "Groupe de couples", leader: "Samuel Ouattara", color: "#10b981", members: ["Moïse Dembélé", "Esther Koné"], presences: [], subEntities: [] },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", leader: "" });
  const [search, setSearch] = useState("");

  if (selectedGroup) {
    const current = groups.find(g => g.id === selectedGroup.id) || selectedGroup;
    return <EntityDetail entity={current} onBack={() => setSelectedGroup(null)} setEntities={setGroups} color="#3b82f6" icon={UsersRound} entityType="groupe" features={features} />;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: DS.slate900, margin: 0, letterSpacing: "-0.5px" }}>Groupes</h2>
          <p style={{ fontSize: 13, color: DS.slate400, margin: "4px 0 0" }}>{groups.length} groupes actifs</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color={DS.slate400} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." style={{ ...inputStyle, paddingLeft: 30, width: 180 }} />
          </div>
          <Btn icon={Plus} onClick={() => { setForm({ name: "", description: "", leader: "" }); setShowModal(true); }}>Nouveau groupe</Btn>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase())).map(g => (
          <div key={g.id} onClick={() => setSelectedGroup(g)} style={{ background: "#fff", borderRadius: DS.r16, padding: 22, cursor: "pointer", border: `1px solid ${DS.slate100}`, borderTop: `4px solid ${g.color}`, boxShadow: DS.shadowSm, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = DS.shadowMd; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = DS.shadowSm; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `${g.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}><UsersRound size={20} color={g.color} /></div>
              <ChevronRight size={16} color={DS.slate400} />
            </div>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 800, color: DS.slate900 }}>{g.name}</h3>
            {g.description && <p style={{ margin: "0 0 10px", fontSize: 11, color: DS.slate400 }}>{g.description}</p>}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Avatar name={g.leader} size={22} color={g.color} />
              <span style={{ fontSize: 12, color: DS.slate600, fontWeight: 600 }}>{g.leader}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, textAlign: "center", padding: "6px 0", background: DS.slate50, borderRadius: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: g.color }}>{(g.members||[]).length}</div>
                <div style={{ fontSize: 9, color: DS.slate400, textTransform: "uppercase" }}>Membres</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: "6px 0", background: DS.slate50, borderRadius: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#8b5cf6" }}>{(g.presences||[]).length}</div>
                <div style={{ fontSize: 9, color: DS.slate400, textTransform: "uppercase" }}>Réunions</div>
              </div>
            </div>
          </div>
        ))}
        {groups.length === 0 && <EmptyState icon={UsersRound} title="Aucun groupe" description="Créez votre premier groupe" />}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouveau groupe">
        <FormField label="Nom *"><input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></FormField>
        <FormField label="Description"><input style={inputStyle} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></FormField>
        <FormField label="Responsable"><input style={inputStyle} value={form.leader} onChange={e => setForm({...form, leader: e.target.value})} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(form.name) { setGroups(prev => [...prev, { ...form, id: Date.now(), members: [], presences: [], subEntities: [], color: grpColors[prev.length % grpColors.length] }]); setShowModal(false); } }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// COMMITTEES PAGE
const CommitteesPage = ({ features }) => {
  const comColors = ["#8b5cf6","#f59e0b","#3b82f6","#10b981","#ec4899","#0d9488"];
  const [committees, setCommittees] = useState([
    { id: 1, name: "Comité d'organisation", description: "Organisation des événements", leader: "Esther Koné", color: "#8b5cf6", members: ["Grace Achi","David Tra","Paul Yao","Ruth Diallo"], presences: [], subEntities: [] },
    { id: 2, name: "Service d'ordre", description: "Sécurité pendant les cultes", leader: "Moïse Dembélé", color: "#f59e0b", members: ["Samuel Ouattara","Daniel Konan","Jean Kouadio"], presences: [], subEntities: [] },
    { id: 3, name: "Équipe média", description: "Sonorisation, vidéo, réseaux sociaux", leader: "Daniel Konan", color: "#3b82f6", members: ["Sarah Touré","Paul Yao"], presences: [], subEntities: [] },
    { id: 4, name: "Secrétariat", description: "Administration et documentation", leader: "Esther Koné", color: "#10b981", members: ["Marie Bamba","Grace Achi"], presences: [], subEntities: [] },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCom, setSelectedCom] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", leader: "" });
  const [search, setSearch] = useState("");

  if (selectedCom) {
    const current = committees.find(c => c.id === selectedCom.id) || selectedCom;
    return <EntityDetail entity={current} onBack={() => setSelectedCom(null)} setEntities={setCommittees} color="#8b5cf6" icon={Briefcase} entityType="comité" features={features} />;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: DS.slate900, margin: 0, letterSpacing: "-0.5px" }}>Comités & Services</h2>
          <p style={{ fontSize: 13, color: DS.slate400, margin: "4px 0 0" }}>{committees.length} comités</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color={DS.slate400} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." style={{ ...inputStyle, paddingLeft: 30, width: 180 }} />
          </div>
          <Btn icon={Plus} onClick={() => { setForm({ name: "", description: "", leader: "" }); setShowModal(true); }}>Nouveau comité</Btn>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {committees.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
          <div key={c.id} onClick={() => setSelectedCom(c)} style={{ background: "#fff", borderRadius: DS.r16, padding: 22, cursor: "pointer", border: `1px solid ${DS.slate100}`, borderTop: `4px solid ${c.color}`, boxShadow: DS.shadowSm, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = DS.shadowMd; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = DS.shadowSm; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}><Briefcase size={20} color={c.color} /></div>
              <ChevronRight size={16} color={DS.slate400} />
            </div>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 800, color: DS.slate900 }}>{c.name}</h3>
            {c.description && <p style={{ margin: "0 0 10px", fontSize: 11, color: DS.slate400 }}>{c.description}</p>}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Avatar name={c.leader} size={22} color={c.color} />
              <span style={{ fontSize: 12, color: DS.slate600, fontWeight: 600 }}>{c.leader}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, textAlign: "center", padding: "6px 0", background: DS.slate50, borderRadius: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: c.color }}>{(c.members||[]).length}</div>
                <div style={{ fontSize: 9, color: DS.slate400, textTransform: "uppercase" }}>Membres</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: "6px 0", background: DS.slate50, borderRadius: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#8b5cf6" }}>{(c.presences||[]).length}</div>
                <div style={{ fontSize: 9, color: DS.slate400, textTransform: "uppercase" }}>Réunions</div>
              </div>
            </div>
          </div>
        ))}
        {committees.length === 0 && <EmptyState icon={Briefcase} title="Aucun comité" description="Créez votre premier comité" />}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouveau comité">
        <FormField label="Nom *"><input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ex: Service d'ordre" /></FormField>
        <FormField label="Description"><input style={inputStyle} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></FormField>
        <FormField label="Responsable"><input style={inputStyle} value={form.leader} onChange={e => setForm({...form, leader: e.target.value})} /></FormField>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
          <Btn onClick={() => { if(form.name) { setCommittees(prev => [...prev, { ...form, id: Date.now(), members: [], presences: [], subEntities: [], color: comColors[prev.length % comColors.length] }]); setShowModal(false); } }}>Créer</Btn>
        </div>
      </Modal>
    </div>
  );
};

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
            {t.media === "video" && t.mediaUrl && (() => {
              // Convert any YouTube URL to embed URL
              const getEmbedUrl = (url) => {
                if (!url) return null;
                // youtube.com/watch?v=ID
                const m1 = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
                if (m1) return `https://www.youtube.com/embed/${m1[1]}`;
                // youtu.be/ID
                const m2 = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
                if (m2) return `https://www.youtube.com/embed/${m2[1]}`;
                // Already an embed URL
                if (url.includes("/embed/")) return url;
                return null;
              };
              const embedUrl = getEmbedUrl(t.mediaUrl);
              if (embedUrl && !embedUrl.includes("exemple")) {
                return (
                  <div style={{ marginTop: 14, borderRadius: 12, overflow: "hidden", border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm }}>
                    <iframe
                      src={embedUrl}
                      width="100%" height="220"
                      style={{ display: "block", border: "none" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={t.title}
                    />
                  </div>
                );
              }
              return (
                <div style={{ marginTop: 10, padding: "10px 14px", background: "#eff6ff", borderRadius: 10, border: "1px solid #bfdbfe", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🎥</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>Vidéo YouTube</p>
                    <a href={t.mediaUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>{t.mediaUrl}</a>
                  </div>
                </div>
              );
            })()}
            {t.media === "audio" && t.mediaUrl && (
              <div style={{ marginTop: 10, padding: "10px 14px", background: "#fdf4ff", borderRadius: 10, border: "1px solid #e9d5ff", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>🎙️</span>
                <a href={t.mediaUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#7c3aed", fontWeight: 600, textDecoration: "none" }}>{t.mediaUrl}</a>
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
const QuizPage = ({ userRole }) => {
  const [tab, setTab] = useState("quiz");

  // ── DATA ──
  const [quizzes, setQuizzes] = useState([
    {
      id: 1, title: "Les patriarches de la Bible", category: "Ancien Testament", difficulty: "facile",
      timer_per_question: 30, group_type: "individuel", status: "actif",
      questions: [
        { id: 1, text: "Qui était le premier homme créé par Dieu ?", points: 10, options: ["Adam","Noé","Abraham","Moïse"], answer: 0 },
        { id: 2, text: "Quel âge avait Mathusalem à sa mort ?", points: 20, options: ["850 ans","900 ans","969 ans","1000 ans"], answer: 2 },
        { id: 3, text: "Combien d'enfants avait Jacob ?", points: 15, options: ["10","12","14","8"], answer: 1 },
      ]
    },
    {
      id: 2, title: "Les miracles de Jésus", category: "Nouveau Testament", difficulty: "moyen",
      timer_per_question: 20, group_type: "departement", status: "actif",
      questions: [
        { id: 1, text: "Quel fut le premier miracle de Jésus ?", points: 10, options: ["Multiplication des pains","Eau en vin","Résurrection de Lazare","Guérison d'un aveugle"], answer: 1 },
        { id: 2, text: "Combien de pains Jésus a-t-il multipliés pour 5000 personnes ?", points: 10, options: ["2","5","7","12"], answer: 1 },
      ]
    },
  ]);

  const [sessions, setSessions] = useState([
    { id: 1, quiz_id: 1, quiz_title: "Les patriarches de la Bible", date: "2026-03-20", participants: 24, results_revealed: true,
      scores: [
        { name: "Grace Achi", dept: "Accueil", score: 45, total: 45, rank: 1 },
        { name: "Paul Yao", dept: "Louange", score: 40, total: 45, rank: 2 },
        { name: "Ruth Diallo", dept: "Enfants", score: 35, total: 45, rank: 3 },
        { name: "David Tra", dept: "Jeunesse", score: 30, total: 45, rank: 4 },
      ]
    },
    { id: 2, quiz_id: 2, quiz_title: "Les miracles de Jésus", date: "2026-03-15", participants: 18, results_revealed: false,
      scores: [
        { name: "Samuel Ouattara", dept: "Intercession", score: 20, total: 20, rank: 1 },
        { name: "Marie Bamba", dept: "Finances", score: 18, total: 20, rank: 2 },
      ]
    },
  ]);

  // ── MODALS ──
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [quizForm, setQuizForm] = useState({
    title: "", category: "Ancien Testament", difficulty: "facile",
    timer_per_question: 30, group_type: "individuel", questions: []
  });
  const [newQ, setNewQ] = useState({ text: "", points: 10, options: ["","","",""], answer: 0 });
  const [addingQ, setAddingQ] = useState(false);

  const diffColors = { facile: "#10b981", moyen: "#f59e0b", difficile: "#ef4444" };
  const canManage = ["pasteur","admin","super_admin"].includes(userRole);

  // Global ranking — cumul all revealed sessions
  const globalRanking = (() => {
    const map = {};
    sessions.filter(s => s.results_revealed).forEach(s => {
      s.scores.forEach(sc => {
        if (!map[sc.name]) map[sc.name] = { name: sc.name, dept: sc.dept, total: 0, quizzes: 0 };
        map[sc.name].total += sc.score;
        map[sc.name].quizzes += 1;
      });
    });
    return Object.values(map).sort((a,b) => b.total - a.total);
  })();

  // Dept ranking — sum by dept
  const deptRanking = (() => {
    const map = {};
    sessions.filter(s => s.results_revealed).forEach(s => {
      s.scores.forEach(sc => {
        if (!map[sc.dept]) map[sc.dept] = { dept: sc.dept, total: 0, members: new Set() };
        map[sc.dept].total += sc.score;
        map[sc.dept].members.add(sc.name);
      });
    });
    return Object.values(map).map(d => ({ ...d, members: d.members.size })).sort((a,b) => b.total - a.total);
  })();

  const openNewQuiz = () => {
    setEditingQuiz(null);
    setQuizForm({ title: "", category: "Ancien Testament", difficulty: "facile", timer_per_question: 30, group_type: "individuel", questions: [] });
    setAddingQ(false);
    setShowQuizModal(true);
  };
  const openEditQuiz = (q) => {
    setEditingQuiz(q);
    setQuizForm({ ...q });
    setAddingQ(false);
    setShowQuizModal(true);
  };
  const saveQuiz = () => {
    if (!quizForm.title.trim()) return;
    if (editingQuiz) {
      setQuizzes(prev => prev.map(q => q.id === editingQuiz.id ? { ...q, ...quizForm } : q));
    } else {
      setQuizzes(prev => [...prev, { ...quizForm, id: Date.now(), status: "actif" }]);
    }
    setShowQuizModal(false);
  };
  const addQuestion = () => {
    if (!newQ.text.trim() || newQ.options.some(o => !o.trim())) return;
    setQuizForm(f => ({ ...f, questions: [...f.questions, { ...newQ, id: Date.now() }] }));
    setNewQ({ text: "", points: 10, options: ["","","",""], answer: 0 });
    setAddingQ(false);
  };
  const removeQuestion = (qid) => setQuizForm(f => ({ ...f, questions: f.questions.filter(q => q.id !== qid) }));

  const revealResults = (sessionId) => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, results_revealed: true } : s));
  };
  const deleteSession = (sessionId) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };
  const deleteAllHistory = () => {
    setSessions([]);
    setShowDeleteModal(false);
  };

  const totalPoints = (q) => q.questions.reduce((s, qu) => s + qu.points, 0);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Jeux & Quiz</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Quiz bibliques · Concours · Classements</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {canManage && tab === "historique" && sessions.length > 0 && (
            <Btn variant="danger" icon={Trash2} onClick={() => setShowDeleteModal(true)}>Effacer l'historique</Btn>
          )}
          {canManage && tab === "quiz" && (
            <Btn icon={Plus} onClick={openNewQuiz}>Créer un quiz</Btn>
          )}
        </div>
      </div>

      <TabBar tabs={[
        { key: "quiz", label: "📝 Quiz" },
        { key: "historique", label: "📋 Sessions & Résultats" },
        { key: "classement", label: "🏆 Classement individuel" },
        { key: "collectif", label: "🏛️ Classement collectif" },
      ]} active={tab} onChange={setTab} />

      {/* ══ QUIZ LIST ══ */}
      {tab === "quiz" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {quizzes.map(q => (
            <div key={q.id} style={{ background: "#fff", borderRadius: 16, padding: 22, border: "1px solid #f1f5f9", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: "#f59e0b15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📝</div>
                <div style={{ display: "flex", gap: 4 }}>
                  <Badge variant="default" style={{ background: `${diffColors[q.difficulty]}15`, color: diffColors[q.difficulty] }}>{q.difficulty}</Badge>
                  {canManage && <Btn variant="ghost" size="sm" icon={Edit} onClick={() => openEditQuiz(q)} />}
                  {canManage && <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => { if(confirm(`Supprimer "${q.title}" ?`)) setQuizzes(prev => prev.filter(x => x.id !== q.id)); }} />}
                </div>
              </div>
              <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{q.title}</h3>
              <p style={{ margin: "0 0 12px", fontSize: 12, color: "#94a3b8" }}>{q.category}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                <span style={{ fontSize: 11, padding: "3px 8px", background: "#f0fdfa", color: "#0d9488", borderRadius: 6, fontWeight: 600 }}>⏱ {q.timer_per_question}s / question</span>
                <span style={{ fontSize: 11, padding: "3px 8px", background: "#eff6ff", color: "#3b82f6", borderRadius: 6, fontWeight: 600 }}>
                  {q.group_type === "individuel" ? "👤 Individuel" : q.group_type === "departement" ? "🏢 Par département" : q.group_type === "comite" ? "💼 Par comité" : "🔵 Par groupe"}
                </span>
                <span style={{ fontSize: 11, padding: "3px 8px", background: "#f8fafc", color: "#64748b", borderRadius: 6, fontWeight: 600 }}>🎯 {totalPoints(q)} pts max</span>
              </div>
              <div style={{ paddingTop: 12, borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "#64748b" }}>{q.questions.length} question{q.questions.length > 1 ? "s" : ""}</span>
                <span style={{ color: "#64748b" }}>{sessions.filter(s => s.quiz_id === q.id).length} session{sessions.filter(s => s.quiz_id === q.id).length > 1 ? "s" : ""} jouée{sessions.filter(s => s.quiz_id === q.id).length > 1 ? "s" : ""}</span>
              </div>
            </div>
          ))}
          {quizzes.length === 0 && <EmptyState icon={Star} title="Aucun quiz" description="Créez votre premier quiz biblique" />}
        </div>
      )}

      {/* ══ SESSIONS & RÉSULTATS ══ */}
      {tab === "historique" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {sessions.length === 0 && <EmptyState icon={Star} title="Aucune session" description="Les sessions jouées apparaîtront ici" />}
          {sessions.map(s => (
            <div key={s.id} style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{s.quiz_title}</h3>
                  <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{new Date(s.date).toLocaleDateString("fr")} · {s.participants} participant{s.participants > 1 ? "s" : ""}</p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {!s.results_revealed ? (
                    <Btn size="sm" onClick={() => revealResults(s.id)}>
                      🔓 Révéler les résultats
                    </Btn>
                  ) : (
                    <Badge variant="success">✓ Résultats publiés</Badge>
                  )}
                  {canManage && (
                    <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => { if(confirm("Supprimer cette session ?")) deleteSession(s.id); }} />
                  )}
                </div>
              </div>
              {s.results_revealed && (
                <div>
                  {s.scores.map((sc, i) => (
                    <div key={i} style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #f8fafc", background: i === 0 ? "#fffbeb" : "transparent" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7f32" : "#f1f5f9", color: i < 3 ? "#fff" : "#64748b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>
                        {i < 3 ? ["🥇","🥈","🥉"][i] : i + 1}
                      </div>
                      <Avatar name={sc.name} size={32} color={i === 0 ? "#f59e0b" : "#0d9488"} />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{sc.name}</p>
                        <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{sc.dept}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: 0, fontSize: 16, fontWeight: 900, color: i === 0 ? "#f59e0b" : "#0f172a" }}>{sc.score} pts</p>
                        <p style={{ margin: 0, fontSize: 10, color: "#94a3b8" }}>/ {sc.total} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!s.results_revealed && (
                <div style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>
                  <p style={{ fontSize: 13 }}>🔒 Résultats en attente de publication par l'administrateur</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ══ CLASSEMENT INDIVIDUEL GÉNÉRAL ══ */}
      {tab === "classement" && (
        <div>
          <div style={{ padding: "12px 16px", background: "#f0fdfa", border: "1px solid #0d948820", borderRadius: 12, marginBottom: 16, fontSize: 12, color: "#0d9488", fontWeight: 600 }}>
            Classement général — cumul de tous les quiz dont les résultats ont été publiés
          </div>
          {globalRanking.length === 0 ? (
            <EmptyState icon={Star} title="Pas encore de classement" description="Publiez les résultats d'au moins une session" />
          ) : (
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>🏆 Classement général individuel</h3>
                {canManage && <Btn variant="secondary" size="sm" icon={Download} onClick={() => {
                  const csv = "Rang,Nom,Département,Total pts,Quiz joués\n" + globalRanking.map((r,i) => `${i+1},${r.name},${r.dept},${r.total},${r.quizzes}`).join("\n");
                  const b = new Blob([csv], {type:"text/csv"}); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href=u; a.download="classement.csv"; a.click();
                }}>Exporter</Btn>}
              </div>
              {globalRanking.map((r, i) => (
                <div key={i} style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #f8fafc", background: i === 0 ? "#fffbeb" : "transparent" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: i < 3 ? 18 : 13, fontWeight: 800, background: i < 3 ? `${["#f59e0b","#94a3b8","#cd7f32"][i]}20` : "#f1f5f9", color: i < 3 ? ["#f59e0b","#64748b","#92400e"][i] : "#64748b", flexShrink: 0 }}>
                    {i < 3 ? ["🥇","🥈","🥉"][i] : i + 1}
                  </div>
                  <Avatar name={r.name} size={36} color={i === 0 ? "#f59e0b" : "#0d9488"} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{r.name}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{r.dept} · {r.quizzes} quiz joué{r.quizzes > 1 ? "s" : ""}</p>
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 900, color: i === 0 ? "#f59e0b" : "#0f172a" }}>{r.total} pts</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══ CLASSEMENT COLLECTIF ══ */}
      {tab === "collectif" && (
        <div>
          <div style={{ padding: "12px 16px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, marginBottom: 16, fontSize: 12, color: "#2563eb", fontWeight: 600 }}>
            Classement collectif — total des points par département / comité / groupe selon le type de quiz
          </div>
          {deptRanking.length === 0 ? (
            <EmptyState icon={Star} title="Pas encore de classement collectif" description="Publiez les résultats d'au moins une session collective" />
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 20 }}>
                {deptRanking.slice(0, 3).map((d, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #f1f5f9", borderTop: `4px solid ${["#f59e0b","#94a3b8","#cd7f32"][i]}`, textAlign: "center" }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{["🥇","🥈","🥉"][i]}</div>
                    <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 800, color: "#0f172a" }}>{d.dept}</h3>
                    <div style={{ fontSize: 26, fontWeight: 900, color: ["#f59e0b","#94a3b8","#cd7f32"][i], margin: "8px 0" }}>{d.total} pts</div>
                    <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{d.members} participant{d.members > 1 ? "s" : ""}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
                {deptRanking.map((d, i) => (
                  <div key={i} style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #f8fafc" }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#64748b", width: 24 }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{d.dept}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{d.members} participants</p>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#0f172a" }}>{d.total} pts</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ══ MODAL CRÉER / ÉDITER QUIZ ══ */}
      <Modal open={showQuizModal} onClose={() => setShowQuizModal(false)} title={editingQuiz ? "Modifier le quiz" : "Créer un quiz"} width={660}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FormField label="Titre *"><input style={inputStyle} value={quizForm.title} onChange={e => setQuizForm({...quizForm, title: e.target.value})} placeholder="Ex: Les patriarches de la Bible" /></FormField>
          <FormField label="Catégorie">
            <select style={selectStyle} value={quizForm.category} onChange={e => setQuizForm({...quizForm, category: e.target.value})}>
              {["Ancien Testament","Nouveau Testament","Culture générale","Doctrine","Louange","Histoire de l'Église"].map(c => <option key={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Difficulté">
            <select style={selectStyle} value={quizForm.difficulty} onChange={e => setQuizForm({...quizForm, difficulty: e.target.value})}>
              <option value="facile">Facile</option><option value="moyen">Moyen</option><option value="difficile">Difficile</option>
            </select>
          </FormField>
          <FormField label="⏱ Durée par question (secondes)">
            <input style={inputStyle} type="number" min="5" max="120" value={quizForm.timer_per_question} onChange={e => setQuizForm({...quizForm, timer_per_question: parseInt(e.target.value)||30})} />
          </FormField>
          <FormField label="Type de classement">
            <select style={selectStyle} value={quizForm.group_type} onChange={e => setQuizForm({...quizForm, group_type: e.target.value})}>
              <option value="individuel">👤 Individuel</option>
              <option value="departement">🏢 Par département</option>
              <option value="comite">💼 Par comité</option>
              <option value="groupe">🔵 Par groupe</option>
            </select>
          </FormField>
        </div>

        {/* Questions */}
        <div style={{ marginTop: 20, padding: 16, background: "#f8fafc", borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Questions ({quizForm.questions.length}) — Total: {quizForm.questions.reduce((s,q) => s+q.points, 0)} pts</p>
            <Btn size="sm" icon={Plus} onClick={() => setAddingQ(true)}>Ajouter une question</Btn>
          </div>

          {quizForm.questions.map((q, i) => (
            <div key={q.id} style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", marginBottom: 8, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{i+1}. {q.text}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {q.options.map((opt, oi) => (
                      <span key={oi} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: oi === q.answer ? "#0d948820" : "#f1f5f9", color: oi === q.answer ? "#0d9488" : "#64748b", fontWeight: oi === q.answer ? 700 : 400 }}>
                        {oi === q.answer ? "✓ " : ""}{opt}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                  <Badge variant="warning">{q.points} pts</Badge>
                  <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => removeQuestion(q.id)} />
                </div>
              </div>
            </div>
          ))}

          {addingQ && (
            <div style={{ background: "#fff", borderRadius: 10, padding: 14, border: "2px solid #0d9488", marginTop: 8 }}>
              <FormField label="Question *"><input style={inputStyle} value={newQ.text} onChange={e => setNewQ({...newQ, text: e.target.value})} placeholder="Ex: Qui fut le premier roi d'Israël ?" /></FormField>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#475569", margin: "8px 0 6px" }}>Options de réponse (cochez la bonne)</p>
              {newQ.options.map((opt, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <input type="radio" name="correct" checked={newQ.answer === i} onChange={() => setNewQ({...newQ, answer: i})} />
                  <input style={{ ...inputStyle, flex: 1 }} value={opt} onChange={e => { const opts = [...newQ.options]; opts[i] = e.target.value; setNewQ({...newQ, options: opts}); }} placeholder={`Option ${i+1}`} />
                </div>
              ))}
              <FormField label="Points *"><input style={{ ...inputStyle, width: 100 }} type="number" min="1" value={newQ.points} onChange={e => setNewQ({...newQ, points: parseInt(e.target.value)||10})} /></FormField>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <Btn size="sm" onClick={addQuestion} disabled={!newQ.text.trim() || newQ.options.some(o => !o.trim())}>Ajouter</Btn>
                <Btn size="sm" variant="secondary" onClick={() => setAddingQ(false)}>Annuler</Btn>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowQuizModal(false)}>Annuler</Btn>
          <Btn onClick={saveQuiz} disabled={!quizForm.title.trim()}>{editingQuiz ? "Enregistrer" : "Créer le quiz"}</Btn>
        </div>
      </Modal>

      {/* ══ MODAL SUPPRIMER HISTORIQUE ══ */}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Effacer l'historique des sessions">
        <div style={{ padding: "16px", background: "#fff5f5", borderRadius: 12, border: "1px solid #fecaca", marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 13, color: "#dc2626", fontWeight: 600 }}>⚠️ Cette action est irréversible.</p>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748b" }}>Toutes les {sessions.length} sessions et leurs résultats seront supprimés définitivement.</p>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Btn variant="secondary" onClick={() => setShowDeleteModal(false)}>Annuler</Btn>
          <Btn variant="danger" icon={Trash2} onClick={deleteAllHistory}>Supprimer tout l'historique</Btn>
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
    { key: "members", label: "👥 Membres", actions: ["Voir les membres", "Créer des membres", "Modifier les membres", "Supprimer les membres", "Exporter les membres"] },
    { key: "finances", label: "💰 Finances", actions: ["Voir les finances", "Voir les dîmes", "Créer des transactions", "Modifier les transactions", "Supprimer les transactions", "Exporter les finances"] },
    { key: "events", label: "📅 Événements", actions: ["Voir les événements", "Créer des événements", "Modifier les événements", "Supprimer les événements"] },
    { key: "cultes", label: "⛪ Cultes", actions: ["Voir les cultes", "Créer des cultes", "Modifier les cultes", "Supprimer les cultes", "Gérer les présences", "Exporter l'appel nominal"] },
    { key: "cells", label: "🏠 Cellules", actions: ["Voir les cellules", "Créer des cellules", "Modifier sa cellule", "Marquer présences cellule", "Voir la cellule assignée"] },
    { key: "visitors", label: "👤 Visiteurs", actions: ["Voir les visiteurs", "Créer des visiteurs", "Modifier les visiteurs", "Supprimer les visiteurs"] },
    { key: "communication", label: "📣 Communication", actions: ["Gérer le carrousel", "Envoyer des messages", "Gérer les témoignages"] },
    { key: "reports", label: "📊 Rapports", actions: ["Voir les rapports", "Exporter les données", "Voir les statistiques"] },
    { key: "params", label: "⚙️ Paramètres", actions: ["Voir les paramètres", "Modifier les paramètres", "Gérer les utilisateurs", "Gérer les rôles"] },
  ];

  const allPerms = (exceptions = []) => modules.reduce((acc, m) => {
    m.actions.forEach(a => { acc[a] = !exceptions.includes(a); });
    return acc;
  }, {});

  const [roles, setRoles] = useState([
    { id: 1, name: "Administrateur", color: "#3b82f6", permissions: allPerms(["Supprimer les membres", "Supprimer les transactions", "Supprimer les cultes", "Gérer les rôles"]), custom: false },
    { id: 2, name: "Trésorier", color: "#10b981", permissions: { "Voir les membres": true, "Voir les finances": true, "Voir les dîmes": true, "Créer des transactions": true, "Modifier les transactions": true, "Voir les cultes": true, "Voir les rapports": true, "Exporter les données": true, "Exporter les finances": true, "Voir les statistiques": true }, custom: false },
    { id: 3, name: "Secrétaire", color: "#f59e0b", permissions: { "Voir les membres": true, "Créer des membres": true, "Modifier les membres": true, "Exporter les membres": true, "Voir les événements": true, "Créer des événements": true, "Modifier les événements": true, "Voir les visiteurs": true, "Créer des visiteurs": true, "Modifier les visiteurs": true, "Voir les cultes": true, "Créer des cultes": true, "Gérer les présences": true, "Exporter l'appel nominal": true, "Voir les paramètres": true, "Voir les rapports": true, "Exporter les données": true, "Envoyer des messages": true, "Gérer les témoignages": true }, custom: false },
    { id: 4, name: "Responsable Département", color: "#0d9488", permissions: { "Voir les membres": true, "Voir les cultes": true, "Gérer les présences": true, "Exporter l'appel nominal": true, "Voir les rapports": true, "Voir les statistiques": true }, custom: false },
    { id: 5, name: "Responsable Cellule", color: "#ec4899", permissions: { "Voir les membres": true, "Voir les cellules": true, "Modifier sa cellule": true, "Marquer présences cellule": true, "Voir la cellule assignée": true, "Voir les événements": true }, custom: false },
    { id: 6, name: "Adjoint Cellule", color: "#f97316", permissions: { "Voir les membres": true, "Voir la cellule assignée": true, "Marquer présences cellule": true, "Voir les événements": true }, custom: false },
    { id: 7, name: "Membre", color: "#64748b", permissions: { "Voir les cultes": true, "Voir les événements": true }, custom: false },
  ]);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [showNewRole, setShowNewRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [saved, setSaved] = useState(false);

  const togglePerm = (action) => {
    setRoles(prev => prev.map(r => r.id === selectedRole.id ? { ...r, permissions: { ...r.permissions, [action]: !r.permissions[action] } } : r));
    setSelectedRole(prev => ({ ...prev, permissions: { ...prev.permissions, [action]: !prev.permissions[action] } }));
  };

  const toggleAll = (moduleActions, val) => {
    const update = {};
    moduleActions.forEach(a => { update[a] = val; });
    setRoles(prev => prev.map(r => r.id === selectedRole.id ? { ...r, permissions: { ...r.permissions, ...update } } : r));
    setSelectedRole(prev => ({ ...prev, permissions: { ...prev.permissions, ...update } }));
  };

  const activeCount = Object.values(selectedRole.permissions || {}).filter(Boolean).length;
  const totalCount = modules.reduce((s, m) => s + m.actions.length, 0);
  const roleColors = ["#3b82f6", "#10b981", "#f59e0b", "#0d9488", "#8b5cf6", "#ec4899", "#ef4444", "#f97316"];
  const roleIcons = { 1: "🛡️", 2: "💰", 3: "📋", 4: "🏛️", 5: "🏠", 6: "🤝", 7: "👤" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Gestion des Rôles & Permissions</h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Le pasteur a accès à tout · Configurez les accès granulaires par rôle</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="secondary" icon={Plus} onClick={() => setShowNewRole(true)}>Créer un rôle</Btn>
          <Btn onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>{saved ? "✓ Sauvegardé" : "Enregistrer"}</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
        {/* Role list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ padding: "14px 16px", background: "#f0fdfa", borderRadius: 12, border: "2px solid #8b5cf6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>👑</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Pasteur</span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 10, color: "#64748b" }}>{totalCount}/{totalCount} permissions — non modifiable</p>
          </div>
          {roles.map(r => {
            const cnt = Object.values(r.permissions || {}).filter(Boolean).length;
            return (
              <div key={r.id} onClick={() => setSelectedRole(r)} style={{
                padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                background: selectedRole.id === r.id ? "#fff" : "#fafbfc",
                border: selectedRole.id === r.id ? `2px solid ${r.color}` : "1px solid #f1f5f9",
                transition: "all 0.15s"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: `${r.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{roleIcons[r.id] || "🔐"}</div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{r.name}</span>
                  </div>
                  {r.custom && <Btn variant="ghost" size="sm" icon={Trash2} onClick={(e) => { e.stopPropagation(); if(confirm(`Supprimer le rôle ${r.name} ?`)) setRoles(prev => prev.filter(x => x.id !== r.id)); }} />}
                </div>
                <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 4, background: "#e2e8f0", borderRadius: 2 }}>
                    <div style={{ width: `${Math.round((cnt / totalCount) * 100)}%`, height: "100%", background: r.color, borderRadius: 2, transition: "width 0.3s" }} />
                  </div>
                  <span style={{ fontSize: 10, color: "#94a3b8", flexShrink: 0 }}>{cnt}/{totalCount}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Permissions detail */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${selectedRole.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{roleIcons[selectedRole.id] || "🔐"}</div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{selectedRole.name}</h3>
                <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{activeCount}/{totalCount} permissions actives</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn size="sm" variant="secondary" onClick={() => { modules.forEach(m => toggleAll(m.actions, true)); }}>Tout activer</Btn>
              <Btn size="sm" variant="secondary" onClick={() => { modules.forEach(m => toggleAll(m.actions, false)); }}>Tout désactiver</Btn>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {modules.map(mod => {
              const modActive = mod.actions.filter(a => selectedRole.permissions?.[a]).length;
              const allActive = modActive === mod.actions.length;
              return (
                <div key={mod.key} style={{ padding: 16, background: "#f8fafc", borderRadius: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <h4 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#0f172a" }}>{mod.label}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{modActive}/{mod.actions.length}</span>
                      <label onClick={() => toggleAll(mod.actions, !allActive)} style={{
                        display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontSize: 11, fontWeight: 600,
                        color: allActive ? "#0d9488" : "#94a3b8"
                      }}>
                        <div style={{ width: 36, height: 20, borderRadius: 10, padding: 2, transition: "all 0.2s", background: allActive ? "#0d9488" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: allActive ? "flex-end" : "flex-start" }}>
                          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
                        </div>
                        Tout
                      </label>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 6 }}>
                    {mod.actions.map(action => {
                      const checked = selectedRole.permissions?.[action] || false;
                      return (
                        <label key={action} onClick={() => togglePerm(action)} style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                          background: checked ? "#f0fdfa" : "#fff",
                          border: checked ? "1px solid #0d948840" : "1px solid #e2e8f0",
                          transition: "all 0.15s"
                        }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
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
              );
            })}
          </div>
        </div>
      </div>

      <Modal open={showNewRole} onClose={() => setShowNewRole(false)} title="Créer un nouveau rôle">
        <FormField label="Nom du rôle *"><input style={inputStyle} value={newRoleName} onChange={e => setNewRoleName(e.target.value)} placeholder="Ex: Responsable Jeunesse" /></FormField>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 12px" }}>Le rôle sera créé sans aucune permission. Configurez-les après création.</p>
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
  const [users, setUsers] = useState([
    ...MOCK_MEMBERS.filter(m => m.role !== "membre").map(m => ({ ...m, last_login: "2026-03-20", cellule_id: null })),
    { id: 101, first_name: "Moïse", last_name: "Dembélé", gender: "M", phone: "+225 07 22 33 44", email: "moise.d@email.com", status: "actif", role: "responsable_cellule", cellule_id: 1, department: "Cocody", last_login: "2026-03-28" },
    { id: 102, first_name: "Chantal", last_name: "Kouamé", gender: "F", phone: "+225 05 88 77 66", email: "chantal.k@email.com", status: "actif", role: "adjoint_cellule", cellule_id: 1, department: "Cocody", last_login: "2026-03-25" },
    { id: 103, first_name: "Théodore", last_name: "Gba", gender: "M", phone: "+225 01 55 44 33", email: "theodore.g@email.com", status: "actif", role: "responsable_cellule", cellule_id: 2, department: "Yopougon", last_login: "2026-03-22" },
  ]);
  const [churchCode, setChurchCode] = useState("EGLISE-" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ role: "", cellule_id: null });
  const allRoles = [
    { value: "pasteur", label: "Pasteur" },
    { value: "admin", label: "Administrateur" },
    { value: "tresorier", label: "Trésorier" },
    { value: "secretaire", label: "Secrétaire" },
    { value: "responsable_dept", label: "Responsable Département" },
    { value: "responsable_cellule", label: "Responsable Cellule" },
    { value: "adjoint_cellule", label: "Adjoint Cellule" },
    { value: "agent_service_ordre", label: "Agent Service d'Ordre" },
    { value: "membre", label: "Membre" },
  ];
  const roleIsCellule = (r) => r === "responsable_cellule" || r === "adjoint_cellule";
  const roleColors = {
    pasteur: "#8b5cf6", admin: "#3b82f6", tresorier: "#10b981", secretaire: "#f59e0b",
    responsable_dept: "#0d9488", responsable_cellule: "#ec4899", adjoint_cellule: "#f97316",
    agent_service_ordre: "#64748b", membre: "#94a3b8",
  };
  const roleLabels = { responsable_cellule: "Resp. Cellule", adjoint_cellule: "Adjoint Cellule" };

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
            {["Utilisateur", "Rôle", "Cellule affectée", "Email", "Dernière connexion", "Actions"].map(h => (
              <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {users.map(u => {
              const cellule = MOCK_CELLS.find(c => c.id === u.cellule_id);
              const rColor = roleColors[u.role] || "#64748b";
              return (
                <tr key={u.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={u.first_name} size={32} color={rColor} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{u.first_name} {u.last_name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: `${rColor}18`, color: rColor, border: `1px solid ${rColor}30` }}>
                      {allRoles.find(r => r.value === u.role)?.label || u.role}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: cellule ? "#0d9488" : "#94a3b8", fontWeight: cellule ? 600 : 400 }}>
                    {cellule ? `🏠 ${cellule.name}` : "—"}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748b" }}>{u.email}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#94a3b8" }}>{u.last_login}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Btn variant="ghost" size="sm" icon={Edit} onClick={() => { setEditingUser(u); setEditForm({ role: u.role, cellule_id: u.cellule_id || "" }); setShowEditModal(true); }} />
                      <Btn variant="ghost" size="sm" icon={Trash2} onClick={() => { if(confirm(`Supprimer l'utilisateur ${u.first_name} ${u.last_name} ?`)) setUsers(prev => prev.filter(x => x.id !== u.id)); }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal open={showEditModal} onClose={() => setShowEditModal(false)} title={`Modifier — ${editingUser?.first_name} ${editingUser?.last_name}`}>
        <FormField label="Rôle">
          <select style={selectStyle} value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value, cellule_id: roleIsCellule(e.target.value) ? editForm.cellule_id : null})}>
            {allRoles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </FormField>
        {roleIsCellule(editForm.role) && (
          <FormField label={editForm.role === "responsable_cellule" ? "🏠 Cellule à diriger" : "🏠 Cellule (adjoint)"}>
            <select style={selectStyle} value={editForm.cellule_id || ""} onChange={e => setEditForm({...editForm, cellule_id: e.target.value ? parseInt(e.target.value) : null})}>
              <option value="">— Sélectionner une cellule —</option>
              {MOCK_CELLS.map(c => <option key={c.id} value={c.id}>{c.name} ({c.quartier})</option>)}
            </select>
            {editForm.role === "adjoint_cellule" && (
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "#94a3b8" }}>L'adjoint assiste le responsable et le remplace en son absence.</p>
            )}
          </FormField>
        )}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Btn variant="secondary" onClick={() => setShowEditModal(false)}>Annuler</Btn>
          <Btn onClick={() => {
            setUsers(prev => prev.map(u => u.id === editingUser?.id ? {...u, role: editForm.role, cellule_id: editForm.cellule_id || null} : u));
            setShowEditModal(false);
          }}>Enregistrer</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// SUBSCRIPTION PAGE
// ═══════════════════════════════════════════════════════
const SubscriptionPage = () => {
  const [billing, setBilling] = useState("monthly"); // "monthly" | "annual"
  const [paying, setPaying] = useState(null); // plan en cours de paiement
  const [payStep, setPayStep] = useState("method"); // "method" | "processing" | "done"
  const [payMethod, setPayMethod] = useState("orange");

  const plans = [
    {
      name: "Starter", icon: "🌱", color: "#64748b", current: false,
      desc: "Petites églises de quartier",
      monthly: 5000, annual: 50000, // 2 mois offerts
      savings: 10000,
      features: [
        "✅ 200 membres", "✅ 3 comptes staff", "✅ Dashboard & statistiques",
        "✅ Gestion membres & finances", "✅ Agenda & cultes",
        "✅ Support WhatsApp (Lun–Ven)", "❌ Quiz & gamification", "❌ Cellules",
      ],
    },
    {
      name: "Growth", icon: "🚀", color: "#0d9488", current: true, popular: true,
      desc: "Églises en croissance",
      monthly: 15000, annual: 150000,
      savings: 30000,
      features: [
        "✅ 500 membres", "✅ 10 comptes staff", "✅ Toutes les fonctionnalités",
        "✅ Quiz & gamification", "✅ Cellules de maison",
        "✅ Notifications WhatsApp automatiques",
        "✅ Export PDF/Excel", "✅ Support WhatsApp prioritaire",
      ],
    },
    {
      name: "Pro", icon: "⚡", color: "#3b82f6", current: false,
      desc: "Grandes églises",
      monthly: 25000, annual: 250000,
      savings: 50000,
      features: [
        "✅ Membres illimités", "✅ Staff illimité", "✅ Toutes les fonctionnalités",
        "✅ Rapport mensuel PDF auto", "✅ Alertes intelligentes",
        "✅ Mode hors-ligne avancé", "✅ Cartographie zones",
        "✅ Support WhatsApp 7j/7 · 8h–22h",
      ],
    },
    {
      name: "Dénomination", icon: "👑", color: "#8b5cf6", current: false,
      desc: "Multi-sites & dénominations",
      monthly: 50000, annual: 500000,
      savings: 100000,
      features: [
        "✅ Multi-églises illimité", "✅ Tableau de bord dénomination",
        "✅ Gestion centralisée", "✅ API personnalisée",
        "✅ Formation dédiée sur site", "✅ Support WhatsApp 24h/24",
        "✅ Personnalisation totale", "✅ Contrat annuel négociable",
      ],
    },
  ];

  const payMethods = [
    { id: "orange", label: "Orange Money", emoji: "🟠", color: "#ff6600" },
    { id: "mtn", label: "MTN MoMo", emoji: "🟡", color: "#ffcc00" },
    { id: "wave", label: "Wave", emoji: "🔵", color: "#1a86e0" },
    { id: "moov", label: "Moov Money", emoji: "🔷", color: "#004f9f" },
    { id: "carte", label: "Carte bancaire", emoji: "💳", color: "#64748b" },
  ];

  const currentPlan = plans.find(p => p.current);
  const getPrice = (p) => billing === "annual" ? p.annual : p.monthly;
  const getLabel = (p) => billing === "annual"
    ? `${p.annual.toLocaleString()} F/an`
    : `${p.monthly.toLocaleString()} F/mois`;

  const openPayment = (plan) => {
    if (plan.current) return;
    setPaying(plan);
    setPayStep("method");
    setPayMethod("orange");
  };

  const processPayment = () => {
    setPayStep("processing");
    setTimeout(() => setPayStep("done"), 2800);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Choisissez votre plan</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 20px" }}>Paiement sécurisé via CinetPay · Orange Money, Wave, MTN, carte bancaire</p>

        {/* Toggle mensuel / annuel */}
        <div style={{ display: "inline-flex", background: "#f1f5f9", borderRadius: 12, padding: 4, gap: 4 }}>
          {[{k:"monthly",l:"Mensuel"},{k:"annual",l:"Annuel"}].map(b => (
            <button key={b.k} onClick={() => setBilling(b.k)} style={{
              padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer",
              background: billing === b.k ? "#0d9488" : "transparent",
              color: billing === b.k ? "#fff" : "#64748b",
              fontSize: 13, fontWeight: 700, transition: "all 0.2s",
            }}>{b.l}</button>
          ))}
        </div>
        {billing === "annual" && (
          <div style={{ marginTop: 10, display: "inline-block", padding: "5px 14px", background: "#f0fdfa", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#0d9488", border: "1px solid #0d948830" }}>
            🎉 2 mois offerts sur tous les plans annuels !
          </div>
        )}
      </div>

      {/* Plans grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
        {plans.map(p => (
          <div key={p.name} style={{
            background: "#fff", borderRadius: 20, padding: "28px 22px", position: "relative",
            border: p.popular ? `2px solid ${p.color}` : "1px solid #f1f5f9",
            transform: p.popular ? "scale(1.02)" : "scale(1)",
            boxShadow: p.popular ? `0 12px 40px ${p.color}20` : "0 2px 8px rgba(0,0,0,0.03)",
            transition: "all 0.25s"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = p.popular ? "scale(1.04)" : "scale(1.01)"; e.currentTarget.style.boxShadow = `0 12px 40px ${p.color}25`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = p.popular ? "scale(1.02)" : "scale(1)"; e.currentTarget.style.boxShadow = p.popular ? `0 12px 40px ${p.color}20` : "0 2px 8px rgba(0,0,0,0.03)"; }}
          >
            {p.popular && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: p.color, color: "#fff", padding: "4px 16px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.5px", whiteSpace: "nowrap" }}>⭐ LE PLUS CHOISI</div>}
            {p.current && <div style={{ position: "absolute", top: 12, right: 12 }}><Badge variant="success">Actuel</Badge></div>}

            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{p.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 3px" }}>{p.name}</h3>
              <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{p.desc}</p>
            </div>

            {/* Prix */}
            <div style={{ textAlign: "center", padding: "14px 0", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: p.color, lineHeight: 1 }}>
                {billing === "annual" ? p.annual.toLocaleString() : p.monthly.toLocaleString()}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                F/{billing === "annual" ? "an" : "mois"}
                {billing === "annual" && <span style={{ marginLeft: 6, color: "#10b981", fontWeight: 700 }}>(-{p.savings.toLocaleString()} F)</span>}
              </div>
              {billing === "annual" && (
                <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
                  soit {Math.round(p.annual / 12).toLocaleString()} F/mois
                </div>
              )}
            </div>

            {/* Features */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 20 }}>
              {p.features.map((f, i) => {
                const ok = f.startsWith("✅");
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 12, color: ok ? "#475569" : "#cbd5e1" }}>
                    <span style={{ flexShrink: 0, fontSize: 11 }}>{ok ? "✅" : "❌"}</span>
                    <span>{f.slice(2)}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            {p.name === "Dénomination" ? (
              <a href="https://wa.me/2250700000000?text=Bonjour%2C%20je%20veux%20le%20plan%20D%C3%A9nomination%20Lumen%20Church" target="_blank" rel="noopener noreferrer" style={{
                display: "block", width: "100%", padding: 13, borderRadius: 11, textAlign: "center",
                background: "#25D366", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none"
              }}>💬 Nous contacter sur WhatsApp</a>
            ) : (
              <button onClick={() => openPayment(p)} style={{
                width: "100%", padding: 13, borderRadius: 11, border: p.current ? "2px solid #e2e8f0" : "none",
                background: p.current ? "#fff" : p.color, color: p.current ? "#64748b" : "#fff",
                fontSize: 13, fontWeight: 700, cursor: p.current ? "default" : "pointer", transition: "all 0.2s"
              }}>
                {p.current ? "✓ Plan actuel" : `Passer au plan ${p.name} →`}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Méthodes de paiement acceptées */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 22, border: "1px solid #f1f5f9", marginBottom: 20 }}>
        <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>💳 Méthodes de paiement acceptées via CinetPay</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {payMethods.map(m => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 10, background: "#f8fafc", border: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 18 }}>{m.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>{m.label}</span>
            </div>
          ))}
        </div>
        <p style={{ margin: "12px 0 0", fontSize: 11, color: "#94a3b8" }}>
          🔒 Paiements sécurisés · Reçu automatique par WhatsApp · Support en cas de problème : <strong style={{ color: "#25D366" }}>WhatsApp +225 07 00 00 00</strong>
        </p>
      </div>

      {/* Tableau comparatif résumé */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 22, border: "1px solid #f1f5f9" }}>
        <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>📊 Comparaison rapide</p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Fonctionnalité", "Starter", "Growth", "Pro", "Dénomination"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: h === "Fonctionnalité" ? "left" : "center", fontWeight: 700, color: "#64748b", fontSize: 11, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Membres", "200", "500", "Illimité", "Illimité"],
                ["Comptes staff", "3", "10", "Illimité", "Illimité"],
                ["Cellules de maison", "❌", "✅", "✅", "✅"],
                ["Notifications WhatsApp", "❌", "✅", "✅", "✅"],
                ["Quiz & gamification", "❌", "✅", "✅", "✅"],
                ["Rapport PDF auto", "❌", "❌", "✅", "✅"],
                ["Multi-sites", "❌", "❌", "❌", "✅"],
                ["Support WhatsApp", "Lun–Ven", "Prioritaire", "7j/7", "24h/24"],
              ].map((row, i) => (
                <tr key={i} style={{ borderTop: "1px solid #f8fafc" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "9px 12px", textAlign: j === 0 ? "left" : "center", color: j === 0 ? "#0f172a" : cell === "✅" ? "#10b981" : cell === "❌" ? "#cbd5e1" : "#475569", fontWeight: j === 0 ? 600 : 400 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal paiement CinetPay */}
      <Modal open={!!paying} onClose={() => { setPaying(null); setPayStep("method"); }} title="Paiement sécurisé — CinetPay" width={480}>
        {payStep === "method" && paying && (
          <div>
            <div style={{ padding: "12px 16px", background: "#f0fdfa", borderRadius: 12, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{paying.icon} Plan {paying.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>{getLabel(paying)}</p>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: paying.color }}>{getPrice(paying).toLocaleString()} F</div>
            </div>

            <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Choisissez votre méthode de paiement</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {payMethods.map(m => (
                <label key={m.id} onClick={() => setPayMethod(m.id)} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, cursor: "pointer",
                  background: payMethod === m.id ? "#f0fdfa" : "#f8fafc",
                  border: payMethod === m.id ? `2px solid ${m.color}` : "1px solid #e2e8f0",
                  transition: "all 0.15s"
                }}>
                  <span style={{ fontSize: 22 }}>{m.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{m.label}</p>
                    {m.id !== "carte" && <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>Vous recevrez un prompt de confirmation sur votre téléphone</p>}
                  </div>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${payMethod === m.id ? m.color : "#d1d5db"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {payMethod === m.id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: m.color }} />}
                  </div>
                </label>
              ))}
            </div>

            {payMethod !== "carte" && (
              <FormField label="Numéro de téléphone *">
                <input style={inputStyle} placeholder="+225 07 00 00 00" />
              </FormField>
            )}
            {payMethod === "carte" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <FormField label="Numéro de carte"><input style={{ ...inputStyle, gridColumn: "1/-1" }} placeholder="1234 5678 9012 3456" /></FormField>
                <FormField label="Expiration"><input style={inputStyle} placeholder="MM/AA" /></FormField>
                <FormField label="CVV"><input style={inputStyle} placeholder="123" /></FormField>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
              <Btn variant="secondary" onClick={() => { setPaying(null); setPayStep("method"); }}>Annuler</Btn>
              <Btn onClick={processPayment}>
                🔒 Payer {getPrice(paying).toLocaleString()} F
              </Btn>
            </div>
            <p style={{ margin: "12px 0 0", fontSize: 10, color: "#94a3b8", textAlign: "center" }}>
              Sécurisé par CinetPay · Reçu envoyé par WhatsApp · Aucune donnée bancaire stockée
            </p>
          </div>
        )}

        {payStep === "processing" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16, animation: "spin 1s linear infinite" }}>⏳</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>Traitement en cours...</h3>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
              {payMethod !== "carte" ? "Vérifiez votre téléphone et confirmez le paiement" : "Vérification de votre carte..."}
            </p>
          </div>
        )}

        {payStep === "done" && paying && (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>Paiement confirmé !</h3>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 6px" }}>
              Plan <strong>{paying.name}</strong> activé · {getLabel(paying)}
            </p>
            <p style={{ fontSize: 12, color: "#25D366", fontWeight: 600, margin: "0 0 24px" }}>
              📱 Reçu envoyé par WhatsApp
            </p>
            <Btn onClick={() => { setPaying(null); setPayStep("method"); }}>Fermer</Btn>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// SUPPORT PAGE
// ═══════════════════════════════════════════════════════
const SupportPage = () => {
  const [form, setForm] = useState({ sujet: "", message: "", phone: "", priorite: "normale" });
  const [sent, setSent] = useState(false);

  const WA_NUMBER = "2250700000000"; // À remplacer par le vrai numéro

  const buildWAMessage = () => {
    const prio = { basse: "🟢 Basse", normale: "🟡 Normale", haute: "🔴 Haute", urgente: "🆘 URGENTE" };
    return encodeURIComponent(
      `*[Lumen Church — Support]*\n\n` +
      `📋 *Sujet :* ${form.sujet}\n` +
      `🔔 *Priorité :* ${prio[form.priorite]}\n` +
      `📞 *Téléphone :* ${form.phone}\n\n` +
      `💬 *Description :*\n${form.message}`
    );
  };

  const handleSend = () => {
    if (!form.sujet || !form.message) return;
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildWAMessage()}`, "_blank");
    setSent(true);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0 }}>Support</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>Notre équipe vous répond sur WhatsApp — en français, en langue locale si besoin 🇨🇮</p>
      </div>

      {/* Canaux de contact */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
        {/* WhatsApp principal */}
        <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ background: "#f0fdf4", borderRadius: 16, padding: 20, border: "2px solid #25D366", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#dcfce7"}
            onMouseLeave={e => e.currentTarget.style.background = "#f0fdf4"}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 24 }}>💬</div>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0f172a" }}>WhatsApp</h3>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#25D366", fontWeight: 700 }}>+225 07 00 00 00</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748b" }}>Lun–Sam · 7h–21h · Réponse &lt; 1h</p>
            </div>
          </div>
        </a>

        {/* WhatsApp urgence */}
        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("🆘 URGENT — ")}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ background: "#fef2f2", borderRadius: 16, padding: 20, border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
            onMouseLeave={e => e.currentTarget.style.background = "#fef2f2"}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 24 }}>🆘</div>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Urgence</h3>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#ef4444", fontWeight: 700 }}>App inaccessible</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748b" }}>7j/7 · 24h/24</p>
            </div>
          </div>
        </a>

        {/* Communauté */}
        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je veux rejoindre la communauté Lumen Church")}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ background: "#f5f3ff", borderRadius: 16, padding: 20, border: "1px solid #ddd6fe", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#ede9fe"}
            onMouseLeave={e => e.currentTarget.style.background = "#f5f3ff"}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 24 }}>👥</div>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Communauté</h3>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#8b5cf6", fontWeight: 700 }}>Groupe WhatsApp</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748b" }}>Entraide entre pasteurs</p>
            </div>
          </div>
        </a>
      </div>

      {/* Formulaire → ouvre WhatsApp */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9", marginBottom: 20 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 6px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>💬</span> Envoyer un message WhatsApp
        </h3>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 20px" }}>Remplissez le formulaire — il ouvrira WhatsApp avec le message pré-rédigé</p>

        {sent ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>WhatsApp ouvert !</h3>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px" }}>Envoyez simplement le message depuis WhatsApp. Notre équipe répond sous 1h.</p>
            <Btn onClick={() => { setSent(false); setForm({ sujet: "", message: "", phone: "", priorite: "normale" }); }}>Nouveau message</Btn>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 4 }}>
              <FormField label="Votre numéro WhatsApp">
                <input style={inputStyle} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+225 07 00 00 00" />
              </FormField>
              <FormField label="Priorité">
                <select style={selectStyle} value={form.priorite} onChange={e => setForm({...form, priorite: e.target.value})}>
                  <option value="basse">🟢 Basse — question générale</option>
                  <option value="normale">🟡 Normale — problème mineur</option>
                  <option value="haute">🔴 Haute — problème bloquant</option>
                  <option value="urgente">🆘 Urgente — site inaccessible</option>
                </select>
              </FormField>
            </div>
            <FormField label="Sujet *">
              <input style={inputStyle} value={form.sujet} onChange={e => setForm({...form, sujet: e.target.value})} placeholder="Ex: Impossible d'ajouter un membre" />
            </FormField>
            <FormField label="Description *">
              <textarea style={{...inputStyle, minHeight: 100, resize: "vertical"}} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Décrivez le problème..." />
            </FormField>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button disabled={!form.sujet || !form.message} onClick={handleSend} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 11, border: "none",
                background: (!form.sujet || !form.message) ? "#e2e8f0" : "#25D366",
                color: (!form.sujet || !form.message) ? "#94a3b8" : "#fff",
                fontSize: 14, fontWeight: 700, cursor: (!form.sujet || !form.message) ? "not-allowed" : "pointer"
              }}>
                <span style={{ fontSize: 18 }}>💬</span> Ouvrir WhatsApp
              </button>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>Répond sous 1h · Lun–Sam 7h–21h</span>
            </div>
          </>
        )}
      </div>

      {/* FAQ */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f1f5f9" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 16px" }}>❓ Questions fréquentes</h3>
        {[
          { q: "Comment réinitialiser mon mot de passe ?", r: "Paramètres → Sécurité → Changer le mot de passe. Ou écrivez-nous sur WhatsApp." },
          { q: "Comment importer des membres en masse ?", r: "Membres → bouton Excel/CSV → préparez le fichier selon le modèle → importez." },
          { q: "L'app fonctionne-t-elle sans internet ?", r: "Oui ! Lumen Church est une PWA avec mode hors-ligne. Vos données se synchronisent automatiquement quand la connexion revient." },
          { q: "Comment payer l'abonnement ?", r: "Orange Money, MTN MoMo, Wave, Moov ou carte bancaire via CinetPay. Aucune carte étrangère requise." },
          { q: "Puis-je changer de plan à tout moment ?", r: "Oui, sans frais. L'upgrade est immédiat. Le downgrade prend effet au prochain renouvellement." },
        ].map((item, i, arr) => (
          <div key={i} style={{ padding: "13px 0", borderBottom: i < arr.length - 1 ? "1px solid #f1f5f9" : "none" }}>
            <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: "#0f172a" }}>— {item.q}</p>
            <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>{item.r}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

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
  const lc = levelColors[level] || "#0d9488";

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: DS.slate900, margin: 0, letterSpacing: "-0.5px" }}>Récompenses & Badges</h2>
        <p style={{ fontSize: 13, color: DS.slate400, margin: "4px 0 0", fontWeight: 500 }}>{done.length}/{achievements.length} badges obtenus · Niveau {level} — {levelNames[level] || "Fidèle"}</p>
      </div>

      {/* XP Hero card */}
      <div style={{
        background: `linear-gradient(135deg, ${lc} 0%, ${lc}cc 100%)`,
        borderRadius: 22, padding: "28px 32px", marginBottom: 20,
        display: "flex", alignItems: "center", gap: 24, position: "relative", overflow: "hidden",
        boxShadow: `0 12px 36px ${lc}40, 0 4px 12px ${lc}20`,
      }}>
        {/* Background shapes */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -60, left: "40%", width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <div style={{
          width: 84, height: 84, borderRadius: "50%", flexShrink: 0,
          background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          border: "2px solid rgba(255,255,255,0.35)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.75)", letterSpacing: "1px", textTransform: "uppercase" }}>Niv.</span>
          <span style={{ fontSize: 32, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{level}</span>
        </div>

        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.4px" }}>{levelNames[level] || "Fidèle"}</h3>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                → {levelNames[level + 1] || "Niveau maximum"} · {xpForNextLevel - xp} XP restants
              </p>
            </div>
            <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{xp} <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.75 }}>/ {xpForNextLevel} XP</span></span>
          </div>
          <div style={{ height: 10, background: "rgba(255,255,255,0.2)", borderRadius: 5, overflow: "hidden" }}>
            <div style={{
              width: `${xpProgress}%`, height: "100%", borderRadius: 5,
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0 0 12px rgba(255,255,255,0.6)",
              transition: "width 0.7s cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{done.length}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Badges</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.2)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{level}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Niveau</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.2)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{xp}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.5px" }}>XP total</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Earned badges */}
        <div style={{ background: "#fff", borderRadius: DS.r16, padding: 22, border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: DS.slate900, margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8, letterSpacing: "-0.2px" }}>
            🏆 Badges obtenus <Badge variant="success">{done.length}</Badge>
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {done.length === 0 && <p style={{ fontSize: 12, color: DS.slate400, fontStyle: "italic" }}>Complétez des actions pour débloquer vos premiers badges !</p>}
            {done.map(a => (
              <div key={a.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                background: "linear-gradient(135deg, #f0fdfa, #f8fffe)",
                borderRadius: 12, border: "1px solid #0d948820",
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(145deg, #f59e0b, #f97316)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, boxShadow: "0 3px 10px rgba(245,158,11,0.3)" }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: DS.slate900 }}>{a.name}</p>
                  <p style={{ margin: 0, fontSize: 11, color: DS.slate400 }}>{a.desc}</p>
                </div>
                <Badge variant="warning">+{a.xp} XP</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Locked badges */}
        <div style={{ background: "#fff", borderRadius: DS.r16, padding: 22, border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: DS.slate900, margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8, letterSpacing: "-0.2px" }}>
            🔒 À débloquer <Badge variant="info">{pending.length}</Badge>
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {pending.map(a => (
              <div key={a.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                background: DS.slate50, borderRadius: 12, border: `1px solid ${DS.slate100}`, opacity: 0.72,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: DS.slate200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, filter: "grayscale(1)" }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: DS.slate600 }}>{a.name}</p>
                  <p style={{ margin: 0, fontSize: 11, color: DS.slate400 }}>{a.desc}</p>
                </div>
                <Badge variant="default">+{a.xp} XP</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{ background: "#fff", borderRadius: DS.r16, padding: 22, border: `1px solid ${DS.slate100}`, boxShadow: DS.shadowSm }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: DS.slate900, margin: "0 0 16px", letterSpacing: "-0.2px" }}>🏅 Classement de l'église</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {leaderboard.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderRadius: 14,
              background: i === 0 ? "linear-gradient(135deg, #fffbeb, #fef3c7)" : DS.slate50,
              border: i === 0 ? "1px solid #fde68a" : `1px solid ${DS.slate100}`,
              boxShadow: i === 0 ? "0 4px 14px rgba(245,158,11,0.12)" : "none",
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: i === 0 ? "linear-gradient(135deg, #f59e0b, #f97316)" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7f32" : DS.slate100,
                color: i < 3 ? "#fff" : DS.slate400, fontSize: i < 3 ? 14 : 12, fontWeight: 900, flexShrink: 0,
                boxShadow: i === 0 ? "0 3px 10px rgba(245,158,11,0.4)" : "none",
              }}>{i < 3 ? ["🥇","🥈","🥉"][i] : i + 1}</div>
              <Avatar name={p.name} size={38} color={levelColors[p.level] || "#0d9488"} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: DS.slate900 }}>{p.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: DS.slate400 }}>{p.role} · Niv. {p.level} {levelNames[p.level]}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 900, color: i === 0 ? "#d97706" : DS.slate900 }}>{p.xp} XP</p>
                <p style={{ margin: 0, fontSize: 10, color: DS.slate400 }}>{p.badges} badge{p.badges > 1 ? "s" : ""}</p>
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
  committees: { label: "Comités & Services", icon: Briefcase, component: null },
  families: { label: "Familles", icon: Heart, component: null },
  groups: { label: "Groupes", icon: UsersRound, component: null },
  quiz: { label: "Jeux & Quiz", icon: Star, component: null }, // needs userRole
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
  const [terminology, setTerminology] = useState({ departments: "Départements", committees: "Comités & Services", groups: "Groupes", families: "Familles" });
  const [churchData, setChurchData] = useState({ name: "Mon Église", denomination: "", pasteur: "" });
  const [features, setFeatures] = useState({
    subdivisions: false, gamification: true, formations: true,
    quiz: true, testimonials_media: true, visitors: true, goals: true, cells: true,
  });
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
  // ── Système d'alertes dynamiques ──
  const generateAlerts = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=Dim, 1=Lun... 6=Sam
    const todayStr = today.toISOString().split("T")[0];
    const alerts = [];

    // 1. Alertes anniversaires
    const thisMonth = today.getMonth() + 1;
    const birthdayMembers = MOCK_MEMBERS.filter(m => m.birthday_month === thisMonth);
    if (birthdayMembers.length > 0) {
      alerts.push({
        id: "bday-" + thisMonth,
        type: "birthday",
        title: `🎂 ${birthdayMembers.length} anniversaire${birthdayMembers.length > 1 ? "s" : ""} ce mois`,
        desc: birthdayMembers.slice(0, 3).map(m => `${m.first_name} ${m.last_name}`).join(", "),
        read: false,
        date: todayStr,
        priority: "low",
      });
    }

    // 2. Alertes absences dimanche — générées le jour même (dimanche = 0)
    // Simulé : on suppose que le dernier culte était ce dimanche
    const lastSundayDate = (() => {
      const d = new Date(today);
      const diff = (d.getDay() === 0) ? 0 : d.getDay();
      d.setDate(d.getDate() - diff);
      return d.toISOString().split("T")[0];
    })();

    // Membres absents au dernier culte (simulation : ceux avec statut passif ou inactif)
    const absentMembers = MOCK_MEMBERS.filter(m =>
      m.status === "passif" || m.status === "inactif" || m.status === "sympathisant"
    );

    if (absentMembers.length > 0) {
      // Alert stays until an action is logged for each absent member
      alerts.push({
        id: "absent-" + lastSundayDate,
        type: "attendance",
        title: `⚠️ ${absentMembers.length} membre${absentMembers.length > 1 ? "s" : ""} absent${absentMembers.length > 1 ? "s" : ""} au culte`,
        desc: `${absentMembers.slice(0, 3).map(m => `${m.first_name} ${m.last_name}`).join(", ")}${absentMembers.length > 3 ? ` et ${absentMembers.length - 3} autre(s)` : ""} — absents le dimanche ${new Date(lastSundayDate).toLocaleDateString("fr")}. ⚠️ Cette alerte restera active jusqu'à ce qu'une action soit enregistrée pour chaque membre concerné.`,
        read: false,
        date: lastSundayDate,
        priority: "high",
        members: absentMembers.map(m => m.id),
        persistent: true, // ne disparaît pas à la fermeture
      });
    }

    // 3. Membres absents depuis plusieurs dimanches consécutifs (>= 2)
    const chronicallyAbsent = MOCK_MEMBERS.filter(m => m.status === "passif");
    if (chronicallyAbsent.length > 0) {
      alerts.push({
        id: "chronic-absent",
        type: "attendance",
        title: `📉 ${chronicallyAbsent.length} membre${chronicallyAbsent.length > 1 ? "s" : ""} inactif${chronicallyAbsent.length > 1 ? "s" : ""} depuis ≥ 2 dimanches`,
        desc: chronicallyAbsent.map(m => `${m.first_name} ${m.last_name}`).join(", "),
        read: false,
        date: todayStr,
        priority: "medium",
      });
    }

    // 4. Visiteurs sans suivi
    const unsupported = [{ id: 99, first_name: "Adama", last_name: "Sanogo" }]; // mock
    alerts.push({
      id: "visitor-followup",
      type: "visitor",
      title: "👤 Visiteur sans suivi depuis 5 jours",
      desc: "Adama Sanogo — première visite il y a 5 jours, aucun suivi enregistré",
      read: false,
      date: todayStr,
      priority: "medium",
    });

    // 5. Finance
    alerts.push({
      id: "finance-goal",
      type: "finance",
      title: "💰 Objectif dîmes atteint à 85%",
      desc: "Il manque 150 000 F pour atteindre l'objectif mensuel",
      read: true,
      date: todayStr,
      priority: "low",
    });

    // Sort: high priority first, then by date desc
    return alerts.sort((a, b) => {
      const prio = { high: 0, medium: 1, low: 2 };
      return (prio[a.priority] || 1) - (prio[b.priority] || 1);
    });
  };

  const [alerts, setAlerts] = useState(generateAlerts);
  const [resolvedAlertMembers, setResolvedAlertMembers] = useState({}); // { alertId: Set<memberId> }
  const markAlertRead = (id) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  const markAllRead = () => setAlerts(prev => prev.map(a => a.persistent ? a : { ...a, read: true }));

  // Résoudre un membre dans une alerte persistante (action enregistrée)
  const resolveAlertMember = (alertId, memberId) => {
    setResolvedAlertMembers(prev => {
      const set = new Set(prev[alertId] || []);
      set.add(memberId);
      const newState = { ...prev, [alertId]: set };
      // Si tous les membres sont résolus → supprimer l'alerte persistante
      const alert = alerts.find(a => a.id === alertId);
      if (alert?.members && [...set].length >= alert.members.length) {
        setAlerts(p => p.filter(a => a.id !== alertId));
      }
      return newState;
    });
  };
  const [showAlerts, setShowAlerts] = useState(false);
  const [bellShaking, setBellShaking] = useState(false);
  // Shake bell every 30s if unread alerts exist
  useEffect(() => {
    const interval = setInterval(() => {
      if (alerts.some(a => !a.read)) {
        setBellShaking(true);
        setTimeout(() => setBellShaking(false), 900);
      }
    }, 30000);
    // Shake immediately on mount if unread
    if (alerts.some(a => !a.read)) {
      setTimeout(() => { setBellShaking(true); setTimeout(() => setBellShaking(false), 900); }, 2000);
    }
    return () => clearInterval(interval);
  }, [alerts]);
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
  // Also hide pages for disabled features
  const featurePageMap = { quiz: "quiz", rewards: "rewards", visitors: "visitors", goals: "goals", cells: "annexes", formations: "mentoring" };
  const filteredPages = Object.fromEntries(
    Object.entries(PAGES).filter(([k]) => {
      if (!allowedPages.includes(k)) return false;
      const featKey = Object.entries(featurePageMap).find(([,v]) => v === k)?.[0];
      if (featKey && features?.[featKey] === false) return false;
      return true;
    })
  );
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
    ? () => <SettingsPage seasons={seasons} setSeasons={setSeasons} terminology={terminology} setTerminology={setTerminology} carouselSlides={carouselSlides} setCarouselSlides={setCarouselSlides} churchData={churchData} setChurchData={setChurchData} features={features} setFeatures={setFeatures} />
    : page === "rewards"
    ? () => <RewardsPage achievements={achievements} xp={xp} level={level} />
    : page === "quiz"
    ? () => <QuizPage userRole={userRole} />
    : page === "finances"
    ? () => <FinancesPage userRole={userRole} />
    : page === "cultes"
    ? () => <CultesPage userRole={userRole} />
    : page === "members"
    ? () => <MembersPage userRole={userRole} churchName={churchData.name} setAlerts={setAlerts} />
    : page === "families"
    ? () => <FamiliesPage features={features} />
    : page === "groups"
    ? () => <GroupsPage features={features} />
    : page === "committees"
    ? () => <CommitteesPage features={features} />
    : page === "dashboard"
    ? () => <DashboardPage onNavigate={setPage} carouselSlides={carouselSlides} />
    : PAGES[page]?.component || DashboardPage;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f8fafc 0%, #f0fdfa 50%, #f8fafc 100%)", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body, button, input, select, textarea { font-family: 'DM Sans', system-ui, sans-serif; }
        h1,h2,h3 { font-family: 'DM Sans', system-ui, sans-serif; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        input:focus, select:focus, textarea:focus {
          border-color: #0d9488 !important;
          box-shadow: 0 0 0 3px rgba(13,148,136,0.12) !important;
        }
        @keyframes xpPop {
          0%   { opacity:0; transform:translateY(12px) scale(0.8); }
          40%  { opacity:1; transform:translateY(-14px) scale(1.08); }
          100% { opacity:0; transform:translateY(-34px) scale(0.95); }
        }
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes modalIn {
          from { opacity:0; transform:scale(0.94) translateY(12px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes slideIn {
          from { opacity:0; transform:translateX(-10px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes bellShake {
          0%,100% { transform: rotate(0deg); }
          10%,30%  { transform: rotate(-14deg); }
          20%,40%  { transform: rotate(14deg); }
          50%      { transform: rotate(-8deg); }
          60%      { transform: rotate(8deg); }
          70%      { transform: rotate(-4deg); }
          80%      { transform: rotate(4deg); }
        }
        .bell-shake { animation: bellShake 0.8s ease-in-out; }
        .alert-item { transition: transform 0.25s ease, opacity 0.25s ease; position: relative; overflow: hidden; }
        .alert-item:hover .alert-delete { opacity: 1; }
        .alert-delete { opacity: 0; transition: opacity 0.2s; }
        .nav-btn-item { transition: all 0.18s cubic-bezier(0.4,0,0.2,1); }
        .nav-btn-item:hover { background: rgba(255,255,255,0.09) !important; color: rgba(255,255,255,0.9) !important; }
        .page-content { animation: fadeIn 0.28s ease; }
        @media (max-width: 768px) { .sidebar-desktop { display: none !important; } .main-content { margin-left: 0 !important; } }
        @media (min-width: 769px) { .mobile-header { display: none !important; } }
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
        width: 264, position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50,
        background: "linear-gradient(180deg, #0a3d38 0%, #072e2a 50%, #051f1c 100%)",
        display: "flex", flexDirection: "column",
        boxShadow: "4px 0 32px rgba(0,0,0,0.18), 1px 0 0 rgba(255,255,255,0.04)",
      }}>
        {/* Logo */}
        <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(145deg, #0d9488, #10b981)",
              boxShadow: "0 4px 16px rgba(13,148,136,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}>
              <Church size={21} color="#fff" />
            </div>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontSize: 15, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>
                {churchData.name || "Mon Église"}
              </h1>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", margin: 0, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                {churchData.denomination || "Lumen Church"}
              </p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "14px 10px", overflowY: "auto" }}>
          {Object.entries(filteredPages).map(([key, { label, icon: Icon }]) => {
            const displayLabel = key === "departments" ? terminology.departments : key === "committees" ? terminology.committees : label;
            const active = page === key;
            return (
              <button key={key} onClick={() => setPage(key)}
                className="nav-btn-item"
                style={{
                  display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "10px 13px",
                  borderRadius: 11, border: "none", cursor: "pointer", marginBottom: 2,
                  background: active ? "rgba(13,148,136,0.22)" : "transparent",
                  color: active ? "#5eead4" : "rgba(255,255,255,0.52)",
                  fontWeight: active ? 700 : 500, fontSize: 13,
                  boxShadow: active ? "inset 0 0 0 1px rgba(13,148,136,0.35)" : "none",
                  textAlign: "left",
                }}>
                <Icon size={16} style={{ flexShrink: 0 }} />
                <span>{displayLabel}</span>
                {key === "finances" && <Badge variant="success" style={{ marginLeft: "auto", fontSize: 9, padding: "1px 6px" }}>NEW</Badge>}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "12px 14px 18px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {/* XP Bar */}
          <div style={{
            background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "10px 12px", marginBottom: 12,
            cursor: "pointer", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.2s",
          }} id="xp-btn"
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
            onClick={() => setPage("rewards")}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.8px", textTransform: "uppercase" }}>Niveau {level}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#2dd4bf" }}>{xp} XP</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${xpProgress}%`, height: "100%", background: "linear-gradient(90deg, #0d9488, #10b981, #34d399)", borderRadius: 4, transition: "width 0.6s ease" }} />
            </div>
            <p style={{ margin: "5px 0 0", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Voir mes récompenses →</p>
          </div>
          {/* User row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name="Jean" size={34} color="#0d9488" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Pasteur Jean</p>
              <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.38)", textTransform: "capitalize" }}>{userRole?.replace(/_/g, " ")}</p>
            </div>
            <button onClick={() => setAppState("login")} style={{
              background: "rgba(255,255,255,0.07)", border: "none", borderRadius: 9,
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
            >
              <LogOut size={14} color="rgba(255,255,255,0.45)" />
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
      <div className="main-content" style={{ flex: 1, marginLeft: 264, minHeight: "100vh" }}>
        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "rgba(248,250,252,0.88)",
          backdropFilter: "blur(16px) saturate(180%)",
          borderBottom: "1px solid rgba(226,232,240,0.8)",
          padding: "13px 32px", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>⛪ {churchData.name || "Mon Église"}</span>
            <span style={{ color: "#e2e8f0", fontSize: 16 }}>·</span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.3px" }}>{PAGES[page]?.label || "Tableau de bord"}</h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ position: "relative" }}>
              <div
                className={bellShaking ? "bell-shake" : ""}
                onClick={() => {
                  setShowAlerts(v => {
                    if (!v) {
                      // Mark all as read when opening (like email)
                      setTimeout(() => markAllRead(), 3000);
                    }
                    return !v;
                  });
                }}
                style={{ cursor: "pointer", position: "relative", padding: 6, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Bell size={18} color={unreadAlerts > 0 ? "#0d9488" : "#64748b"} />
                {unreadAlerts > 0 && (
                  <div style={{
                    position: "absolute", top: 1, right: 1, minWidth: 17, height: 17, borderRadius: 9,
                    background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#fff",
                    fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(239,68,68,0.5)", padding: "0 4px",
                  }}>{unreadAlerts}</div>
                )}
              </div>
              {showAlerts && (
                <div style={{
                  position: "absolute", top: "calc(100% + 12px)", right: -100, width: 420, maxHeight: 500,
                  background: "#fff", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
                  border: "1px solid #f1f5f9", overflow: "hidden", zIndex: 100,
                  animation: "fadeIn 0.18s ease",
                }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafbfc" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#0f172a" }}>Alertes</h4>
                      <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>{unreadAlerts > 0 ? `${unreadAlerts} non lue${unreadAlerts > 1 ? "s" : ""}` : "Tout lu"}{alerts.some(a => a.persistent) ? " · ⚠️ Persistantes actives" : ""}</p>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span onClick={markAllRead} style={{ fontSize: 11, color: "#0d9488", cursor: "pointer", fontWeight: 700, padding: "4px 10px", background: "#f0fdfa", borderRadius: 8 }}>Tout lire</span>
                      <span onClick={() => setAlerts(prev => prev.filter(a => a.persistent))} style={{ fontSize: 11, color: "#ef4444", cursor: "pointer", fontWeight: 700, padding: "4px 10px", background: "#fef2f2", borderRadius: 8 }}>Effacer non-persistantes</span>
                    </div>
                  </div>
                  <div style={{ overflowY: "auto", maxHeight: 480 }}>
                    {alerts.length === 0 && (
                      <div style={{ padding: "48px 20px", textAlign: "center", color: "#94a3b8" }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Aucune alerte</p>
                      </div>
                    )}
                    {alerts.map((a, idx) => {
                      const priorityColors = { high: "#ef4444", medium: "#f59e0b", low: "#94a3b8" };
                      const pColor = priorityColors[a.priority] || "#0d9488";
                      const resolved = resolvedAlertMembers[a.id] || new Set();
                      const totalMembers = a.members?.length || 0;
                      const resolvedCount = resolved.size;
                      const allResolved = totalMembers > 0 && resolvedCount >= totalMembers;
                      return (
                        <div key={a.id} className="alert-item" style={{
                          display: "flex", flexDirection: "column",
                          borderBottom: "1px solid #f8fafc",
                          background: a.persistent ? (allResolved ? "#f0fdf4" : "#fff8f0") : (a.read ? "#fff" : "#f0fdfa"),
                          borderLeft: a.persistent ? `3px solid ${pColor}` : `3px solid ${a.read ? "transparent" : pColor}`,
                        }}>
                          <div style={{ display: "flex", alignItems: "stretch" }}>
                            {/* Content */}
                            <div onClick={() => markAlertRead(a.id)} style={{ flex: 1, padding: "13px 14px", cursor: "pointer" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                                <p style={{ margin: 0, fontSize: 13, fontWeight: a.read ? 500 : 700, color: "#0f172a", lineHeight: 1.4 }}>
                                  {a.title}
                                  {a.persistent && <span style={{ marginLeft: 8, fontSize: 10, padding: "2px 7px", background: "#fef3c7", color: "#d97706", borderRadius: 6, fontWeight: 700, verticalAlign: "middle" }}>PERSISTANTE</span>}
                                </p>
                                {!a.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: pColor, flexShrink: 0, marginTop: 3 }} />}
                              </div>
                              <p style={{ margin: "4px 0 2px", fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>{a.desc}</p>
                              {a.persistent && totalMembers > 0 && (
                                <div style={{ marginTop: 4 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                    <div style={{ flex: 1, height: 4, background: "#e2e8f0", borderRadius: 2 }}>
                                      <div style={{ width: `${Math.round((resolvedCount / totalMembers) * 100)}%`, height: "100%", background: "#10b981", borderRadius: 2, transition: "width 0.3s" }} />
                                    </div>
                                    <span style={{ fontSize: 10, color: "#64748b", flexShrink: 0 }}>{resolvedCount}/{totalMembers} traités</span>
                                  </div>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                    {a.members.map(mid => {
                                      const m = MOCK_MEMBERS.find(x => x.id === mid);
                                      if (!m) return null;
                                      const isDone = resolved.has(mid);
                                      return (
                                        <button key={mid} onClick={(e) => { e.stopPropagation(); resolveAlertMember(a.id, mid); }} style={{
                                          padding: "3px 8px", borderRadius: 6, border: "none", cursor: isDone ? "default" : "pointer", fontSize: 10, fontWeight: 600,
                                          background: isDone ? "#dcfce7" : "#fee2e2", color: isDone ? "#16a34a" : "#dc2626",
                                          textDecoration: isDone ? "line-through" : "none", opacity: isDone ? 0.7 : 1
                                        }}>
                                          {isDone ? "✓ " : ""}{m.first_name} {m.last_name}
                                        </button>
                                      );
                                    })}
                                  </div>
                                  {!allResolved && <p style={{ margin: "6px 0 0", fontSize: 10, color: "#f59e0b", fontWeight: 600 }}>⚠️ Cliquez sur chaque nom pour confirmer qu'une action a été effectuée</p>}
                                </div>
                              )}
                              <p style={{ margin: "4px 0 0", fontSize: 10, color: "#cbd5e1" }}>
                                {new Date(a.date).toLocaleDateString("fr")}
                                {a.priority === "high" ? " · 🔴 Urgent" : a.priority === "medium" ? " · 🟡 Moyen" : ""}
                              </p>
                            </div>
                            {/* Delete button — only for non-persistent or all-resolved */}
                            {(!a.persistent || allResolved) && (
                              <button
                                className="alert-delete"
                                onClick={(e) => { e.stopPropagation(); setAlerts(prev => prev.filter(x => x.id !== a.id)); }}
                                style={{
                                  padding: "0 14px", background: "#fef2f2", border: "none", borderLeft: "1px solid #fee2e2",
                                  cursor: "pointer", color: "#ef4444", fontSize: 16, fontWeight: 700,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                }}
                                title="Supprimer"
                              >×</button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div style={{ width: 1, height: 22, background: "#e2e8f0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", padding: "4px 8px", borderRadius: 10, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f1f5f9"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <Avatar name="Jean" size={30} color="#0d9488" />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Pasteur Jean</span>
              <ChevronDown size={13} color="#94a3b8" />
            </div>
          </div>
        </div>
        {/* Offline indicator */}
        {(() => {
          const [isOnline, setIsOnline] = useState(navigator.onLine);
          useEffect(() => {
            const on = () => setIsOnline(true);
            const off = () => setIsOnline(false);
            window.addEventListener("online", on);
            window.addEventListener("offline", off);
            return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
          }, []);
          return !isOnline ? (
            <div style={{ margin: "10px 32px 0", padding: "10px 16px", background: "#fef3c7", borderRadius: 10, display: "flex", alignItems: "center", gap: 10, border: "1px solid #fde68a" }}>
              <span style={{ fontSize: 18 }}>📡</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#92400e" }}>Mode hors-ligne actif</p>
                <p style={{ margin: 0, fontSize: 11, color: "#a16207" }}>Vos données sont sauvegardées localement et se synchroniseront automatiquement quand la connexion revient.</p>
              </div>
            </div>
          ) : null;
        })()}

        {/* PWA Install Banner */}
        {showInstallBanner && (
          <div style={{ margin: "16px 32px 0", padding: "14px 20px", background: "linear-gradient(135deg, #0d9488, #10b981)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 15px rgba(13,148,136,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>📱</span>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>Installer Lumen Church</p>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Fonctionne hors-ligne · Accès depuis l'écran d'accueil · Aucun App Store requis</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowInstallBanner(false)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Plus tard</button>
              <button onClick={() => { if (installPrompt) { installPrompt.prompt(); installPrompt.userChoice.then(() => setShowInstallBanner(false)); } }} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#fff", color: "#0d9488", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📲 Installer</button>
            </div>
          </div>
        )}

        {/* Page content */}
        <div style={{ padding: "28px 32px" }} className="page-content">
          <CurrentPage onNavigate={setPage} userRole={userRole} />
        </div>
      </div>
    </div>
  );
}
