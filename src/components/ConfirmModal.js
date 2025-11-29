'use client';

import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", isDanger = false }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
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

                <button onClick={onClose} style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
                }}>
                    <FaTimes />
                </button>

                <FaExclamationTriangle style={{ fontSize: '3rem', color: isDanger ? '#ff4444' : 'var(--primary)', marginBottom: '1rem' }} />

                <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{message}</p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={onClose} className="btn btn-glass">Cancel</button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className="btn"
                        style={{
                            background: isDanger ? '#ff4444' : 'var(--primary)',
                            color: isDanger ? '#fff' : '#000'
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
