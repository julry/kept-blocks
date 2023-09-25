import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import clock from '../../assets/images/clock.svg';

const TimerWrapper = styled.div`
  border-radius: 6px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: min(43px, 11vw);

  @media screen and (max-height: 700px) {
    width: 80px;
    height: min(34px, 9vw);
  }
`;

const Icon = styled.img`
  width: 21px;
  height: 24px;
  margin-right: 11px;

  @media screen and (max-height: 700px) {
    width: 17px;
    height: 19px;
    margin-right: 8px;
  }
`;

const Time = styled.p`
  font-weight: 500;
  font-size: 16px;
  min-width: 2.9em;

  @media screen and (max-height: 700px) {
    font-size: 12px;
  }
`;

export const Timer = memo(({ isStart, shownTime }) => {
    const [time, setTime] = useState(0);
    const $interval = useRef(null);
    const $time = useRef(0);

    useEffect(() => {
        if (isStart) {
            if ($interval.current) {
                clearInterval($interval.current);
                $interval.current = null;
            }

            $interval.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
                $time.current += 1;
            }, 1000);
        }
        if (!isStart && $interval.current) {
            clearInterval($interval.current);
            $interval.current = null;
        }
    }, [isStart]);

    const getMinutes = useCallback(() => {
       const minutes = Math.floor(time / 60);
       return minutes > 9 ? minutes : `0${minutes}`;
    }, [time]);

    const getSeconds = useCallback(() => {
        const seconds = Math.floor(time % 60);
        return seconds > 9 ? seconds : `0${seconds}`;
    }, [time]);

    return (
        <TimerWrapper>
            <Icon src={clock} alt={''}/>
            <Time> {shownTime ?? `${getMinutes()}:${getSeconds()}`}</Time>
        </TimerWrapper>
    );
});
