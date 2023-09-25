import styled from 'styled-components';
import { useState } from 'react';
import { GameWrapper } from '../GameWrapper';
import { Header } from '../Header';
import { BoardWrapper } from '../BoardWrapper';
import { Board } from '../Board';
import { Logo } from '../Logo';
import { Modal } from '../Modal';
import { ResultCard } from './ResultCard';

const HeaderStyled = styled(Header)`
    @media screen and (max-height: 600px) {
      display: ${({$isFinished}) => $isFinished ? 'none' : 'finish'};
    }
`;

const LogoStyled = styled(Logo)`
  @media screen and (min-height: 600px) {
    display: none;
  }
`;

const BoardWrapperStyled = styled(BoardWrapper)`
  margin-top: min(183px, 46.5vw);

  @media screen and (max-height: 800px) {
    margin-top: min(130px, 34vw);
  }

  @media screen and (max-height: 700px) {
    margin-top: min(100px, 26vw);
  }

  @media screen and (max-height: 600px) {
    margin-top: min(110px, 26.5vw);
  }
`;

export const Game = ({
     blocks,
     level,
     boardProps,
     phrases,
     rowsAmount,
     cardProps,
     isFinished,
     BlockComponent,
     children
}) => {
    const [isTimer, setIsTimer] = useState(true);
    const [isRules, setIsRules] = useState(false);

    const handleTurnRules = () => {
        setIsRules(isPrevRules => !isPrevRules);
        setIsTimer(isPrevTimer => !isPrevTimer);
    }

    return (
        <>
            <GameWrapper $isBlurred={isRules}>
                <HeaderStyled level={level} isStart={isTimer} onBtnClick={handleTurnRules} $isFinished={isFinished}/>
                {isFinished ? (
                    <>
                        <LogoStyled />
                        <ResultCard {...cardProps} level={level}/>
                    </>
                ) : (
                    <>
                        <BoardWrapperStyled {...boardProps} rowsAmount={rowsAmount}>
                            <Board blocks={blocks} rowsAmount={rowsAmount} phrases={phrases}>
                                {BlockComponent && <BlockComponent/>}
                            </Board>
                        </BoardWrapperStyled>
                        {children}
                    </>
                )}

            </GameWrapper>
            {isRules && (
                <Modal onBtnClick={handleTurnRules} isButton>
                    <p>
                        <b>Выведи фиолетовый блок </b>
                        {'\n'}за рамки поля. <b>Тяни фигуры,</b> {'\n'}чтобы двигать их и
                        поэтапно освобождать дорогу к победе
                    </p>
                </Modal>
            )}
        </>
    );
};
