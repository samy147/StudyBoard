export default function StatsPanel({ sessions}){
    const total = sessions.length;
    const done = sessions.filter(s => s.status === "done").length;

    return (
        <div className="stats-panel">
            <h3>Progression globale</h3>
            <p>Total : {total} | Terminé : {done} ({total ? Math.round((done / total) * 100) : 0}%)</p>
        </div>
    )
}