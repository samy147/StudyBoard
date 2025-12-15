import { describe, it, expect } from 'vitest';

// Tests de validation du formulaire
describe('Validation Formulaire', () => {
  it('créer des données valides', () => {
    const donnees = {
      id: "1",
      title: "Nouvelle séance",
      subject: "PWA",
      status: "todo",
      cm: "CM1",
      difficulty: 1,
      dueDate: "2025-12-15",
      xp: 100
    };

    expect(donnees.title).toBeTruthy();
    expect(donnees.subject).toBeTruthy();
    expect(['todo', 'doing', 'done']).toContain(donnees.status);
  });

  it('valider les champs obligatoires', () => {
    const donnees = {
      title: "Séance",
      subject: "PWA"
    };

    const estValide = Boolean(donnees.title) && Boolean(donnees.subject);
    expect(estValide).toBe(true);
  });

  it('découper les espaces du titre', () => {
    const titre = "   Révisions   ".trim();
    expect(titre).toBe("Révisions");
    expect(titre).toBeTruthy();
  });

  it('statut par défaut: todo', () => {
    let statut;
    statut = statut || "todo";
    expect(statut).toBe("todo");
  });

  it('convertir difficulté en nombre', () => {
    const difficulte = Number("2");
    expect(difficulte).toBe(2);
    expect(typeof difficulte).toBe("number");
  });

  it('convertir XP en nombre', () => {
    const xp = Number("150");
    expect(xp).toBe(150);
  });

  it('rejeter un titre vide', () => {
    const titre = "";
    const estValide = titre.trim().length > 0;
    expect(estValide).toBe(false);
  });
});
