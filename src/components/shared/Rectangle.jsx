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
    complicated: 'var(--rectSize)',
}

const TYPE_TO_SIZE_SM = {
    [rectTypes.game]: 'var(--rectSize)',
    [rectTypes.additional]: 'calc(var(--rectSize) * 4.8 / 8)',
    [rectTypes.gameDouble]: 'calc(var(--rectSize) * 2)',
    [rectTypes.additionalDouble]: 'calc(var(--rectSize) * 2 * 4.8 / 8)',
    complicated: 'var(--rectSize)',
}

const RectangleStyled = styled.div`
  width: ${({width, height}) => width === height ? TYPE_TO_SIZE.complicated : TYPE_TO_SIZE[width]};
  height: ${({height}) => TYPE_TO_SIZE[height]};
  background-color: ${({color}) => TYPE_TO_COLORS[color]};
  box-shadow: var(--boxShadow);
  border-radius: 5px;
  
  @media screen and (max-height: 700px) {
    width: ${({width, height}) => width === height ? TYPE_TO_SIZE.complicated : TYPE_TO_SIZE[width]};
    height: ${({height}) => TYPE_TO_SIZE_SM[height]};
  }
`;

export const Rectangle = ({width, height, color, className, children}) => (
    <RectangleStyled className={className} width={width} height={height} color={color}>
        {children}
    </RectangleStyled>
);