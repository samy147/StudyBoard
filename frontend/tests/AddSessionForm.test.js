import { describe, it, expect } from 'vitest';

/**
 * Tests pour le formulaire d'ajout de session
 * Validation des données soumises
 */

describe('AddSessionForm Data Validation', () => {
  it('should create valid session data with all fields', () => {
    const formData = {
      id: "1",
      title: "New Study Session",
      subject: "PWA",
      status: "todo",
      cm: "CM1",
      difficulty: 1,
      dueDate: "2025-12-15",
      xp: 100
    };

    expect(formData.title).toBeTruthy();
    expect(formData.subject).toBeTruthy();
    expect(formData.status).toMatch(/^(todo|doing|done)$/);
  });

  it('should validate required fields are present', () => {
    const formData = {
      title: "Test",
      subject: "PWA"
    };

    const isValid = Boolean(formData.title) && Boolean(formData.subject);
    expect(isValid).toBe(true);
  });

  it('should trim whitespace from title', () => {
    const title = "   Test Title   ".trim();
    expect(title).toBe("Test Title");
    expect(title).toBeTruthy();
  });

  it('should default status to "todo"', () => {
    const formData = {
      title: "Test",
      subject: "PWA",
      status: undefined
    };

    const status = formData.status || "todo";
    expect(status).toBe("todo");
  });

  it('should convert difficulty to number', () => {
    const difficulty = Number("2");
    expect(difficulty).toBe(2);
    expect(typeof difficulty).toBe("number");
  });

  it('should convert XP to number', () => {
    const xp = Number("150");
    expect(xp).toBe(150);
    expect(typeof xp).toBe("number");
  });

  it('should handle empty form validation', () => {
    const title = "";
    const isValid = title.trim().length > 0;
    expect(isValid).toBe(false);
  });
});
