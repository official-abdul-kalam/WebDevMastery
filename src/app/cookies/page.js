import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Cookies() {
    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Cookie Policy</h1>
                <div className="glass-card">
                    <p style={{ marginBottom: '1rem' }}>
                        This website uses cookies to enhance your experience. By using our website, you consent to the use of cookies in accordance with this policy.
                    </p>
                    <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>What are cookies?</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to remember your actions and preferences over a period of time.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}
