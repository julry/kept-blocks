import { rectTypes } from '../../shared/Rectangle';

export const borderTop = 'bottom: 5px; left: -10px; transform: rotate(-90deg); box-shadow: 0px 5px 7px 0px rgba(56, 56, 60, 0.25); height: 5px;';
export const borderBottom = 'bottom: 5px; right: -10px; transform: rotate(-90deg); box-shadow: 0px 5px 7px 0px rgba(56, 56, 60, 0.25); height: 5px;';

export const blocks = [
    {
        id: 0,
        x: 1,
        y: 0,
        width: rectTypes.game,
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
        y: 1,
        width: rectTypes.gameDouble,
        height: rectTypes.game,
    },
    {
        id: 3,
        x: 2,
        y: 1,
        width: rectTypes.game,
        height: rectTypes.game,
    },
    {
        id: 4,
        x: 1,
        y: 2,
        width: rectTypes.game,
        height: rectTypes.gameDouble,
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
        x: 3,
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
        x: 2,
        y: 3,
        width: rectTypes.gameDouble,
        height: rectTypes.game,
    },
    {
        id: 8,
        x: 2,
        y: 4,
        width: rectTypes.game,
        height: rectTypes.game,
    },
    {
        id: 9,
        x: 3,
        y: 4,
        width: rectTypes.game,
        height: rectTypes.game,
    },
    {
        id: 10,
        x: 1,
        y: 5,
        width: rectTypes.gameDouble,
        height: rectTypes.game,
    },
];

export const phrases = [
    {
        id: 3,
        title: 'Ежегодный\nпромоушен'
    },
    {
        id: 5,
        title: 'Разнообразие\nпроектов'
    },
    {
        id: 7,
        title: 'Гибридный\nформат'
    },
    {
        id: 13,
        title: 'Гибкое начало\n' +
            'и конец\nрабочего дня'
    },
    {
        id: 20,
        title: 'Стажировки\n' +
            'от 30 часов\n' +
            'в неделю'
    },
];

export const styles = `
    margin-top: min(55px, 13.5vw) !important;
    border-top-right-radius: 0;
    
    @media screen and (max-height: 850px) {
        transform: scale(0.9);
        margin-top: min(35px, 10vw) !important;
    }
    
    @media screen and (max-height: 700px) {
        margin-top: min(25px, 8vw) !important;
    }
    
    @media screen and (max-height: 600px) {
        margin-top: min(17px, 6vw) !important;
    }
`;