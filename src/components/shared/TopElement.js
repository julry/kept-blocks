import styled from 'styled-components';
import { Rectangle, rectTypes } from './Rectangle';

const Wrapper = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const TopElement = ({className, isUpperRect}) => (
    <Wrapper className={className}>
        {isUpperRect && <Row>
            <Rectangle width={rectTypes.additional} height={rectTypes.additional} color="accent"/>
        </Row>}
        <Row>
            <Rectangle width={rectTypes.additionalDouble} height={rectTypes.additional} color="second"/>
            <Rectangle width={rectTypes.additional} height={rectTypes.additional} color="main"/>
        </Row>
    </Wrapper>
);
