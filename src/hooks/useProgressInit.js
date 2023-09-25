import { screens } from '../screens.config';
import { useState } from 'react';


const INITIAL_PROGRESS = {};

export function useProgressInit() {
    /////////////////// for development ////////////////////////////////////
    const urlParams = new URLSearchParams(window.location.search);
    const screenParam = urlParams.get('screen');
    ////////////////////////////////////////////////////////////////////////

    const [currentScreenIndex, setCurrentScreenIndex] = useState(+screenParam || 0);
    const [progress, setProgress] = useState(INITIAL_PROGRESS);
    const screen = screens[currentScreenIndex];

    const next = () => {
        const nextScreenIndex = currentScreenIndex + 1;
        const canNext = nextScreenIndex <= screens.length - 1;

        if (canNext) {
            setCurrentScreenIndex(nextScreenIndex);
        }
    };


    const updateProgress = (newProgress) => {
        setProgress(progress => ({...progress, ...newProgress}));
    };

    return {
        progress,
        screen,
        next,
        updateProgress,
    };
}