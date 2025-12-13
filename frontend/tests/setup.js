import { render } from '@testing-library/react';

/**
 * Fonction utilitaire pour rendre un composant React dans les tests
 */
export function renderComponent(component) {
  return render(component);
}

/**
 * Données de test pour les sessions
 */
export const mockTestSessions = [
  {
    id: "1",
    title: "Test Session 1",
    subject: "PWA",
    status: "todo",
    cm: "CM1",
    difficulty: 1,
    dueDate: "2025-12-15",
    xp: 100
  },
  {
    id: "2",
    title: "Test Session 2",
    subject: "PWA",
    status: "doing",
    cm: "CM2",
    difficulty: 2,
    dueDate: "2025-12-10",
    xp: 150
  },
  {
    id: "3",
    title: "Test Session 3",
    subject: "Algo",
    status: "done",
    cm: "CM3",
    difficulty: 3,
    dueDate: "2025-12-05",
    xp: 200
  }
];
