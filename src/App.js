import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import TypingText from './TypingText';
import AnimatedBackground from './AnimatedBackground';
import { phrases } from './phrases';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #0a0612;
    color: #a259ff;
    overscroll-behavior: none;
  }
`;

const BrowserContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #0a0612;
  position: relative;
  z-index: 1;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0 0 32px #0008;
`;

// ...remove old desktop browser UI...

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 12px;
  position: relative;
  z-index: 1;
`;

const TypingHeader = styled.h1`
  color: #a259ff;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 18px 0;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 0 2px 16px #000a;
`;

const SearchBar = styled.form`
  width: 100%;
  max-width: 340px;
  margin: 0 auto 24px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 32px;
  border: 2px solid #a259ff;
  background: #18122b;
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 18px;
  outline: none;
  box-shadow: 0 2px 12px #0004;
`;

const BubbleRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 18px;
`;

const bubble = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.12); }
  100% { transform: scale(1); }
`;

const BubbleButton = styled.button`
  background: linear-gradient(135deg, #a259ff 60%, #6e27c5 100%);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  font-size: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px #0006;
  margin: 0 6px;
  cursor: pointer;
  animation: ${bubble} 2.2s infinite;
  transition: box-shadow 0.2s;
  &:active {
    box-shadow: 0 0 0 #0000;
    animation: none;
  }
`;

const Phrase = styled.div`
  color: #fff;
  font-size: 1.1rem;
  margin: 10px 0 0 0;
  text-align: center;
  opacity: 0.7;
`;

const Hamburger = styled.div`
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 10;
  width: 36px;
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Bar = styled.div`
  width: 28px;
  height: 4px;
  background: #a259ff;
  margin: 3px 0;
  border-radius: 2px;
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0; left: 0; bottom: 0;
  width: 220px;
  background: #18122b;
  box-shadow: 2px 0 16px #000a;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: 48px 0 0 0;
  transform: translateX(${props => (props.open ? '0' : '-100%')});
  transition: transform 0.25s cubic-bezier(.4,2,.6,1);
`;

const SideMenuButton = styled.button`
  background: none;
  border: none;
  color: #a259ff;
  font-size: 1.2rem;
  padding: 18px 32px;
  text-align: left;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
  &:hover {
    background: #2d1e4f;
  }
`;




const proxyBase = 'https://scramjet-app-seven.vercel.app/';
const proxySites = [
  { name: 'YouTube', icon: '▶️', url: 'https://youtube.com' },
  { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com' },
  { name: 'ChatGPT', icon: '🤖', url: 'https://chat.openai.com' },
  { name: 'Snapchat', icon: '👻', url: 'https://snapchat.com' },
];

function App() {
  const [search, setSearch] = useState('');
  const [sideOpen, setSideOpen] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx(i => (i + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (!search.trim()) return;
    window.location.href = proxyBase + '?url=' + encodeURIComponent('https://duckduckgo.com/?q=' + encodeURIComponent(search));
  };

  const handleProxySite = url => {
    window.location.href = proxyBase + '?url=' + encodeURIComponent(url);
  };

  return (
    <>
      <GlobalStyle />
      <AnimatedBackground />
      <Hamburger onClick={() => setSideOpen(true)}>
        <Bar />
        <Bar />
        <Bar />
      </Hamburger>
      <SideMenu open={sideOpen}>
        <SideMenuButton onClick={() => setSideOpen(false)}>✕ Close</SideMenuButton>
        <SideMenuButton onClick={() => window.location.href = '/'}>Home</SideMenuButton>
        <SideMenuButton onClick={() => window.location.href = proxyBase}>Proxy</SideMenuButton>
        <SideMenuButton onClick={() => window.location.href = '/games'}>Games</SideMenuButton>
        <SideMenuButton onClick={() => window.location.href = '/credits'}>Credits</SideMenuButton>
      </SideMenu>
      <HomeContainer>
        <TypingHeader>
          <TypingText text="Welcome to NovaNet" speed={70} />
        </TypingHeader>
        <SearchBar onSubmit={handleSearch}>
          <SearchInput
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search the web..."
            autoFocus
          />
          <BubbleRow>
            {proxySites.map(site => (
              <BubbleButton key={site.name} title={site.name} type="button" onClick={() => handleProxySite(site.url)}>
                {site.icon}
              </BubbleButton>
            ))}
          </BubbleRow>
        </SearchBar>
        <Phrase>{phrases[phraseIdx]}</Phrase>
      </HomeContainer>
    </>
  );
}

export default App;
