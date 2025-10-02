import React from 'react';
import { WheelIcon, StarIcon, TowerIcon, Card, WheelFront, StarFront, TowerFront, EyeClosed, Eye } from '@/components';
import { baseStorage } from '@/utils/storage';
// styles
import styles from './cards.module.css';
import { useNavigate } from 'react-router-dom';
import { ListPath } from '../List';

type CardType = 'None' | 'Wheel' | 'Tower' | 'Star';

const wheelStorage = baseStorage<boolean>('WHEEL_FOUND');
const towerStorage = baseStorage<boolean>('TOWER_FOUND');
const starStorage = baseStorage<boolean>('STAR_FOUND');

export const Cards = (): React.ReactNode => {
    const navigate = useNavigate();

    const [selectedCard, setSelectedCard] = React.useState<CardType>('None');

    const [wheelUnlocked, setWheelUnlocked] = React.useState<boolean>(!!wheelStorage.get());
    const [towerUnlocked, setTowerUnlocked] = React.useState<boolean>(!!towerStorage.get());
    const [starUnlocked, setStarUnlocked] = React.useState<boolean>(!!starStorage.get());

    const render = () => {
        return (
            <section>
                <div className={styles.container}>
                    <div className={styles['eye-container']}>
                        {renderEye()}
                    </div>
                    <div className={styles['card-container']}>
                        {renderCard()}
                    </div>
                    <div className={`${styles['cards-list']} glow`}>
                        <WheelIcon className='' fill='white' found={wheelUnlocked} onClick={() => setSelectedCard('Wheel')} />
                        <TowerIcon className='' fill='white' found={towerUnlocked} onClick={() => setSelectedCard('Tower')} />
                        <StarIcon className='' fill='white' found={starUnlocked} onClick={() => setSelectedCard('Star')} />
                    </div>
                </div>
            </section>
        );
    };

    const renderEye = () => {
        if (wheelStorage.get() && towerStorage.get() && starStorage.get()) {
            return (
                <Eye className={styles.eye} fill='white' onClick={goToList} />
            );
        }

        return (
            <EyeClosed className={styles.eye} fill='white' />
        );
    };

    const renderCard = () => {
        const cardsMap: Map<CardType, () => React.ReactNode> = new Map([
            ['None', () => <></>],
            ['Wheel', () => <Card key={'wheel'} svg={<WheelFront storage={wheelStorage} onHotspotFound={() => setWheelUnlocked(true)} />} />],
            ['Tower', () => <Card key={'tower'} svg={<TowerFront storage={towerStorage} onHotspotFound={() => setTowerUnlocked(true)} />} />],
            ['Star', () => <Card key={'star'} svg={<StarFront storage={starStorage} onHotspotFound={() => setStarUnlocked(true)} />} />],
        ]);

        return cardsMap.get(selectedCard)?.();
    };

    const goToList = () => {
        navigate(ListPath);
    };

    return render();
};
