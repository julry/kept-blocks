import styled from 'styled-components';
import { Rectangle, rectTypes } from './Rectangle';
import { useDrag, useDrop } from 'react-dnd';
import { ComplicatedMainBlock } from './ComplicatedMainBlock';
import { mergeRefs } from 'react-merge-refs';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEffect } from 'react';

const Wrapper = styled.div`
  position: absolute;
  transform: translate3d(0, 0, 0);
  transition: top 300ms, left 300ms, right 300ms, bottom 300ms;
  top: calc(${({y}) => y} * var(--rectSize));
  left: calc(${({x}) => x} * var(--rectSize));

  ${({$isDraggable}) => $isDraggable ? 'cursor: grab;' : ''}

  & div {
    pointer-events: none;
    user-select: none;
    border: 1px solid ${({$isMain}) => $isMain ? 'var(--accentColor)' : 'var(--mainBorderColor)'};
  }
`;

export const Block = ({block, isComplicatedMain, className, onDrop, rectSize}) => {
    const [, drag, preview] = useDrag(() => ({
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

    const [, drop] = useDrop(() => ({
        accept: 'BLOCK',
        collect: monitor => ({
            hovered: monitor.canDrop() && monitor.isOver(),
        }),
        drop: (item, monitor) => {
            let isRightPartDrag, isDownPartDrag;
            const isDoubleHeight = item.height === rectTypes.gameDouble;
            let {x, y} = block;
            const dif = monitor.getDifferenceFromInitialOffset();

            if (item.width === rectTypes.gameDouble) {
                let {x: itemX} = monitor.getInitialSourceClientOffset();
                const {x: dragX} = monitor.getInitialClientOffset();

                if (isDoubleHeight) itemX = itemX - rectSize;
                if (dragX - itemX >= rectSize) isRightPartDrag = true;
            }

            if (item.height === rectTypes.gameDouble) {
                const {y: itemY} = monitor.getInitialSourceClientOffset();
                const {y: dragY} = monitor.getInitialClientOffset();
                if (dragY - itemY >= rectSize + 5) {
                    isDownPartDrag = true;
                    isRightPartDrag = false;
                }
            }

            if (block.id === item.id) {
                isDownPartDrag = false;
                isRightPartDrag = false;
                if (Math.abs(dif.x) > Math.abs(dif.y)) {
                    if (dif.x < 0) x = x - 1;
                    else x = x + 1;
                }
                else {
                    if (dif.y < 0) y = y - 1;
                    else y = y + 1;
                }
            }

            if (Math.abs(dif.y) > rectSize && block.x !== item.x && block.width === rectTypes.gameDouble) {
                x = x + 1;
            }

            if (Math.abs(dif.x) > rectSize && block.y !== item.y && block.height === rectTypes.gameDouble) {
                y = y + 1;
            }

            onDrop?.(item, x, y, isRightPartDrag, isDownPartDrag);
        },
    }), [block]);

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [block, preview]);

    if (isComplicatedMain && block.isMain) return (
        <ComplicatedMainBlock innerRef={mergeRefs([drag, drop])} block={block}/>
    );

    return (
        <Wrapper
            ref={mergeRefs([drag, drop])}
            className={className}
            x={block.x}
            y={block.y}
            $isMain={block.isMain}
            $isDraggable
        >
            <Rectangle {...block} color={block.isMain ? "accent" : "main"} />
        </Wrapper>
    );
};

export const NotDragBlock = ({block, children}) =>  (
    <Wrapper
        x={block.x}
        y={block.y}
        $isMain={block.isMain}
    >
        <Rectangle {...block} color={block.isMain ? "accent" : "main"}> {children} </Rectangle>
    </Wrapper>
);
