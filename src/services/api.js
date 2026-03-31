// src/services/api.js
// Service API pour connecter le frontend au backend FastAPI

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';

// Token management
let authToken = localStorage.getItem('lumen_token');

export const setToken = (token) => {
  authToken = token;
  if (token) localStorage.setItem('lumen_token', token);
  else localStorage.removeItem('lumen_token');
};

export const getToken = () => authToken;

// Base fetch with auth
const apiFetch = async (endpoint, options = {}) => {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
  
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  
  if (res.status === 401) {
    setToken(null);
    window.location.reload();
    throw new Error('Session expirée');
  }
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Erreur serveur' }));
    throw new Error(error.detail || `Erreur ${res.status}`);
  }
  
  return res.json();
};

// ═══ AUTH ═══
export const auth = {
  login: (email, password) => apiFetch('/auth/login', {
    method: 'POST', body: JSON.stringify({ email, password })
  }),
  me: () => apiFetch('/auth/me'),
  register: (data) => apiFetch('/auth/register', {
    method: 'POST', body: JSON.stringify(data)
  }),
};

// ═══ MEMBERS ═══
export const members = {
  list: (params = '') => apiFetch(`/members${params ? '?' + params : ''}`),
  get: (id) => apiFetch(`/members/${id}`),
  create: (data) => apiFetch('/members', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/members/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/members/${id}`, { method: 'DELETE' }),
};

// ═══ VISITORS ═══
export const visitors = {
  list: () => apiFetch('/visitors'),
  get: (id) => apiFetch(`/visitors/${id}`),
  create: (data) => apiFetch('/visitors', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/visitors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  followup: (id, data) => apiFetch(`/visitors/${id}/followups`, { method: 'POST', body: JSON.stringify(data) }),
};

// ═══ FINANCES ═══
export const finances = {
  list: (params = '') => apiFetch(`/transactions${params ? '?' + params : ''}`),
  summary: () => apiFetch('/transactions/summary'),
  create: (data) => apiFetch('/transactions', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/transactions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/transactions/${id}`, { method: 'DELETE' }),
};

// ═══ EVENTS ═══
export const events = {
  list: () => apiFetch('/events'),
  create: (data) => apiFetch('/events', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/events/${id}`, { method: 'DELETE' }),
};

// ═══ DEPARTMENTS ═══
export const departments = {
  list: () => apiFetch('/departments'),
  create: (data) => apiFetch('/departments', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/departments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/departments/${id}`, { method: 'DELETE' }),
};

// ═══ COMMITTEES ═══
export const committees = {
  list: () => apiFetch('/committees'),
  create: (data) => apiFetch('/committees', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/committees/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/committees/${id}`, { method: 'DELETE' }),
};

// ═══ ANNEXES / STRUCTURE ═══
export const annexes = {
  list: () => apiFetch('/annexes'),
  create: (data) => apiFetch('/annexes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/annexes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/annexes/${id}`, { method: 'DELETE' }),
  levels: () => apiFetch('/structure-levels'),
  createLevel: (data) => apiFetch('/structure-levels', { method: 'POST', body: JSON.stringify(data) }),
};

// ═══ QUIZ ═══
export const quiz = {
  questions: () => apiFetch('/quiz/questions'),
  create: (data) => apiFetch('/quiz/questions', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/quiz/questions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/quiz/questions/${id}`, { method: 'DELETE' }),
  respond: (data) => apiFetch('/quiz/respond', { method: 'POST', body: JSON.stringify(data) }),
};

// ═══ GOALS ═══
export const goals = {
  list: () => apiFetch('/goals'),
  summary: () => apiFetch('/goals/active/summary'),
  create: (data) => apiFetch('/goals', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/goals/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/goals/${id}`, { method: 'DELETE' }),
};

// ═══ ALERTS ═══
export const alerts = {
  list: () => apiFetch('/alerts'),
  create: (data) => apiFetch('/alerts', { method: 'POST', body: JSON.stringify(data) }),
  markRead: (id) => apiFetch(`/alerts/${id}/read`, { method: 'PUT' }),
  markAllRead: () => apiFetch('/alerts/read-all', { method: 'PUT' }),
};

// ═══ MENTORSHIP ═══
export const mentorship = {
  list: () => apiFetch('/mentorship-journeys'),
  get: (id) => apiFetch(`/mentorship-journeys/${id}`),
  create: (data) => apiFetch('/mentorship-journeys', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/mentorship-journeys/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/mentorship-journeys/${id}`, { method: 'DELETE' }),
};

// ═══ ATTENDANCE ═══
export const attendance = {
  list: () => apiFetch('/attendances'),
  create: (data) => apiFetch('/attendances', { method: 'POST', body: JSON.stringify(data) }),
  member: (id) => apiFetch(`/attendance/member/${id}`),
};

// ═══ DASHBOARD ═══
export const dashboard = {
  stats: () => apiFetch('/dashboard/stats'),
  distribution: () => apiFetch('/dashboard/member-distribution'),
};

// ═══ WAVE PAYMENTS ═══
export const wave = {
  status: () => apiFetch('/wave/status'),
  createPayment: (data) => apiFetch('/wave/payments', { method: 'POST', body: JSON.stringify(data) }),
  payments: () => apiFetch('/wave/payments'),
};

// ═══ HEALTH CHECK ═══
export const health = () => apiFetch('/health');

export default {
  auth, members, visitors, finances, events, departments,
  committees, annexes, quiz, goals, alerts, mentorship,
  attendance, dashboard, wave, health
};
