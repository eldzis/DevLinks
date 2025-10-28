import { useState } from 'react';
import { API_URL } from '../lib/api';
import { getErrorMessage } from '../lib/http';

export function useDeleteLink() {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deleteLink = async (id: number): Promise<void> => {
    try {
      setDeletingId(id);
      setError(null);

      const res = await fetch(`${API_URL}/links/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error(await getErrorMessage(res));
    } catch (e: unknown) {
      setError((e as Error).message || 'Failed to delete link');
      throw e;
    } finally {
      setDeletingId((current) => (current === id ? null : current));
    }
  };

  return {
    deleteLink,
    deletingId,
    error,
  };
}
