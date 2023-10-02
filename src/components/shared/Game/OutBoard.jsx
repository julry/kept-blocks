import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

const WIDTH_TO_TYPE = {
    horizontal: '100%',
    vertical: 'calc((100% - (var(--rectSize) * 4)) / 2);',
};

const SIDE_TO_POSITION = {
    top: 'top: 0; left: 0;',
    bottom: 'bottom: 0; left: 0;',
    left: 'top: 0; left: 0;',
    right: 'top: 0; right: 0;'
}

const Wrapper = styled.div`
  position: absolute;
  width: ${({$type}) => WIDTH_TO_TYPE[$type]};
  height: ${({height}) => height ?? '100%'};
  ${({$side}) => SIDE_TO_POSITION[$side]};
`;

export const OutBoard = ({type, side, boardRef, rowsAmount, onDrop}) => {
    const [height, setHeight] = useState('100%');
    const $ref = useRef();

    useEffect(() => {
        if (type === 'horizontal' && $ref?.current && boardRef?.current) {
            const top = $ref.current.getBoundingClientRect().top;
            const {top: boardTop, height: boardHeight} = boardRef.current.getBoundingClientRect();
            const bigScreen = document.documentElement.clientWidth > 640;
            const curHeight = side === 'bottom' ?
                `calc(100% - ${boardHeight + boardTop - (bigScreen ? 25 : 5)}px)` :
                `${boardTop - top + 5}px`;
            setHeight(curHeight);
        }
    }, [boardRef, side, type]);

    const [, drop] = useDrop(() => ({
        accept: 'BLOCK',
        collect: monitor => ({
            hovered: monitor.canDrop() && monitor.isOver(),
        }),
        drop: (item) => {
            let x, y;
            switch (side) {
                case 'bottom':
                    x = item.x;
                    y = rowsAmount - 1;
                    break;
                case 'top':
                    x = item.x;
                    y = 0;
                    break;
                case 'left':
                    x = 0;
                    y = item.y;
                    break;
                case 'right':
                    x = 3;
                    y = item.y;
                    break;
                default:
                    return;
            }
            onDrop?.(item, x, y);
        },
    }), []);

    return (
        <Wrapper ref={mergeRefs([drop, $ref])} $type={type} $side={side} height={height}/>
    )
}