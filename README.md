# StudyBoard - Kanban PWA pour Révisions

Application React pour organiser vos sessions de révision avec un Kanban interactif.

## Structure du projet

```
StudyBoard/
├── frontend/          # Application React (Vite)
├── backend/           # API Node/Express
├── tests/             # Tests unitaires (Vitest)
├── README.md          # Ce fichier
├── EXPLICATIONS.md    # Réponses aux questions
└── package.json       # Configuration des tests
```

## Installation & Lancement

### Frontend (React avec Vite)

```bash
cd frontend
npm create vite@latest . -- --template react
npm install
npm install msw --save-dev
npm run dev
```

Le frontend démarre sur `http://localhost:5173`

### Backend (Node/Express)

```bash
cd backend
npm init -y
npm install express cors
npm start
```

L'API démarre sur `http://localhost:5000`

### Tests unitaires

Depuis la racine du projet :

```bash
npm install
npm run test:run              # Lancer tous les tests une fois
npm test                      # Mode watch
npm run test:ui               # Interface Vitest UI
```

**Résultat : 31 tests passent ✅**

Tests inclus :
- `session.test.js` : Modèle et validation des sessions
- `utils.test.js` : Filtrage et statistiques
- `card.test.js` : Données des cartes
- `form.test.js` : Validation du formulaire

## Fonctionnalités

### Kanban (Partie A)
- 3 colonnes : À faire, En cours, Terminé
- Cartes avec : CM, difficulté (1-3), date d'échéance, XP
- Actions : éditer titre, changer statut (3 boutons), supprimer

### Filtres & Recherche (Partie A)
- Par matière (PWA, Algo, Réseaux, DevOps)
- Par CM (CM1-CM5)
- Par difficulté (1-3)
- Recherche textuelle sur le titre

### Statistiques (Partie A)
- Compteur par statut
- Barre de progression globale

### API REST (Partie B)

Routes de base :
```
GET /api/sessions          → Liste des sessions
POST /api/sessions         → Créer une session
PATCH /api/sessions/:id    → Modifier une session
DELETE /api/sessions/:id   → Supprimer une session
```

### Mode Mock (MSW - Partie B)

Le frontend fonctionne **sans backend** grâce à MSW.

- Les handlers MSW capturent tous les appels fetch
- Les données persistent en mémoire
- Mode mock activé automatiquement

### PWA (Partie C)

- `manifest.webmanifest` : Installation sur écran d'accueil
- `service-worker.js` : Cache des assets statiques
- Icônes 128×192×512px

Pour tester offline :
```bash
cd frontend
npm run build
npm run preview
```

Puis dans DevTools → Application → Service Worker → passer Offline

## Architecture

### Frontend
- **Board.jsx** : État global, appels API, filtres
- **Column.jsx** : Affichage d'une colonne (status)
- **Card.jsx** : Affichage d'une session
- **AddSessionForm.jsx** : Formulaire d'ajout
- **StatsPanel.jsx** : Statistiques et progression
- **MSW** : Mock des 4 routes API

### Backend
- Routes CRUD simples
- Données en mémoire
- CORS activé pour le frontend

### Tests
- Vitest pour l'exécution
- jsdom pour l'environnement navigateur
- 31 tests de logique métier et validation

## Notes

- Les données du backend sont réinitialisées à chaque démarrage
- MSW capture tous les appels pour un mode offline complet
- Le formulaire valide que title et subject sont remplis
- La recherche est insensible à la casse
