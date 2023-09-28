import styled from 'styled-components';

export const Title = styled.h4`
  font-size: 20px;
  color: var(--accentColor);
  
  @media screen and (max-height: 800px) {
    font-size: 18px;
  }

  @media screen and (max-height: 700px) {
    font-size: 16px;
  }

  @media screen and (max-height: 600px) {
    font-size: 14px;
  }
  
  @media screen and (max-width: 320px) {
    font-size: 14px;
  }
`;

export const TextMd = styled.p`
  font-size: 18px;

  @media screen and (max-height: 800px) {
    font-size: 16px;
  }

  @media screen and (max-height: 700px) {
    font-size: 14px;
  }

  @media screen and (max-height: 600px) {
    font-size: 12px;
  }
`;