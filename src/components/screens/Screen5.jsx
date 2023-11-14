import { useState } from 'react';
import styled from 'styled-components';
import { useProgress } from '../../hooks/useProgress';
import { reachMetrikaGoal } from '../../utils/reachMetrikaGoal';
import { Rectangle } from '../shared/Rectangle';
import { TopElement } from '../shared/TopElement';
import { FlexWrapper } from '../shared/FlexWrapper';
import { Button, buttonTypes } from '../shared/Button';
import { FormScreen } from '../shared/FormScreen';
import { TextMd, Title } from '../shared/Texts';

const Wrapper = styled(FlexWrapper)`
  align-items: center;
  justify-content: center;
  width: calc(var(--rectSize) * 4 + 10px);
  height: 100%;
  margin: 0 auto;
  
  @media screen and (min-width: 640px) and (max-height: 700px) {
    width: calc(100% - 60px);
  }
`;

const RectangleStyled = styled(Rectangle)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(var(--rectSize) * 4 + 10px);
  color: white;
  padding: 0 30px;
  font-size: 20px;

  @media screen and (max-height: 700px) {
    padding: 0 28px;
    font-size: 18px;
  }

  @media screen and (max-height: 600px) {
    font-size: 16px;
  }
  
  @media screen and (max-width: 330px) {
    padding: 0 25px;
    font-size: 14px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ButtonStyled = styled(Button)`
  width: 50%;
  
  &:last-child {
    color: white;
  }
`;

const FormScreenStyled = styled(FormScreen)`
  padding-top: min(70px, 14.3vw);
  
  & > div:nth-child(3) {
    width: 100%;
  }
`;

export const Screen5 = () => {
    const [isForm, setIsForm] = useState(false);
    const {next} = useProgress();

    const handleNext = () => {
        reachMetrikaGoal('go2');
        next();
    };

    const handleSetForm = () => {
        reachMetrikaGoal('stop');
        setIsForm(true);
    };

    return (
        <Wrapper>
            {isForm ?  (
                <FormScreenStyled>
                    <div>
                        <Title>
                            Теперь тебе многое известно о{'\u00A0'}нашей корпоративной культуре
                        </Title>
                        <br />
                        <TextMd>
                            {
                              'Будем ждать тебя в\u00A0большой команде — мы всегда рады новым талантам!'
                            }
                            <br/>
                            <br/>
                            {
                              'Переходи по кнопке и\u00A0пробуй себя на\u00A0нашей стажировке в\u00A0консалтинге.'
                            }
                          
                        </TextMd>
                    </div>
                </FormScreenStyled>
            ) : (
                <>
                    <TopElement isUpperRect />
                    <RectangleStyled color={'accent'}>
                        <p>
                            <b>Два уровня позади, и{'\u00A0'}ты отлично справляешься!</b>
                            <br/>
                            <br/>
                            Впереди тебя ждет супер-уровень. Рискнешь?
                        </p>
                    </RectangleStyled>
                    <ButtonsWrapper>
                        <ButtonStyled type={buttonTypes.main} onClick={handleNext}>
                            Продолжим!
                        </ButtonStyled>
                        <ButtonStyled type={buttonTypes.secondary} onClick={handleSetForm}>
                            Не хочу
                        </ButtonStyled>
                    </ButtonsWrapper>
                </>
            )}
        </Wrapper>
    );
};
