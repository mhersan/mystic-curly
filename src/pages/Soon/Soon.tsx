import { Eye, EyeClosed } from '@components/Eye';
import { baseStorage } from '@utils/storage';
import React from 'react';
import { stageMessageMap } from './stages';
// styles
import styles from './soon.module.css';

interface SoonStage {
    targetDate: number;
    step: number;
}

const soonStorage = baseStorage<SoonStage>('SOON_STAGE');

export const Soon = (): React.ReactNode => {
    const [refresh, setRefresh] = React.useState<number>(0);

    const [message, waiting] = checkStage();

    const render = (): React.JSX.Element => {
        const content = waiting ? renderMessage() : renderEye();

        return (
            <section key={refresh}>
                {content}
            </section>
        );
    };

    const renderMessage = (): React.JSX.Element => {
        const fullWaitingText = `La próxima revelación sucederá en menos de ${waiting}.`;

        return (
            <>
                <p className={`eagle-lake-regular ${styles.wait}`}>
                    <span className={styles.message}>{message}</span>
                    <EyeClosed className={styles.closed} fill='white' />
                </p>
                <p className={`eagle-lake-regular ${styles.time}`}>{fullWaitingText}</p>
            </>
        );
    };

    const renderEye = (): React.JSX.Element => {
        return (
            <>
                <p className={`eagle-lake-regular ${styles.next}`}>Ha llegado la hora de la próxima revelación</p>
                <p className={`eagle-lake-regular ${styles.eye}`}>
                    <Eye className='' fill='white' onClick={nextStage} />
                </p>
            </>
        );
    }

    const nextStage = (): void => {
        const currentDate = new Date().getTime();

        const stage = getStage(currentDate);
        stage.step += 1;
        stage.targetDate = currentDate + msPerDay;

        setStage(stage);
        setRefresh(currentDate);
    };

    return render();
}

const ms = 1000;
const msPerMinute = ms * 60;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;

const checkStage = (): [string, string] => {
    const currentDate = new Date().getTime();

    const stage = getStage(currentDate);

    const waitingTime = getWaitingTime(currentDate, stage.targetDate);

    return [stageMessageMap.get(stage.step) || '', waitingTime];
};

const getStage = (currentDate: number): SoonStage => {
    let stage = soonStorage.get();

    if (!stage) {
        stage = { step: 0, targetDate: currentDate + msPerMinute };
        soonStorage.set(stage);
    }

    return stage;
}

const setStage = (stage: SoonStage): void => {
    soonStorage.set(stage);
};

const getWaitingTime = (currentDate: number, targetDate: number): string => {
    const daysDifference = Math.floor((targetDate - currentDate) / msPerDay);
    if (daysDifference > 0) {
        return `${daysDifference} día${pluralize(daysDifference)}`;
    }

    const hoursDifference = Math.floor((targetDate - currentDate) / msPerHour);
    if (hoursDifference > 0) {
        return `${hoursDifference} hora${pluralize(hoursDifference)}`;
    }

    const minutesDifference = Math.floor((targetDate - currentDate) / msPerMinute);
    if (minutesDifference > 0) {
        return `${minutesDifference} minuto${pluralize(minutesDifference)}`;
    }

    const secondsDifference = Math.floor((targetDate - currentDate) / ms);
    if (secondsDifference > 0) {
        return `${secondsDifference} segundo${pluralize(secondsDifference)}`;
    }

    return '';
};

const pluralize = (value: number): string => value > 1 ? 's' : '';
