import Link from 'next/link';
import { FaHeart, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid var(--border-color)', padding: '4rem 0 2rem', marginTop: '4rem', background: 'var(--bg-panel)' }}>
            <div className="container">
                <div className="footer-grid">

                    {/* Company Info */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>WebDev<span style={{ color: 'var(--primary)' }}>Mastery</span></h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Master web development with our interactive, project-based learning platform. Built for aspiring developers.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}><FaTwitter /></a>
                            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}><FaInstagram /></a>
                            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}><FaLinkedin /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1.2rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}><Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link href="/about" style={{ color: 'var(--text-muted)' }}>About Us</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link href="/pricing" style={{ color: 'var(--text-muted)' }}>Pricing</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link href="/#curriculum" style={{ color: 'var(--text-muted)' }}>Curriculum</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '1.2rem' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}><Link href="/privacy" style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link href="/refund" style={{ color: 'var(--text-muted)' }}>Refund Policy</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link href="/cookies" style={{ color: 'var(--text-muted)' }}>Cookie Policy</Link></li>
                            <li style={{ marginBottom: '0.8rem' }}><Link href="/terms" style={{ color: 'var(--text-muted)' }}>Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        &copy; {new Date().getFullYear()} WebDevMastery. All rights reserved.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        Designed & Developed by <span style={{ color: '#fff', fontWeight: 'bold' }}>Oruzenlab</span> <FaHeart style={{ color: 'red', fontSize: '0.8rem' }} />
                    </p>
                </div>
            </div>
        </footer>
    );
}
