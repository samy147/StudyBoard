export default function StatsPanel({ sessions}){
    const total = sessions.length;
    const done = sessions.filter(s => s.status === "done").length;
    const progressPercent = total ? Math.round((done / total) * 100) : 0;

    return (
        <div className="stats-panel">
            <h3>Progression globale</h3>
            <p>Total : {total} | Terminé : {done} ({progressPercent}%)</p>
            <div className="stats-progress-bar">
                <div className="stats-progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
        </div>
    )
}