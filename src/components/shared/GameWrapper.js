import styled, { keyframes } from 'styled-components';
import { FlexWrapper } from './FlexWrapper';
import { ANIMATION_DELAY } from '../../constants';

const blur = keyframes`
  0% {
    filter: blur(0px);
  }

  100% {
    filter: blur(3.5px);
  }
`;

export const GameWrapper = styled(FlexWrapper)`
  align-items: center;
  height: 100%;
  width: 100%;
  padding: min(40px, 10vw) min(30px, 7.6vw) 0;
  animation: ${({$isBlurred}) => $isBlurred ? blur : ''} ${ANIMATION_DELAY}ms ease-in forwards;

  @media screen and (max-height: 800px) {
    padding-top: min(5.3vw, 20px);
  }

  @media screen and (max-height: 600px) {
    padding-top: min(7vw, 25px);
  }

  @media screen and (max-height: 500px) {
    padding-top: min(4vw, 15px);
  }
`;
