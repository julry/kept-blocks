import styled from 'styled-components';
import { Block, NotDragBlock } from './Block';
import { Cell, NotDropCell } from './Cell';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

export const Board = ({blocks, onDrop, rowsAmount, phrases, children, onDragStart, isNotDrop}) => {
    const CellComponent = isNotDrop ? NotDropCell : Cell;
    const BlockComponent = isNotDrop ? NotDragBlock : Block;
    return (
        <Wrapper>
            {Array.from({length: rowsAmount * 4}).map((_, i) => (
                <CellComponent key={i} rowsAmount={rowsAmount} onDrop={onDrop} id={i}>
                    {phrases.find(({id}) => id === i)?.title}
                </CellComponent>
            ))}
            {blocks.map(block => (
                <BlockComponent key={block.id} block={block} onDragStart={onDragStart} />
            ))}
            {children}
        </Wrapper>
    );
};
