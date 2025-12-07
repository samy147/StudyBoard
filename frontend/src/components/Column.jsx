import Card from "./Card";

export default function Column({ columnId, title, tasks, onUpdate, onDelete }) {
  return (
    <div className="kanban-column">
      <h2>{title}</h2>

      <div className="kanban-list">
        {tasks.map((task) => (
          <Card key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
