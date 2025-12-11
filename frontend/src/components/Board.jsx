import { useEffect, useState } from "react";
import Column from "./Column";
import AddSessionForm from "./AddSessionForm";
import StatsPanel from "./StatsPanel";
import { mockSessions, SUBJECTS, CMS, DIFFICULTIES } from "../mocks/mockSessions";
import "../App.css";

const columns = ["todo", "doing", "done"];

const labels = {
  todo: "À faire",
  doing: "En cours",
  done: "Terminé",
};


export default function Board() {
    // on stockes les sessions dans un state pour pouvoir effectuer les differentes operations
    //const [sessions, setSessions] = useState(mockSessions);

    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/sessions")
        .then(res => res.json())
        .then(data => {
            setSessions(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setError("Erreur lors du chargement des séances.");
            setLoading(false);
        });
    }, []);
    //etats pour les filtres
    const [filterSubject, setFilterSubject] = useState("");
    const [filterCM, setFilterCM] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState("");
    const [searchText, setSearchText] = useState("");


    const handleAddSession = async (newSession) => {
        const response = await fetch("/api/sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSession),
        });
        const createdSession = await response.json();

        setSessions((prev) => [...prev, crezatedSession]);
    };

    //supprimer une session
    const handleDeleteSession = async(id) => {
        await fetch(`/api/sessions/${id}`, {
            method: "DELETE",
        });

        setSessions((prev) => prev.filter((s) => s.id !== id));
    };

    //changer le statut d'une session
    const handleChangeStatus = async (id, newStatus) => {
        const res = await fetch(`/api/sessions/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });

        const updated = await res.json();

        setSessions((prev) =>
            prev.map((s) =>
                s.id === id ? updated : s
            )
        );
    };

    //Modifer titre ou matiere
    const handleEditSession = async (id, updatedFields) => {
        const res = await fetch(`/api/sessions/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        });

        const updated = await res.json();

        setSessions((prev) =>
            prev.map((s) =>
                s.id === id ? updated : s
            )
        );
    };

    //filtrer les sessions
    const filteredSessions = sessions.filter(s => 
        (!filterSubject || s.subject === filterSubject) &&
        (!filterCM || s.cm === filterCM) &&
        (!filterDifficulty || s.difficulty === Number(filterDifficulty)) &&
        (!searchText || s.title.toLowerCase().includes(searchText.toLowerCase()))
    );

    return (
        <div className="studyboard">
            {/*titre du board */}
            <h1>StudyBoard</h1>

            {/*Formulaire d'ajout*/}
            <AddSessionForm onAdd={handleAddSession}/>

            {/* Filtres */}
            <div>
                <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}>
                    <option value="">Toutes les matières</option>
                    {SUBJECTS.map(subj => <option key={subj} value={subj}>{subj}</option>)}
                    </select>

                    <select value={filterCM} onChange={e => setFilterCM(e.target.value)}>
                    <option value="">Tous les CM</option>
                    {CMS.map(cm => <option key={cm} value={cm}>{cm}</option>)}
                </select>

                <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)}>
                    <option value="">Toutes difficultés</option>
                    {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>

                <input
                type="text"
                placeholder="Rechercher par titre"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                />
            </div>

            <StatsPanel sessions={filteredSessions} />
            {/* Grille contnant les colonnes */}
            <div className="studyboard-columns">
                {columns.map((col) => (
                    <Column
                        key={col}
                        label={labels[col]}
                        status={col}
                        //filtrer les sessions selon leur "status"
                        sessions={filteredSessions.filter((s) => s.status == col)}
                        onDelete={handleDeleteSession}
                        onStatusChange={handleChangeStatus}
                        onEdit={handleEditSession}
                    />
                ))}
            </div>
        </div>
    );
}
