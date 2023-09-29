import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { rectTypes } from './Rectangle';

const Wrapper = styled.div`
  --fontSize: calc(var(--rectSize) * ${({$isSmall}) => $isSmall ? 8 : 11} / 80);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--rectSize);
  height: var(--rectSize);
  border: 0.25px solid rgba(185, 185, 199, 0.70);
  background: #E4E4EF;
  font-size: max(${({$isSmall}) => $isSmall ? 6 : 7}px, var(--fontSize));
  text-align: center;
  color: var(--accentColor);
  
  @media screen and (max-width: 320px) {
    font-size: ${({$isSmall}) => $isSmall ? 6 : 7}px;
  }
  
  &:first-child {
    border-top-left-radius: 10px;
  }

  &:nth-child(4) {
    border-top-right-radius: 10px;
  }

  &:nth-child(${({$rowsAmount}) => $rowsAmount * 4}) {
    border-bottom-right-radius: 10px;
  }
  &:nth-child(${({$rowsAmount}) => $rowsAmount * 4 - 3}) {
    border-bottom-left-radius: 10px;
  }
`;

export const Cell = ({onDrop, rowsAmount, id, children, isSmall, rectSize}) => {
    const [, drop] = useDrop(() => ({
        accept: 'BLOCK',
        collect: monitor => ({
            hovered: monitor.canDrop() && monitor.isOver(),
        }),
        drop: (item, monitor) => {
            let isRightPartDrag, isDownPartDrag;
            const isDoubleHeight = item.height === rectTypes.gameDouble;

            if (item.width === rectTypes.gameDouble) {
                let {x: itemX} = monitor.getInitialSourceClientOffset();
                const {x: dragX} = monitor.getInitialClientOffset();

                if (isDoubleHeight) itemX = itemX - rectSize;
                if (dragX - itemX >= rectSize) isRightPartDrag = true;
            }

            if (isDoubleHeight) {
                const {y: itemY} = monitor.getInitialSourceClientOffset();
                const {y: dragY} = monitor.getInitialClientOffset();
                if (dragY - itemY >= rectSize + 5) {
                    isDownPartDrag = true;
                    isRightPartDrag = false;
                }
            }

            onDrop?.(item, id % 4, Math.floor(id / 4), isRightPartDrag, isDownPartDrag);
        },
    }), []);

    return <Wrapper ref={drop} $isSmall={isSmall} $rowsAmount={rowsAmount}> {children} </Wrapper>
};


export const NotDropCell = ({rowsAmount, children}) => <Wrapper $rowsAmount={rowsAmount}>{children}</Wrapper>