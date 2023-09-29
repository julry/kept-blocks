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
import { getChangedEmptyBlocks } from './game-utils';

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
     onDragStart,
     setShownBlocks,
     winCol,
     winRow,
     setEmptyCells,
     children
}) => {
    const [isTimer, setIsTimer] = useState(true);
    const [isRules, setIsRules] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const handleTurnRules = () => {
        if (isFinished) return;
        setIsRules(isPrevRules => !isPrevRules);
        setIsTimer(isPrevTimer => !isPrevTimer);
    };

    const handleDropBlock = async (block, dropX, dropY) => {
        if (isFinished) return;
        let x = dropX;
        let y = dropY;
        const isRect = block.height === rectTypes.game && block.width === rectTypes.game;
        const isDoubleHeight = block.height === rectTypes.gameDouble;
        const isDoubleWidth = block.width === rectTypes.gameDouble;

        if (isRect && x !== block.x && y !== block.y) return;

        if (isDoubleHeight) {
            if (x !== block.x) {
                if (!isDoubleWidth && (block.y - y === 1 || y - block.y === 2)) return;
                else if (y - block.y === 1 && !isDoubleWidth) y = y - 1;
            }
            y = y + 1 > rowsAmount - 1 ? rowsAmount - 2 : (y - block.y === 2 && !isDoubleWidth) ? y - 1 : y;
            y = y > 0 ? y : 0;
        }

        if (isDoubleWidth) {
            if (y !== block.y) {
                if (block.x - x === 1 || x - block.x === 2) return;
                else if (x - block.x === 1) x = x - 1;
            }
            x = x + 1 > 3 ? 2 : x - block.x === 2 ? x - 1 : x;
            x = x > 0 ? x : 0;
        }

        let newBlock = {...block};
        let distance = 1;

        if (Math.abs(block.x - x) > 0) {
            distance = block.x - x < 0 ? distance : -distance;
            for (let i = 0; i < Math.abs(block.x - x); i++) {
                newBlock = await handleDrop(newBlock, newBlock.x + distance, y);
                if (!newBlock) return;
            }
        } else if (Math.abs(block.y - y) > 0) {
            distance = block.y - y < 0 ? distance : -distance;
            for (let i = 0; i < Math.abs(block.y - y); i++) {
                newBlock = await handleDrop(newBlock, x, newBlock.y + distance);
                if (!newBlock) return;
            }
        }
    }

    const handleDrop = async (block, dropX, dropY) => {
        let x = dropX;
        let y = dropY;
        let newBlock;

        const isDoubleHeight = block.height === rectTypes.gameDouble;
        const isDoubleWidth = block.width === rectTypes.gameDouble;
        const isTriple = isDoubleWidth && isDoubleHeight;

        await setEmptyCells((prevCells) => {
            const {x: emptyX, y: emptyY} = block;

            if (emptyX !== x && emptyY !== y && !isTriple) return prevCells;
            const { changedEmptyCells, hasChanged } = getChangedEmptyBlocks({isDoubleWidth, isDoubleHeight, prevCells, emptyY, emptyX, x, y});

            if (hasChanged) {
                setShownBlocks((prevBlocks) => {
                    const changedBlocks = [...prevBlocks];
                    const shownBlock = prevBlocks.find(prevBlock => prevBlock.id === block.id);
                    const id = prevBlocks.indexOf(shownBlock);
                    changedBlocks[id] = {...block, x, y};
                    if (block.id === 'main' && x === winCol && y === winRow) {
                        setTimeout(() => setIsFinished(true), 300);
                    }
                    return changedBlocks;
                });
                newBlock = {...block, x, y};
            }

            return changedEmptyCells;
        });

        return newBlock;
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
                <HeaderStyled level={level} isStart={isTimer && !isFinished} onBtnClick={handleTurnRules} $isFinished={isFinished}/>
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
                                onDrop={handleDropBlock}
                                onDragStart={onDragStart}
                                isComplicatedMain={level === 3}
                            />
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
