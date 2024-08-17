// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <a style={{ color: 'blue', textDecoration: 'underline' }}>Go back to Home</a>
      </Link>
    </div>
  );
}
