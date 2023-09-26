import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const Wrapper = styled.div`
  --fontSize: calc(var(--rectSize) * 11 / 80);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--rectSize);
  height: var(--rectSize);
  border: 0.25px solid rgba(185, 185, 199, 0.70);
  background: #E4E4EF;
  font-size: max(7px, var(--fontSize));
  text-align: center;
  color: var(--accentColor);
  
  @media screen and (max-width: 320px) {
    font-size: 7px;
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

export const Cell = ({onDrop, rowsAmount, id}) => {
    const [_, drop] = useDrop(() => ({
        accept: 'BLOCK',
        collect: monitor => ({
            hovered: monitor.canDrop() && monitor.isOver(),
        }),
        drop: (item, monitor) => {
            onDrop?.(item, id);
        },
    }), []);

    return <Wrapper ref={drop} $rowsAmount={rowsAmount} />
};


export const NotDropCell = ({rowsAmount}) => <Wrapper $rowsAmount={rowsAmount} />