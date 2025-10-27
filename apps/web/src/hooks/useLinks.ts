import { useCallback, useEffect, useRef, useState } from 'react';
import { API_URL } from '../lib/api';
import { getErrorMessage } from '../lib/http';
import type { LinkResponse } from '../types';

export type Link = LinkResponse;

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasLoadedRef = useRef(false);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/links`);

      if (!res.ok) throw new Error(await getErrorMessage(res));

      setLinks((await res.json()) as LinkResponse[]);
      hasLoadedRef.current = true;
    } catch (e: unknown) {
      setError((e as Error).message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { links, loading, error, reload, setLinks };
}
