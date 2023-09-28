import styled from 'styled-components';
import { Rectangle } from './Rectangle';
import { useDrag, useDrop } from 'react-dnd';
import { ComplicatedMainBlock } from './ComplicatedMainBlock';
import { mergeRefs } from 'react-merge-refs';

const Wrapper = styled.div`
  position: absolute;
  transition: top 300ms, left 300ms, right 300ms, bottom 300ms;
  top: calc(${({y}) => y} * var(--rectSize));
  left: calc(${({x}) => x} * var(--rectSize));
  ${({$isDraggable}) => $isDraggable ? 'cursor: grab;' : ''}
  & div {
    border: 1px solid ${({isMain}) => isMain ? 'var(--accentColor)' : 'var(--mainBorderColor)'};
  }
`;

export const Block = ({block, isComplicatedMain, className, onDrop, rectSize}) => {
    const [_, drag] = useDrag(() => ({
        type: 'BLOCK',
        item: () => block,
        previewOptions: {
            anchorX: 0,
            anchorY: 0
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }), [block]);

    const [__, drop] = useDrop(() => ({
        accept: 'BLOCK',
        collect: monitor => ({
            hovered: monitor.canDrop() && monitor.isOver(),
        }),
        drop: (item, monitor) => {
            if (block.id === item.id) return;

            let {x, y} = block;
            const dif = monitor.getDifferenceFromInitialOffset();

            if (Math.abs(dif.y) > rectSize && block.x !== item.x) {
                x = x + 1;
            }

            if (Math.abs(dif.x) > rectSize && block.y !== item.y) {
                y = y + 1;
            }

            onDrop?.(item, x, y);
        },
    }), []);

    if (isComplicatedMain && block.isMain) return (
        <ComplicatedMainBlock innerRef={mergeRefs([drag, drop])} block={block}/>
    );

    return (
        <Wrapper ref={mergeRefs([drag, drop])} {...block} className={className} $isDraggable>
            <Rectangle {...block} color={block.isMain ? "accent" : "main"} />
        </Wrapper>
    );
};

export const NotDragBlock = ({block, children}) =>  (
    <Wrapper {...block}>
        <Rectangle {...block} color={block.isMain ? "accent" : "main"}> {children} </Rectangle>
    </Wrapper>
);
