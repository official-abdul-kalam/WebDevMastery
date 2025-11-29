'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastContext = createContext({});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {toasts.map(toast => (
                    <div key={toast.id} className="glass-card" style={{
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        minWidth: '300px',
                        borderLeft: `4px solid ${toast.type === 'success' ? '#00c851' :
                            toast.type === 'error' ? '#ff4444' :
                                'var(--primary)'
                            }`,
                        animation: 'slideIn 0.3s ease'
                    }}>
                        {toast.type === 'success' && <FaCheckCircle style={{ color: '#00c851' }} />}
                        {toast.type === 'error' && <FaExclamationCircle style={{ color: '#ff4444' }} />}
                        {toast.type === 'info' && <FaInfoCircle style={{ color: 'var(--primary)' }} />}

                        <span style={{ flex: 1, fontSize: '0.9rem' }}>{toast.message}</span>

                        <button
                            onClick={() => removeToast(toast.id)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                        >
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>

        </ToastContext.Provider>
    );
};
