import { useState } from 'react';
import styled from 'styled-components';
import { useProgress } from '../../../hooks/useProgress';
import { Game } from '../../shared/Game';
import { reachMetrikaGoal } from '../../../utils/reachMetrikaGoal';
import { RefreshButton } from '../../shared/RefreshButton';
import { blocks, borderBottom, borderTop, phrases, styles, empties } from './constants';

export const RefreshButtonStyled = styled(RefreshButton)`
  margin-top: min(25px, 8.5vw);
  
  @media screen and (max-height: 850px) {
    margin-top: 0;
    width: min(60px, 18.6vw);
    height: min(60px, 18.6vw);
  }

  @media screen and (max-height: 700px) {
    margin-top: 0;
    width: min(40px, 13.6vw);
    height: min(40px, 13.6vw);
  }
`;

export const Screen6 = () => {
    const [shownBlocks, setShownBlocks] = useState([...blocks]);
    const [emptyCells, setEmptyCells] = useState([...empties]);

    const {next} = useProgress();

    const handleRestart = () => {
        setEmptyCells([...empties]);
        setShownBlocks([...blocks]);
    }

    const handleNext = () => {
        reachMetrikaGoal('continue1');
        next();
    };

    const boardProps = {
        row: -1,
        column: 2,
        borderTop,
        borderBottom,
        emptyWidth: 2,
        styles
    };

    const cardProps = {
        frontText: () => (
            <div>
                <p><b>Последний пазл собран!</b></p>
            </div>
        ),
        backText: 'Карьера в Kept — это твоя возможность поработать \n' +
            'с компаниями из различных индустрий: от нефтегаза \n' +
            'до ИТ. Это способствует быстрому развитию навыков и взлету по карьерной лестнице!\n\n' +
            'Нам важно, чтобы на работе тебе было комфортно, поэтому у нас гибкий график и гибридный формат!',
        btnText: 'Что теперь?'
    }

    return (
        <Game
            level={3}
            blocks={shownBlocks}
            rowsAmount={6}
            // rowsAmount={4}
            phrases={phrases}
            boardProps={boardProps}
            cardProps={cardProps}
            setShownBlocks={setShownBlocks}
            winCol={2}
            winRow={0}
            setEmptyCells={setEmptyCells}
        >
            <RefreshButtonStyled onClick={handleRestart}/>
        </Game>
    );
};
