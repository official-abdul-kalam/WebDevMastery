import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaRocket, FaCode, FaUsers } from 'react-icons/fa';

export default function About() {
    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '4rem 0' }}>
                <section style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, #a0a0b0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        About WebDevMastery
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        We believe in learning by doing. Our platform is designed to take you from a complete beginner to a confident web developer through hands-on practice and real-world projects.
                    </p>
                </section>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <FaRocket style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1.5rem' }} />
                        <h3>Project-Based Learning</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                            Forget boring lectures. Build real applications like Weather Apps, To-Do Lists, and Games to master concepts.
                        </p>
                    </div>
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <FaCode style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '1.5rem' }} />
                        <h3>Pure Fundamentals</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                            No frameworks initially. We focus on pure HTML, CSS, and JavaScript so you understand the core of the web.
                        </p>
                    </div>
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <FaUsers style={{ fontSize: '3rem', color: '#ffd700', marginBottom: '1.5rem' }} />
                        <h3>Community Driven</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                            Join a community of learners, share your projects, and get feedback to improve your skills daily.
                        </p>
                    </div>
                </section>

                <section className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Built by Oruzenlab</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2rem' }}>
                        Oruzenlab is dedicated to creating premium educational experiences. We combine cutting-edge design with effective pedagogy to help you succeed.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    );
}
