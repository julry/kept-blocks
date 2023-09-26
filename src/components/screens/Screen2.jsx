import { useState } from 'react';
import styled from 'styled-components';
import arrow from '../../assets/images/arrow.svg';
import { useProgress } from '../../hooks/useProgress';
import { reachMetrikaGoal } from '../../utils/reachMetrikaGoal';
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

const Accent = styled(Rectangle)`
  position: absolute;
  top: calc(3 * var(--rectSize));
  left: 0;
  box-shadow: 0 0 20px 10px #7741FB;
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


export const Screen2 = () => {
    const [step, setStep] = useState(0);
    const {next} = useProgress();

    const handleNext = () => {
        reachMetrikaGoal('level1');
        next();
    };

    const handleChangeStep = () => {
        reachMetrikaGoal('level1');
        setStep(prevStep => prevStep + 1);
    };

    const isFirstStep = step === 0;

    return (
        <>
            <GameWrapper $isBlurred={!isFirstStep}>
                <Header shownTime="00:05" level={1}/>
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
                    <Board blocks={blocks} rowsAmount={4} phrases={phrases} isNotDrop/>
                    <Accent width={rectTypes.game} height={rectTypes.game}/>
                </BoardWrapperStyled>
                {isFirstStep ? (
                    <ButtonStyled type={buttonTypes.main} onClick={handleChangeStep}>Далее</ButtonStyled>
                ) : (
                    <RefreshButtonStyled />
                )}
            </GameWrapper>
            {!isFirstStep && (
                <Modal>
                    <ModalText>
                        Под фигурами на поле <b>скрыты фразы,</b> из них ты узнаешь
                        {'\n'}об атмосфере в Kept.{'\n'}
                        Каждый уровень будет открывать тебе <b>преимущества</b> работы в компании.
                        <br/>
                        <br/>
                        Выйди за все рамки, узнай максимум подробностей
                        {'\n'}и получи призы!
                    </ModalText>
                    <NextButton type={buttonTypes.main} onClick={handleNext}>Старт</NextButton>
                </Modal>
            )}
        </>
    );
};
