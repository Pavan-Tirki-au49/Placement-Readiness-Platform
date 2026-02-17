import React from 'react';

// UI Components
export const Badge = ({ label, variant = 'default' }) => {
    const className = `badge badge-${variant}`;
    return <span className={className}>{label}</span>;
};

export const Button = ({ children, variant = 'primary', onClick, ...props }) => {
    return (
        <button className={`btn btn-${variant}`} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export const Input = ({ label, type = 'text', placeholder, ...props }) => {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <input
                className="input-field"
                type={type}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

export const Card = ({ title, children, className = '' }) => {
    return (
        <div className={`card ${className}`}>
            {title && <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>{title}</h3>}
            {children}
        </div>
    );
};

// Layout Components
export const TopBar = ({ projectName, stepCurrent, stepTotal, status }) => {
    return (
        <div className="top-bar">
            <div style={{ fontWeight: 600, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', background: 'var(--accent-primary)', borderRadius: '4px' }}></div>
                {projectName}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Step {stepCurrent} <span style={{ color: 'var(--border-strong)' }}>/</span> {stepTotal}
            </div>
            <Badge label={status} variant="progress" />
        </div>
    );
};

export const ContextHeader = ({ title, subtitle }) => {
    return (
        <div className="context-header">
            <h1>{title}</h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>{subtitle}</p>
        </div>
    );
};

export const ProofFooter = () => {
    return (
        <div className="proof-footer">
            <div style={{ fontWeight: 600, marginRight: '16px' }}>Validation:</div>
            <ProofItem label="UI Built" />
            <ProofItem label="Logic Working" />
            <ProofItem label="Test Passed" />
            <ProofItem label="Deployed" />

            <div style={{ flex: 1 }}></div>
            <Button variant="primary" style={{ padding: '8px 24px' }}>Confirm Validation</Button>
        </div>
    );
};

const ProofItem = ({ label }) => {
    return (
        <label className="proof-item" style={{ cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)' }} />
            {label}
        </label>
    );
};
