import { useState, type FormEvent } from 'react';
import { useCreateLink } from '../hooks/useCreateLink';

export function LinkForm({ onCreated }: { onCreated: () => void }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const { createLink, loading, error } = useCreateLink();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedUrl = url.trim();

    if (!trimmedUrl) return;

    try {
      await createLink({ url: trimmedUrl, title: title.trim() || undefined });

      setUrl('');
      setTitle('');
      onCreated();
    } catch (err) {
      console.error('Failed to create link', err);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
      <input
        placeholder="https://example.com"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        style={{ fontSize: '1.05rem', padding: '12px 14px' }}
      />

      <input
        placeholder="Optional title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ fontSize: '1.05rem', padding: '12px 14px' }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{ fontSize: '1.05rem', padding: '12px 20px', cursor: 'pointer' }}
      >
        {loading ? 'Saving…' : 'Save link'}
      </button>

      <div
        aria-live="polite"
        style={{ minHeight: 20, fontSize: '0.9rem', color: 'crimson' }}
      >
        {error ? <span>{error}</span> : null}
      </div>
    </form>
  );
}
