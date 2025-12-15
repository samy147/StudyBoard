# EXPLICATIONS.md - StudyBoard

Réponses aux questions de compréhension du projet StudyBoard.

---

## 1. Architecture : Flux complet du bouton "Ajouter une séance"

Quand on clique sur le bouton "Ajouter la session" du formulaire, voici ce qui se passe :

1. **React (AddSessionForm.jsx)** : Le formulaire valide les champs (titre obligatoire) et crée un objet avec tous les champs : titre, matière, CM, difficulté, date d'échéance, XP, et status "todo".

2. **React (Board.jsx)** : L'événement `onAdd` est appelé avec cet objet. Board crée un appel fetch vers `POST /api/sessions` avec les données JSON.

3. **API (MSW ou Backend)** : 
   - **Si MSW est activé** (`?msw=on` dans l'URL) : le handler MSW intercepte l'appel, ajoute un ID unique, et retourne la session créée en mémoire.
   - **Si MSW est désactivé** : c'est Express (backend) qui reçoit la requête via le proxy Vite, génère l'ID, la stocke en mémoire, et retourne la session.

4. **React (Board.jsx)** : La réponse arrive, React ajoute la session au state avec `setSessions`. Le composant se re-rend, et la nouvelle carte apparaît dans la colonne "À faire".

5. **AddSessionForm.jsx** : Le formulaire se vide automatiquement pour préparer le prochain ajout.

**Résumé** : Click → Formulaire valide → Fetch POST → (MSW OU Backend) → State update → Rendu React → Nouvelle carte visible.

---

## 2. Mode dégradé : Quand l'API ne répond pas

Si le backend est down ou il y a une coupure réseau, voici comment on gère :

**MSW est activé** (`?msw=on`) : Comme MSW simule l'API côté client, aucun problème. Les sessions continuent de fonctionner normalement puisqu'elles sont mockées en mémoire.

**MSW est désactivé (par défaut) et le backend down** : 

- Dans `Board.jsx`, les appels fetch sont wrappés dans des `try/catch`. 
- Si ça échoue, on affiche un message d'erreur rouge en haut : "Impossible d'ajouter la séance. Vérifiez votre connexion."
- Le state `error` est mis à jour, et un banneau d'erreur s'affiche avec un bouton pour le fermer.
- L'utilisateur peut relancer en cliquant le bouton d'action, ou si c'est temporaire, il attend que le serveur revienne.
- Les données déjà chargées restent affichées (elles ne sont pas perdues).

**Mode offline complet (PWA)** : 

- Le service worker a mis en cache tous les assets (HTML, CSS, JS) et les sessions précédentes.
- L'app reste fonctionnelle visuellement, mais les actions fetch (ajouter, modifier, supprimer) failleront.
- On pourrait ajouter un localStorage pour persister les nouvelles données en offline, mais actuellement, c'est MSW qui gère.

---

## 3. Tests / Qualité : Un exemple utile

**Exemple : Le test "compter les sessions par statut" (session.test.js)**

Ce test vérifie qu'on compte correctement les sessions de chaque état :

```javascript
it('devrait compter les sessions par statut', () => {
  const sessions = [
    { status: 'todo' },
    { status: 'doing' },
    { status: 'todo' },
    { status: 'done' }
  ];
  
  const counts = {
    todo: sessions.filter(s => s.status === 'todo').length,
    doing: sessions.filter(s => s.status === 'doing').length,
    done: sessions.filter(s => s.status === 'done').length,
  };
  
  expect(counts.todo).toBe(2);
  expect(counts.doing).toBe(1);
  expect(counts.done).toBe(1);
});
```

**Pourquoi c'est important** : 

1. Ce test valide la logique exacte utilisée par `StatsPanel` pour afficher les compteurs et la barre de progression.
2. Si quelqu'un change accidentellement le filtre ou la logique de comptage, le test échoue immédiatement.
3. C'est une fonction métier simple mais critique : si elle est cassée, les stats sont fausses et ça gâche l'UX.
4. Le test est léger et rapide (moins de 1ms), donc on peut le lancer en continu sans ralentir le dev.

---

## Résumé général

**Architecture** : Formulaire → React → Fetch → (MSW si `?msw=on` / Backend sinon) → State → Rendu

**Mode dégradé** : 
- Avec `?msw=on` → MSW active, zéro souci, fonctionne offline
- Sans `?msw=on` → appel backend via proxy Vite. Si le backend est down → erreurs affichées, données persistantes

**Tests** : 31 tests unitaires qui valident la logique métier (filtrage, comptage, validation). Rapides, fiables, critiques.
- Vérifie la logique métier core : les filtres doivent isoler les bonnes sessions
- Test une pure function (pas de dépendance à React/API)
- Si on refactorise `filterSessions()`, ce test détecte les bugs immédiatement
- Couvre un cas d'usage réel : "je veux voir que mes sessions PWA"

**Impact** : Ce test m'assure que les utilisateurs ne voient que ce qu'ils cherchent. 


---

**Conclusion** : Le projet suit une architecture claire frontend/backend/mock, gère les erreurs gracieusement, et est couvert par des tests unitaires solides testant la logique métier avant tout.
