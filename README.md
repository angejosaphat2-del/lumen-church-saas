# ⛪ Lumen Church — SaaS de Gestion d'Églises

Plateforme complète de gestion d'église avec tableau de bord, gestion des membres, visiteurs, finances, agenda avec calendrier, départements, cultes et paramètres.

![Lumen Church](https://img.shields.io/badge/Lumen-Church-0d9488?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

L'application s'ouvre automatiquement sur **http://localhost:3000**

### Build de production

```bash
npm run build
npm run preview
```

---

## 📦 Fonctionnalités

| Module | Description |
|--------|-------------|
| **Tableau de bord** | KPIs, graphiques de croissance, finances, événements à venir, anniversaires |
| **Membres** | CRUD complet, recherche, filtres par statut, tableau détaillé |
| **Visiteurs** | Cartes visuelles, suivi de conversion, sources d'acquisition |
| **Finances** | Entrées/sorties, catégories (dîmes, offrandes, dons...), graphiques, répartition |
| **Agenda** | 📅 Calendrier mensuel interactif + vue liste, création par double-clic |
| **Départements** | Vue en grille, responsables, effectifs par département |
| **Cultes** | Historique des services, présences, offrandes, thèmes |
| **Paramètres** | Configuration église, abonnement, sécurité |

---

## 🗓️ Calendrier interactif

Le module Agenda inclut un calendrier complet :

- **Navigation mensuelle** avec boutons précédent/suivant
- **Aujourd'hui** mis en surbrillance automatiquement
- **Événements colorés** par type (culte, prière, étude, répétition, événement)
- **Clic simple** → voir les événements du jour dans le panneau latéral
- **Double-clic** → créer un événement directement sur ce jour
- **Panneau latéral** avec détails, modification, suppression
- **Résumé mensuel** par type d'événement
- **Basculer** entre vue Calendrier et vue Liste

---

## 🔑 Connexion

L'application démarre sur une page de login. Identifiants de démo :

- **Email** : `pasteur@eglise.com`
- **Mot de passe** : `admin123`

(Cliquez simplement sur "Se connecter")

---

## 🛠️ Stack technique

- **React 18** — UI composants
- **Vite 5** — Build tool ultra-rapide
- **Recharts** — Graphiques (AreaChart, BarChart, PieChart)
- **Lucide React** — Icônes
- **DM Sans** — Typographie (Google Fonts)

---

## 📁 Structure du projet

```
lumen-saas/
├── index.html            # Point d'entrée HTML
├── package.json          # Dépendances et scripts
├── vite.config.js        # Configuration Vite
├── public/
│   └── favicon.svg       # Icône de l'app
└── src/
    ├── main.jsx          # Montage React
    ├── index.css         # Styles globaux
    └── App.jsx           # Application complète
```

---

## 🎨 Rôles supportés

| Rôle | Accès |
|------|-------|
| Super Admin | Plateforme complète |
| Pasteur | Toutes les fonctionnalités église |
| Administrateur | Gestion complète |
| Trésorier | Finances |
| Secrétaire | Membres, agenda |
| Responsable département | Son département |
| Membre | Accès limité |

---

## 📄 Licence

Projet privé — Tous droits réservés.

---

Fait avec ❤️ pour les églises d'Afrique et du monde.
