import styled from 'styled-components';

export const buttonTypes = {
    main: 'main',
    secondary: 'secondary',
};

const TYPE_TO_BG = {
    [buttonTypes.main]: '#CDFF5D',
    [buttonTypes.secondary]: 'var(--mainColor)',
}

const TYPE_TO_COLOR = {
    [buttonTypes.main]: '#000000',
    [buttonTypes.secondary]: '#2D2D2D',
}

const ButtonWrapper = styled.button`
  position: relative;
  z-index: 10;
  outline: none;
  border: none;
  background: ${({type}) => TYPE_TO_BG[type]};
  color: ${({type}) => TYPE_TO_COLOR[type]};
  width: 100%;
  border-radius: 5px;
  padding: 16px;
  font-size: max(14px, 5.1vw);
  font-weight: 700;
  transition: opacity 300ms, background-color 300ms;
  
  &:disabled {
    opacity: 0.6;
  }

  @media screen and (max-height: 600px) {
    padding: 12px 0 13px;
  }
  
  @media screen and (min-width: 400px) {
    font-size: 17px;
  }
`;

export const Button = (props) => <ButtonWrapper {...props} />