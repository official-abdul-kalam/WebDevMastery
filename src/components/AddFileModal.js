'use client';

import { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';

export default function AddFileModal({ isOpen, onClose, onAdd }) {
    const [fileName, setFileName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(fileName);
        setFileName('');
        onClose();
    };

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
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>

                <button onClick={onClose} style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
                }}>
                    <FaTimes />
                </button>

                <h3 style={{ marginBottom: '1.5rem' }}>Create New File</h3>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="e.g., style2.css, utils.js"
                        value={fileName}
                        onChange={e => setFileName(e.target.value)}
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            color: '#fff',
                            marginBottom: '1.5rem',
                            outline: 'none'
                        }}
                    />

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        <FaPlus style={{ marginRight: '8px' }} /> Create File
                    </button>
                </form>
            </div>
        </div>
    );
}
