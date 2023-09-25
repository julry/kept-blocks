import styled from 'styled-components';
import { Rectangle, rectTypes } from './Rectangle';

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const BottomElement = ({className, isLight}) => (
    <Row className={className}>
        <Rectangle width={rectTypes.additional} height={rectTypes.additionalDouble} color="second"/>
        <Rectangle width={rectTypes.additional} height={rectTypes.additional} color={isLight ? "main" : "accent"}/>
    </Row>
);
