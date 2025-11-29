'use client';

import { FaTimes, FaCreditCard, FaLock } from 'react-icons/fa';

export default function PaymentModal({ isOpen, onClose, plan, onConfirm }) {
    if (!isOpen || !plan) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)',
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
                maxWidth: '450px',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>

                <button onClick={onClose} style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
                }}>
                    <FaTimes />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px', height: '60px', borderRadius: '50%',
                        background: 'rgba(0, 242, 255, 0.1)', color: 'var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', margin: '0 auto 1rem'
                    }}>
                        <FaCreditCard />
                    </div>
                    <h2>Secure Checkout</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Complete your subscription to <strong>{plan.name}</strong></p>
                </div>

                <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Plan</span>
                        <strong>{plan.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Duration</span>
                        <strong>{plan.duration}</strong>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{plan.price}</span>
                    </div>
                </div>

                <button
                    onClick={onConfirm}
                    className="btn btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                    <FaLock size={12} /> Pay Securely
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                    This is a secure 256-bit SSL encrypted payment.
                </p>
            </div>
        </div>
    );
}
