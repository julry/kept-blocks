import styled from 'styled-components';
import { Logo } from './Logo';
import { TopElement } from './TopElement';
import { TextBlock } from './TextBlock';
import { useState } from 'react';
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

export const FormScreen = ({children, className}) => {
    const [email, setEmail] = useState('');
    const [isSend, setIsSend] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    const handleSendData = () => {
        if (isSending || isSend) return;

        setIsSending(true);

        const GOOGLE_FORM_ACTION_URL = '';
        const EMAIL_ID = 'entry.1550944098';
        const formData = new FormData();

        formData.append(EMAIL_ID, email);

        const myInit = {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        };

        const myRequest = new Request(GOOGLE_FORM_ACTION_URL, myInit);

        // fetch(myRequest).then(() => {
        //     reachMetrikaGoal('phone');
        //     setIsSend(true);
        // }).finally(() => {
        //     setIsSending(false);
        // });
    };

    return (
        <Wrapper className={className}>
            <Logo />
            <TopElement />
            <TextBlockStyled>
                {children}
            </TextBlockStyled>
            <Input
                placeholder={'example@post.ru'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <RadioButtonLabel>
                <InputRadioButton
                    type="checkbox"
                    value={isAgreed}
                    checked={isAgreed}
                    onChange={() => setIsAgreed(prevAgreed => !prevAgreed)}
                />
                <RadioIconStyled/>
                <span>
                    Я согласен(а) на <a rel="noreferrer" href={'https://fut.ru/personal_data_policy/'} target="_blank">
                    обработку персональных данных</a> и получение информационных сообщений
                </span>
            </RadioButtonLabel>
            <Button
                type={isSend ? buttonTypes.secondary : buttonTypes.main}
                disabled={!email || !isAgreed}
                onClick={handleSendData}
            >
                {isSend ? 'Почта отправлена' : 'Участвовать'}
            </Button>
        </Wrapper>
    )
}