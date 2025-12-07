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

    return (
        <div className="board-container">
            {/*titre du board */}
            <h1>StudyBoard</h1>

            {/*Formulaire d'ajout*/}
            <AddSessionForm onAdd={handleAddSession}/>

            {/* Grille contnant les colonnes */}
            <div className="columns-container">
                {columns.map((col) => (
                    <Column
                        key={col}
                        label={labels[col]}
                        status={col}
                        //filtrer les sessions selon leur "status"
                        sessions={sessions.filter((s) => s.status == col)}
                    />
                ))}
            </div>
        </div>
    );
}
