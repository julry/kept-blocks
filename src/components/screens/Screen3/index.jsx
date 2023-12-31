import { useState } from 'react';
import { useProgress } from '../../../hooks/useProgress';
import { Game } from '../../shared/Game';
import { reachMetrikaGoal } from '../../../utils/reachMetrikaGoal';
import { RefreshButton } from '../../shared/RefreshButton';
import styled from 'styled-components';
import { blocks, borderBottom, borderTop, phrases } from './constants';

export const RefreshButtonStyled = styled(RefreshButton)`
  margin-top: min(81px, 20.7vw);
  
  @media screen and (max-height: 700px) {
    margin-top: min(64px, 12.7vw);
  }
`;

export const Screen3 = () => {
    const {next} = useProgress();

    const handleNext = () => {
        reachMetrikaGoal('continue1');
        next();
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
            'на работе, но и за её пределами. Играем в «Что? Где? Когда?», футбол, бегаем, а иногда просто едим пиццу по пятницам 🍕'
    }

    return (
        <Game level={1} blocks={blocks} rowsAmount={4} phrases={phrases} boardProps={boardProps} cardProps={cardProps}>
            <RefreshButtonStyled />
        </Game>
    );
};
