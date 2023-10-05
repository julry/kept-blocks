import { keyframes } from 'styled-components';

export const appear = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

export const disappear = keyframes`
  0% {
   opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
