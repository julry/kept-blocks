import { rectTypes } from '../../shared/Rectangle';

export const borderTop = 'top: -8px; right: 0; transform: scale(-1, 1);';
export const borderBottom = 'bottom: -8px; right: 0; transform: scale(-1, 1); box-shadow: none;';

export const blocks = [
    {
        id: 'main',
        x: 2,
        y: 3,
        width: rectTypes.gameDouble,
        height: rectTypes.game,
        isMain: true,
    },
    {
        id: 0,
        x: 0,
        y: 0,
        width: rectTypes.gameDouble,
        height: rectTypes.game,
    },
    {
        id: 1,
        x: 2,
        y: 0,
        width: rectTypes.gameDouble,
        height: rectTypes.game,
    },
    {
        id: 2,
        x: 1,
        y: 1,
        width: rectTypes.gameDouble,
        height: rectTypes.game,
    },
    {
        id: 3,
        x: 3,
        y: 1,
        width: rectTypes.game,
        height: rectTypes.gameDouble,
    },
    {
        id: 4,
        x: 1,
        y: 2,
        width: rectTypes.game,
        height: rectTypes.game,
    },
    {
        id: 5,
        x: 2,
        y: 2,
        width: rectTypes.game,
        height: rectTypes.game,
    },
    {
        id: 6,
        x: 0,
        y: 3,
        width: rectTypes.game,
        height: rectTypes.game,
    },
    {
        id: 7,
        x: 1,
        y: 3,
        width: rectTypes.game,
        height: rectTypes.game,
    },
];

export const phrases = [
    {
        id: 4,
        title: 'Обучим\nновому'
    },
    {
        id: 7,
        title: 'Перспективы\nдля будущего'
    },
    {
        id: 8,
        title: 'Поддержка\n24/7'
    },
];

export const empties = [
    {
        x: 0,
        y: 1,
    },
    {
        x: 0,
        y: 2,
    },
];
