// server.js
import express from "express";
import cors from "cors";
import { mockSessions } from "./mockSessions.js"; //fichier mockSessions

const app = express();
app.use(cors());          // pour autoriser Postman ou ton frontend
app.use(express.json());  // pour parser le JSON dans POST/PATCH

// GET all sessions
app.get("/api/sessions", (req, res) => {
  res.json(mockSessions);
});

// POST create a session
app.post("/api/sessions", (req, res) => {
  const newSession = {
    id: crypto.randomUUID(),
    ...req.body
  };
  mockSessions.push(newSession);
  res.status(201).json(newSession);
});

// PATCH update a session
app.patch("/api/sessions/:id", (req, res) => {
  const { id } = req.params;
  const index = mockSessions.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  mockSessions[index] = { ...mockSessions[index], ...req.body };
  res.json(mockSessions[index]);
});

// DELETE a session
app.delete("/api/sessions/:id", (req, res) => {
  const { id } = req.params;
  const index = mockSessions.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  mockSessions.splice(index, 1);
  res.json({ success: true });
});

// Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
