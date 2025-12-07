import { useState } from 'react';

export default function Card({ session}) {
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

    //supprimer une session
    const handleDeleteSession = (id) => {
        setSessions((prev) => prev.filter((s) => s.id !== id));
    };

    //changer le statut d'une session
    const handleChangeStatus = (id, newStatus) => {
        setSessions((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, status: newStatus } : s
            )
        );
    };

    //Modifer titre ou matiere
    const handleEditSession = (id, updatedFields) => {
        setSessions((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, ...updatedFields } : s
            )
        );
    };



    return(
        <div className='card'>
            {/* Titre */}
            <h3 className='card-title'>{session.title}</h3>

            {/*Badges */}
            <div className='crad-badges'>
                <span className='badge bagde-subject'>{session.subject}</span>
                <span className="badge" style={{ backgroundColor: getCMColor(session.cm) }}>
                    {session.cm}
                </span>

                <span className="badge" style={{ backgroundColor: getDifficultyColor(session.difficulty) }}>
                    Diff : {session.difficulty}
                </span>
            </div>
            {/* Infos supplémentaires */}
            <div className="card-info">
                <p>📅 {new Date(session.dueDate).toLocaleDateString("fr-FR")}</p>
                <p>⭐ {session.xp} XP</p>
            </div>
        </div>
    );
}