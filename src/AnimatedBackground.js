import React from 'react';
import styled, { keyframes } from 'styled-components';

const move = keyframes`
  0% { transform: translateY(-100px) scaleX(1); opacity: 0.2; }
  50% { opacity: 0.5; }
  100% { transform: translateY(110vh) scaleX(1.2); opacity: 0.1; }
`;

const Line = styled.div`
  position: absolute;
  left: ${props => props.left}%;
  width: ${props => props.width}px;
  height: 2px;
  background: linear-gradient(90deg, #a259ff 0%, #6e27c5 100%);
  opacity: 0.3;
  border-radius: 2px;
  animation: ${move} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
`;

const Container = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const AnimatedBackground = () => {
  const lines = Array.from({ length: 12 }).map((_, i) => ({
    left: Math.random() * 100,
    width: 80 + Math.random() * 60,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 4,
  }));
  return (
    <Container>
      {lines.map((l, i) => (
        <Line key={i} {...l} />
      ))}
    </Container>
  );
};

export default AnimatedBackground;
