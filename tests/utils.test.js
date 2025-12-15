import { describe, it, expect } from 'vitest';
import { filterSessions, countSessionsByStatus, getProgressPercentage } from '../frontend/src/utils/sessionUtils';

// Tests des fonctions utilitaires de filtrage
describe('Utilitaires de Filtrage', () => {
  const sessions = [
    { id: "1", title: "API REST", subject: "PWA", status: "todo", cm: "CM1", difficulty: 2 },
    { id: "2", title: "Sécurité Web", subject: "PWA", status: "doing", cm: "CM2", difficulty: 3 },
    { id: "3", title: "React Basics", subject: "PWA", status: "done", cm: "CM4", difficulty: 1 },
    { id: "4", title: "Algorithmes", subject: "Algo", status: "todo", cm: "CM1", difficulty: 3 }
  ];

  it('filtrer par matière', () => {
    const filtrées = filterSessions(sessions, { subject: "PWA" });
    expect(filtrées).toHaveLength(3);
    expect(filtrées.every(s => s.subject === "PWA")).toBe(true);
  });

  it('filtrer par CM', () => {
    const filtrées = filterSessions(sessions, { cm: "CM1" });
    expect(filtrées).toHaveLength(2);
    expect(filtrées.every(s => s.cm === "CM1")).toBe(true);
  });

  it('filtrer par difficulté', () => {
    const filtrées = filterSessions(sessions, { difficulty: 3 });
    expect(filtrées).toHaveLength(2);
    expect(filtrées.every(s => s.difficulty === 3)).toBe(true);
  });

  it('rechercher par titre', () => {
    const filtrées = filterSessions(sessions, { searchText: "API" });
    expect(filtrées).toHaveLength(1);
    expect(filtrées[0].title).toContain("API");
  });

  it('combiner plusieurs filtres', () => {
    const filtrées = filterSessions(sessions, {
      subject: "PWA",
      difficulty: 3
    });
    expect(filtrées).toHaveLength(1);
    expect(filtrées[0].title).toBe("Sécurité Web");
  });

  it('aucun filtre retourne tout', () => {
    const filtrées = filterSessions(sessions, {});
    expect(filtrées).toHaveLength(4);
  });
});

// Tests des compteurs et statistiques
describe('Compteurs et Statistiques', () => {
  const sessions = [
    { status: "todo" },
    { status: "doing" },
    { status: "todo" },
    { status: "done" }
  ];

  it('compter par statut', () => {
    const compteur = countSessionsByStatus(sessions);
    expect(compteur.todo).toBe(2);
    expect(compteur.doing).toBe(1);
    expect(compteur.done).toBe(1);
  });

  it('calculer la progression', () => {
    const pourcentage = getProgressPercentage(sessions);
    expect(pourcentage).toBe(25);
  });

  it('gérer un tableau vide', () => {
    const pourcentage = getProgressPercentage([]);
    expect(pourcentage).toBe(0);
  });

  it('100% quand tout est terminé', () => {
    const sessionsFaites = [
      { status: "done" },
      { status: "done" },
      { status: "done" }
    ];
    const pourcentage = getProgressPercentage(sessionsFaites);
    expect(pourcentage).toBe(100);
  });
});
