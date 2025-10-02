import React from 'react';
import styles from './overlay.module.css';

interface Props {
    children: React.ReactNode;
}

export const Overlay = ({ children }: Props): React.ReactNode => {

    const render = () => {
        return (
            <div className={`${styles['overlay']}`}>
                {children}
            </div>
        )
    };

    return render();
}
