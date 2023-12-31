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
`;

export const Screen5 = () => {
    const [isForm, setIsForm] = useState(false);
    const {next} = useProgress();

    const handleNext = () => {
        reachMetrikaGoal('continue2');
        next();
    };

    const handleSetForm = () => {
        reachMetrikaGoal('continue2');
        setIsForm(true);
    };

    return (
        <Wrapper>
            {isForm ?  (
                <FormScreenStyled>
                    <Title>
                        Теперь тебе многое известно о нашей корпоративной культуре.
                    </Title>
                    <br />
                    <TextMd>
                        Будем ждать тебя в большой команде — мы всегда рады новым талантам! А пока предлагаем стать ещё ближе и выиграть наш мерч!
                        <br/>
                        <br/>
                        Оставь свою почту, чтобы принять участие в розыгрыше! Если [дата розыгрыша] фортуна выберет тебя, мы свяжемся!»
                    </TextMd>
                </FormScreenStyled>
            ) : (
                <>
                    <TopElement isUpperRect />
                    <RectangleStyled color={'accent'}>
                        <p>
                            <b>Два уровня позади, и ты отлично справляешься!</b>
                            <br/>
                            <br/>
                            Впереди тебя ждет супер-уровень, который увеличит шансы выиграть приз — рискнешь?
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
