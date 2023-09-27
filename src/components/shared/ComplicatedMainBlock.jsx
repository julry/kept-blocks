import styled from 'styled-components';
import { Rectangle, rectTypes } from './Rectangle';

const Wrapper = styled.div`
  position: absolute;
  transition: top 300ms, left 300ms, right 300ms, bottom 300ms;
  top: calc(${({y}) => y} * var(--rectSize));
  left: calc(${({x}) => x} * var(--rectSize));

  & div {
    border: 1px solid var(--accentColor);
  }

  &::after {
    content: '';
    position: absolute;
    top: calc(var(--rectSize) - 1px);
    left: calc(var(--rectSize) - 1px);
    width: 25px;
    height: 15px;
    border: 1px solid var(--accentColor);
    border-right: none;
    border-bottom: none;
    border-radius: 5px 0 5px 0;
    z-index: 10;
    box-shadow: -5px -5px 5px 0 rgba(228, 228, 239, 0.11), -6px -6px 6px 0 var(--accentColor);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: calc(var(--rectSize) - 15px);
    left: calc(var(--rectSize) - 15px);
    width: 25px;
    height: 15px;
    border: 5px solid var(--accentColor);
    border-right: none;
    border-bottom: none;
    border-radius: 15px 0 0 0;
    z-index: 3;
  }
`;

const RectangleStyled = styled(Rectangle)`
  position: absolute;
  top: 0;
  left: calc(var(--rectSize) - 12px);
  width: calc(var(--rectSize) + 12px);
  border-left: none !important;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: -5px 5px 5px 0 rgba(228, 228, 239, 0.15) inset, -5px -5px 5px 0 rgba(228, 228, 239, 0.15) inset;
  clip-path: circle(79.5% at 57% 29%);
  
  @media screen and (min-height: 700px) {
    clip-path: circle(79.5% at 57% 32%);
  }
`;

export const ComplicatedMainBlock = ({block, innerRef}) => {
    const additionalBlock = {...block, x: block.x + 1, height: rectTypes.game}
    return (
        <Wrapper ref={innerRef} {...block}>
            <Rectangle {...block} color="accent" />
            <RectangleStyled {...additionalBlock} color="accent" />
        </Wrapper>
    );
};
