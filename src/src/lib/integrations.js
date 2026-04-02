// ═══════════════════════════════════════════════════════
// Lumen Church — Intégrations : CinetPay + WhatsApp
// ═══════════════════════════════════════════════════════
// Copier ce fichier dans : src/lib/integrations.js

// ──────────────────────────────────────────
// 1. CINETPAY — Paiement Mobile Money CI
// ──────────────────────────────────────────
const CINETPAY_SITE_ID = import.meta.env.VITE_CINETPAY_SITE_ID;
const CINETPAY_API_KEY = import.meta.env.VITE_CINETPAY_API_KEY;

/**
 * Initialiser un paiement CinetPay
 * @param {object} params
 * @param {number}  params.amount       - Montant en FCFA
 * @param {string}  params.description  - Description du paiement
 * @param {string}  params.customerName - Nom du client
 * @param {string}  params.customerPhone - Téléphone du client
 * @param {string}  params.planName     - Nom du plan choisi
 * @returns {Promise<{paymentUrl: string, transactionId: string}>}
 */
export async function initCinetPayPayment({
  amount,
  description,
  customerName,
  customerPhone,
  planName,
}) {
  const transactionId = `LC-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  const payload = {
    apikey: CINETPAY_API_KEY,
    site_id: CINETPAY_SITE_ID,
    transaction_id: transactionId,
    amount,
    currency: "XOF",         // FCFA
    description,
    customer_name: customerName,
    customer_phone_number: customerPhone,
    customer_email: "",
    notify_url: `${window.location.origin}/.netlify/functions/cinetpay-webhook`,
    return_url: `${window.location.origin}?payment=success&plan=${planName}`,
    channels: "ALL",          // Orange, MTN, Wave, Moov, carte
    lang: "fr",
    metadata: JSON.stringify({ plan: planName, church: "lumen" }),
  };

  const res = await fetch("https://api-checkout.cinetpay.com/v2/payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (data.code !== "201") {
    throw new Error(data.message || "Erreur CinetPay");
  }

  return {
    paymentUrl: data.data.payment_url,
    transactionId,
  };
}

/**
 * Vérifier le statut d'une transaction
 */
export async function checkCinetPayStatus(transactionId) {
  const res = await fetch("https://api-checkout.cinetpay.com/v2/payment/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: CINETPAY_API_KEY,
      site_id: CINETPAY_SITE_ID,
      transaction_id: transactionId,
    }),
  });
  const data = await res.json();
  return data.data?.status; // "ACCEPTED" | "REFUSED" | "PENDING"
}


// ──────────────────────────────────────────
// 2. WHATSAPP — Notifications automatiques
// ──────────────────────────────────────────
const WA_SUPPORT = "2250700000000"; // Numéro support Lumen Church

/**
 * Ouvrir WhatsApp avec un message pré-rempli
 */
export function openWhatsApp(phone, message) {
  const cleaned = phone?.replace(/\D/g, "") || WA_SUPPORT;
  const url = `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/**
 * Templates de messages WhatsApp
 */
export const WA_TEMPLATES = {

  // Absent au culte
  absenceAlert: (member, culteDate) =>
    `🙏 Bonjour ${member.first_name},\n\n` +
    `Nous avons remarqué votre absence au culte du ${new Date(culteDate).toLocaleDateString("fr")}.\n\n` +
    `Vous êtes dans nos prières. N'hésitez pas à nous contacter si vous traversez quelque chose.\n\n` +
    `Que Dieu vous bénisse 🙏\n` +
    `— L'équipe de ${member.church || "l'église"}`,

  // Anniversaire
  birthday: (member) =>
    `🎂 Joyeux anniversaire ${member.first_name} !\n\n` +
    `Toute l'église vous souhaite une merveilleuse journée bénie par le Seigneur.\n\n` +
    `Que cette nouvelle année soit remplie de sa grâce et de sa faveur ! 🎉`,

  // Rappel culte
  culteReminder: (culte) =>
    `📅 Rappel — Culte demain\n\n` +
    `*${culte.type}* — ${new Date(culte.date).toLocaleDateString("fr", { weekday: "long", day: "numeric", month: "long" })}\n` +
    `⏰ ${culte.time || "09h00"}\n` +
    `📍 ${culte.location || "Temple principal"}\n\n` +
    `Thème : _${culte.theme || "À confirmer"}_\n\n` +
    `Nous vous attendons avec joie ! 🙏`,

  // Confirmation paiement
  paymentConfirm: (plan, amount, transactionId) =>
    `✅ *Paiement confirmé — Lumen Church*\n\n` +
    `Plan : *${plan}*\n` +
    `Montant : *${amount.toLocaleString()} F CFA*\n` +
    `Réf. : \`${transactionId}\`\n\n` +
    `Votre accès est actif. Bonne gestion ! 🙏\n` +
    `Support : wa.me/${WA_SUPPORT}`,

  // Bienvenue nouveau membre
  welcomeMember: (member) =>
    `👋 Bienvenue ${member.first_name} !\n\n` +
    `Vous avez été ajouté(e) dans le système de gestion de l'église.\n\n` +
    `Vos informations sont sécurisées et ne sont utilisées que pour la gestion interne.\n\n` +
    `Que Dieu vous bénisse 🙏`,

  // Nouveau visiteur — responsable de zone
  newVisitorAlert: (visitor, responsable) =>
    `👤 *Nouveau visiteur — ${visitor.first_name} ${visitor.last_name}*\n\n` +
    `Zone : ${visitor.zone}\n` +
    `Téléphone : ${visitor.phone}\n` +
    `Source : ${visitor.source}\n\n` +
    `${responsable}, pouvez-vous assurer le suivi ? Merci 🙏`,
};

/**
 * Envoyer une notification WhatsApp à un membre
 * (ouvre WhatsApp — pour automatisation complète, utiliser l'API WhatsApp Business)
 */
export function notifyMember(member, templateFn, ...args) {
  if (!member.phone) return;
  const message = templateFn(member, ...args);
  openWhatsApp(member.phone, message);
}


// ──────────────────────────────────────────
// 3. USAGE DANS L'APP
// ──────────────────────────────────────────
/*

// Exemple 1 — Paiement CinetPay
import { initCinetPayPayment } from './lib/integrations';

const handlePay = async (plan) => {
  const { paymentUrl } = await initCinetPayPayment({
    amount: plan.monthly,
    description: `Abonnement Lumen Church — Plan ${plan.name}`,
    customerName: churchData.pasteur,
    customerPhone: "+225 07 00 00 00",
    planName: plan.name,
  });
  window.location.href = paymentUrl; // Redirection vers page CinetPay
};


// Exemple 2 — Notification absence
import { notifyMember, WA_TEMPLATES } from './lib/integrations';

const alertAbsentMember = (member, culteDate) => {
  notifyMember(member, WA_TEMPLATES.absenceAlert, culteDate);
};


// Exemple 3 — Rappel anniversaire (dans le job quotidien)
const todayBirthdays = members.filter(m =>
  m.birthday_day === today.getDate() &&
  m.birthday_month === today.getMonth() + 1
);
todayBirthdays.forEach(m => notifyMember(m, WA_TEMPLATES.birthday));

*/
