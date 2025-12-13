# EXPLICATIONS.md - Questions de compréhension

## Question 1 : Architecture - Flux complet d'ajout de séance

### Quand on clique sur "Ajouter une séance", que se passe-t-il ?

**Dans React (Frontend) :**
1. L'utilisateur remplit le formulaire `AddSessionForm.jsx` (titre, matière, CM, difficulté, date, XP)
2. Il clique sur le bouton "Ajouter la séance"
3. `handleSubmit` valide que le titre n'est pas vide et crée un objet session
4. L'objet est passé au callback `onAdd` avec tous les champs (title, subject, cm, difficulty, dueDate, xp)
5. `Board.jsx` reçoit cet appel dans `handleAddSession`

**Vers l'API :**
6. `handleAddSession` effectue un `fetch POST /api/sessions` avec l'objet JSON en body
7. Le header `Content-Type: application/json` est positionné

**Au niveau de l'API (MSW ou Backend) :**
8. **Avec MSW (mock)** : Le handler POST dans `msw/handlers.js` intercepte la requête, génère un ID unique et ajoute la session au tableau mockSessions, retourne `HTTP 201` avec la session créée
9. **Avec Backend** : Express reçoit le POST, valide les champs obligatoires (title, subject), génère un ID, persiste en mémoire, retourne la session créée

**Retour et affichage :**
10. `Board.jsx` reçoit la réponse et mise à jour son state : `setSessions(prev => [...prev, createdSession])`
11. React re-render le composant `Board`
12. La nouvelle session apparaît dans la colonne "À faire" (statut par défaut : "todo")
13. Le formulaire se réinitialise

**Code clé :**
- `AddSessionForm.jsx` : valide et crée l'objet
- `Board.jsx` : gère l'envoi API et met à jour le state
- `msw/handlers.js` ou `backend/server.js` : trait la requête et persiste les données

---

## Question 2 : Mode dégradé - Que se passe-t-il si l'API ne répond pas ?

### Coupure réseau ou backend down

**Scénario 1 : Chargement initial (GET /api/sessions)**
- `Board.jsx` lance un fetch au montage avec `useEffect`
- Si le fetch échoue (erreur réseau), le `catch` capture l'erreur
- `setError("Erreur lors du chargement des séances.")` est appelé
- Un message d'erreur rouge s'affiche en haut de la page (`.error-banner`)
- Les données du cache du Service Worker sont affichées si disponibles (PWA offline)
- L'app ne plante pas, reste utilisable avec les données en cache

**Scénario 2 : Ajout/Modification/Suppression (POST/PATCH/DELETE)**
- L'utilisateur essaie d'ajouter une session
- Le fetch échoue (backend inaccessible)
- Le `catch` capte l'erreur et affiche : "Impossible d'ajouter la séance. Vérifiez votre connexion."
- L'action n'est pas faite localement (on n'ajoute pas à l'état React)
- Le formulaire reste rempli pour réessayer
- L'utilisateur peut continuer à voir et filtrer les sessions déjà chargées

**Fallback avec MSW :**
- Si on a MSW configuré et que le backend est down, MSW prend le relais automatiquement
- Les handlers MSW répondent à la place du backend
- L'app fonctionne comme si de rien n'était (avec les données mockées)

**PWA et Service Worker :**
- Le Service Worker cache les assets statiques (HTML, CSS, JS) et les icônes
- Même hors ligne, la page se charge et affiche les données du dernier chargement réussi
- Les requêtes API continuent à échouer (pas de cache API dans cette version), mais l'UI reste visible

**Messages affichés :**
- `.error-banner` rouge avec l'erreur spécifique
- Bouton × pour fermer le message
- L'app reste interactive (filtres, recherche, etc. continuent de fonctionner localement)

---

## Question 3 : Tests / Qualité - Exemple de test utile

### Exemple : Test de filtrage des sessions

**Fichier :** `tests/utils.test.js` - Test "should filter sessions by multiple criteria"

```javascript
it('should filter sessions by multiple criteria', () => {
  const sessions = [
    { title: 'React Basics', subject: 'PWA', cm: 'CM4', difficulty: 1, status: 'todo' },
    { title: 'API REST', subject: 'PWA', cm: 'CM1', difficulty: 2, status: 'doing' },
    { title: 'Algorithmique', subject: 'Algo', cm: 'CM3', difficulty: 3, status: 'done' }
  ];

  const filtered = filterSessions(sessions, {
    subject: 'PWA',
    difficulty: 2,
    searchText: 'API'
  });

  expect(filtered).toHaveLength(1);
  expect(filtered[0].title).toBe('API REST');
});
```

**Pourquoi c'est important :**
1. **Vérif ie la logique métier ** : Le filtrage combine 3 critères (matière, difficulté, texte). Ce test s'assure qu'aucun critère n'est oublié et qu'ils travaillent ensemble (ET logique)
2. **Prévient les régressions** : Si quelqu'un modifie la fonction `filterSessions`, ce test le détectera immediatement
3. **Documentation vivante** : Le test montre comment la fonction doit se comporter (3 sessions in, 1 session out avec les bons critères)
4. **C'est le cœur de l'app** : Le filtrage est essentiel pour l'UX du Kanban. Si ça se casse, l'app devient inutile
5. **Démontre la compréhension** : Je pourrais simplement tester qu'une fonction retourne quelque chose, mais là je teste la combinaison de filtres, ce qui montre une vraie compréhension du flux utilisateur

**Autres tests utiles du projet :**
- Tests de validation de données de session (champs obligatoires, types)
- Tests de conversion de données (ex: difficulty en nombre)
- Tests de calcul de progression (pourcentage de sessions "done")

**En total : 33 tests unitaires** répartis dans 4 fichiers, couvrant modèle, utilitaires, formulaires et validation des données de composants.

---

## Conclusion

Ce projet démontre une comprehénsion complète du flux Frontend → API (MSW/Backend) → React, une gestion robuste des erreurs et du mode offline, et une approche testée de la logique métier. Les choix d'architecture (séparation des concerns, MSW pour la démo, tests unitaires) permettront à l'app d'évoluer facilement.
