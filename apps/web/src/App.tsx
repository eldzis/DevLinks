import { LinkForm } from './components/LinkForm';
import { LinkList } from './components/LinkList';
import { useLinks } from './hooks/useLinks';

export default function App() {
  const { links, loading, error, reload } = useLinks();

  return (
    <main className="app-shell">
      <h1>DevLinks</h1>

      <LinkForm onCreated={reload} />

      <hr style={{ margin: '1.5rem 0' }} />

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!error &&
        (loading && links.length === 0 ? (
          <p>Loading…</p>
        ) : (
          <LinkList links={links} />
        ))}
    </main>
  );
}
