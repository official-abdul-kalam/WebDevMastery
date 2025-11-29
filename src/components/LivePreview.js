'use client';

import { useEffect, useState } from 'react';
import { FaMobileAlt, FaTabletAlt, FaDesktop, FaTimes } from 'react-icons/fa';
import Preview from './Preview';

const DEVICES = [
    { name: 'Responsive', width: '100%', height: '100%', icon: <FaDesktop /> },
    { name: 'iPhone SE', width: '375px', height: '667px', icon: <FaMobileAlt /> },
    { name: 'iPhone 12 Pro', width: '390px', height: '844px', icon: <FaMobileAlt /> },
    { name: 'Pixel 5', width: '393px', height: '851px', icon: <FaMobileAlt /> },
    { name: 'Samsung S8', width: '360px', height: '740px', icon: <FaMobileAlt /> },
    { name: 'iPad Mini', width: '768px', height: '1024px', icon: <FaTabletAlt /> },
    { name: 'iPad Air', width: '820px', height: '1180px', icon: <FaTabletAlt /> },
    { name: 'Surface Pro 7', width: '912px', height: '1368px', icon: <FaTabletAlt /> },
];

export default function LivePreview() {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const channel = new BroadcastChannel('wdm_live_preview');

        const handleMessage = (event) => {
            const { html, css, js } = event.data;
            setHtml(html || '');
            setCss(css || '');
            setJs(js || '');
        };

        channel.onmessage = handleMessage;

        // Request initial data
        channel.postMessage({ type: 'REQUEST_INIT' });

        return () => {
            channel.close();
        };
    }, []);

    if (!html && !css && !js) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0f0f0f',
                color: '#fff'
            }}>
                <div className="loader"></div>
                <h2 style={{ marginTop: '20px', fontWeight: '300' }}>Preview is Loading...</h2>
                <style jsx>{`
                    .loader {
                        width: 50px;
                        aspect-ratio: 1;
                        border-radius: 50%;
                        border: 8px solid #0000;
                        border-right-color: var(--primary);
                        position: relative;
                        animation: l24 1s infinite linear;
                    }
                    .loader:before,
                    .loader:after {
                        content: "";
                        position: absolute;
                        inset: -8px;
                        border-radius: 50%;
                        border: inherit;
                        animation: inherit;
                        animation-duration: 2s;
                    }
                    .loader:after {
                        animation-duration: 4s;
                    }
                    @keyframes l24 {
                        100% { transform: rotate(1turn) }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            background: '#333',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            padding: '20px'
        }}>
            {/* Floating Device Button */}
            <div style={{
                position: 'fixed',
                right: '20px',
                bottom: '20px',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '10px'
            }}>
                {isMenuOpen && (
                    <div className="glass-card" style={{
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        marginBottom: '10px',
                        minWidth: '150px'
                    }}>
                        {DEVICES.map(d => (
                            <button
                                key={d.name}
                                onClick={() => {
                                    setSelectedDevice(d);
                                    setIsMenuOpen(false);
                                }}
                                style={{
                                    background: selectedDevice.name === d.name ? 'var(--primary)' : 'transparent',
                                    color: selectedDevice.name === d.name ? '#000' : '#fff',
                                    border: 'none',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                {d.icon} {d.name}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: '#000',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0,242,255,0.3)',
                        fontSize: '1.2rem'
                    }}
                >
                    {isMenuOpen ? <FaTimes /> : <FaMobileAlt />}
                </button>
            </div>

            {/* Device Frame */}
            <div style={{
                width: selectedDevice.width,
                height: selectedDevice.height,
                maxWidth: '100%',
                maxHeight: '100%',
                background: '#fff',
                boxShadow: selectedDevice.name === 'Responsive' ? 'none' : '0 20px 50px -10px rgba(0,0,0,0.5)',
                borderRadius: selectedDevice.name === 'Responsive' ? '0' : '30px',
                border: selectedDevice.name === 'Responsive' ? 'none' : '12px solid #1a1a1a',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                position: 'relative'
            }}>
                {/* Notch for phones */}
                {(selectedDevice.name.includes('iPhone') || selectedDevice.name.includes('Pixel')) && (
                    <div style={{
                        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                        width: '120px', height: '25px', background: '#1a1a1a',
                        borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px',
                        zIndex: 100
                    }}></div>
                )}

                <Preview html={html} css={css} js={js} />
            </div>
        </div>
    );
}
