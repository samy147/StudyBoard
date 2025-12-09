import Card from "./Card";

export default function Column({ label, status, sessions, onDelete, onStatusChange, onEdit }) {
  return (
    <div className="studyboard-column">
      <h2 className="studyboard-column-title">{label}</h2>

      <div className="studyboard-column-content">
        {sessions.map((session) => (
          <Card
            key={session.id}
            session={session}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
          />
        ))}

        {sessions.length === 0 && (
            <p className="studyboard-empty">Aucune séance ici.</p>
        )}
      </div>
    </div>
  );
}
