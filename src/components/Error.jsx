import React, { useState, useEffect } from 'react';

const Error = ({ error }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (error) setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 8000);
        return () => clearTimeout(timer);
    }, [error]);

    if (!visible) {
        return null;
    }

    return (
        <div
            style={{
                boxSizing: 'border-box',
                minWidth: '20vw',
                padding: '1rem 2rem',
                margin: 'auto',
                color: 'black',
                outline: 'solid 1.5px rgba(196, 95, 95, 0.836)',
                borderRadius: '0.5rem',
                background: 'rgba(248, 231, 231, 0.863)',
                position: 'fixed',
                bottom: '4vh',
                right: '2vw',
                zIndex: 100,
            }}
        >
            <p style={{ margin: 0 }}>{error}</p>
        </div>
    );
};

export default Error;
