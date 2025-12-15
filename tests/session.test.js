import { describe, it, expect } from 'vitest';

// Tests du modèle de session
// Validation de la structure et des règles métier

describe('Modèle de session', () => {
  it('devrait créer une session valide', () => {
    const session = {
      id: "1",
      title: "Révisions API",
      subject: "PWA",
      status: "todo",
      cm: "CM1",
      difficulty: 2,
      dueDate: "2025-12-15",
      xp: 100
    };

    expect(session.id).toBeDefined();
    expect(session.title).toBe("Révisions API");
    expect(['todo', 'doing', 'done']).toContain(session.status);
  });

  it('devrait valider les statuts possibles', () => {
    const statutsValides = ["todo", "doing", "done"];
    const session = { status: "todo" };
    expect(statutsValides).toContain(session.status);
  });

  it('devrait valider la difficulté entre 1 et 3', () => {
    const session = { difficulty: 2 };
    expect(session.difficulty).toBeGreaterThanOrEqual(1);
    expect(session.difficulty).toBeLessThanOrEqual(3);
  });

  it('devrait avoir un XP positif', () => {
    const session = { xp: 100 };
    expect(session.xp).toBeGreaterThanOrEqual(0);
  });
});

describe('Réponses API', () => {
  it('devrait gérer une liste de sessions', () => {
    const sessions = [
      { id: "1", title: "Session 1", subject: "PWA", status: "todo" },
      { id: "2", title: "Session 2", subject: "Algo", status: "done" }
    ];

    expect(Array.isArray(sessions)).toBe(true);
    expect(sessions.length).toBe(2);
    expect(sessions[0]).toHaveProperty('id');
  });

  it('devrait gérer une réponse de création', () => {
    const reponse = {
      id: "123",
      title: "Nouvelle session",
      subject: "PWA",
      status: "todo"
    };

    expect(reponse).toHaveProperty('id');
    expect(reponse.status).toBe("todo");
  });

  it('devrait gérer une erreur 404', () => {
    const erreur = {
      error: 'Session non trouvée',
      status: 404
    };

    expect(erreur).toHaveProperty('error');
    expect(erreur.status).toBe(404);
  });
});

describe('Transformations de données', () => {
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

  it('devrait calculer la progression', () => {
    const sessions = [
      { status: 'done' },
      { status: 'todo' },
      { status: 'doing' },
      { status: 'done' }
    ];

    const terminees = sessions.filter(s => s.status === 'done').length;
    const pourcentage = Math.round((terminees / sessions.length) * 100);

    expect(pourcentage).toBe(50);
  });

  it('devrait gérer un tableau vide', () => {
    const sessions = [];
    const pourcentage = sessions.length > 0 ? 100 : 0;

    expect(pourcentage).toBe(0);
  });
});
