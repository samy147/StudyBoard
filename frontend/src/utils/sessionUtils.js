/**
 * Utilitaire de filtrage des sessions
 * Utilisé par le Board pour filtrer selon les critères
 */

export function filterSessions(sessions, filters) {
  return sessions.filter(s => 
    (!filters.subject || s.subject === filters.subject) &&
    (!filters.cm || s.cm === filters.cm) &&
    (!filters.difficulty || s.difficulty === Number(filters.difficulty)) &&
    (!filters.searchText || s.title.toLowerCase().includes(filters.searchText.toLowerCase()))
  );
}

export function countSessionsByStatus(sessions) {
  return {
    todo: sessions.filter(s => s.status === "todo").length,
    doing: sessions.filter(s => s.status === "doing").length,
    done: sessions.filter(s => s.status === "done").length,
  };
}

export function getProgressPercentage(sessions) {
  const total = sessions.length;
  if (total === 0) return 0;
  const done = sessions.filter(s => s.status === "done").length;
  return Math.round((done / total) * 100);
}
