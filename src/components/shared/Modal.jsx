import styled, { keyframes } from 'styled-components';
import { TextBlock } from './TextBlock';
import { ANIMATION_DELAY } from '../../constants';
import { Button, buttonTypes } from './Button';
import { FlexWrapper } from './FlexWrapper';

const ModalWrapper = styled(FlexWrapper)`
  position: absolute;
  inset: 0;
  align-items: center;
  justify-content: center;
`;

const ButtonStyled = styled(Button)`
  margin-top: 20px;
  width: calc(var(--rectSize) * 4 + 10px);
  border-radius: 30px;
`;

const appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Block = styled(TextBlock)`
  opacity: 0;
  animation: ${appear} ${ANIMATION_DELAY}ms ease-in forwards;
`;

export const Modal = (props) => (
    <ModalWrapper>
        <Block>
            {props.children}
        </Block>
        {props.isButton && (
            <ButtonStyled type={buttonTypes.main} onClick={props.onBtnClick}>Понятно</ButtonStyled>
        )}
    </ModalWrapper>
);
