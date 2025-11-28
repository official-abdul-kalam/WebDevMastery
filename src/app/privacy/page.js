import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Privacy() {
    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
                <div className="glass-card">
                    <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Last updated: {new Date().toLocaleDateString()}</p>
                    <p style={{ marginBottom: '1rem' }}>
                        At WebDevMastery, accessible from webdevmastery.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by WebDevMastery and how we use it.
                    </p>
                    <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Information We Collect</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        We only collect information that you voluntarily provide to us when you register for an account, purchase a course, or contact us.
                    </p>
                    {/* Add more dummy content as needed */}
                </div>
            </main>
            <Footer />
        </>
    );
}
