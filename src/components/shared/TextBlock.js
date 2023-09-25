import styled from 'styled-components';
import { FlexWrapper } from './FlexWrapper';

export const TextBlock = styled(FlexWrapper)`
  justify-content: center;
  align-items: center;
  width: calc(var(--rectSize) * 4 + 10px);
  border-radius: 10px;
  border: 3px solid var(--accentColor);
  background: white;
  z-index: 100;
  padding: 30px 0;
  font-size: 18px;
  
  & p {
    width: 14.2em;

    @media screen and (max-height: 800px) {
      width: 14.9em;
    }
  }
  
  @media screen and (max-height: 800px) {
    font-size: 17px;
    padding: 28px 0;
  }

  @media screen and (max-height: 700px) {
    font-size: 16px;
  }

  @media screen and (max-height: 600px) {
    font-size: 14px;
  }

  @media screen and (max-height: 500px) {
    font-size: 12px;
  }

  @media screen and (max-width: 310px) {
    font-size: 12px;
  }
`;
