import styled, { keyframes } from 'styled-components';
import hand from '../../assets/images/hand.svg';
import movement from '../../assets/images/move.svg';
import clickBg from '../../assets/images/click.svg';
import { appear, disappear } from './keyframes';
import { ANIMATION_DELAY, ANIMATION_RULES, MOVE_ANIMATION_DELAY, MOVE_ANIMATION_DURATION } from '../../constants';

const DISAPPEAR_DELAY = MOVE_ANIMATION_DELAY + MOVE_ANIMATION_DURATION + ANIMATION_RULES - ANIMATION_DELAY;

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

  100% {
    width: calc(var(--rectSize) * 85 / 80);
  }
`;

const move = keyframes`
  0% {
    left: calc(var(--rectSize) * 20 / 80);
  }

  100% {
    left: calc(var(--rectSize) + var(--rectSize) * 20 / 80);
  }
`;

const Wrapper = styled.div`
  background: url(${hand}) center center no-repeat;
  background-size: cover;
  animation: ${appear} ${ANIMATION_RULES}ms ease-in both, ${click} ${ANIMATION_RULES}ms ease-in both, ${move} ${MOVE_ANIMATION_DURATION}ms ease-in-out both, ${disappear} ${ANIMATION_DELAY}ms ease-in forwards;
  animation-delay: ${ANIMATION_RULES + ANIMATION_DELAY}ms, ${ANIMATION_RULES + 5 * ANIMATION_DELAY}ms, ${MOVE_ANIMATION_DELAY}ms, ${DISAPPEAR_DELAY}ms;
`;

const disappearAdd = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
`;

const DoubleHand = styled.div`
  width: calc(var(--rectSize) * 49 / 80);
  height: calc(var(--rectSize) * 77 / 80 * 49 / 80);
  left: calc(var(--rectSize) * 20 / 80) !important;
  background: url(${hand}) center center no-repeat;
  background-size: cover;
  animation: ${appear} 0 ease-in backwards, ${disappearAdd} ${ANIMATION_DELAY}ms ease-in forwards;
  animation-delay: ${MOVE_ANIMATION_DELAY}ms, ${DISAPPEAR_DELAY}ms;
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
  animation: ${moveLine} ${MOVE_ANIMATION_DURATION}ms ease-in-out both, ${disappear} ${ANIMATION_DELAY}ms ease-in forwards;
  animation-delay: ${MOVE_ANIMATION_DELAY}ms, ${DISAPPEAR_DELAY}ms;
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
`;

export const AnimationRules = ({className}) => (
    <>
        <Wrapper className={className} />
        <ClickLines />
        <DoubleHand className={className}/>
        <Movement />
    </>
);
