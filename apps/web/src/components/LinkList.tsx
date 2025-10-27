import { type Link } from '../hooks/useLinks';

export function LinkList({ links }: { links: Link[] }) {
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
              flexDirection: 'column',
              gap: 4,
              alignItems: 'flex-start',
            }}
          >
            {l.title ? <div style={{ fontWeight: 600 }}>{l.title}</div> : null}

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
        </li>
      ))}
    </ul>
  );
}
