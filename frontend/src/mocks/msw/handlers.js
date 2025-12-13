import { http, HttpResponse} from 'msw';
import { mockSessions } from '../mockSessions';

export const handlers = [
    //GET all sessions
    http.get('/api/sessions', async ({ request }) => {
        return HttpResponse.json(mockSessions);
    }),

    //POST a new session
    http.post("/api/sessions", async ({ request }) => {
        const data = await request.json();

        const newSession = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            title: data.title || "Untitled",
            subject: data.subject || "",
            status: data.status || "todo",
            cm: data.cm || "CM1",
            difficulty: data.difficulty || 1,
            dueDate: data.dueDate || "",
            xp: data.xp || 0
        };

        mockSessions.push(newSession);
        return HttpResponse.json(newSession, { status: 201});
    }),

    // PATCH update session
    http.patch("/api/sessions/:id", async ({ params, request }) => {
        const { id } = params;
        const updates = await request.json();

        const index = mockSessions.findIndex((s) => String(s.id) === String(id));
        if (index === -1) return HttpResponse.json({ error: "Not found" }, { status: 404 });

        mockSessions[index] = { ...mockSessions[index], ...updates };
        return HttpResponse.json(mockSessions[index]);
    }),

    // DELETE delete session
    http.delete("/api/sessions/:id", ({ params }) => {
        const { id } = params;

        const index = mockSessions.findIndex(
            (s) => String(s.id) === String(id)
        );

        if (index === -1) {
            return HttpResponse.json({ error: "Not found" }, { status: 404 });
        }

        mockSessions.splice(index, 1);

        return HttpResponse.json({ success: true }, { status: 200 });
    }),

]