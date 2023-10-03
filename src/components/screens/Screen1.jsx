import styled from 'styled-components';
import { useProgress } from '../../hooks/useProgress';
import { reachMetrikaGoal } from '../../utils/reachMetrikaGoal';
import { FlexWrapper } from '../shared/FlexWrapper';
import { Logo } from '../shared/Logo';
import { TopElement } from '../shared/TopElement';
import { Button, buttonTypes } from '../shared/Button';
import { BottomElement } from '../shared/BottomElement';
import { TextMd, Title } from '../shared/Texts';

const Wrapper = styled(FlexWrapper)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: min(16vw, 63px) min(18px, 4.6vw) 0;

  @media screen and (max-height: 800px) {
    padding-top: min(13vw, 50px);
  }

  @media screen and (max-height: 700px) {
    padding-top: min(12vw, 45px);
  }

  @media screen and (max-height: 600px) {
    padding-top: min(9vw, 40px);
  }

  @media screen and (max-height: 500px) {
    padding-top: min(2vw, 20px);
  }
`;

const TextWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: min(40px, 10.1vw) min(30px, 7.6vw);
  background: white;
  margin: 0 auto;
  border: 3px solid var(--accentColor);
  border-radius: var(--borderRadius);
  z-index: 3;
  
  @media screen and (max-height: 500px) {
    padding: min(15px, 3.5vw) min(15px, 3.5vw) min(30px, 8.29vw);
  }
`;

const SubTitle = styled(Title)`
  font-weight: 500;
`;

export const Screen1 = () => {
    const { next } = useProgress();

    const handleNext = () => {
        reachMetrikaGoal('go');
        next();
    };

    return (
        <Wrapper>
            <Logo />
            <TopElement isUpperRect />
            <TextWrapper>
                <Title>
                    {'Выходить за рамки скучных решений и\u00A0стирать все грани привычных сценариев. '}
                </Title>
                <br/>
                <SubTitle>
                    {'О чём идёт речь?\n Это всё про работу в Kept.'}
                </SubTitle>
                <br/>
                <TextMd>
                    {'В конце игры ты узнаешь главный секрет, который делает карьеру ' +
                        'в\u00A0компании такой гибкой ' +
                        'и\u00A0динамичной! К тому же сможешь поучаствовать в\u00A0розыгрыше призов\u00A0;)'}
                </TextMd>
            </TextWrapper>
            <Button type={buttonTypes.main} onClick={handleNext}>Вперёд</Button>
            <BottomElement />
        </Wrapper>
    );
};
