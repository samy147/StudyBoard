import Card from "./Card";

export default function Column({ label, status, sessions}) {
  return (
    <div className="column">
      <h2 className="column-title">{label}</h2>

      <div className="column-content">
        {/* on genere une Card pour chaque session */}
        {sessions.map((session) => (
          <Card key={session.id} session={session} />
        ))}

        {/* Si aucune carte dans la colonne */}
        {sessions.length === 0 && (
            <p className="empty-column">Aucune séance ici.</p>
        )}
      </div>
    </div>
  );
}
