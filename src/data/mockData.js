// ═══════════════════════════════════════════════════════
// MOCK DATA — Lumen Church SaaS
// ═══════════════════════════════════════════════════════

export const MOCK_MEMBERS = [
  { id: 1, first_name: "Jean", last_name: "Kouadio", gender: "M", phone: "+225 07 08 09 10", email: "jean.k@email.com", status: "actif", role: "pasteur", department: "Direction", department_id: 0, family_id: 1, group_id: 1, cell_id: 1, join_date: "2020-01-15", photo: null, birthday_day: 15, birthday_month: 3, address: "Cocody, Abidjan", notes: "Pasteur principal" },
  { id: 2, first_name: "Marie", last_name: "Bamba", gender: "F", phone: "+225 05 12 34 56", email: "marie.b@email.com", status: "actif", role: "tresorier", department: "Finances", department_id: 0, family_id: 1, group_id: 1, cell_id: 1, join_date: "2021-03-20", photo: null, birthday_day: 8, birthday_month: 7, address: "Plateau, Abidjan", notes: "" },
  { id: 3, first_name: "Paul", last_name: "Yao", gender: "M", phone: "+225 01 23 45 67", email: "paul.y@email.com", status: "actif", role: "membre", department: "Louange & Adoration", department_id: 1, family_id: 2, group_id: 2, cell_id: 2, join_date: "2022-06-10", photo: null, birthday_day: 22, birthday_month: 11, address: "Yopougon, Abidjan", notes: "" },
  { id: 4, first_name: "Esther", last_name: "Koné", gender: "F", phone: "+225 07 98 76 54", email: "esther.k@email.com", status: "actif", role: "secretaire", department: "Administration", department_id: 0, family_id: 2, group_id: 1, cell_id: 1, join_date: "2021-09-05", photo: null, birthday_day: 3, birthday_month: 1, address: "Marcory, Abidjan", notes: "" },
  { id: 5, first_name: "David", last_name: "Tra", gender: "M", phone: "+225 05 55 66 77", email: "david.t@email.com", status: "inactif", role: "membre", department: "Jeunesse", department_id: 3, family_id: 3, group_id: 3, cell_id: 2, join_date: "2023-01-12", photo: null, birthday_day: 19, birthday_month: 5, address: "Treichville, Abidjan", notes: "" },
  { id: 6, first_name: "Ruth", last_name: "Diallo", gender: "F", phone: "+225 01 44 55 66", email: "ruth.d@email.com", status: "actif", role: "membre", department: "Enfants", department_id: 4, family_id: 3, group_id: 2, cell_id: 3, join_date: "2022-11-30", photo: null, birthday_day: 28, birthday_month: 9, address: "Abobo, Abidjan", notes: "" },
  { id: 7, first_name: "Samuel", last_name: "Ouattara", gender: "M", phone: "+225 07 11 22 33", email: "samuel.o@email.com", status: "actif", role: "responsable_dept", department: "Intercession", department_id: 2, family_id: 4, group_id: 3, cell_id: 3, join_date: "2020-08-18", photo: null, birthday_day: 12, birthday_month: 4, address: "Cocody, Abidjan", notes: "" },
  { id: 8, first_name: "Grace", last_name: "Achi", gender: "F", phone: "+225 05 99 88 77", email: "grace.a@email.com", status: "actif", role: "membre", department: "Accueil & Protocole", department_id: 5, family_id: 4, group_id: 2, cell_id: 1, join_date: "2023-04-22", photo: null, birthday_day: 7, birthday_month: 12, address: "Adjamé, Abidjan", notes: "" },
  { id: 9, first_name: "Daniel", last_name: "Konan", gender: "M", phone: "+225 07 33 44 55", email: "daniel.k@email.com", status: "actif", role: "membre", department: "Louange & Adoration", department_id: 1, family_id: 5, group_id: 1, cell_id: 2, join_date: "2021-05-14", photo: null, birthday_day: 1, birthday_month: 6, address: "Cocody, Abidjan", notes: "Guitariste" },
  { id: 10, first_name: "Priscille", last_name: "Aka", gender: "F", phone: "+225 05 22 33 44", email: "priscille.a@email.com", status: "actif", role: "membre", department: "Intercession", department_id: 2, family_id: 5, group_id: 3, cell_id: 3, join_date: "2021-05-14", photo: null, birthday_day: 18, birthday_month: 2, address: "Cocody, Abidjan", notes: "" },
  { id: 11, first_name: "Moïse", last_name: "Dembélé", gender: "M", phone: "+225 01 77 88 99", email: "moise.d@email.com", status: "actif", role: "agent_service_ordre", department: "Service d'Ordre", department_id: 0, family_id: null, group_id: 1, cell_id: 1, join_date: "2022-02-08", photo: null, birthday_day: 25, birthday_month: 8, address: "Yopougon, Abidjan", notes: "" },
  { id: 12, first_name: "Sarah", last_name: "Touré", gender: "F", phone: "+225 07 66 55 44", email: "sarah.t@email.com", status: "nouveau", role: "membre", department: "Enfants", department_id: 4, family_id: null, group_id: 2, cell_id: 2, join_date: "2026-02-20", photo: null, birthday_day: 10, birthday_month: 10, address: "Marcory, Abidjan", notes: "Nouvelle convertie" },
];

export const MOCK_VISITORS = [
  { id: 1, first_name: "Adama", last_name: "Sanogo", phone: "+225 07 00 11 22", email: "", visit_date: "2026-03-16", source: "Invitation", status: "nouveau", notes: "Intéressé par le groupe de prière", follow_ups: [] },
  { id: 2, first_name: "Fatou", last_name: "Coulibaly", phone: "+225 05 33 44 55", email: "fatou.c@email.com", visit_date: "2026-03-09", source: "En ligne", status: "suivi", notes: "Souhaite rejoindre le département louange", follow_ups: [{ date: "2026-03-12", note: "Appelée, très intéressée", by: "Esther Koné" }] },
  { id: 3, first_name: "Ibrahim", last_name: "Touré", phone: "+225 01 66 77 88", email: "", visit_date: "2026-03-02", source: "Voisinage", status: "converti", notes: "A accepté Christ le 02/03", follow_ups: [{ date: "2026-03-03", note: "Prière d'acceptation", by: "Pasteur Kouadio" }, { date: "2026-03-10", note: "Inscrit au cours de base", by: "Marie Bamba" }] },
  { id: 4, first_name: "Aminata", last_name: "Koné", phone: "+225 05 11 22 33", email: "aminata.k@email.com", visit_date: "2026-02-23", source: "Croisade", status: "suivi", notes: "Venue lors de la croisade de février", follow_ups: [{ date: "2026-02-28", note: "Visite à domicile effectuée", by: "Samuel Ouattara" }] },
];

export const MOCK_FINANCES = [
  { id: 1, type: "entree", category: "dimes", amount: 250000, date: "2026-03-17", description: "Dîmes dimanche", method: "especes", member_name: "" },
  { id: 2, type: "entree", category: "offrandes_culte", amount: 180000, date: "2026-03-17", description: "Offrandes du culte", method: "mobile_money", member_name: "" },
  { id: 3, type: "sortie", category: "loyer", amount: 350000, date: "2026-03-15", description: "Loyer mensuel mars", method: "virement", member_name: "" },
  { id: 4, type: "entree", category: "dons", amount: 500000, date: "2026-03-10", description: "Don spécial construction", method: "virement", member_name: "Daniel Konan" },
  { id: 5, type: "sortie", category: "electricite_eau", amount: 45000, date: "2026-03-12", description: "Facture électricité", method: "mobile_money", member_name: "" },
  { id: 6, type: "entree", category: "dimes", amount: 310000, date: "2026-03-10", description: "Dîmes dimanche", method: "especes", member_name: "" },
  { id: 7, type: "sortie", category: "equipements", amount: 120000, date: "2026-03-08", description: "Achat microphones", method: "especes", member_name: "" },
  { id: 8, type: "entree", category: "offrandes_speciales", amount: 750000, date: "2026-03-03", description: "Offrande de bâtir", method: "especes", member_name: "" },
  { id: 9, type: "sortie", category: "salaires", amount: 200000, date: "2026-03-01", description: "Salaire gardien", method: "virement", member_name: "" },
  { id: 10, type: "entree", category: "contributions_membres", amount: 150000, date: "2026-03-05", description: "Cotisation annuelle", method: "mobile_money", member_name: "" },
  { id: 11, type: "sortie", category: "oeuvres_sociales", amount: 75000, date: "2026-03-07", description: "Aide famille Touré", method: "especes", member_name: "" },
  { id: 12, type: "sortie", category: "transport", amount: 35000, date: "2026-03-14", description: "Transport mission Bouaké", method: "especes", member_name: "" },
];

export const MOCK_EVENTS = [
  { id: 1, title: "Culte du dimanche", date: "2026-03-22", time: "09:00", type: "culte", location: "Temple principal", description: "Service dominical avec Sainte Cène" },
  { id: 2, title: "Réunion de prière", date: "2026-03-25", time: "18:30", type: "priere", location: "Salle annexe", description: "" },
  { id: 3, title: "Étude biblique", date: "2026-03-26", time: "19:00", type: "etude", location: "Temple principal", description: "Série sur les Épîtres de Paul" },
  { id: 4, title: "Répétition chorale", date: "2026-03-27", time: "17:00", type: "repetition", location: "Salle de musique", description: "" },
  { id: 5, title: "Jeûne et prière", date: "2026-03-28", time: "06:00", type: "priere", location: "Temple principal", description: "Jeûne de 3 jours" },
  { id: 6, title: "Conférence de Pâques", date: "2026-04-05", time: "09:00", type: "evenement", location: "Temple principal", description: "Conférence spéciale avec invité" },
  { id: 7, title: "Culte du dimanche", date: "2026-03-29", time: "09:00", type: "culte", location: "Temple principal", description: "" },
  { id: 8, title: "Veillée de louange", date: "2026-04-04", time: "21:00", type: "evenement", location: "Temple principal", description: "Nuit de louange et adoration" },
];

export const MOCK_DEPARTMENTS = [
  { id: 1, name: "Louange & Adoration", description: "Ministère de la musique et du chant", members_count: 24, leader: "Paul Yao", leader_id: 3, color: "#8b5cf6" },
  { id: 2, name: "Intercession", description: "Prière et intercession pour l'église", members_count: 18, leader: "Samuel Ouattara", leader_id: 7, color: "#3b82f6" },
  { id: 3, name: "Jeunesse", description: "Encadrement des jeunes de 15-30 ans", members_count: 35, leader: "David Tra", leader_id: 5, color: "#f59e0b" },
  { id: 4, name: "Enfants", description: "École du dimanche et activités enfants", members_count: 28, leader: "Ruth Diallo", leader_id: 6, color: "#ec4899" },
  { id: 5, name: "Accueil & Protocole", description: "Accueil des fidèles et protocole", members_count: 15, leader: "Grace Achi", leader_id: 8, color: "#10b981" },
  { id: 6, name: "Diaconie", description: "Œuvres sociales et entraide", members_count: 12, leader: "Esther Koné", leader_id: 4, color: "#ef4444" },
];

export const MOCK_FAMILIES = [
  { id: 1, name: "Famille Kouadio", description: "Famille pastorale", members: [1, 2] },
  { id: 2, name: "Famille Yao-Koné", description: "", members: [3, 4] },
  { id: 3, name: "Famille Tra-Diallo", description: "", members: [5, 6] },
  { id: 4, name: "Famille Ouattara-Achi", description: "", members: [7, 8] },
  { id: 5, name: "Famille Konan-Aka", description: "", members: [9, 10] },
];

export const MOCK_GROUPS = [
  { id: 1, name: "Groupe Alpha", description: "Groupe de croissance spirituelle", day: "Mercredi", time: "19:00", leader: "Jean Kouadio", members_count: 15 },
  { id: 2, name: "Groupe Béthel", description: "Groupe de prière et partage", day: "Jeudi", time: "18:30", leader: "Marie Bamba", members_count: 12 },
  { id: 3, name: "Groupe Cana", description: "Groupe de couples", day: "Vendredi", time: "19:00", leader: "Samuel Ouattara", members_count: 18 },
];

export const MOCK_CELLS = [
  { id: 1, name: "Cellule Cocody", address: "Cocody, Angré", leader: "Jean Kouadio", leader_id: 1, members_count: 25, lat: 5.359, lng: -3.987 },
  { id: 2, name: "Cellule Yopougon", address: "Yopougon, Selmer", leader: "Paul Yao", leader_id: 3, members_count: 20, lat: 5.339, lng: -4.067 },
  { id: 3, name: "Cellule Marcory", address: "Marcory, Zone 4", leader: "Samuel Ouattara", leader_id: 7, members_count: 18, lat: 5.306, lng: -3.982 },
];

export const MOCK_COMMITTEES = [
  { id: 1, name: "Comité d'organisation", description: "Organisation des événements", type: "comite", leader: "Esther Koné", members_count: 8 },
  { id: 2, name: "Service d'ordre", description: "Sécurité et ordre pendant les cultes", type: "service_ordre", leader: "Moïse Dembélé", members_count: 10 },
  { id: 3, name: "Équipe média", description: "Sonorisation, vidéo, réseaux sociaux", type: "media", leader: "Daniel Konan", members_count: 6 },
  { id: 4, name: "Secrétariat", description: "Administration et documentation", type: "secretariat", leader: "Esther Koné", members_count: 4 },
];

export const MOCK_TESTIMONIALS = [
  { id: 1, title: "Guérison miraculeuse", content: "Après 3 ans de maladie, Dieu m'a guéri lors de la veillée de prière du mois dernier. Je rends gloire à Dieu pour sa fidélité.", author: "Grace Achi", author_id: 8, date: "2026-03-15", category: "guerison" },
  { id: 2, title: "Emploi retrouvé", content: "Après 8 mois de chômage et beaucoup de prières, j'ai obtenu un emploi dans une grande entreprise. Dieu est fidèle !", author: "David Tra", author_id: 5, date: "2026-03-10", category: "provision" },
  { id: 3, title: "Réconciliation familiale", content: "Ma famille était divisée depuis 5 ans. Grâce aux prières de l'église, nous nous sommes réconciliés.", author: "Ruth Diallo", author_id: 6, date: "2026-02-28", category: "famille" },
];

export const MOCK_GOALS = [
  { id: 1, title: "300 membres actifs", description: "Atteindre 300 membres actifs d'ici fin 2026", goal_type: "members", target_value: 300, current_value: 240, start_date: "2026-01-01", end_date: "2026-12-31", is_active: true },
  { id: 2, title: "Budget annuel 15M", description: "Collecter 15 millions de FCFA en 2026", goal_type: "finances", target_value: 15000000, current_value: 5200000, start_date: "2026-01-01", end_date: "2026-12-31", is_active: true },
  { id: 3, title: "5 nouvelles cellules", description: "Ouvrir 5 nouvelles cellules de maison", goal_type: "cells", target_value: 5, current_value: 2, start_date: "2026-01-01", end_date: "2026-12-31", is_active: true },
  { id: 4, title: "Taux de présence 85%", description: "Atteindre un taux de présence moyen de 85% aux cultes", goal_type: "attendance", target_value: 85, current_value: 78, start_date: "2026-01-01", end_date: "2026-12-31", is_active: true },
];

export const MOCK_MENTORSHIPS = [
  { id: 1, mentor_id: 1, mentor_name: "Jean Kouadio", mentee_id: 5, mentee_name: "David Tra", status: "actif", start_date: "2026-01-15", topic: "Leadership chrétien", sessions: 8, notes: "Progression encourageante" },
  { id: 2, mentor_id: 2, mentor_name: "Marie Bamba", mentee_id: 12, mentee_name: "Sarah Touré", status: "actif", start_date: "2026-02-20", topic: "Bases de la foi", sessions: 4, notes: "Nouvelle convertie, très motivée" },
  { id: 3, mentor_id: 7, mentor_name: "Samuel Ouattara", mentee_id: 3, mentee_name: "Paul Yao", status: "termine", start_date: "2025-06-01", topic: "Ministère de louange", sessions: 20, notes: "Parcours complété avec succès" },
];

export const MOCK_CULTES = [
  { id: 1, date: "2026-03-22", type: "Culte dominical", presences: 215, offrande: 180000, dimes: 250000, theme: "La foi qui déplace les montagnes", predicateur: "Pasteur Kouadio", notes: "" },
  { id: 2, date: "2026-03-15", type: "Culte dominical", presences: 198, offrande: 165000, dimes: 220000, theme: "Marcher dans la lumière", predicateur: "Pasteur Kouadio", notes: "" },
  { id: 3, date: "2026-03-08", type: "Culte dominical", presences: 223, offrande: 210000, dimes: 280000, theme: "L'amour inconditionnel", predicateur: "Pasteur assistant Bamba", notes: "Culte spécial femmes" },
  { id: 4, date: "2026-03-01", type: "Culte dominical", presences: 189, offrande: 145000, dimes: 195000, theme: "Renouveau spirituel", predicateur: "Pasteur Kouadio", notes: "" },
];

export const MOCK_QUIZ = [
  { id: 1, title: "Les patriarches de la Bible", category: "Ancien Testament", difficulty: "facile", questions_count: 10, plays: 45, avg_score: 72 },
  { id: 2, title: "Les miracles de Jésus", category: "Nouveau Testament", difficulty: "moyen", questions_count: 15, plays: 38, avg_score: 65 },
  { id: 3, title: "Les épîtres de Paul", category: "Nouveau Testament", difficulty: "difficile", questions_count: 20, plays: 22, avg_score: 58 },
];

// Utility constants
export const MONTHS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
export const MONTHS_FULL = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
export const DAYS_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export const ROLE_LABELS = {
  super_admin: "Super Admin",
  pasteur: "Pasteur",
  pasteur_assistant: "Pasteur Assistant",
  admin: "Administrateur",
  tresorier: "Trésorier",
  secretaire: "Secrétaire",
  quiz_manager: "Gestionnaire Quiz",
  agent_service_ordre: "Agent Service d'Ordre",
  agent_media: "Agent Média",
  responsable_dept: "Responsable Département",
  responsable_cellule: "Responsable Cellule",
  membre: "Membre",
};

export const CATEGORY_LABELS = {
  dimes: "Dîmes", offrandes_culte: "Offrandes culte", offrandes_speciales: "Offrandes spéciales",
  dons: "Dons", contributions_membres: "Contributions", quete: "Quête",
  loyer: "Loyer", electricite_eau: "Électricité/Eau", salaires: "Salaires",
  equipements: "Équipements", transport: "Transport", entretien: "Entretien",
  fournitures: "Fournitures", oeuvres_sociales: "Œuvres sociales",
  aide_membres: "Aide membres", evenements_depenses: "Événements",
  communication: "Communication", missions: "Missions",
  autres_entrees: "Autres entrées", autres_depenses: "Autres dépenses",
};
