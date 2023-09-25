import styled from 'styled-components';
import { Rectangle } from './Rectangle';

const Wrapper = styled(Rectangle)`
  position: absolute;
  top: calc(${({y}) => y} * var(--rectSize));
  left: calc(${({x}) => x} * var(--rectSize));
  border: 1px solid ${({color}) => color === 'accent' ? 'var(--accentColor)' : 'var(--mainBorderColor)'};
`;


export const Block = ({block}) => {
    return (
        <Wrapper {...block} color={block.isMain ? "accent" : "main"} />
    )
}