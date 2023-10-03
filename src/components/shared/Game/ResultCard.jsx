import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { Button } from '../Button';
import { useProgress } from '../../../hooks/useProgress';
import { TopElement } from '../TopElement';
import { BottomElement } from '../BottomElement';
import { reachMetrikaGoal } from '../../../utils/reachMetrikaGoal';

const Wrapper = styled.div`
  margin-top: min(64px, 16.4vw);
  width: calc(var(--rectSize) * 4 + 10px);

  @media screen and (max-height: 800px) {
    margin-top: min(25px, 6.6vw);
  }
  
  @media screen and (max-height: 700px) {
    margin-top: min(15px, 4.6vw);
  }

  @media screen and (min-width: 640px) and (max-height: 700px) {
    width: calc(100% - 60px);
  }
`;

const Card = styled.div`
  --heightK: 4;
  height: calc(var(--rectSize) * var(--heightK));
  width: 100%;
  position: relative;
  perspective: 600px;
  transition: transform 1100ms;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden !important;
  ${({$isTurn}) => $isTurn ? 'transform: rotateY(180deg)' : ''};

  @media screen and (max-height: 800px) {
    --heightK: 3.5;
  }
  
  @media screen and (max-height: 700px) {
    --heightK: 3;
  }
`;

const Side = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25);
  position: absolute;
  top: 0;
  left: 0;
  -webkit-perspective: 600px;
  -webkit-transform: translate3d(0,0,0);
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden;
  border: 3px solid var(--accentColor);
  padding: 0 30px;
  font-size: 20px;
  z-index: ${({$isActive}) => $isActive ? '3' : '1'};

  @media screen and (max-height: 800px) {
    font-size: 18px;
  }
  
  @media screen and (max-height: 700px) {
    padding: 0 25px;
    font-size: 15px;
  }

  @media screen and (max-width: 330px) {
    padding: 0 20px;
    font-size: 12px;
  }
`;

const Front = styled(Side)`
  background: var(--accentColor);
  color: white;
  z-index: 2;
  visibility: ${({$isFinishTurning}) => $isFinishTurning  ? 'hidden' : 'visible' };
`;

const show = keyframes`
  0% {
    visibility: hidden;
  }
  100% {
    visibility: visible;
  }
`;

const Back = styled(Side)`
  transform: rotateY(180deg);
  background: white;
  visibility: visible;
  z-index: 3;
  animation: ${({$isTurned}) => $isTurned ? show : ''} 50 backwards;
  animation-delay: 595ms;
`;

export const ResultCard = ({frontText, backText, level, btnText}) => {
    const { next } = useProgress();
    const [isTurned, setIsTurned] = useState(false);
    const [isFinishTurning, setIsFinishTurning] = useState(false);

    const handleClick = () => {
        if (isTurned) {
            if (level === 3) reachMetrikaGoal('end');
            next();
        }
        else {
            reachMetrikaGoal('fact' + level);
            setIsTurned(true);
            setTimeout(() => setIsFinishTurning(true), 545);
        }
    };

    return (
        <Wrapper>
            <TopElement isUpperRect />
            <Card $isTurn={isTurned}>
                <Front $isActive={!isTurned} $isFinishTurning={isFinishTurning}>{frontText()}</Front>
                <Back $isTurn={isTurned} $isActive={isTurned} $isFinishTurning={isFinishTurning}>{backText}</Back>
            </Card>
            <Button type="main" onClick={handleClick}>
                {isTurned ? btnText ?? `Уровень ${level + 1}` : 'Открыть'}
            </Button>
            <BottomElement />
        </Wrapper>
    );
};
