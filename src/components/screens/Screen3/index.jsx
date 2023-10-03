import { useState } from 'react';
import styled from 'styled-components';
import { Game } from '../../shared/Game';
import { RefreshButton } from '../../shared/RefreshButton';
import { blocks, borderBottom, borderTop, empties, phrases } from './constants';

export const RefreshButtonStyled = styled(RefreshButton)`
  margin-top: min(81px, 20.7vw);
  
  @media screen and (max-height: 700px) {
    margin-top: min(64px, 12.7vw);
  }
`;

export const Screen3 = () => {
    const [shownBlocks, setShownBlocks] = useState([...blocks]);
    const [, setEmptyCells] = useState([...empties]);

    const handleRestart = () => {
        setEmptyCells([...empties]);
        setShownBlocks([...blocks]);
    };

    const boardProps = {
        row: 2,
        column: 4,
        borderTop,
        borderBottom
    };

    const cardProps = {
        frontText: () => (
            <div>
                <p>
                    <b>Супер, начало положено!</b>
                    {'\n\n'}
                    Забирай первый секретный пазл.
                </p>
            </div>
        ),
        backText: 'Мы команда не только ' +
            'на работе, но\u00A0и\u00A0за её пределами. Играем в\u00A0«Что? Где? Когда?», футбол, ' +
            'бегаем, а\u00A0иногда просто едим пиццу по\u00A0пятницам 🍕'
    }

    return (
        <Game
            level={1}
            blocks={shownBlocks}
            rowsAmount={4}
            phrases={phrases}
            boardProps={boardProps}
            cardProps={cardProps}
            setShownBlocks={setShownBlocks}
            winCol={3}
            winRow={2}
            setEmptyCells={setEmptyCells}
        >
            <RefreshButtonStyled onClick={handleRestart}/>
        </Game>
    );
};
