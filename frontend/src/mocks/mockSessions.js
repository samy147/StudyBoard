export const mockSessions = [
    {
        id: "1",
        title: "Révisions API REST",
        subject: "PWA",
        status: "todo",
        cm: "CM1",
        difficulty: "2",
        dueDate: "2025-12-15",
        xp: 100
    },
    {
        id: "2",
        title: "Sécurité Web - XSS et CSRF",
        subject: "PWA",
        status: "doing",
        cm: "CM2",
        difficulty: 3,
        dueDate: "2025-12-10",
        xp: 150
    },
    {
        id: "3",
        title: "Introduction à React",
        subject: "PWA",
        status: "done",
        cm: "CM4",
        difficulty: 1,
        dueDate: "2025-12-05",
        xp: 80
    }
];

export const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9);
};

export const SUBJECTS = ["PWA", "Algorithmique", "Réseaux", "DevOps"];
export const CMS = ["CM1", "CM2", "CM3", "CM4", "CM5"];
export const DIFFICULTIES = [
    { label: "Facile", value: 1 },
    { label: "Moyen", value: 2 },
    { label: "Difficile", value: 3 }
];