import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Refund() {
    return (
        <>
            <Navbar />
            <main className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Refund Policy</h1>
                <div className="glass-card">
                    <p style={{ marginBottom: '1rem' }}>
                        We want you to be satisfied with your purchase. If you are not completely happy with the course, we offer a refund policy under the following conditions:
                    </p>
                    <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>Refund requests must be made within 14 days of purchase.</li>
                        <li style={{ marginBottom: '0.5rem' }}>You must have completed less than 30% of the course content.</li>
                    </ul>
                    <p>
                        To request a refund, please contact our support team at support@oruzenlab.com.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}
