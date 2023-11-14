import styled from 'styled-components';
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

export const Screen7 = () => (
    <Wrapper>
        <FormScreenStyled isDouble>
            <div>
                <Title>
                    Молодец, что не боишься трудностей!{'\n'}
                    Именно сложные задачи {'\n'}приводят к{'\u00A0'}по-настоящему {'\n'}крутым результатам.
                </Title>
                <br />
                <Text>
                    {
                        'Увлекательные проекты из самых разных сфер, коллеги-профессионалы и\u00A0прозрачный' +
                        ' карьерный рост — это всё про Kept, поэтому мы на\u00A0одной\u00A0волне!'
                    }
                    <br />
                    <br />
                    {'Переходи по кнопке и\u00A0пробуй себя на\u00A0нашей стажировке в\u00A0консалтинге.'}
                </Text>
            </div>
        </FormScreenStyled>
    </Wrapper>
);
