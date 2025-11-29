'use client';

import { FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function LogoutModal({ isOpen, onClose }) {
    const { logout } = useAuth();

    if (!isOpen) return null;

    const handleLogout = async () => {
        try {
            await logout();
            onClose();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                background: 'var(--bg-panel)',
                border: '1px solid var(--border-color)',
                padding: '2rem',
                borderRadius: '16px',
                width: '90%',
                maxWidth: '400px',
                position: 'relative',
                textAlign: 'center'
            }} onClick={e => e.stopPropagation()}>

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                    }}
                >
                    <FaTimes />
                </button>

                <h2 style={{ marginBottom: '1rem' }}>Sign Out?</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Are you sure you want to sign out of your account?
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={onClose}
                        className="btn btn-glass"
                        style={{ padding: '0.6rem 2rem' }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="btn"
                        style={{
                            background: '#ff4444',
                            color: '#fff',
                            padding: '0.6rem 2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
