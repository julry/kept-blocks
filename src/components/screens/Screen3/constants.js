import { rectTypes } from '../../shared/Rectangle';

export const borderTop = 'top: -8px; left: 0;';
export const borderBottom = 'bottom: -8px; left: 0;';

export const blocks = [
    {
        id: 'main',
        x: 0,
        y: 3,
        width: rectTypes.game,
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
        x: 0,
        y: 2,
        width: rectTypes.game,
        height: rectTypes.game,
    },
    {
        id: 3,
        x: 1,
        y: 1,
        width: rectTypes.game,
        height: rectTypes.gameDouble,
    },
    {
        id: 4,
        x: 2,
        y: 2,
        width: rectTypes.game,
        height: rectTypes.gameDouble,
    },
    {
        id: 5,
        x: 3,
        y: 1,
        width: rectTypes.game,
        height: rectTypes.game,
    },
    {
        id: 6,
        x: 3,
        y: 2,
        width: rectTypes.game,
        height: rectTypes.game,
    },
];

export const phrases = {
    4: 'Бадди\n' +
        'всегда\n' +
        'поможет',
    11: 'На «ты» \n' +
        'с руководи-\n' +
        'телем',
    14: 'Друллеги'
};

export const empties = [
    {
        x: 0,
        y: 1,
    },
    {
        x: 2,
        y: 1,
    },
    {
        x: 1,
        y: 3,
    },
    {
        x: 3,
        y: 3,
    },
];
