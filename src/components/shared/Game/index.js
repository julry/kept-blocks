import { useRef, useState } from 'react';
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
import { OutBoard } from './OutBoard';

const HeaderStyled = styled(Header)`
    @media screen and (max-height: 600px) {
      display: ${({$isFinished}) => $isFinished ? 'none' : 'flex'};
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
    const $boardRef = useRef();

    const handleTurnRules = () => {
        if (isFinished) return;
        setIsRules(isPrevRules => !isPrevRules);
        setIsTimer(isPrevTimer => !isPrevTimer);
    };

    const handleDropBlock = async (block, dropX, dropY, isRightPartDrag, isDownPartDrag) => {
        if (isFinished) return;
        let x = dropX;
        let y = dropY;
        const isRect = block.height === rectTypes.game && block.width === rectTypes.game;
        const isDoubleHeight = block.height === rectTypes.gameDouble;
        const isDoubleWidth = block.width === rectTypes.gameDouble;

        if (isRect && x !== block.x && y !== block.y) return;

        if (isDoubleHeight && isDoubleWidth && x - block.x === y - block.y && x - block.x === 1) {
            if (isRightPartDrag) x = x - 1;
            else y = y - 1;
        } else if (isDoubleHeight && isDownPartDrag && (x !== block.x || y > block.y)) {
            y = y - 1;
        } else if (isDoubleWidth && isRightPartDrag && (y !== block.y || x > block.x)) {
            x = x - 1;
        }

        y = y + 1 > rowsAmount - 1 ? rowsAmount - 1 : y;
        x = x + 1 > 4 ? 3 : x;

        y = y > 0 ? y : 0;
        x = x > 0 ? x : 0;

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

        await setEmptyCells((prevCells) => {
            const {x: emptyX, y: emptyY} = block;

            if (emptyX !== x && emptyY !== y) return prevCells;
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
        <DndProvider options={HTML5toTouch}>
            <GameWrapper $isBlurred={isRules}>
                <HeaderStyled level={level} isStart={isTimer && !isFinished} onBtnClick={handleTurnRules} $isFinished={isFinished}/>
                {isFinished ? (
                    <>
                        <LogoStyled />
                        <ResultCard {...cardProps} level={level}/>
                    </>
                ) : (
                    <>
                        <BoardWrapperStyled {...boardProps} rowsAmount={rowsAmount} innerRef={$boardRef}>
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
                    </>
                )}
            <OutBoard type={'horizontal'} side={'top'} boardRef={$boardRef} onDrop={handleDropBlock}/>
            <OutBoard type={'horizontal'} side={'bottom'} boardRef={$boardRef} rowsAmount={rowsAmount} onDrop={handleDropBlock}/>
            <OutBoard type={'vertical'} side={'left'} onDrop={handleDropBlock}/>
            <OutBoard type={'vertical'} side={'right'} onDrop={handleDropBlock}/>
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
        </DndProvider>
    );
};
