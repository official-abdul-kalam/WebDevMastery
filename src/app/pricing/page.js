import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaCheck } from 'react-icons/fa';

export default function Pricing() {
    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '4rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Simple, Transparent Pricing</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Choose the plan that fits your learning journey.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>

                    {/* Free Plan */}
                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Starter</h3>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>Free</div>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Perfect for getting started with web development.</p>

                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', flex: 1 }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <FaCheck style={{ color: 'var(--primary)' }} /> Access to Module 1-3
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <FaCheck style={{ color: 'var(--primary)' }} /> Basic Projects
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <FaCheck style={{ color: 'var(--primary)' }} /> Community Support
                            </li>
                        </ul>

                        <button className="btn btn-glass" style={{ width: '100%' }}>Get Started</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--primary)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</div>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Pro Master</h3>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>$29<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/lifetime</span></div>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Unlock the full potential of the platform.</p>

                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', flex: 1 }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <FaCheck style={{ color: 'var(--primary)' }} /> All 50+ Levels & Projects
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <FaCheck style={{ color: 'var(--primary)' }} /> Premium Theory Content
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <FaCheck style={{ color: 'var(--primary)' }} /> Certificate of Completion
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <FaCheck style={{ color: 'var(--primary)' }} /> Priority Support
                            </li>
                        </ul>

                        <button className="btn btn-primary" style={{ width: '100%' }}>Upgrade Now</button>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}
