import { useEffect, useState } from "react";
import Column from "./Column";
import "../App.css";

const columns = ["todo", "doing", "done"];

const labels = {
  todo: "À faire",
  doing: "En cours",
  done: "Terminé",
};

const STORAGE_KEY = "tp5-kanban-react";

export default function KanbanBoard() {
  //charger les taches depuis localStorage
  const [tasks, setTasks] = useState(() => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error("Erreur de lecture dans le localStorage : ", error);
        return [];
    }   
  });
  const [title, setTitle] = useState("");
  const [column, setColumn] = useState("todo");
  const [tag, setTag] = useState("");
  const [assignee, setAssignee] = useState("");

  //sauvegarder a chaque chnagement
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: title.trim(),
      column,
      tag,
      assignee,
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setTag("");
    setAssignee("");
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Export JSON
  const exportData = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kanban-export-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const importData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        
        // Validation basique
        if (!Array.isArray(imported)) {
          alert("Format invalide : le JSON doit être un tableau.");
          return;
        }

        setTasks(imported);
        alert(`${imported.length} tâche(s) importée(s) avec succès !`);
      } catch (error) {
        alert("Erreur : fichier JSON invalide.");
        console.error(error);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  // Réinitialiser toutes les données
  const resetData = () => {
    if (confirm("Voulez-vous vraiment supprimer toutes les tâches ?")) {
      setTasks([]);
      alert("Toutes les tâches ont été supprimées.");
    }
  };

  return (
    <div className="kanban-board">
      <h1>StudyBoard – Kanban React</h1>

      <form className="kanban-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={column} onChange={(e) => setColumn(e.target.value)}>
          {columns.map((col) => (
            <option key={col} value={col}>
              {labels[col]}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Tag (optionnel)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assignée à…"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />

        <button type="submit">Ajouter</button>
      </form>
          
      
      <div className="kanban-actions">
        <button onClick={exportData} className="action-btn export-btn">
          📦 Exporter JSON
        </button>
        
        <label className="action-btn import-btn">
          📥 Importer JSON
          <input
            type="file"
            accept=".json"
            onChange={importData}
            style={{ display: 'none' }}
          />
        </label>

        <button onClick={resetData} className="action-btn reset-btn">
          🗑️ Réinitialiser
        </button>
      </div>
      <div className="kanban-columns">
        {columns.map((col) => (
          <Column
            key={col}
            columnId={col}
            title={labels[col]}
            tasks={tasks.filter((task) => task.column === col)}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </div>

      <div className="kanban-stats">
        <span>📊 Total : {tasks.length}</span>
        <span>📝 À faire : {tasks.filter(t => t.column === 'todo').length}</span>
        <span>⚙️ En cours : {tasks.filter(t => t.column === 'doing').length}</span>
        <span>✅ Terminé : {tasks.filter(t => t.column === 'done').length}</span>
      </div>
    </div>
  );
}
