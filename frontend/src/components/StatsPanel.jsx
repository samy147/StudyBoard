export default function StatsPanel({ sessions}){
    const total = sessions.length;
    const counts = {
        todo: sessions.filter(s => s.status === "todo").length,
        doing: sessions.filter(s => s.status === "doing").length,
        done: sessions.filter(s => s.status === "done").length,
    };

    const percents = {
        todo: total ? (counts.todo / total) * 100: 0,
        doing: total ? (counts.doing / total) * 100: 0,
        done: total ? (counts.done / total) * 100: 0,
    }
    return (
        <div className="stats-panel">
            <h3>Progression globale</h3>
            <p>Total : {total} | 🟦 {counts.todo} | 🟧 {counts.doing} | 🟩 {counts.done}</p>
            <div className="stats-progress-bar">
                <div className="stats-progress-fill todo" style={{ width: `${percents.todo}%` }}></div>
                <div className="stats-progress-fill doing" style={{ width: `${percents.doing}%` }}></div>
                <div className="stats-progress-fill done" style={{ width: `${percents.done}%` }}></div>
            </div>
        </div>
    )
}