// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Données initiales (pour la démo)
let sessions = [
    {
        id: "1",
        title: "Révisions API REST",
        subject: "PWA",
        status: "todo",
        cm: "CM1",
        difficulty: 2,
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

//GET all sessions
app.get('/api/sessions', (req, res) => {
    res.json(sessions);
});

//POST create a session
app.post('/api/sessions', (req, res) => {
    const {title, subject, status, cm, difficulty, dueDate, xp} = req.body;
    
    if (!title || !subject) {
        return res.status(400).json({ error: 'Title and subject are required' });
    }
    
    const newSession = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        title,
        subject,
        status: status || 'todo',
        cm: cm || 'CM1',
        difficulty: difficulty || 1,
        dueDate: dueDate || '',
        xp: xp || 0
    };
    sessions.push(newSession);
    res.status(201).json(newSession);
});

//PATCH update a session
app.patch('/api/sessions/:id', (req, res) => {
    const { id } = req.params;
    const index = sessions.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Session not found' });
    }

    sessions[index] = { ...sessions[index], ...req.body };
    res.json(sessions[index]);
});

//DELETE a session
app.delete('/api/sessions/:id', (req, res) => {
    const { id } = req.params;
    const index = sessions.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Session not found' });
    }

    sessions.splice(index, 1);
    res.json({ success: true });
});

// Gérer les erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

//Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API documentation: GET /api/sessions, POST /api/sessions, PATCH /api/sessions/:id, DELETE /api/sessions/:id`);
});