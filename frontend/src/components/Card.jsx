import { useState } from 'react';

export default function Card({ session, onDelete, onStatusChange, onEdit}) {
    const getDifficultyColor = (level) => {
        const colors = {
            1: "#4CAF50", //facile
            2: "#FF9800",  // moyen
            3: "#F44336"   // difficile
        };
        return colors[level] ?? "#94a3b8";
    };

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

    return(
        <div className="study-card">

            <h3 className="study-card-title">{session.title}</h3>

            <div className="study-card-badges">
                <span className="badge badge-subject">{session.subject}</span>
                <span className="badge" style={{ backgroundColor: getCMColor(session.cm) }}>
                    {session.cm}
                </span>
                <span className="badge" style={{ backgroundColor: getDifficultyColor(session.difficulty) }}>
                    Diff : {session.difficulty}
                </span>
            </div>

            <div className="study-card-info">
                <p>📅 {new Date(session.dueDate).toLocaleDateString("fr-FR")}</p>
                <p>⭐ {session.xp} XP</p>
            </div>

            <div className="study-card-actions">
                <button onClick={() => onStatusChange(session.id, "todo")}>🟦</button>
                <button onClick={() => onStatusChange(session.id, "doing")}>🟧</button>
                <button onClick={() => onStatusChange(session.id, "done")}>🟩</button>

                <button onClick={() => {
                    const newTitle = prompt("Nouveau titre :", session.title);
                    if (newTitle.trim()) onEdit(session.id, { title: newTitle });
                }}>✏️</button>

                <button onClick={() => onDelete(session.id)}>🗑️</button>
            </div>
        </div>
    );
}