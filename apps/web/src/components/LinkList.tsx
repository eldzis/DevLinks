import { type Link } from '../hooks/useLinks';

type LinkListProps = {
  links: Link[];
  onDelete: (id: number) => void;
  deletingId: number | null;
};

export function LinkList({ links, onDelete, deletingId }: LinkListProps) {
  if (links.length === 0) return <p>No links yet. Add your first one!</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
      {links.map((l) => (
        <li
          key={l.id}
          style={{
            border: '1px solid #eee',
            padding: 12,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'flex-start',
              }}
            >
              {l.title ? (
                <div style={{ fontWeight: 600 }}>{l.title}</div>
              ) : null}

              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                style={{ wordBreak: 'break-all' }}
              >
                {l.url}
              </a>

              <div style={{ color: '#666', fontSize: 12 }}>
                {new Date(l.createdAt).toLocaleString()}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onDelete(l.id)}
              disabled={deletingId === l.id}
              style={{
                background: 'transparent',
                border: '1px solid #ff8a80',
                color: '#d32f2f',
                padding: '6px 12px',
                borderRadius: 6,
                cursor: deletingId === l.id ? 'progress' : 'pointer',
                fontSize: '0.9rem',
                minWidth: 90,
              }}
            >
              {deletingId === l.id ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
