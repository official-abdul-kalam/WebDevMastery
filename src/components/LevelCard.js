'use client';

import Link from 'next/link';
import { FaLock, FaPlay, FaCheckCircle, FaCode, FaBook, FaDesktop } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function LevelCard({ id, title, description, type, isLocked }) {
    const { userData, isPremium } = useAuth();
    const isCompleted = userData?.completedItems?.includes(id);

    // If user is premium, nothing is locked
    const effectiveLocked = isLocked && !isPremium;

    // Determine icon based on type
    let Icon = FaCode;
    if (type === 'project') Icon = FaDesktop;
    if (type === 'theory') Icon = FaBook;

    // Determine link path
    let href = `/player/${type}/${id}`;

    return (
        <Link
            href={isLocked ? '/pricing' : href}
            className={`level-card ${type === 'theory' ? 'card-theory' : ''} ${type === 'project' ? 'card-project' : ''} ${isLocked ? 'locked' : ''}`}
            style={{
                position: 'relative',
                border: isCompleted ? '1px solid #4ade80' : undefined,
                boxShadow: isCompleted ? '0 0 15px rgba(74, 222, 128, 0.1)' : undefined
            }}
        >
            {isCompleted && (
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: '#4ade80',
                    zIndex: 10,
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '50%',
                    padding: '2px'
                }}>
                    <FaCheckCircle size={20} />
                </div>
            )}

            <div className="card-number">{id.replace ? id.replace('level-', '').replace('project-', '') : id}</div>

            <div className="card-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                    {isLocked ? <FaLock style={{ color: '#ff4444' }} /> : <Icon style={{ color: isCompleted ? '#4ade80' : 'var(--primary)' }} />}
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                        {type}
                    </span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>

                <span className="btn-start" style={{
                    background: isCompleted ? 'rgba(74, 222, 128, 0.1)' : undefined,
                    color: isCompleted ? '#4ade80' : undefined,
                    border: isCompleted ? '1px solid #4ade80' : undefined
                }}>
                    {isLocked ? 'Locked (Premium)' : (isCompleted ? 'Review' : 'Start Learning')}
                </span>
            </div>
        </Link>
    );
}
