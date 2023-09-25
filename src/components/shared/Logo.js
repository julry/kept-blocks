import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';

const LogoStyled = styled.img`
  position: absolute;
  --leftV: calc((100vw - var(--rectSize) * 4 - 10px) / 2);
  top: min(6vw, 24px);
  left: min(35px, var(--leftV));
  width: min(20.7vw, 81px);
  height: min(9.2vw, 36px);
`;

export const Logo = (props) => <LogoStyled {...props} src={logo} alt={''} />
