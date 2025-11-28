'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaPlay, FaCode, FaDesktop } from 'react-icons/fa';
import CodeEditor from './Editor';
import Preview from './Preview';

export default function PlayerClient() {
    const params = useParams();
    const router = useRouter();
    const { type, id } = params;

    const [activeTab, setActiveTab] = useState('html');
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!type || !id) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                // Determine path based on type
                // theory is different, but for now let's handle levels/projects
                // If type is theory, we might render a different component or fetch markdown/json

                let basePath = '';
                if (type === 'level') basePath = `/content/levels/${id}`;
                if (type === 'project') basePath = `/content/projects/${id}`;
                if (type === 'theory') basePath = `/content/theory`; // Theory handling might need adjustment

                if (type === 'theory') {
                    // Special handling for theory if needed, or redirect
                    // For now, let's assume we just load the JSON
                    const res = await fetch(`${basePath}/${id}.json`);
                    const data = await res.json();
                    setMeta(data);
                    setLoading(false);
                    return;
                }

                const [htmlRes, cssRes, jsRes, metaRes] = await Promise.all([
                    fetch(`${basePath}/index.html`),
                    fetch(`${basePath}/style.css`),
                    fetch(`${basePath}/script.js`),
                    fetch(`${basePath}/meta.json`)
                ]);

                if (!htmlRes.ok) throw new Error('Failed to load content');

                setHtml(await htmlRes.text());
                setCss(await cssRes.text());
                setJs(await jsRes.text());
                setMeta(await metaRes.json());
            } catch (error) {
                console.error("Error loading level:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, id]);

    if (loading) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>Loading...</div>;

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
                        {/* Render Theory Content Here - Simplistic for now */}
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{JSON.stringify(meta, null, 2)}</pre>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header style={{
                height: '60px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 2rem',
                background: 'var(--bg-panel)',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <FaArrowLeft /> Back
                    </Link>
                    <h3 style={{ margin: 0 }}>{meta?.title || id}</h3>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className={`btn ${activeTab === 'html' ? 'btn-primary' : 'btn-glass'}`}
                        onClick={() => setActiveTab('html')}
                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                    >
                        HTML
                    </button>
                    <button
                        className={`btn ${activeTab === 'css' ? 'btn-primary' : 'btn-glass'}`}
                        onClick={() => setActiveTab('css')}
                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                    >
                        CSS
                    </button>
                    <button
                        className={`btn ${activeTab === 'js' ? 'btn-primary' : 'btn-glass'}`}
                        onClick={() => setActiveTab('js')}
                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                    >
                        JS
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Editor Pane */}
                <div style={{ flex: 1, borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1 }}>
                        {activeTab === 'html' && <CodeEditor language="html" value={html} onChange={setHtml} />}
                        {activeTab === 'css' && <CodeEditor language="css" value={css} onChange={setCss} />}
                        {activeTab === 'js' && <CodeEditor language="javascript" value={js} onChange={setJs} />}
                    </div>
                </div>

                {/* Preview Pane */}
                <div style={{ flex: 1, background: '#fff' }}>
                    <Preview html={html} css={css} js={js} />
                </div>
            </div>
        </div>
    );
}
