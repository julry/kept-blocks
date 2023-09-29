import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: calc(var(--rectSize) * 4 + 10px);
  height: calc(${({$rowsAmount}) => $rowsAmount} * var(--rectSize) + 10px);
  min-height: calc(${({$rowsAmount}) => $rowsAmount} * var(--rectSize) + 10px);
  border-radius: 10px;
  background: var(--accentColor);
  box-shadow: 5px 5px 7px rgba(56, 56, 60, 0.25);
  ${({styles}) => styles};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 5px;
    box-shadow: 5px 5px 7px rgba(56, 56, 60, 0.25);
    border-radius: 5px;
    height: calc(${({$rowsAmount}) => $rowsAmount} * var(--rectSize));
  }


  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 2px;
    z-index: 100;
    width: calc(var(--rectSize) * 4);
    box-shadow: 5px 5px 7px rgba(56, 56, 60, 0.25);
    height: 5px;
    border-radius: 5px;
  }
`;

const Board = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background: white;
  border-radius: 10px;
`;

const EmptyPlace = styled.div`
  position: absolute;
  left: calc(${({$column}) => $column} * var(--rectSize) + 5px);
  top: calc(${({$row}) => $row} * var(--rectSize) + 5px);
  height: var(--rectSize);
  width: calc(${({ $emptyWidth }) => $emptyWidth ?? 1} * var(--rectSize));
  background: white;
`;

const ExitBorder = styled.div`
  position: absolute;
  border-radius: 0 4px 4px 0;
  width: 15px;
  height: 8px;
  background: var(--accentColor);
  box-shadow: 5px 5px 7px rgba(56, 56, 60, 0.25);
  z-index: 4;
  ${({$borders}) => $borders};
`;

export const BoardWrapper = ({
     className,
     rowsAmount,
     row,
     column,
     borderTop,
     borderBottom,
     children,
     styles,
     emptyWidth = 1
}) => (
    <Wrapper className={className} $rowsAmount={rowsAmount} styles={styles}>
        <Board>
            {children}
        </Board>
        <EmptyPlace $row={row} $column={column} $emptyWidth={emptyWidth}>
            <ExitBorder key={'border_top'} $borders={borderTop}/>
            <ExitBorder key={'border_bottom'} $borders={borderBottom}/>
        </EmptyPlace>
    </Wrapper>
);
