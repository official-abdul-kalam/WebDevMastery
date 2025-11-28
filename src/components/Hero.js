import { FaArrowRight } from 'react-icons/fa';

export default function Hero() {
    return (
        <header className="hero">
            <div className="container">
                <h1 className="hero-title">Master Web Development<br />From Zero to Hero</h1>
                <p className="hero-subtitle">
                    50 Interactive Levels. Pure HTML, CSS, and JavaScript. No frameworks, just raw power. Learn by doing.
                </p>
                <a href="#curriculum" className="btn btn-primary">
                    Start Journey <FaArrowRight style={{ marginLeft: '8px' }} />
                </a>
            </div>
        </header>
    );
}
