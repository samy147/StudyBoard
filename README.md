# StudyBoard - Kanban PWA pour la Révision

Une application Kanban progressive (PWA) construite avec React + Vite pour organiser vos sessions de révision par matière, difficulté, CM et échéance.

## Table des matières

- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Lancement](#lancement)
  - [Frontend React (Vite)](#frontend-react-vite)
  - [Backend Node/Express](#backend-nodeexpress)
  - [Mode MSW (Mock API)](#mode-msw-mock-api)
- [Tests](#tests)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)

---

## Structure du projet

```
pwa-studyboard/
├── frontend/                   # Application React (SPA)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board.jsx      # Composant principal (Kanban)
│   │   │   ├── Column.jsx     # Colonne (À faire, En cours, Terminé)
│   │   │   ├── Card.jsx       # Carte de session
│   │   │   ├── AddSessionForm.jsx  # Formulaire d'ajout
│   │   │   └── StatsPanel.jsx # Statistiques et progression
│   │   ├── mocks/
│   │   │   ├── mockSessions.js  # Données de démonstration
│   │   │   └── msw/
│   │   │       ├── handlers.js  # Handlers MSW (GET/POST/PATCH/DELETE)
│   │   │       ├── browser.js   # Setup MSW navigateur
│   │   │       └── server.js    # Setup MSW serveur (test)
│   │   ├── utils/
│   │   │   └── sessionUtils.js # Utilitaires (filtrage, stats)
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   │   ├── manifest.webmanifest # PWA manifest
│   │   ├── service-worker.js    # Service Worker (cache offline)
│   │   └── icon-*.png           # Icônes PWA (128, 192, 512px)
│   ├── tests/
│   │   ├── session.model.test.js      # Tests modèle de session (11 tests)
│   │   ├── utils.test.js              # Tests utilitaires (11 tests)
│   │   ├── Card.test.js               # Tests données Card (4 tests)
│   │   ├── AddSessionForm.test.js     # Tests validation formulaire (7 tests)
│   │   └── setup.js                   # Setup tests
│   ├── package.json
│   ├── vite.config.js
│   ├── vitest.config.js
│   └── index.html
├── backend/                    # API Node/Express
│   ├── server.js              # Serveur API CRUD sessions
│   └── package.json
├── README.md
├── EXPLICATIONS.md
└── (autres fichiers du projet)
```

---

## Installation

### Prérequis
- Node.js >= 18
- npm ou yarn

### 1. Frontend

```bash
cd frontend
npm install --legacy-peer-deps
```

**Dépendances principales :**
- React 19.2 + React-DOM
- Vite (bundler)
- Vitest + Testing Library (tests unitaires)
- MSW 2 (mock API)

### 2. Backend

```bash
cd backend
npm install
```

**Dépendances principales :**
- Express 5
- CORS

---

## 🎬 Lancement

### Frontend React (Vite)

#### Mode Développement
```bash
cd frontend
npm run dev
```

L'application sera disponible à `http://localhost:5173`

#### Mode Production
```bash
cd frontend
npm run build
npm run preview
```

---

### Backend Node/Express

#### Démarrer l'API
```bash
cd backend
npm start
```

Le serveur API démarre sur `http://localhost:5000` (configurable via `PORT`)

**Routes disponibles :**
```
GET    /api/sessions         → Récupère toutes les sessions
POST   /api/sessions         → Crée une nouvelle session
PATCH  /api/sessions/:id     → Met à jour une session
DELETE /api/sessions/:id     → Supprime une session
```

**Données initiales :** Au démarrage, 3 sessions de démo sont chargées en mémoire.

---

### Mode MSW (Mock API)

Pour tester **sans backend** en utilisant la mock API MSW :

#### Option 1 : MSW activé par défaut (développement)
MSW s'active automatiquement en mode développement. Les données mockées sont servies directement dans le navigateur.

```bash
cd frontend
npm run dev
# L'app utilise MSW automatiquement si le backend n'est pas accessible
```

#### Option 2 : Backend réel
Démarrez le backend dans un autre terminal :

```bash
# Terminal 1
cd backend
npm start

# Terminal 2
cd frontend
npm run dev
```

L'app basculera automatiquement vers le backend réel (port 5000) s'il est accessible.

#### Comment passer entre MSW et Backend?
- **MSW (offline/démo)** : Tuer le backend ou l'arrêter → l'app bascule à MSW
- **Backend réel** : Démarrer `npm start` dans `backend/` → l'app utilise l'API réelle

---

## Tests

### Tests Unitaires (Vitest)

```bash
cd frontend

# Lancer les tests une seule fois
npm test -- --run

# Mode watch (relance automatique)
npm test

# Avec UI interactive
npm test:ui
```

**Couverture :**
- 33 tests unitaires répartis en 4 fichiers
- Tests modèle de données (session, validation)
- Tests utilitaires (filtrage, statistiques)
- Tests validation formulaires et composants

---

## Fonctionnalités

### Modèle de données enrichi
Chaque session contient :
- `id` : identifiant unique
- `title` : titre de la séance
- `subject` : matière (PWA, Algo, Réseaux, DevOps)
- `status` : "todo" | "doing" | "done"
- `cm` : CM concerné (CM1 à CM5)
- `difficulty` : niveau de difficulté (1-3)
- `dueDate` : date d'échéance
- `xp` : points de révision gagnés

### Kanban interactif
- 3 colonnes principales : À faire, En cours, Terminé
- Changement de statut via boutons (🟦 🟧 🟩)
- Édition du titre inline
- Suppression de sessions

### Filtres combinés
- Par matière
- Par CM
- Par difficulté
- Recherche texte sur le titre

### Statistiques et progression
- Compte des sessions par statut
- Barre de progression globale (% complétées)
- Mise à jour en temps réel

### PWA (mode offline)
- **Manifest :** `public/manifest.webmanifest`
- **Service Worker :** `public/service-worker.js`
- Cache des assets statiques (HTML, CSS, JS, icônes)
- Icônes disponibles : 128x128, 192x192, 512x512

Pour tester :
1. Lancer : `npm run build && npm run preview`
2. Ouvrir DevTools → Application → Service Workers
3. Cocher "Offline"
4. Vérifier que la page reste affichée avec les données en cache

---

## Architecture

### Flux de l'ajout d'une session

1. **Utilisateur remplit le formulaire** (`AddSessionForm.jsx`)
2. **React envoie une requête POST** → `/api/sessions` (fetch)
3. **API répond** (MSW ou backend réel)
4. **Board.jsx reçoit la réponse** et met à jour l'état React
5. **Composant re-render** → session apparaît dans la colonne "À faire"

```
AddSessionForm
    ↓ (handleSubmit)
fetch POST /api/sessions
    ↓
MSW Handler ou Backend
    ↓
Response JSON
    ↓
Board.jsx (setSessions)
    ↓
Re-render et affichage
```

### Mode dégradé (offline)

- **Avec Service Worker en cache :** l'app reste affichée même hors ligne
- **Sans API disponible :** les requêtes POST/PATCH/DELETE échouent gracieusement
- **Messages d'erreur :** affichés en haut de page
- **Données affichées :** restent visibles depuis le dernier chargement réussi

---

## Ressources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [MSW Docs](https://mswjs.io)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

## Notes de développement

- Les tests s'exécutent avec Vitest et jsdom
- CSS utilise Flexbox et Grid pour le layout responsive
- Pas de build frontend en Docker dans cette version (bonus seulement)
- Les données sont stockées en mémoire (backend) → réinitialisées au redémarrage
