import { describe, it, expect } from 'vitest';
import { filterSessions, countSessionsByStatus, getProgressPercentage } from '../src/utils/sessionUtils';

const testSessions = [
  { id: "1", title: "React Basics", subject: "PWA", status: "todo", cm: "CM4", difficulty: 1, dueDate: "2025-12-15", xp: 100 },
  { id: "2", title: "API REST", subject: "PWA", status: "doing", cm: "CM1", difficulty: 2, dueDate: "2025-12-10", xp: 150 },
  { id: "3", title: "Algo Advanced", subject: "Algo", status: "done", cm: "CM3", difficulty: 3, dueDate: "2025-12-05", xp: 200 },
  { id: "4", title: "Network Basics", subject: "Réseaux", status: "todo", cm: "CM1", difficulty: 1, dueDate: "2025-12-20", xp: 80 }
];

describe('sessionUtils', () => {
  describe('filterSessions', () => {
    it('should return all sessions when no filters applied', () => {
      const result = filterSessions(testSessions, {});
      expect(result).toHaveLength(4);
    });

    it('should filter by subject', () => {
      const result = filterSessions(testSessions, { subject: 'PWA' });
      expect(result).toHaveLength(2);
      expect(result.every(s => s.subject === 'PWA')).toBe(true);
    });

    it('should filter by CM', () => {
      const result = filterSessions(testSessions, { cm: 'CM1' });
      expect(result).toHaveLength(2);
      expect(result.every(s => s.cm === 'CM1')).toBe(true);
    });

    it('should filter by difficulty', () => {
      const result = filterSessions(testSessions, { difficulty: '1' });
      expect(result).toHaveLength(2);
      expect(result.every(s => s.difficulty === 1)).toBe(true);
    });

    it('should filter by search text', () => {
      const result = filterSessions(testSessions, { searchText: 'react' });
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('React');
    });

    it('should apply multiple filters', () => {
      const result = filterSessions(testSessions, { 
        subject: 'PWA', 
        cm: 'CM1'
      });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });
  });

  describe('countSessionsByStatus', () => {
    it('should count sessions by status', () => {
      const counts = countSessionsByStatus(testSessions);
      expect(counts.todo).toBe(2);
      expect(counts.doing).toBe(1);
      expect(counts.done).toBe(1);
    });

    it('should return 0 for empty array', () => {
      const counts = countSessionsByStatus([]);
      expect(counts.todo).toBe(0);
      expect(counts.doing).toBe(0);
      expect(counts.done).toBe(0);
    });
  });

  describe('getProgressPercentage', () => {
    it('should calculate correct progress percentage', () => {
      const percentage = getProgressPercentage(testSessions);
      // 1 done out of 4 = 25%
      expect(percentage).toBe(25);
    });

    it('should return 0 for empty array', () => {
      const percentage = getProgressPercentage([]);
      expect(percentage).toBe(0);
    });

    it('should return 100 when all are done', () => {
      const allDone = testSessions.map(s => ({ ...s, status: 'done' }));
      const percentage = getProgressPercentage(allDone);
      expect(percentage).toBe(100);
    });
  });
});
