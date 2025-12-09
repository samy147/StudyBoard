import { useEffect, useState } from "react";
import Column from "./Column";
import AddSessionForm from "./AddSessionForm";
import { mockSessions } from "../mocks/mockSessions";
import "../App.css";

const columns = ["todo", "doing", "done"];

const labels = {
  todo: "À faire",
  doing: "En cours",
  done: "Terminé",
};


export default function Board() {
    // on stockes les sessions dans un state pour pouvoir effectuer les differentes operations
    const [sessions, setSessions] = useState(mockSessions);

    const handleAddSession = (newSession) => {
        setSessions((prev) => [...prev, newSession]);
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

    return (
        <div className="studyboard">
            {/*titre du board */}
            <h1>StudyBoard</h1>

            {/*Formulaire d'ajout*/}
            <AddSessionForm onAdd={handleAddSession}/>

            {/* Grille contnant les colonnes */}
            <div className="studyboard-columns">
                {columns.map((col) => (
                    <Column
                        key={col}
                        label={labels[col]}
                        status={col}
                        //filtrer les sessions selon leur "status"
                        sessions={sessions.filter((s) => s.status == col)}
                        onDelete={handleDeleteSession}
                        onStatusChange={handleChangeStatus}
                        onEdit={handleEditSession}
                    />
                ))}
            </div>
        </div>
    );
}
