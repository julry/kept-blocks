import styled from 'styled-components';
import question from '../../assets/images/question.svg';
import { Button } from './Button';
import { Timer } from './Timer';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 10;
`;

const Title = styled.h4`
  font-weight: 800;
  color: var(--accentColor);
  margin-right: 11px;
  font-size: 24px;
  min-width: max-content;

  @media screen and (max-height: 700px) {
    font-size: 22px;
  }

  @media screen and (max-height: 600px) {
    font-size: 20px;
  }
`;

const InfoButton = styled(Button)`
  border: 2px solid black;
  border-radius: 6px;
  width: min(43px, 11vw);
  height: min(43px, 11vw);
  background: url(${question}) center center no-repeat;
  margin-left: 11px;

  @media screen and (max-height: 700px) {
    width: min(34px, 9vw);
    height: min(34px, 9vw);
    background-size: 10px 18px;
  }
`;

const TimerWrapper = styled(Wrapper)`
    justify-content: flex-end;
`;

export const Header = ({className, onBtnClick, level, isStart, isStopped, shownTime}) => (
    <Wrapper className={className}>
        <Title>Уровень {level}</Title>
        <TimerWrapper>
            <Timer shownTime={shownTime} isStopped={isStopped} isStart={isStart} />
            <InfoButton onClick={onBtnClick}/>
        </TimerWrapper>
    </Wrapper>
)
