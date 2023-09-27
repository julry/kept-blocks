import styled from 'styled-components';
import { Rectangle } from './Rectangle';
import { useDrag } from 'react-dnd';
import { ComplicatedMainBlock } from './ComplicatedMainBlock';

const Wrapper = styled.div`
  position: absolute;
  transition: top 300ms, left 300ms, right 300ms, bottom 300ms;
  top: calc(${({y}) => y} * var(--rectSize));
  left: calc(${({x}) => x} * var(--rectSize));
  
  & div {
    border: 1px solid ${({isMain}) => isMain ? 'var(--accentColor)' : 'var(--mainBorderColor)'};
  }
`;

export const Block = ({block, isComplicatedMain, className}) => {
    const [_, drag] = useDrag(() => ({
        type: 'BLOCK',
        item: () => {
            return block;
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }), [block]);

    if (isComplicatedMain && block.isMain) return <ComplicatedMainBlock innerRef={drag} block={block}/>

    return (
        <Wrapper ref={drag} {...block} className={className}>
            <Rectangle {...block} color={block.isMain ? "accent" : "main"} />
        </Wrapper>
    )
}

export const NotDragBlock = ({block, children}) =>  (
    <Wrapper {...block}>
        <Rectangle {...block} color={block.isMain ? "accent" : "main"}> {children} </Rectangle>
    </Wrapper>
);
