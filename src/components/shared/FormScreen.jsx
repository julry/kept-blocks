import styled from 'styled-components';
import { useRef, useState } from 'react';
import { Logo } from './Logo';
import { TopElement } from './TopElement';
import { TextBlock } from './TextBlock';
import { Button, buttonTypes } from './Button';
import { reachMetrikaGoal } from '../../utils/reachMetrikaGoal';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: min(50px, 12.8vw);
  
  @media screen and (max-height: 700px) {
    padding-top: min(35px, 10vw);
  }
`;

const Input = styled.input`
  position: relative;
  border-radius: 5px;
  touch-action: none;
  border: 3px solid var(--secondColor);
  padding: 16px 30px 17px;
  font-size: 18px;
  color: var(--secondColor);
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--secondColor);
    opacity: 0.4;
  }


  @media screen and (max-height: 700px) {
    padding: 13px 25px;
    font-size: 16px;
  }

  @media screen and (max-height: 600px) {
    padding: 10px 25px;
    font-size: 14px;
  }
`;

const RadioIconStyled = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 29px;
  height: 29px;
  border: 3px solid var(--secondColor);
  border-radius: 5px;
  margin-right: min(10px, 2.6vw);

  @media screen and (max-height: 700px) {
    width: 27px;
    height: 27px;
  }
`;

const InputRadioButton = styled.input`
  display: none;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 14px;
  font-weight: 300;
  width: 100%;
  margin: 8px auto min(20px, 5.1vw);
  text-align: left;
  border-radius: 5px;

  & a {
    color: inherit;
  }
  
  & ${InputRadioButton}:checked + ${RadioIconStyled}:after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--mainColor);
    display: inline-block;
    border-radius: 1px;
  };
  
  @media screen and (max-height: 700px) {
    font-size: 12px;
  }

  @media screen and (max-height: 600px) {
    font-size: 10px;
  }

  @media screen and (max-width: 310px) {
    font-size: 10px;
  }
`;

const TextBlockStyled = styled(TextBlock)`
  padding: 30px;

  @media screen and (max-height: 800px) {
    padding: 25px;
  }
  
  & p {
    width: auto;
  }
`;

const SendData = styled.div`
  position: absolute;
  inset: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding-top: min(20px, 5.1vw);
  
  @media screen and (max-width: 330px) {
    font-size: 12px;
  }
  @media screen and (min-width: 400px) {
    font-size: 14px;
  }
`;

const InputsWrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled(InputsWrapper)`
  &::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 24px;
    width: calc(100% - 48px);
    border-radius: 2px;
    filter: blur(2px);
    height: 27px;
    background: ${({$incorrect}) => $incorrect ? '#F24E4E' : 'transparent'};
    opacity: 0.4;
    z-index: 0;
    ${({$incorrect}) => !$incorrect ? 'display: none' : ''};
  }
  
  @media screen and (max-height: 700px) {
    &::after {
      top: 13px;
      left: 15px;
      width: calc(100% - 30px);
    }
  }

  @media screen and (max-height: 600px) {
    &::after {
      top: 10px;
      height: 23px;
    }
  }
`;

export const FormScreen = ({children, className, isDouble}) => {
    const [email, setEmail] = useState('');
    const [isSend, setIsSend] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);

    const $inputRef = useRef();

    const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const handleSendData = () => {
        if (isSending || isSend) return;

        setIsSending(true);

        const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/u/3/d/e/1FAIpQLSdFyddfrBygmHUVKiStb8AGloUUz3IZHv6T7qH0KaOu7G1-Nw/formResponse';
        const EMAIL_ID = 'entry.2027871763';
        const formData = new FormData();

        formData.append(EMAIL_ID, email);

        const myInit = {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        };

        const myRequest = new Request(GOOGLE_FORM_ACTION_URL, myInit);

        fetch(myRequest).then(() => {
            if (!isDouble) reachMetrikaGoal('email1');
            setIsSend(true);
        }).finally(() => {
            setIsSending(false);
        });

        if (isDouble) {
            const secondRequest = new Request(GOOGLE_FORM_ACTION_URL, myInit);
            fetch(secondRequest).then(() => reachMetrikaGoal('email2'));
        }
    };

    const handleBlur = () => {
        if (email.match(emailRegExp) || !email) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleChange = (e) => {
        setIsCorrect(true);
        setEmail(e.target.value);
    };

    const handleAgree = () => {
        if (isSending || isSend) return;
        setIsAgreed(prevAgreed => !prevAgreed);
    }

    return (
        <Wrapper className={className}>
            <Logo />
            <TopElement />
            <TextBlockStyled>
                {children}
            </TextBlockStyled>
            <InputsWrapper>
                <InputWrapper $incorrect={!isCorrect} onClick={() => $inputRef?.current?.focus()}>
                    <Input
                        ref={$inputRef}
                        placeholder={'example@post.ru'}
                        value={email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                </InputWrapper>
                <RadioButtonLabel>
                    <InputRadioButton
                        type="checkbox"
                        value={isAgreed}
                        checked={isAgreed}
                        onChange={handleAgree}
                    />
                    <RadioIconStyled/>
                    <span>
                    Я согласен(а) на <a rel="noreferrer" href={'https://fut.ru/personal_data_policy/'} target="_blank">
                    обработку персональных данных</a> и получение информационных сообщений
                </span>
                </RadioButtonLabel>
                {isSend && <SendData>
                    {'Данные отправлены — в случае\nпобеды мы напишем тебе на почту!'}
                </SendData>}
            </InputsWrapper>

            <Button
                type={isSend ? buttonTypes.secondary : buttonTypes.main}
                disabled={!email || !isAgreed || !isCorrect}
                onClick={handleSendData}
            >
                {isSend ? 'Почта отправлена' : 'Участвовать'}
            </Button>
        </Wrapper>
    );
};
