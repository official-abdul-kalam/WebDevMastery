'use client';

import { useRef } from 'react';
import { FaTimes, FaCloudUploadAlt, FaCopy, FaImage, FaVideo, FaFile } from 'react-icons/fa';
import { useToast } from '@/context/ToastContext';

export default function AssetManager({ assets, setAssets, onClose }) {
    const fileInputRef = useRef(null);
    const { addToast } = useToast();

    const handleUpload = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            // Check if file with same name exists
            if (assets.some(a => a.name === file.name)) {
                addToast(`File ${file.name} already exists!`, 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                setAssets(prev => [...prev, {
                    name: file.name,
                    type: file.type,
                    url: event.target.result,
                    size: (file.size / 1024).toFixed(2) + ' KB'
                }]);
                addToast(`Uploaded ${file.name}`, 'success');
            };
            reader.readAsDataURL(file);
        });
    };

    const copyToClipboard = (name) => {
        navigator.clipboard.writeText(name);
        addToast(`Copied "${name}" to clipboard!`, 'success');
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '300px',
            background: 'var(--bg-panel)',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
            animation: 'slideInLeft 0.3s ease-out forwards',
            boxShadow: '5px 0 15px rgba(0,0,0,0.3)'
        }}>
            {/* Header */}
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>Assets</h3>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <FaTimes />
                </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>

                {/* Upload Area */}
                <div
                    style={{
                        border: '2px dashed var(--border-color)',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        marginBottom: '1.5rem',
                        transition: 'all 0.3s ease',
                        background: 'rgba(255,255,255,0.02)'
                    }}
                    onClick={() => fileInputRef.current.click()}
                >
                    <FaCloudUploadAlt style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }} />
                    <p style={{ fontSize: '0.8rem', margin: 0, color: 'var(--text-muted)' }}>Click to Upload</p>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                    />
                </div>

                {/* Asset List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {assets.map((asset, index) => (
                        <div key={index} className="glass-card" style={{ padding: '0.8rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{
                                width: '50px', height: '50px',
                                background: '#000', borderRadius: '4px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                overflow: 'hidden', flexShrink: 0
                            }}>
                                {asset.type.startsWith('image/') ? (
                                    <img src={asset.url} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : asset.type.startsWith('video/') ? (
                                    <FaVideo style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }} />
                                ) : (
                                    <FaFile style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }} />
                                )}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={asset.name}>
                                    {asset.name}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                    {asset.size}
                                </div>
                            </div>

                            <button
                                onClick={() => copyToClipboard(asset.name)}
                                title="Copy Filename"
                                style={{
                                    background: 'transparent', border: 'none',
                                    color: 'var(--primary)', cursor: 'pointer',
                                    padding: '5px'
                                }}
                            >
                                <FaCopy />
                            </button>
                        </div>
                    ))}
                </div>

                {assets.length === 0 && (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem', fontSize: '0.9rem' }}>
                        No assets yet.
                    </div>
                )}

            </div>
        </div>
    );
}
