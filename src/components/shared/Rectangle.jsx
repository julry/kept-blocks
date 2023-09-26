import styled from 'styled-components';

export const rectTypes = {
    game: 'game',
    additional: 'additional',
    gameDouble: 'gameDouble',
    additionalDouble: 'additionalDouble',
}

const TYPE_TO_COLORS = {
    main: 'var(--mainColor)',
    second: 'var(--secondColor)',
    accent: 'var(--accentColor)',
}

const TYPE_TO_SIZE = {
    [rectTypes.game]: 'var(--rectSize)',
    [rectTypes.additional]: 'calc(var(--rectSize) * 6 / 8)',
    [rectTypes.gameDouble]: 'calc(var(--rectSize) * 2)',
    [rectTypes.additionalDouble]: 'calc(var(--rectSize) * 2 * 6 / 8)',
}

const TYPE_TO_SIZE_SM = {
    [rectTypes.game]: 'var(--rectSize)',
    [rectTypes.additional]: 'calc(var(--rectSize) * 4.8 / 8)',
    [rectTypes.gameDouble]: 'calc(var(--rectSize) * 2)',
    [rectTypes.additionalDouble]: 'calc(var(--rectSize) * 2 * 4.8 / 8)',
}

const RectangleStyled = styled.div`
  width: ${({width}) => TYPE_TO_SIZE[width]};
  height: ${({height}) => TYPE_TO_SIZE[height]};
  background-color: ${({color}) => TYPE_TO_COLORS[color]};
  box-shadow: var(--boxShadow);
  border-radius: 5px;
  
  @media screen and (max-height: 700px) {
    width: ${({width}) => TYPE_TO_SIZE_SM[width]};
    height: ${({height}) => TYPE_TO_SIZE_SM[height]};
  }
`;

export const Rectangle = (props) => (<RectangleStyled {...props} />);