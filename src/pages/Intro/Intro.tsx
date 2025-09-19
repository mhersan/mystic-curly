import { Eye } from '@components/Eye';
import { SoonPath } from '@pages/Soon';
import React from 'react';
import { useNavigate } from 'react-router';
// styles
import styles from './intro.module.css';

export const Intro = (): React.ReactNode => {
    const navigate = useNavigate();

    const videoRef = React.useRef<HTMLVideoElement>(null);

    const playVideo = (): void => {
        console.log(videoRef.current?.paused);

        if (videoRef.current?.paused) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    };

    const goToMain = () => {
        navigate(SoonPath);
    };

    return (
        <section className={styles.container}>
            <div className={styles['video-container']}>
                <video ref={videoRef} className={styles.video} src='videos/intro.mp4' onEnded={goToMain}></video>

                <div className={styles['video-overlay']} onClick={playVideo} />
            </div>
            <Eye className={`${styles['intro-eye']} glow`} fill='white' onClick={goToMain} />
        </section>
    );
};
