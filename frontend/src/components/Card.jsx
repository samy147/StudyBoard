import { useState } from 'react';

export default function Card({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  const handleTitleChange = (e) => {
    onUpdate(task.id, { title: e.target.value });
  };

  const handleTagChange = (e) => {
    onUpdate(task.id, { tag: e.target.value });
  };

  const handleAssigneeChange = (e) => {
    onUpdate(task.id, { assignee: e.target.value });
  };

  return (
    <div className="kanban-card">
      <div className="card-main">
        {editing ? (
          <input
            className="card-title-input"
            value={task.title}
            onChange={handleTitleChange}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setEditing(false);
            }}
            autoFocus
          />
        ) : (
          <span 
            onDoubleClick={() => setEditing(true)}
            style={{ flex: 1, cursor: 'pointer' }}
            title="Double-clic pour éditer"
          >
            {task.title}
          </span>
        )}
        <button
          className="kanban-delete"
          onClick={() => onDelete(task.id)}
          title="Supprimer la note"
        >
          ×
        </button>
      </div>

      <div className="card-meta">
        <select value={task.tag || ''} onChange={handleTagChange}>
          <option value="">Sans tag</option>
          <option value="⚠️ Urgent">⚠️ Urgent</option>
          <option value="📚 Important">📚 Important</option>
          <option value="Optionnel">Optionnel</option>
        </select>

        <input
          type="text"
          value={task.assignee || ''}
          placeholder="Assigné à..."
          onChange={handleAssigneeChange}
        />
      </div>
    </div>
  );
}