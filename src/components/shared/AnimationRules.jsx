import styled, { keyframes } from 'styled-components';
import hand from '../../assets/images/hand.svg';
import movement from '../../assets/images/move.svg';
import clickBg from '../../assets/images/click.svg';
import { appear } from './keyframes';
import { ANIMATION_DELAY, ANIMATION_RULES, MOVE_ANIMATION_DELAY } from '../../constants';

const click = keyframes`
  0% {
    width: var(--rectSize);
    height: calc(var(--rectSize) * 77 / 80);
    left: 0;
  }
  
  100% {
    width: calc(var(--rectSize) * 49 / 80);
    height: calc(var(--rectSize) * 77 / 80 * 49 / 80);
    left: calc(var(--rectSize) * 20 / 80);
  }
`;

const moveLine = keyframes`
  0% {
    width: 0;
  }

  35% {
    width: calc(var(--rectSize) * 85 / 80);
  }
  
  65% {
    width: calc(var(--rectSize) * 85 / 80);
  }

  100% {
    width: 0;
  }
`;

const move = keyframes`
  0% {
    left: calc(var(--rectSize) * 20 / 80);
  }

  35% {
    left: calc(var(--rectSize) + var(--rectSize) * 20 / 80);
  }
  
  65% {
    left: calc(var(--rectSize) + var(--rectSize) * 20 / 80);
  }
  
  100% {
    left: calc(var(--rectSize) * 20 / 80);
  }
`;

const Wrapper = styled.div`
  background: url(${hand}) center center no-repeat;
  background-size: cover;
 
  animation: ${appear} ${ANIMATION_RULES}ms ease-in both, ${click} ${ANIMATION_RULES}ms ease-in both, ${move} ${5 * ANIMATION_RULES}ms ease-in-out both;
  animation-delay: ${ANIMATION_RULES + ANIMATION_DELAY}ms, ${ANIMATION_RULES + 5 * ANIMATION_DELAY}ms, ${MOVE_ANIMATION_DELAY}ms;
  animation-iteration-count: 1, 1, infinite;
`;

const DoubleHand = styled.div`
  width: calc(var(--rectSize) * 49 / 80);
  height: calc(var(--rectSize) * 77 / 80 * 49 / 80);
  left: calc(var(--rectSize) * 20 / 80) !important;
  background: url(${hand}) center center no-repeat;
  background-size: cover;
  animation: ${appear} 0 ease-in backwards;
  animation-delay: ${MOVE_ANIMATION_DELAY}ms;
  z-index: 9;
  opacity: 0.5;
`;

const Movement = styled.div`
  position: absolute;
  top: calc(3.2 * var(--rectSize));
  height: calc(var(--rectSize) * 9 / 80);
  left: calc(var(--rectSize) * 35 / 80) !important;
  z-index: 9;
  background: url(${movement}) left center no-repeat;
  background-size: cover;
  animation: ${moveLine} ${5 * ANIMATION_RULES}ms ease-in-out both infinite;
  animation-delay: ${MOVE_ANIMATION_DELAY}ms;
`;

const ClickLines = styled.div`
  position: absolute;
  top: calc(3.2 * var(--rectSize));
  height: calc(var(--rectSize) * 18 / 80);
  width: calc(var(--rectSize) * 38 / 80);
  left: calc(var(--rectSize) * 22 / 80) !important;
  z-index: 9;
  background: url(${clickBg}) left center no-repeat;
  background-size: cover;
  opacity: 0;
  animation: ${appear} 400ms ease-in-out;
  animation-delay: ${2 * ANIMATION_RULES + 5 * ANIMATION_DELAY - 200}ms;
`

export const AnimationRules = ({className}) => (
    <>
        <Wrapper className={className} />
        <ClickLines />
        <DoubleHand className={className}/>
        <Movement />
    </>
);
