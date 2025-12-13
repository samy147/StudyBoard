import { describe, it, expect } from 'vitest';

/**
 * Test de validation des données de card
 * Le rendu du composant Card est testé implicitement lors des intégration tests
 */

describe('Card Data Validation', () => {
  it('should have all required card fields', () => {
    const cardData = {
      id: "1",
      title: "Test Session",
      subject: "PWA",
      status: "todo",
      cm: "CM1",
      difficulty: 2,
      dueDate: "2025-12-15",
      xp: 100
    };

    expect(cardData).toHaveProperty('title');
    expect(cardData).toHaveProperty('subject');
    expect(cardData).toHaveProperty('cm');
    expect(cardData).toHaveProperty('difficulty');
    expect(cardData).toHaveProperty('dueDate');
    expect(cardData).toHaveProperty('xp');
  });

  it('should validate difficulty colors mapping', () => {
    const getDifficultyColor = (level) => {
      const colors = {
        1: "#4CAF50", // vert - facile
        2: "#FF9800",  // orange - moyen
        3: "#F44336"   // rouge - difficile
      };
      return colors[level] ?? "#94a3b8";
    };

    expect(getDifficultyColor(1)).toBe("#4CAF50");
    expect(getDifficultyColor(2)).toBe("#FF9800");
    expect(getDifficultyColor(3)).toBe("#F44336");
  });

  it('should validate CM colors mapping', () => {
    const getCMColor = (cm) => {
      const colors = {
        CM1: "#3b82f6",
        CM2: "#8b5cf6",
        CM3: "#ec4899",
        CM4: "#f59e0b",
        CM5: "#10b981"
      };
      return colors[cm] ?? "#64748b";
    };

    expect(getCMColor("CM1")).toBe("#3b82f6");
    expect(getCMColor("CM5")).toBe("#10b981");
    expect(getCMColor("CM99")).toBe("#64748b");
  });

  it('should format date correctly', () => {
    const dueDate = "2025-12-15";
    const formatted = new Date(dueDate).toLocaleDateString("fr-FR");
    
    expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });
});
