import styled from 'styled-components';
import { Block, NotDragBlock } from './Block';
import { Cell, NotDropCell } from './Cell';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

export const Board = ({blocks, onDrop, rowsAmount, phrases, children, isNotDrop, isComplicatedMain}) => {
    const [rectSize, setRectSize] = useState(70);
    const CellComponent = isNotDrop ? NotDropCell : Cell;
    const BlockComponent = isNotDrop ? NotDragBlock : Block;

    useEffect(() => {
        const {clientHeight, clientWidth} = document.documentElement;
        let rectPart;
        if (clientWidth > 450) {
            rectPart = 90;
            if (clientHeight < 800) {
                rectPart = 80;
            }
            if (clientHeight < 700) {
                rectPart = 70;
            }
            if (clientHeight < 600) {
                rectPart = 60;
            }
        } else {
            const part =  clientWidth - 60 / 4;
            rectPart = part > 90 ? 90 : part;
        }
        
        setRectSize(rectPart);
    }, []);

    return (
        <Wrapper>
            {Array.from({length: rowsAmount * 4}).map((_, i) => (
                <CellComponent key={i} rowsAmount={rowsAmount} onDrop={onDrop} id={i} isSmall={phrases[i]?.isSmall}>
                    {phrases[i]?.title ?? phrases[i]}
                </CellComponent>
            ))}
            {blocks.map(block => (
                <BlockComponent
                    key={block.id}
                    block={block}
                    onDrop={onDrop}
                    rectSize={rectSize}
                    isComplicatedMain={isComplicatedMain}
                />
            ))}
            {children}
        </Wrapper>
    );
};
