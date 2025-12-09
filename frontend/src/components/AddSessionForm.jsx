import { useState } from "react";
import { SUBJECTS, CMS, DIFFICULTIES, generateId } from "../mocks/mockSessions";

//composant pour ajouter une nouvelle session
export default function AddSessionForm({ onAdd }) {
    //Etat pour chaque champ du formulaire
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState(SUBJECTS[0]);
    const [status, setStatus] = useState("todo");
    const [cm, setCm] = useState(CMS[0]);
    const [difficulty, setDifficulty] = useState(1);
    const [dueDate, setDueDate] = useState("");
    const [xp, setXp] = useState(0);

    //fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); //pour empecher le rechargement de la page
        if(!title.trim()) return;

        onAdd({
            id: generateId(), //générer un id unique
            title,
            subject,
            status,
            cm,
            difficulty: Number(difficulty), 
            dueDate,
            xp: Number(xp)
        });

        //réinitialiser les champs du formulaire pour le prochain ajout
        setTitle("");
        setDueDate("");
        setXp(0);
    };
    return (
        <form className="study-form" onSubmit={handleSubmit}>
            {/* Champ pour le titre de la session */}
            <input
                type="text"
                placeholder="Titre de la session"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            {/*Choix du sujet */}
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                {SUBJECTS.map((subj) => (
                    <option key={subj} value={subj}>
                        {subj}
                    </option>
                ))}
            </select>
            {/*Choix du statut */}
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">À faire</option>
                <option value="doing">En cours</option>
                <option value="done">Terminé</option>
            </select>
            {/*Choix du CM */}
            <select value={cm} onChange={(e) => setCm(e.target.value)}>
                {CMS.map((cmOption) => (
                    <option key={cmOption} value={cmOption}>
                        {cmOption}
                    </option>
                ))}
            </select>
            {/*Choix de la difficulté */}
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                {DIFFICULTIES.map((diff) => (
                    <option key={diff.value} value={diff.value}>
                        {diff.label}
                    </option>
                ))}
            </select>
            {/*Champ pour la date d'échéance */}
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            {/*Champ pour les points d'expérience */}
            <input
                type="number"
                placeholder="Points d'expérience"
                value={xp}
                onChange={(e) => setXp(e.target.value)}
                min="0"
                required
            />
            <button type="submit">Ajouter la session</button>
        </form> 
    );
}
