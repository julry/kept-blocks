import styled from 'styled-components';
import { Rectangle } from './Rectangle';
import { useDrag } from 'react-dnd';

const Wrapper = styled.div`
  position: absolute;
  transition: top 300ms, left 300ms, right 300ms, bottom 300ms;
  top: calc(${({y}) => y} * var(--rectSize));
  left: calc(${({x}) => x} * var(--rectSize));
  
  & div {
    border: 1px solid ${({color}) => color === 'accent' ? 'var(--accentColor)' : 'var(--mainBorderColor)'};
  }
`;

export const Block = ({block, onDragStart, children}) => {
    const [_, drag] = useDrag(() => ({
        type: 'BLOCK',
        item: () => {
            onDragStart?.(block);
            return block;
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }), [block]);

    return (
        <Wrapper ref={drag} {...block}>
            <Rectangle {...block} color={block.isMain ? "accent" : "main"}> {children} </Rectangle>
        </Wrapper>
    )
}

export const NotDragBlock = ({block, children}) =>  (
    <Wrapper {...block}>
        <Rectangle {...block} color={block.isMain ? "accent" : "main"}> {children} </Rectangle>
    </Wrapper>
);
