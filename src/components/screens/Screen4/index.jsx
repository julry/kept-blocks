import { useState } from 'react';
import styled from 'styled-components';
import { Game } from '../../shared/Game';
import { RefreshButton } from '../../shared/RefreshButton';
import { blocks, borderBottom, borderTop, phrases, empties } from './constants';

export const RefreshButtonStyled = styled(RefreshButton)`
  margin-top: min(81px, 20.7vw);
  
  @media screen and (max-height: 700px) {
    margin-top: min(64px, 12.7vw);
  }
`;

export const Screen4 = () => {
    const [shownBlocks, setShownBlocks] = useState([...blocks]);
    const [, setEmptyCells] = useState([...empties]);

    const handleRestart = () => {
        setShownBlocks([...blocks]);
        setEmptyCells([...empties]);
    }

    const boardProps = {
        row: 2,
        column: -1,
        borderTop,
        borderBottom
    };

    const cardProps = {
        frontText: () => (
            <div>
                <p>
                    <b>Победа!</b>
                    {'\n\n'}
                    Держи второй пазл.
                </p>
            </div>
        ),
        backText: 'В Kept тебя всегда поддержат и\u00A0всему научат. Твоя карьера — в\u00A0твоих руках! ' +
            'Наставник, бадди, более 50 тренингов ' +
            'по\u00A0твердым и\u00A0мягким навыкам, коучинг и\u00A0карьерные консультации помогут ' +
            'расти внутри компании и\u00A0видеть собственные перспективы'
    };

    return (
        <Game
            level={2}
            blocks={shownBlocks}
            rowsAmount={4}
            phrases={phrases}
            boardProps={boardProps}
            cardProps={cardProps}
            setShownBlocks={setShownBlocks}
            winCol={0}
            winRow={2}
            setEmptyCells={setEmptyCells}
        >
            <RefreshButtonStyled onClick={handleRestart}/>
        </Game>
    );
};
