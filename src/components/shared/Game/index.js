import { useState } from 'react';
import styled from 'styled-components';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MouseTransition, TouchTransition, DndProvider } from 'react-dnd-multi-backend';
import { GameWrapper } from '../GameWrapper';
import { Header } from '../Header';
import { BoardWrapper } from '../BoardWrapper';
import { Board } from '../Board';
import { Logo } from '../Logo';
import { Modal } from '../Modal';
import { ResultCard } from './ResultCard';
import { rectTypes } from '../Rectangle';

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
    margin-top: min(80px, 21vw);
  }

  @media screen and (max-height: 600px) {
    margin-top: min(80px, 26.5vw);
  }
`;

export const Game = ({
     blocks,
     level,
     boardProps,
     phrases,
     rowsAmount,
     cardProps,
     isFinish,
     BlockComponent,
     onDragStart,
     setShownBlocks,
     winCol,
     winRow,
     children
}) => {
    const [isTimer, setIsTimer] = useState(true);
    const [isRules, setIsRules] = useState(false);
    const [isFinished, setIsFinished] = useState(isFinish);

    const handleTurnRules = () => {
        setIsRules(isPrevRules => !isPrevRules);
        setIsTimer(isPrevTimer => !isPrevTimer);
    };

    const handleDrop = (block, id) => {
        if (isFinished) return;
        let x = id % 4;
        let y = Math.floor(id / 4);
        const isRect = block.height === rectTypes.game && block.width === rectTypes.game;
        const isDoubleHeight = block.height === rectTypes.gameDouble;
        const isDoubleWidth = block.width === rectTypes.gameDouble;
        if (isRect && x !== block.x && y !== block.y) return;

        let isNearRow = Math.abs(block.x - x) <= 1;
        let isNearCol = Math.abs(block.y - y) <= 1;

        if (isDoubleHeight){
            if (x !== block.x) {
                if (block.y - y === 1 || y - block.y === 2) return;
                else if (y - block.y === 1) y = y - 1;
            }
            isNearCol = Math.abs(block.y - y) <= 2;
            y = y + 1 > 3 ? 2 : y - block.y === 2 ? y - 1 : y;
            y = y > 0 ? y : 0;
        } else if (isDoubleWidth) {
            if (y !== block.y) {
                if (block.x - x === 1 || x - block.x === 2) return;
                else if (x - block.x === 1) x = x - 1;
            }
            isNearRow = Math.abs(block.x - x) <= 2;
            x = x + 1 > 3 ? 2 : x - block.x === 2 ? x - 1 : x;
            x = x > 0 ? x : 0;
        }

        if (isNearRow && isNearCol) {
            setShownBlocks(prevBlocks => {
                const changedBlocks = [...prevBlocks];
                if ((isDoubleHeight &&
                    changedBlocks.find(shownBlock => (
                        (shownBlock.x === x || (shownBlock.width === rectTypes.gameDouble && x - shownBlock.x === 1))
                        && shownBlock.y >= block.y
                        && shownBlock.y - block.y <= 1
                        && shownBlock.id !== block.id)))
                    || (isDoubleWidth && changedBlocks.find(shownBlock => (
                        (shownBlock.y === y || (shownBlock.height === rectTypes.gameDouble && y - shownBlock.y === 1))
                        && shownBlock.x >= block.x
                        && shownBlock.x - block.x <= 1
                        && shownBlock.id !== block.id)
                    ))) {
                    return changedBlocks;
                }

                const shownBlock = prevBlocks.find(prevBlock => prevBlock.id === block.id);
                const id = prevBlocks.indexOf(shownBlock);
                changedBlocks[id] = {...block, x, y};
                if (block.id === 'main' && x === winCol && y === winRow) {
                    setTimeout(() => setIsFinished(true), 300);
                }
                return changedBlocks;
            })
        }
    };
    
    const HTML5toTouch = {
        backends: [
            {
                id: 'html5',
                backend: HTML5Backend,
                transition: MouseTransition,
            },
            {
                id: 'touch',
                backend: TouchBackend,
                preview: true,
                transition: TouchTransition,
            },
        ],
    };

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
                    <DndProvider options={HTML5toTouch}>
                        <BoardWrapperStyled {...boardProps} rowsAmount={rowsAmount}>
                            <Board
                                blocks={blocks}
                                rowsAmount={rowsAmount}
                                phrases={phrases}
                                onDrop={handleDrop}
                                onDragStart={onDragStart}
                            >
                                {BlockComponent && <BlockComponent />}
                            </Board>
                        </BoardWrapperStyled>
                        {children}
                    </DndProvider>
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
