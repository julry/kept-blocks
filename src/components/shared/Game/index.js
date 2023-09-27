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
     onDragStart,
     setShownBlocks,
     winCol,
     winRow,
     setEmptyCells,
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

        if (isDoubleHeight) {
            if (x !== block.x) {
                if (!isDoubleWidth && (block.y - y === 1 || y - block.y === 2)) return;
                else if (y - block.y === 1) y = y - 1;
            }
            isNearCol = Math.abs(block.y - y) <= 2;
            y = y + 1 > 3 ? 2 : y - block.y === 2 ? y - 1 : y;
            y = y > 0 ? y : 0;
        }

        if (isDoubleWidth) {
            if (y !== block.y) {
                if (block.x - x === 1 || x - block.x === 2) return;
                else if (x - block.x === 1) x = x - 1;
            }
            isNearRow = Math.abs(block.x - x) <= 2;
            x = x + 1 > 3 ? 2 : x - block.x === 2 ? x - 1 : x;
            x = x > 0 ? x : 0;
        }

        if (isNearRow && isNearCol) {
            setEmptyCells((prevCells) => {
                let changedEmptyCells = [...prevCells];
                let newEmptyCells = [];
                const {x: emptyX, y: emptyY} = block;

                if (isDoubleHeight && isDoubleWidth) {
                    if (x !== emptyX) {
                        const isLeft = x - emptyX < 0;
                        if (isLeft) {
                            if (!(prevCells.find(cell => cell.x === x && cell.y === emptyY)
                                && prevCells.find(cell => cell.x === x && cell.y === emptyY + 1))) {
                                return prevCells;
                            }

                            newEmptyCells = newEmptyCells.concat([
                                {x: emptyX, y: emptyY + 1}
                            ]);
                            changedEmptyCells = changedEmptyCells.filter(cell =>
                                (!(cell.x === x && (cell.y === y || cell.y === emptyY + 1)))
                            );
                        } else {
                            if (!(prevCells.find(cell => cell.x === x + 1 && cell.y === emptyY)
                                && prevCells.find(cell => cell.x === x && cell.y === emptyY + 1))) {
                                return prevCells;
                            }

                            newEmptyCells = newEmptyCells.concat([
                                {x: emptyX, y: emptyY + 1},
                                {x: emptyX, y: emptyY},
                            ]);
                            changedEmptyCells = changedEmptyCells.filter(cell =>
                                (!((cell.x === x + 1 && cell.y === emptyY) || (cell.x === x && cell.y === emptyY + 1)))
                            );
                        }
                    } else if (y !== emptyY) {
                        const isUp = y - emptyY < 0;
                        if (isUp) {
                            const emptyYCells = prevCells.filter(cell => cell.y === y);
                            if (!(emptyYCells.find(cell => cell.x === emptyX)
                                && emptyYCells.find(cell => cell.x === emptyX + 1))) {
                                return prevCells;
                            }
                            newEmptyCells = newEmptyCells.concat([
                                {x: emptyX, y: emptyY + 1},
                                {x: emptyX + 1, y: emptyY}
                            ]);
                            changedEmptyCells = changedEmptyCells.filter(cell =>
                                (!(cell.y === y && (cell.x === emptyX || cell.x === emptyX + 1)))
                            );
                        } else {
                            if (!(prevCells.find(cell => cell.x === emptyX && cell.y === y + 1)
                                && prevCells.find(cell => cell.x === emptyX + 1 && cell.y === y))) {
                                return prevCells;
                            }
                            newEmptyCells = newEmptyCells.concat([
                                {x: emptyX + 1, y: emptyY},
                                {x: emptyX, y: emptyY}
                            ]);
                            changedEmptyCells = changedEmptyCells.filter(cell =>
                                (!((cell.y === y && cell.x === emptyX + 1) || (cell.x === emptyX  && cell.y === y + 1)))
                            );
                        }
                    } else {
                        newEmptyCells.push({x: x - emptyX < 0 ? emptyX + 1 : emptyX, y: y - emptyY < 0 ? emptyY + 1 : emptyY});

                        changedEmptyCells = changedEmptyCells.filter(cell => !((cell.y === (y - emptyY < 0 ? y : y + 1)) && (cell.x === (x - emptyX < 0 ? x : x + 1))));
                    }
                } else {
                    if (isDoubleHeight) {
                        if (x !== emptyX) {
                            const emptyXCells = prevCells.filter(cell => cell.x === x);
                            if (!(emptyXCells.find(cell => cell.y === emptyY) && emptyXCells.find(cell => cell.y === emptyY + 1))){
                                return prevCells;
                            }
                            newEmptyCells = newEmptyCells.concat([{x: emptyX, y: emptyY}, {x: emptyX, y: emptyY + 1}]);
                            changedEmptyCells = changedEmptyCells.filter(cell => !(cell.x === x && (cell.y === y || cell.y === y + 1)));
                        } else {
                            newEmptyCells.push({x: emptyX, y: y - emptyY < 0 ? emptyY + 1 : emptyY});
                            changedEmptyCells = changedEmptyCells.filter(cell => !(cell.x === x && (cell.y === (y - emptyY < 0 ? y : y + 1))));
                        }
                    }

                    if (isDoubleWidth) {
                        if (y !== emptyY) {
                            const emptyYCells = prevCells.filter(cell => cell.y === y);
                            if (!(emptyYCells.find(cell => cell.x === emptyX) && emptyYCells.find(cell => cell.x === emptyX + 1))){
                                return prevCells;
                            }
                            newEmptyCells = newEmptyCells.concat([{x: emptyX, y: emptyY}, {x: emptyX + 1, y: emptyY}]);
                            changedEmptyCells = changedEmptyCells.filter(cell => !(cell.y === y && (cell.x === emptyX || cell.x === emptyX + 1)));
                        } else {
                            newEmptyCells.push({x: x - emptyX < 0 ? emptyX + 1 : emptyX, y: emptyY});

                            changedEmptyCells = changedEmptyCells.filter(cell => !(cell.y === y && (cell.x === (x - emptyX < 0 ? x : x + 1))));
                        }
                    }

                    if (isRect) {
                        newEmptyCells.push({x: emptyX, y: emptyY});
                        changedEmptyCells = changedEmptyCells.filter(cell =>  !(cell.x === x && cell.y === y));
                    }
                }

                // console.log(newEmptyCells);
                changedEmptyCells = changedEmptyCells.concat(newEmptyCells);
                // console.log(changedEmptyCells);
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

                return changedEmptyCells;
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
