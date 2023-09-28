import { useState } from 'react';
import styled from 'styled-components';
import { useProgress } from '../../hooks/useProgress';
import { reachMetrikaGoal } from '../../utils/reachMetrikaGoal';
import { FlexWrapper } from '../shared/FlexWrapper';
import { FormScreen } from '../shared/FormScreen';
import { Title } from '../shared/Texts';

const Wrapper = styled(FlexWrapper)`
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 18px;
  height: 100%;
  margin: 0 auto;
`;

const Text = styled.p`
  font-size: 16px;
  
  @media screen and (max-height: 700px) {
    font-size: 14px;
  }

  @media screen and (max-height: 600px) {
    font-size: 11px;
  }
`;

const FormScreenStyled = styled(FormScreen)`
  padding-top: min(40px, 7vw);
  
  & > div:nth-child(3) {
    width: 100%;
  }
`;

export const Screen7 = () => {
    const {next} = useProgress();

    const handleNext = () => {
        reachMetrikaGoal('continue2');
        next();
    };

    return (
        <Wrapper>
            <FormScreenStyled isDouble>
                <div>
                    <Title>
                        Молодец, что не боишься трудностей!{'\n'}
                        Именно сложные задачи {'\n'}приводят к по-настоящему {'\n'}крутым результатам.
                    </Title>
                    <br />
                    <Text>
                        Увлекательные проекты из самых разных сфер, коллеги-профессионалы и прозрачный карьерный рост — это всё про Kept, поэтому мы на одной волне!
                        <br/>
                        <br/>
                        После прохождения экстра-уровня твои шансы на победу
                        в розыгрыше стали выше! Оставь свою почту, и, если [дата розыгрыша] фортуна выберет тебя, мы свяжемся!
                    </Text>
                </div>
            </FormScreenStyled>
        </Wrapper>
    );
};
