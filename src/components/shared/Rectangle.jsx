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

const RectangleStyled = styled.div`
  width: ${({width}) => TYPE_TO_SIZE[width]};
  height: ${({height}) => TYPE_TO_SIZE[height]};
  background-color: ${({color}) => TYPE_TO_COLORS[color]};
  box-shadow: var(--boxShadow);
  border-radius: 5px;
`;

export const Rectangle = (props) => (<RectangleStyled {...props} />);