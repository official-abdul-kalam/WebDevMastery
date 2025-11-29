'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    FaArrowLeft, FaExternalLinkAlt, FaPlus, FaTimes, FaRedo, FaFile,
    FaHtml5, FaCss3Alt, FaJs, FaFolderOpen, FaMobileAlt, FaTabletAlt,
    FaDesktop, FaCheckCircle, FaRegCheckCircle
} from 'react-icons/fa';
import CodeEditor from './Editor';
import Preview from './Preview';
import AddFileModal from './AddFileModal';
import ConfirmModal from './ConfirmModal';
import AssetManager from './AssetManager';
import { modules } from '@/data/modules';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext'; // Assuming we'll use this for persistence

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

export default function PlayerClient() {
    const params = useParams();
    const router = useRouter();
    const { type, id } = params;
    const { addToast } = useToast();
    const { user, toggleCompletion, userData, isPremium, loading: authLoading } = useAuth(); // Get user for persistence

    // Security Check: Redirect if content is locked and user is not premium
    useEffect(() => {
        if (authLoading) return;

        // If user is logged in but userData hasn't loaded yet, wait.
        if (user && !userData) return;

        // Find which module this content belongs to
        let parentModuleIndex = -1;
        modules.forEach((mod, index) => {
            if (mod.items.some(item => item.id === id)) {
                parentModuleIndex = index;
            }
        });

        // Module 1 (index 0) is free. Others are locked.
        const isContentLocked = parentModuleIndex > 0;

        console.log(`[Security] ID: ${id}, Locked: ${isContentLocked}, Premium: ${isPremium}, User: ${user?.email}`);

        if (isContentLocked && !isPremium) {
            console.warn("[Security] Access Denied. Redirecting to pricing.");
            router.push('/pricing');
            addToast("This content is locked for Premium users.", "error");
        }
    }, [id, isPremium, authLoading, router, addToast, user, userData]);

    // State for files: Array of { name, language, content }
    const [files, setFiles] = useState([]);
    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initialFiles, setInitialFiles] = useState([]);

    // Assets State
    const [assets, setAssets] = useState([]);

    // Modals State
    const [isAddFileOpen, setIsAddFileOpen] = useState(false);
    const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
    const [isAssetManagerOpen, setIsAssetManagerOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [fileToDeleteIndex, setFileToDeleteIndex] = useState(null);

    // Rename state
    const [editingFileNameIndex, setEditingFileNameIndex] = useState(null);
    const [editingName, setEditingName] = useState('');

    // Split Pane State
    const [splitPosition, setSplitPosition] = useState(50); // Percentage
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    // Device State
    const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
    const [isRead, setIsRead] = useState(false);

    // Broadcast Channel for Live Sync
    const channelRef = useRef(null);

    // Sync isRead with userData
    useEffect(() => {
        if (userData?.completedItems && id) {
            setIsRead(userData.completedItems.includes(id));
        }
    }, [userData, id]);

    // Auto-mark as read on load (only once)
    const hasAutoMarked = useRef(false);

    useEffect(() => {
        if (userData && id && !hasAutoMarked.current) {
            // If already completed, just mark flag as true
            if (userData.completedItems?.includes(id)) {
                hasAutoMarked.current = true;
            }
            // If not completed, mark it and set flag
            else {
                toggleCompletion(id);
                hasAutoMarked.current = true;
            }
        }
    }, [userData, id]);

    // Resize Handlers
    const startResize = (e) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const stopResize = () => {
        setIsDragging(false);
    };

    const resize = (e) => {
        if (isDragging && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const newSplit = ((e.clientX - containerRect.left) / containerRect.width) * 100;
            // Limit split between 20% and 80%
            if (newSplit > 20 && newSplit < 80) {
                setSplitPosition(newSplit);
            }
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        };
    }, [isDragging]);

    useEffect(() => {
        channelRef.current = new BroadcastChannel('wdm_live_preview');

        // Listen for init requests from new tabs
        channelRef.current.onmessage = (event) => {
            if (event.data.type === 'REQUEST_INIT') {
                broadcastCode();
            }
        };

        return () => {
            if (channelRef.current) channelRef.current.close();
        };
    }, []);

    // Helper to get aggregated content with Asset Replacement
    const getAggregatedCode = (currentFiles, currentAssets) => {
        const htmlFile = currentFiles.find(f => f.name === 'index.html');
        const cssFiles = currentFiles.filter(f => f.name.endsWith('.css'));
        const jsFiles = currentFiles.filter(f => f.name.endsWith('.js'));

        let htmlContent = htmlFile ? htmlFile.content : '';
        let cssContent = cssFiles.map(f => f.content).join('\n\n');
        let jsContent = jsFiles.map(f => f.content).join('\n\n');

        // Replace asset filenames with their Data URLs in HTML and CSS
        if (currentAssets && currentAssets.length > 0) {
            currentAssets.forEach(asset => {
                // Replace in HTML: src="filename" or href="filename"
                const regexHtml = new RegExp(`(src|href)=["']${asset.name}["']`, 'g');
                htmlContent = htmlContent.replace(regexHtml, `$1="${asset.url}"`);

                // Replace in CSS: url('filename') or url("filename")
                const regexCss = new RegExp(`url\\(["']?${asset.name}["']?\\)`, 'g');
                cssContent = cssContent.replace(regexCss, `url("${asset.url}")`);
            });
        }

        return {
            html: htmlContent,
            css: cssContent,
            js: jsContent
        };
    };

    const broadcastCode = () => {
        if (!channelRef.current || files.length === 0) return;
        const { html, css, js } = getAggregatedCode(files, assets);
        channelRef.current.postMessage({ html, css, js });
    };

    // Broadcast whenever files or assets change
    useEffect(() => {
        if (files.length > 0) {
            broadcastCode();
        }
    }, [files, assets]);

    useEffect(() => {
        if (!type || !id) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                let basePath = '';
                if (type === 'level') basePath = `/content/levels/${id}`;
                if (type === 'project') basePath = `/content/projects/${id}`;
                if (type === 'theory') basePath = `/content/theory`;

                if (type === 'theory') {
                    const res = await fetch(`${basePath}/${id}.json`);
                    const data = await res.json();
                    setMeta(data);
                    setLoading(false);
                    return;
                }

                // Always fetch initial files to have a baseline for Reset
                const [htmlRes, cssRes, jsRes, metaRes] = await Promise.all([
                    fetch(`${basePath}/index.html`),
                    fetch(`${basePath}/style.css`),
                    fetch(`${basePath}/script.js`),
                    fetch(`${basePath}/meta.json`)
                ]);

                if (!htmlRes.ok) throw new Error('Failed to load content');

                const fetchedFiles = [
                    { name: 'index.html', language: 'html', content: await htmlRes.text() },
                    { name: 'style.css', language: 'css', content: await cssRes.text() },
                    { name: 'script.js', language: 'javascript', content: await jsRes.text() }
                ];
                setInitialFiles(fetchedFiles);
                setMeta(await metaRes.json());

                // Try to load from local storage
                const storageKey = `wdm-${type}-${id}-files`;
                const savedData = localStorage.getItem(storageKey);

                if (savedData) {
                    const parsedFiles = JSON.parse(savedData);
                    setFiles(parsedFiles);
                } else {
                    setFiles(fetchedFiles);
                }

                // Load Assets from local storage
                const assetsKey = `wdm-${type}-${id}-assets`;
                const savedAssets = localStorage.getItem(assetsKey);
                if (savedAssets) {
                    setAssets(JSON.parse(savedAssets));
                }

            } catch (error) {
                console.error("Error loading level:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, id]);

    // Save to local storage whenever files change
    useEffect(() => {
        if (!loading && type !== 'theory' && files.length > 0) {
            const storageKey = `wdm-${type}-${id}-files`;
            localStorage.setItem(storageKey, JSON.stringify(files));
        }
    }, [files, loading, type, id]);

    // Save assets to local storage
    useEffect(() => {
        if (!loading && type !== 'theory') {
            const assetsKey = `wdm-${type}-${id}-assets`;
            localStorage.setItem(assetsKey, JSON.stringify(assets));
        }
    }, [assets, loading, type, id]);

    const handleReset = () => {
        setFiles(JSON.parse(JSON.stringify(initialFiles))); // Deep copy
        setActiveFileIndex(0);
    };

    const handleOpenNewTab = () => {
        window.open('/preview', '_blank');
    };

    const handleAddFile = (fileName) => {
        if (!fileName) return;

        if (files.some(f => f.name === fileName)) {
            addToast("File already exists!", 'error');
            return;
        }

        let language = 'plaintext';
        if (fileName.endsWith('.html')) language = 'html';
        if (fileName.endsWith('.css')) language = 'css';
        if (fileName.endsWith('.js')) language = 'javascript';

        const newFile = { name: fileName, language, content: '' };
        setFiles([...files, newFile]);
        setActiveFileIndex(files.length); // Switch to new file
    };

    const confirmDeleteFile = (index, e) => {
        e.stopPropagation();
        setFileToDeleteIndex(index);
        setIsDeleteConfirmOpen(true);
    };

    const handleDeleteFile = () => {
        if (fileToDeleteIndex === null) return;
        const newFiles = files.filter((_, i) => i !== fileToDeleteIndex);
        setFiles(newFiles);
        if (activeFileIndex >= newFiles.length) {
            setActiveFileIndex(Math.max(0, newFiles.length - 1));
        }
        setFileToDeleteIndex(null);
    };

    const startRenaming = (index, e) => {
        e.stopPropagation();
        setEditingFileNameIndex(index);
        setEditingName(files[index].name);
    };

    const saveRename = () => {
        if (editingFileNameIndex === null) return;

        const newName = editingName.trim();
        if (!newName) {
            setEditingFileNameIndex(null);
            return;
        }

        // Check for duplicate names (excluding self)
        if (files.some((f, i) => i !== editingFileNameIndex && f.name === newName)) {
            addToast("File name already exists!", 'error');
            return;
        }

        const newFiles = [...files];
        newFiles[editingFileNameIndex].name = newName;

        // Update language based on extension
        if (newName.endsWith('.html')) newFiles[editingFileNameIndex].language = 'html';
        else if (newName.endsWith('.css')) newFiles[editingFileNameIndex].language = 'css';
        else if (newName.endsWith('.js')) newFiles[editingFileNameIndex].language = 'javascript';
        else newFiles[editingFileNameIndex].language = 'plaintext';

        setFiles(newFiles);
        setEditingFileNameIndex(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') saveRename();
        if (e.key === 'Escape') setEditingFileNameIndex(null);
    };

    const updateFileContent = (newContent) => {
        const newFiles = [...files];
        newFiles[activeFileIndex].content = newContent;
        setFiles(newFiles);
    };

    const getFileIcon = (fileName) => {
        if (fileName.endsWith('.html')) return <FaHtml5 style={{ color: '#E34F26' }} />;
        if (fileName.endsWith('.css')) return <FaCss3Alt style={{ color: '#1572B6' }} />;
        if (fileName.endsWith('.js')) return <FaJs style={{ color: '#F7DF1E' }} />;
        return <FaFile />;
    };

    const toggleRead = () => {
        toggleCompletion(id);
    };

    if (loading) {
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

    if (type === 'theory') {
        return (
            <div className="container" style={{ paddingTop: '2rem' }}>
                <Link href="/" className="btn btn-glass" style={{ marginBottom: '2rem' }}>
                    <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Dashboard
                </Link>
                <div className="glass-card">
                    <h1>{meta?.title}</h1>
                    <p>{meta?.description}</p>
                    <div style={{ marginTop: '2rem' }}>
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{JSON.stringify(meta, null, 2)}</pre>
                    </div>
                </div>
            </div>
        )
    }

    const activeFile = files[activeFileIndex];
    const { html, css, js } = getAggregatedCode(files, assets);

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header style={{
                height: '60px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1.5rem',
                background: 'var(--bg-panel)',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link href="/" style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        color: '#fff', fontSize: '1rem', fontWeight: '500',
                        textDecoration: 'none', padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.05)', borderRadius: '8px',
                        transition: 'all 0.2s'
                    }} className="hover:bg-white/10">
                        <FaArrowLeft /> Back
                    </Link>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-muted)' }}>{meta?.title || id}</h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Mark as Read Toggle */}
                    <button
                        onClick={toggleRead}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            background: 'transparent', border: 'none',
                            color: isRead ? '#4ade80' : 'var(--text-muted)',
                            cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500'
                        }}
                    >
                        {isRead ? <FaCheckCircle size={18} /> : <FaRegCheckCircle size={18} />}
                        {isRead ? 'Completed' : 'Mark as Read'}
                    </button>

                    <button onClick={handleOpenNewTab} className="btn btn-primary" style={{
                        padding: '0.5rem 1.2rem', fontSize: '0.9rem', gap: '8px',
                        display: 'flex', alignItems: 'center'
                    }}>
                        <FaExternalLinkAlt /> Open Live Preview
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div
                ref={containerRef}
                style={{
                    flex: 1,
                    display: 'flex',
                    overflow: 'hidden',
                    position: 'relative',
                    userSelect: isDragging ? 'none' : 'auto'
                }}
            >
                {/* LEFT PANE: Editor */}
                <div style={{ width: `${splitPosition}%`, borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', position: 'relative' }}>

                    {/* File Tabs & Controls */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#1e1e1e',
                        borderBottom: '1px solid #333',
                        position: 'relative',
                        height: '45px'
                    }}>
                        {/* Scrollable Tabs */}
                        <div style={{
                            display: 'flex',
                            overflowX: 'auto',
                            flex: 1,
                            paddingRight: '180px', // Space for sticky buttons
                            scrollbarWidth: 'none'
                        }}>
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveFileIndex(index)}
                                    onDoubleClick={(e) => startRenaming(index, e)}
                                    style={{
                                        padding: '0 1.2rem',
                                        height: '45px',
                                        background: activeFileIndex === index ? '#1e1e1e' : '#2d2d2d',
                                        color: activeFileIndex === index ? '#fff' : '#aaa',
                                        borderRight: '1px solid #333',
                                        borderTop: activeFileIndex === index ? '2px solid var(--primary)' : '2px solid transparent',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        minWidth: '120px',
                                        justifyContent: 'space-between',
                                        userSelect: 'none',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {editingFileNameIndex === index ? (
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            onBlur={saveRename}
                                            onKeyDown={handleKeyDown}
                                            autoFocus
                                            style={{
                                                background: '#000',
                                                color: '#fff',
                                                border: '1px solid var(--primary)',
                                                padding: '2px 5px',
                                                width: '80px'
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    ) : (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {getFileIcon(file.name)} {file.name}
                                        </span>
                                    )}

                                    <FaTimes
                                        size={12}
                                        onClick={(e) => confirmDeleteFile(index, e)}
                                        style={{ color: '#aaa', opacity: 0.7, cursor: 'pointer' }}
                                        className="hover:text-red-500"
                                        title="Delete File"
                                    />
                                </div>
                            ))}

                            <button
                                onClick={() => setIsAddFileOpen(true)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    padding: '0 1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    height: '45px'
                                }}
                                title="Add File"
                            >
                                <FaPlus />
                            </button>
                        </div>

                        {/* Sticky Controls */}
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            display: 'flex',
                            background: '#1e1e1e', // Match tab bg to cover scrolling
                            boxShadow: '-5px 0 10px rgba(0,0,0,0.2)',
                            zIndex: 10
                        }}>
                            <button
                                onClick={() => setIsResetConfirmOpen(true)}
                                title="Reset Code"
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#aaa',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.9rem',
                                    padding: '0 1rem',
                                    borderLeft: '1px solid #333'
                                }}
                                className="hover:text-white"
                            >
                                <FaRedo /> Reset
                            </button>

                            <button
                                onClick={() => setIsAssetManagerOpen(!isAssetManagerOpen)}
                                title="Asset Manager"
                                style={{
                                    background: isAssetManagerOpen ? 'var(--primary)' : 'transparent',
                                    border: 'none',
                                    color: isAssetManagerOpen ? '#000' : 'var(--secondary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.9rem',
                                    padding: '0 1rem',
                                    borderLeft: '1px solid #333'
                                }}
                            >
                                <FaFolderOpen size={16} /> Assets
                            </button>
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        {activeFile && (
                            <CodeEditor
                                language={activeFile.language}
                                value={activeFile.content}
                                onChange={updateFileContent}
                            />
                        )}
                    </div>
                </div>

                {/* RESIZER */}
                <div
                    onMouseDown={startResize}
                    style={{
                        width: '6px',
                        background: isDragging ? 'var(--primary)' : '#333',
                        cursor: 'col-resize',
                        zIndex: 10,
                        transition: 'background 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{ width: '2px', height: '20px', background: '#666', borderRadius: '1px' }}></div>
                </div>

                {/* RIGHT PANE: Preview */}
                <div style={{ width: `${100 - splitPosition}%`, background: '#f0f0f0', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                    {/* Device Toolbar */}
                    <div style={{
                        height: '45px',
                        background: '#e0e0e0',
                        borderBottom: '1px solid #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        padding: '0 1rem'
                    }}>
                        <select
                            value={selectedDevice.name}
                            onChange={(e) => setSelectedDevice(DEVICES.find(d => d.name === e.target.value))}
                            style={{
                                padding: '4px 8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                fontSize: '0.9rem',
                                background: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            {DEVICES.map(d => (
                                <option key={d.name} value={d.name}>{d.name} ({d.width})</option>
                            ))}
                        </select>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>
                            {selectedDevice.width} x {selectedDevice.height}
                        </span>
                    </div>

                    {/* Preview Area */}
                    <div style={{
                        flex: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#dcdcdc',
                        padding: '20px'
                    }}>
                        <div style={{
                            width: selectedDevice.width,
                            height: selectedDevice.height,
                            maxWidth: '100%',
                            maxHeight: '100%',
                            background: '#fff',
                            boxShadow: selectedDevice.name === 'Responsive' ? 'none' : '0 20px 50px -10px rgba(0,0,0,0.3)',
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

                            <div style={{
                                width: '100%', height: '100%',
                                pointerEvents: isDragging ? 'none' : 'auto'
                            }}>
                                <Preview html={html} css={css} js={js} />
                            </div>
                        </div>
                    </div>

                    {/* Asset Manager Sidebar (Overlay inside Preview) */}
                    {isAssetManagerOpen && (
                        <AssetManager
                            assets={assets}
                            setAssets={setAssets}
                            onClose={() => setIsAssetManagerOpen(false)}
                        />
                    )}
                </div>
            </div>

            {/* Modals */}
            <AddFileModal
                isOpen={isAddFileOpen}
                onClose={() => setIsAddFileOpen(false)}
                onAdd={handleAddFile}
            />
            <ConfirmModal
                isOpen={isResetConfirmOpen}
                onClose={() => setIsResetConfirmOpen(false)}
                onConfirm={handleReset}
                title="Reset Code?"
                message="Are you sure you want to reset your code to the beginning? This cannot be undone."
                confirmText="Reset"
                isDanger={true}
            />
            <ConfirmModal
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleDeleteFile}
                title="Delete File?"
                message={`Are you sure you want to delete ${fileToDeleteIndex !== null ? files[fileToDeleteIndex]?.name : 'this file'}?`}
                confirmText="Delete"
                isDanger={true}
            />
        </div>
    );
}
