import { Eye } from '@/components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardsPath } from '../Cards';
// styles
import styles from './list.module.css';

export const List = (): React.ReactNode => {
    const navigate = useNavigate();

    const render = (): React.JSX.Element => {
        return (
            <section>
                {renderMessage()}
                {renderEye()}
            </section>
        );
    };

    const renderMessage = (): React.JSX.Element => {
        return (
            <>
                <h1 className={`eagle-lake-regular ${styles.title}`}>
                    Prepara tu maleta
                </h1>

                <p className={`eagle-lake-regular ${styles.message}`}>
                    <ul>
                        <li>Pijama (opcional)</li>
                        <li>Mechero</li>
                        <li>Bañador/bikini</li>
                        <li>Botiquín</li>
                        <li>Chanclas, gorro</li>
                        <li>Papel higiénico</li>
                        <li>Traje negro, zapatos</li>
                        <li>Linterna</li>
                        <li>Ropa de fiesta</li>
                        <li>Flotador</li>
                        <li>Playeras</li>
                        <li>Guantes</li>
                        <li>Calzado cómodo</li>
                        <li>Purpurina</li>
                        <li>Chándal retro</li>
                        <li>Cortapizza</li>
                        <li>Pendientes de aro</li>
                        <li>Cantimplora</li>
                    </ul>
                </p>
            </>
        );
    };

    const renderEye = () => {
        return (
            <Eye className={styles.eye} fill='white' onClick={goToCards} />
        );
    };

    const goToCards = () => {
        navigate(CardsPath);
    };

    return render();
}
