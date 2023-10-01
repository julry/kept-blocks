import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '../Button';
import { useProgress } from '../../../hooks/useProgress';
import { TopElement } from '../TopElement';
import { BottomElement } from '../BottomElement';

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
  transition: transform 1500ms;
  transform-style: preserve-3d;
  backface-visibility: hidden;
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
  position: ${({$isActive}) => $isActive ? 'static' : 'absolute'};
  top: 0;
  left: 0;
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
`;

const Back = styled(Side)`
  transform: rotateY(180deg);
  background: white;
  z-index: 3;
`;

export const ResultCard = ({frontText, backText, level, btnText}) => {
    const { next } = useProgress();
    const [isTurned, setIsTurned] = useState(false);

    const handleClick = () => {
        if (isTurned) next();
        else setIsTurned(true);
    };

    return (
        <Wrapper>
            <TopElement isUpperRect />
            <Card $isTurn={isTurned}>
                <Front $isActive={!isTurned}>{frontText()}</Front>
                <Back $isActive={isTurned}>{backText}</Back>
            </Card>
            <Button type="main" onClick={handleClick}>
                {isTurned ? btnText ?? `Уровень ${level + 1}` : 'Открыть'}
            </Button>
            <BottomElement />
        </Wrapper>
    );
};
