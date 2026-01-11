import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #11110f;
    color: #ffd700;
  }
`;

const BrowserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #11110f;
`;

const TabBar = styled.div`
  display: flex;
  background: #22221f;
  border-bottom: 2px solid #ffd700;
`;

const Tab = styled.div`
  padding: 12px 24px;
  cursor: pointer;
  color: #ffd700;
  background: ${({ active }) => (active ? '#33331f' : 'transparent')};
  border-bottom: ${({ active }) => (active ? '4px solid #ffd700' : 'none')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  background: #181818;
  padding: 8px 16px;
`;

const NavButton = styled.button`
  background: #22221f;
  color: #ffd700;
  border: none;
  margin-right: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #ffd700;
    color: #11110f;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ffd700;
  background: #22221f;
  color: #ffd700;
  margin-right: 8px;
`;

const BookmarksBar = styled.div`
  display: flex;
  background: #181818;
  padding: 6px 16px;
  border-bottom: 1px solid #ffd700;
`;

const Bookmark = styled.button`
  background: #22221f;
  color: #ffd700;
  border: none;
  margin-right: 8px;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #ffd700;
    color: #11110f;
  }
`;

const WebView = styled.iframe`
  flex: 1;
  border: none;
  width: 100%;
  background: #11110f;
`;

const defaultBookmarks = [
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com' },
  { name: 'Opera', url: 'https://www.opera.com' },
  { name: 'GitHub', url: 'https://github.com' },
];

const defaultTabs = [
  { title: 'NovaNet Home', url: 'https://duckduckgo.com' },
];

function App() {
  const [tabs, setTabs] = useState(defaultTabs);
  const [activeTab, setActiveTab] = useState(0);
  const [address, setAddress] = useState(tabs[0].url);

  const handleNav = (type) => {
    // Navigation logic placeholder
    if (type === 'home') {
      updateTabUrl('https://duckduckgo.com');
    } else if (type === 'reload') {
      updateTabUrl(tabs[activeTab].url);
    }
  };

  const updateTabUrl = (url) => {
    const newTabs = tabs.map((tab, idx) =>
      idx === activeTab ? { ...tab, url } : tab
    );
    setTabs(newTabs);
    setAddress(url);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let url = address;
    if (!/^https?:\/\//.test(url)) {
      url = `https://duckduckgo.com/?q=${encodeURIComponent(url)}`;
    }
    updateTabUrl(url);
  };

  const handleBookmark = (url) => {
    updateTabUrl(url);
  };

  const addTab = () => {
    setTabs([...tabs, { title: 'New Tab', url: 'https://duckduckgo.com' }]);
    setActiveTab(tabs.length);
    setAddress('https://duckduckgo.com');
  };

  const closeTab = (idx) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((_, i) => i !== idx);
    setTabs(newTabs);
    if (activeTab >= newTabs.length) setActiveTab(newTabs.length - 1);
    setAddress(newTabs[activeTab >= newTabs.length ? newTabs.length - 1 : activeTab].url);
  };

  return (
    <>
      <GlobalStyle />
      <BrowserContainer>
        <TabBar>
          {tabs.map((tab, idx) => (
            <Tab key={idx} active={idx === activeTab} onClick={() => { setActiveTab(idx); setAddress(tabs[idx].url); }}>
              {tab.title}
              {tabs.length > 1 && (
                <span style={{ marginLeft: 8, color: '#ffd700', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); closeTab(idx); }}>&times;</span>
              )}
            </Tab>
          ))}
          <Tab onClick={addTab} style={{ fontWeight: 'bold', fontSize: 20 }}>+</Tab>
        </TabBar>
        <NavBar>
          <NavButton onClick={() => handleNav('back')}>{'<'}</NavButton>
          <NavButton onClick={() => handleNav('forward')}>{'>'}</NavButton>
          <NavButton onClick={() => handleNav('reload')}>⟳</NavButton>
          <NavButton onClick={() => handleNav('home')}>🏠</NavButton>
          <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex' }}>
            <SearchInput
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Search or enter address"
            />
          </form>
        </NavBar>
        <BookmarksBar>
          {defaultBookmarks.map(b => (
            <Bookmark key={b.url} onClick={() => handleBookmark(b.url)}>{b.name}</Bookmark>
          ))}
        </BookmarksBar>
        <WebView src={tabs[activeTab].url} title={tabs[activeTab].title} />
      </BrowserContainer>
    </>
  );
}

export default App;
