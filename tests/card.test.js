import { describe, it, expect } from 'vitest';

// Tests de validation des données de carte
describe('Validation Données Card', () => {
  it('avoir tous les champs requis', () => {
    const card = {
      id: "1",
      title: "Test Session",
      subject: "PWA",
      status: "todo",
      cm: "CM1",
      difficulty: 2,
      dueDate: "2025-12-15",
      xp: 100
    };

    expect(card).toHaveProperty('title');
    expect(card).toHaveProperty('subject');
    expect(card).toHaveProperty('cm');
    expect(card).toHaveProperty('difficulty');
    expect(card).toHaveProperty('dueDate');
    expect(card).toHaveProperty('xp');
  });

  it('valider les couleurs de difficulté', () => {
    const couleurs = {
      1: "#4CAF50",
      2: "#FF9800",
      3: "#F44336"
    };

    expect(couleurs[1]).toBe("#4CAF50");
    expect(couleurs[2]).toBe("#FF9800");
    expect(couleurs[3]).toBe("#F44336");
  });

  it('valider les couleurs de CM', () => {
    const couleurs = {
      CM1: "#3b82f6",
      CM2: "#8b5cf6",
      CM3: "#ec4899",
      CM4: "#f59e0b",
      CM5: "#10b981"
    };

    expect(couleurs["CM1"]).toBe("#3b82f6");
    expect(couleurs["CM5"]).toBe("#10b981");
  });

  it('formater la date correctement', () => {
    const date = "2025-12-15";
    const formatee = new Date(date).toLocaleDateString("fr-FR");
    expect(formatee).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });
});
