import React from 'react';
import styles from './card.module.css';
import { CardCover } from './CardCover';

interface Props {
    svg: React.ReactNode;
}

export const Card = ({ svg }: Props): React.ReactNode => {

    const [isRotated, setIsRotated] = React.useState<boolean>(false);

    const rotatedClassName = isRotated && styles['tarot-card-rotated'];

    const render = () => {
        return (
            <div className={`${styles['tarot-container']} ${rotatedClassName}`}>
                <div className={styles['tarot-card']}>
                    <div className={`${styles['card-face']} ${styles['back']}`}>
                        <div className={styles['card']} onClick={() => setIsRotated(true)}>
                            <CardCover />
                        </div>
                    </div>
                    <div className={`${styles['card-face']} ${styles['front']}`}>
                        <div className={styles['card']}>
                            {svg}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return render();
}
