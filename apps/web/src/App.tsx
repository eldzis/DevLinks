import { LinkForm } from './components/LinkForm';
import { LinkList } from './components/LinkList';
import { useDeleteLink } from './hooks/useDeleteLink';
import { useLinks } from './hooks/useLinks';

export default function App() {
  const { links, loading, error, reload, setLinks } = useLinks();
  const { deleteLink, deletingId, error: deleteError } = useDeleteLink();

  const handleDelete = async (id: number) => {
    try {
      await deleteLink(id);
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (err) {
      console.error('Failed to delete link', err);
    }
  };

  return (
    <main className="app-shell">
      <h1>DevLinks</h1>

      <LinkForm onCreated={reload} />

      <hr style={{ margin: '1.5rem 0' }} />

      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {deleteError && <p style={{ color: 'crimson' }}>{deleteError}</p>}

      {!error &&
        (loading && links.length === 0 ? (
          <p>Loading…</p>
        ) : (
          <LinkList
            links={links}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        ))}
    </main>
  );
}
