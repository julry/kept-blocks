import styled from 'styled-components';
import { Block } from './Block';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

const Cell = styled.div`
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

  &:nth-child(${({rowsAmount}) => rowsAmount * 4}) {
    border-bottom-right-radius: 10px;
  }
  &:nth-child(${({rowsAmount}) => rowsAmount * 4 - 3}) {
    border-bottom-left-radius: 10px;
  }
`;

export const Board = ({blocks, onDrop, rowsAmount, phrases, children}) => {
    return (
        <Wrapper>
            {Array.from({length: rowsAmount * 4}).map((_, i) => (
                <Cell key={i} rowsAmount={rowsAmount}>
                    {phrases.find(({id}) => id === i)?.title}
                </Cell>
            ))}
            {blocks.map(block => (
                <Block key={block.id} block={block}/>
            ))}
            {children}
        </Wrapper>
    )
}