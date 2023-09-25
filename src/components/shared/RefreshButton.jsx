import styled from 'styled-components';
import { Button } from './Button';
import refresh from '../../assets/images/refresh.svg';

const ButtonStyled = styled(Button)`
  border: 2px solid black;
  border-radius: 4px;
  width: min(80px, 20.5vw);
  height: min(80px, 20.5vw);
  background: url(${refresh}) center center no-repeat;
  background-size: 50%;

  @media screen and (max-height: 700px) {
    width: min(64px, 16.4vw);
    height: min(64px, 16.4vw);
  }
`;

export const RefreshButton = (props) => <ButtonStyled {...props} />;