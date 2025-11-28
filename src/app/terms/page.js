import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Terms() {
    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Terms of Service</h1>
                <div className="glass-card">
                    <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Last updated: {new Date().toLocaleDateString()}</p>
                    <p style={{ marginBottom: '1rem' }}>
                        Please read these terms and conditions carefully before using Our Service.
                    </p>
                    <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Interpretation and Definitions</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                    </p>
                    <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Acknowledgment</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                    </p>
                    {/* Add more dummy content as needed */}
                </div>
            </main>
            <Footer />
        </>
    );
}
