import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProgressProvider } from './context/ProgressContext';
import { useProgressInit } from './hooks/useProgressInit';
import { FlexWrapper } from './components/shared/FlexWrapper';
import { getEmptyImage } from 'react-dnd-html5-backend';

const Wrapper = styled(FlexWrapper)`
  --rectPart: calc((100vw - 60px) / 4);
  --rectSize: min(var(--rectPart), 90px);
  --accentColor: #531A54;
  --accentBorderColor: #531A54;
  --mainColor: #A39CFC;
  --secondColor: #7741FB;
  --mainBorderColor: #948BFF;
  --borderRadius: calc(var(--rectSize) * 10 / 80);
  --smallRadius: calc(var(--rectSize) * 5 / 80);
  --boxShadow: 6px 5px 5px 0px rgba(228, 228, 239, 0.15) inset, -6px -5px 5px 0px rgba(228, 228, 239, 0.15) inset;
  height: ${({height}) => height}px;
  overflow-x: hidden;
  align-items: center;
  white-space: pre-line;
  
  @media screen and (min-width: 450px) and (max-height: 800px) {
    --rectSize: 80px;
  }

  @media screen and (min-width: 450px) and (max-height: 700px) {
    --rectSize: 70px;
  }

  @media screen and (min-width: 450px) and (max-height: 600px) {
    --rectSize: 60px;
  }
`;

const ComponentWrapper = styled(FlexWrapper)`
  position: relative;
  max-width: 640px;
  height: 100%;
  width: 100%;
  overflow: hidden;

  @media screen and (min-width: 640px) {
    max-width: 450px;
    max-height: 900px;
    margin: 20px auto;
    border: 3px solid var(--accentColor);
    border-radius: 20px;
  }

  @media screen and (min-width: 640px) and (max-height: 600px) {
    max-width: 400px;
  }
`;

function App() {
  const [height, setHeight] = useState(100);
  const progress = useProgressInit();
  const {screen} = progress;

  const Component = screen?.component || (() => null);

  useEffect(() => {
    function handleResize() {
      const viewportHeight = document.documentElement.clientHeight;
      setHeight(viewportHeight);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <ProgressProvider value={progress}>
        <Wrapper height={height}>
          <ComponentWrapper>
            <Component />
          </ComponentWrapper>
        </Wrapper>
      </ProgressProvider>
  );
}

export default App;
