import { useState } from 'react';
import { API_URL } from '../lib/api';
import { getErrorMessage } from '../lib/http';
import type { CreateLinkPayload, LinkResponse } from '../types';

export function useCreateLink() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLink = async (
    payload: CreateLinkPayload,
  ): Promise<LinkResponse> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await getErrorMessage(res));

      return (await res.json()) as LinkResponse;
    } catch (e: unknown) {
      setError((e as Error).message || 'Failed to create link');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { createLink, loading, error };
}
