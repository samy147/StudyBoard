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

### Option 1 : Mode MSW (Mock API - SANS backend)

Idéal pour développer et tester sans serveur :

```bash
cd frontend
npm install
npm run dev
```

Accédez à **`http://localhost:5173/?msw=on`** (avec le paramètre `?msw=on`)

- MSW intercepte toutes les requêtes `/api/sessions`
- Les données sont mockées en mémoire
- Fonctionne aussi en **mode offline** (PWA)
- Parfait pour les démos et tests

### Option 2 : Mode Backend (Express réel)

Si vous voulez utiliser le backend Node/Express :

**Terminal 1 - Backend :**
```bash
cd backend
npm install
npm start
```
L'API démarre sur `http://localhost:5000`

**Terminal 2 - Frontend :**
```bash
cd frontend
npm install
npm run dev
```

Accédez à **`http://localhost:5173`** (SANS paramètre `?msw=on`)

- Le frontend proxy `/api/sessions` vers le backend Express (Vite proxy configuré)
- Les données viennent du serveur Node.js
- Simulez une coupure réseau dans DevTools pour voir la gestion d'erreur

### Option 3 : Build & Production (npm run preview)

Pour tester en mode production (PWA, service worker) :

```bash
cd frontend
npm install
npm run build
npm run preview
```

Accédez à **`http://localhost:4173/?msw=on`**

- PWA en mode offline
- Service worker active
- MSW active (avec le paramètre `?msw=on`)

### Tests unitaires

Depuis la racine du projet :

```bash
npm install
npm run test:run              # Lancer tous les tests une fois
npm test                      # Mode watch
npm run test:ui               # Interface Vitest UI
```

**Résultat : 31 tests passent**

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

**MSW (Mock Service Worker)** intercepte toutes les requêtes `/api/sessions` et les traite côté navigateur, sans besoin de backend.

**Quand utiliser MSW** :
- Développement sans backend
- Tests automatisés
- Démos et présentations
- Mode offline (PWA)

**Comment activer MSW** :
- Accédez à l'URL avec le paramètre : **`?msw=on`**
- Exemple : `http://localhost:5173/?msw=on`

**Handlers MSW implémentés** :
- `GET /api/sessions` → retourne la liste mock
- `POST /api/sessions` → ajoute une session mock
- `PATCH /api/sessions/:id` → modifie une session mock
- `DELETE /api/sessions/:id` → supprime une session mock

**Sans MSW** (parameter `?msw=on` absent) :
- Le frontend appelle `/api/sessions` via le proxy Vite
- Il faut avoir le backend lancé en parallèle
- Sinon : erreur "Erreur lors du chargement des séances"



### PWA (Partie C)

- `manifest.webmanifest` : Installation sur écran d'accueil
- `service-worker.js` : Cache des assets statiques (stratégie cache-first)
- Icônes 128×192×512px

**Test offline** :
```bash
npm run build
npm run preview
```

Puis ouvrez DevTools → Application → Service Worker et cochez "Offline" pour tester sans connexion.

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
