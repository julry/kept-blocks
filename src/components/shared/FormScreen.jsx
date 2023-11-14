import styled from 'styled-components';
import { Logo } from './Logo';
import { TopElement } from './TopElement';
import { TextBlock } from './TextBlock';
import { Button } from './Button';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: min(50px, 12.8vw);
  
  @media screen and (max-height: 700px) {
    padding-top: min(35px, 10vw);
  }
`;

const TextBlockStyled = styled(TextBlock)`
  padding: 30px;

  @media screen and (max-height: 800px) {
    padding: 25px;
  }
  
  & p {
    width: auto;
  }
`;

export const FormScreen = ({children, className}) => (
    <Wrapper className={className}>
        <Logo />
        <TopElement isUpperRect />
        <TextBlockStyled>
            {children}
        </TextBlockStyled>
        <Button 
            type="main" 
            onClick={() => window.open('https://fut.ru/programs/kept_consulting/?utm_source=fut&utm_medium=kept_game', '_target')}
        >
            Хочу в команду
        </Button>
    </Wrapper>
);
