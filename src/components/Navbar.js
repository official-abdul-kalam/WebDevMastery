'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCode } from 'react-icons/fa';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    const linkStyle = (path) => ({
        color: isActive(path) ? 'var(--primary)' : 'var(--text-muted)',
        fontWeight: 500,
        transition: 'color 0.3s ease',
        position: 'relative',
    });

    return (
        <nav style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <FaCode style={{ color: 'var(--primary)' }} />
                        <span style={{ color: '#fff' }}>WebDev<span style={{ color: 'var(--primary)' }}>Mastery</span></span>
                    </div>
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/" style={linkStyle('/')}>Home</Link>
                    <Link href="/about" style={linkStyle('/about')}>About</Link>
                    <Link href="/pricing" style={linkStyle('/pricing')}>Pricing</Link>
                    <button className="btn btn-login" style={{ borderRadius: '30px', padding: '0.6rem 1.5rem' }}>
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
}
