import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import arrow from '../../assets/images/arrow.svg';
import { useProgress } from '../../hooks/useProgress';
import { reachMetrikaGoal } from '../../utils/reachMetrikaGoal';
import { ANIMATION_DELAY, ANIMATION_RULES, MOVE_ANIMATION_DELAY, MOVE_ANIMATION_DURATION } from '../../constants';
import { Header } from '../shared/Header';
import { BoardWrapper } from '../shared/BoardWrapper';
import { Button, buttonTypes } from '../shared/Button';
import { Rectangle, rectTypes } from '../shared/Rectangle';
import { Board } from '../shared/Board';
import { GameWrapper } from '../shared/GameWrapper';
import { RefreshButtonStyled } from './Screen3';
import { blocks, borderBottom, borderTop, phrases } from './Screen3/constants';
import { TextBlock } from '../shared/TextBlock';
import { Modal } from '../shared/Modal';
import { appear } from '../shared/keyframes';
import { AnimationRules } from '../shared/AnimationRules';

const ButtonStyled = styled(Button)`
  margin-top: min(90px, 23vw);
  border-radius: 30px;

  @media screen and (max-height: 800px) {
    margin-top: min(70px, 17vw);
  }

  @media screen and (max-height: 700px) {
    margin-top: min(50px, 13vw);
  }

  @media screen and (max-height: 600px) {
    margin-top: min(50px, 13vw);
  }
`;

const TextBlockStyled = styled(TextBlock)`
  position: absolute;
  bottom: calc(var(--rectSize) * 3 + 5px);
  left: -5px;
  box-shadow: 0 4px 10px #FFFFFF;
  z-index: 101;
`;

const ArrowRight = styled.div`
  position: absolute;
  right: calc(var(--rectSize) / -2.5 - 5px);
  top: calc(2 * var(--rectSize));
  width: var(--rectSize);
  height: var(--rectSize);
  background: url(${arrow}) no-repeat center;
  background-size: contain;
  z-index: 100;
`;

const move = keyframes`
  0% {
    left: 0;
  }
  
  100% {
    left: var(--rectSize);
  }
`;

const moveBack = keyframes`
  0% {
    left: var(--rectSize);
  }
  
  100% {
    left: 0;
  }
`;

const Accent = styled(Rectangle)`
  position: absolute;
  top: calc(3 * var(--rectSize));
  left: 0;
  box-shadow: 0 0 20px 10px #7741FB;
  z-index: 4;
  animation: ${({$isAnimation}) => $isAnimation ? appear : ''} ${ANIMATION_RULES}ms both ease-in, ${move} ${MOVE_ANIMATION_DURATION}ms ease-in-out both, ${moveBack} ${MOVE_ANIMATION_DURATION}ms ease-in-out forwards;
  animation-delay: ${1.2 * ANIMATION_DELAY}ms, ${MOVE_ANIMATION_DELAY}ms, ${2 * MOVE_ANIMATION_DELAY + 500}ms;
`;

const MainBlock = styled(Rectangle)`
  position: absolute;
  top: calc(3 * var(--rectSize));
  left: 0;
  z-index: 5;
  animation: ${move} ${MOVE_ANIMATION_DURATION}ms ease-in-out both, ${moveBack} ${MOVE_ANIMATION_DURATION}ms ease-in-out forwards;
  animation-delay: ${MOVE_ANIMATION_DELAY}ms, ${2 * MOVE_ANIMATION_DELAY + 500}ms;
`;

const darkenAnim = keyframes`
  from {
      background: rgba(159, 159, 159, 0);
  }
  
  to {
    background: rgba(159, 159, 159, 0.4);
  }
`;

const Darken = styled.div`
  position: absolute;
  inset: 0;
  animation: ${darkenAnim} ${ANIMATION_RULES}ms both ease-in;
  animation-delay: ${ANIMATION_DELAY}ms;
  z-index: 3;
`;

const NextButton = styled(Button)`
  border-radius: 30px;
  width: 200px;
  margin-top: 20px;
`;

const ModalText = styled.p`
  width: 15.3em !important;
  
  @media screen and (max-height: 700px) {
    width: 15.6em !important;
  }

  @media screen and (max-width: 310px) {
    font-size: 10px;
    width: 16.6em !important;
  }
`;

const BoardWrapperStyled = styled(BoardWrapper)`
  margin-top: min(183px, 46.5vw);

  @media screen and (max-height: 800px) {
    margin-top: min(130px, 34vw);
  }

  @media screen and (max-height: 700px) {
    margin-top: min(80px, 21vw);
  }

  @media screen and (max-height: 600px) {
    margin-top: min(70px, 23.5vw);
  }
`;


const AnimationRulesStyled = styled(AnimationRules)`
  position: absolute;
  z-index: 10;
  top: calc(3.5 * var(--rectSize));
  left: 0;
`;

export const Screen2 = () => {
    const [step, setStep] = useState(0);
    const [isAnimation, setIsAnimation] = useState(true);
    const [shouldAnimate, setShouldAnimate] = useState(true);
    const {next} = useProgress();
    const $keyBlock = useRef('key');

    const handleNext = () => {
        reachMetrikaGoal('start');
        next();
    };

    useEffect(() => {
        if (isAnimation) {
            setTimeout(() => {
                setIsAnimation(false);
                setShouldAnimate(false);
            }, MOVE_ANIMATION_DELAY + MOVE_ANIMATION_DURATION + ANIMATION_RULES);
        }
        else {
            setTimeout(() => {
                $keyBlock.current = Math.random() * 10 + 'key';
                setIsAnimation(true);
            },  500 + MOVE_ANIMATION_DURATION);
        }
    }, [isAnimation]);

    const isFirstStep = step === 0;
    const rulesBlocks = blocks.filter(({id}) => id !== 'main');

    return (
        <>
            <GameWrapper $isBlurred={!isFirstStep}>
                <Header shownTime="00:05" title={'Правила'}/>
                <BoardWrapperStyled rowsAmount={4} row={2} column={4} borderTop={borderTop} borderBottom={borderBottom}>
                    {isFirstStep && (
                        <>
                            <TextBlockStyled>
                                <p>
                                    <b>Выведи фиолетовый блок </b>
                                    {'\n'}за рамки поля. <b>Тяни фигуры,</b> {'\n'}чтобы двигать их и
                                    поэтапно освобождать дорогу к победе
                                </p>
                            </TextBlockStyled>
                            <ArrowRight/>
                        </>
                    )}
                    <Darken />
                    <Board blocks={rulesBlocks} rowsAmount={4} phrases={phrases} isNotDrop/>
                    <MainBlock
                        key={$keyBlock.current + '_main'}
                        color={'accent'}
                        width={rectTypes.game}
                        height={rectTypes.game}
                    />
                    <Accent
                        key={$keyBlock.current + '_accent'}
                        width={rectTypes.game}
                        height={rectTypes.game}
                        $isAnimation={shouldAnimate}
                    />
                    {isAnimation && <AnimationRulesStyled/>}
                </BoardWrapperStyled>
                {isFirstStep ? (
                    <ButtonStyled
                        type={buttonTypes.main}
                        onClick={() => setStep(prevStep => prevStep + 1)}
                    >
                        Далее
                    </ButtonStyled>
                ) : (
                    <RefreshButtonStyled />
                )}
            </GameWrapper>
            {!isFirstStep && (
                <Modal>
                    <ModalText>
                        Под фигурами на поле <b>скрыты фразы,</b> из них ты узнаешь
                        об{'\u00A0'}атмосфере в Kept.{'\n'}
                        Каждый уровень будет открывать тебе <b>преимущества</b> работы в компании.
                        <br/>
                        <br/>
                        Выйди за все рамки, узнай максимум подробностей
                        и{'\u00A0'}получи призы!
                    </ModalText>
                    <NextButton type={buttonTypes.main} onClick={handleNext}>Старт</NextButton>
                </Modal>
            )}
        </>
    );
};
