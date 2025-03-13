import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/TabAnimation.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import FriendMatch from './components/FriendMatch';
import BuzzerCalculator from './components/BuzzerCalculator';
import KarbitCalculator from './components/KarbitCalculator';
import { initGA, trackPageView } from './utils/analytics';

// Initialize Google Analytics with your measurement ID
const GA_MEASUREMENT_ID = 'G-9TFK9146KD';

const App = () => {
  const [activeKey, setActiveKey] = useState('1');

  useEffect(() => {
    // Initialize Google Analytics
    initGA(GA_MEASUREMENT_ID);
    
    // Track initial page view
    trackPageView(window.location.pathname);
  }, []);

  const items = [
    {
      key: '1',
      label: 'Karbit Calculator',
      children: <KarbitCalculator />,
    },
    {
      key: '2',
      label: 'Friend Match',
      children: <FriendMatch />,
    },
    {
      key: '3',
      label: 'Buzzer Calculator',
      children: <BuzzerCalculator />,
    }
  ];

  const handleTabChange = (key) => {
    setActiveKey(key);
    // Track tab change
    trackPageView(`/${items.find(item => item.key === key).label.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="App bg-secondary bg-opacity-25">
      <div className='p-2 d-flex align-items-center justify-content-center' style={{minHeight:'100vh'}}>
        <div className="bg-light p-4 rounded" style={{minWidth: '80%'}}>
          <Tabs 
            activeKey={activeKey}
            onChange={handleTabChange}
            className="animated-tabs"
            items={items.map(item => ({
              ...item,
              children: (
                <SwitchTransition mode="out-in">
                  <CSSTransition
                    key={item.key}
                    timeout={300}
                    classNames="tab-content"
                    unmountOnExit
                  >
                    <div className="tab-content">
                      {item.children}
                    </div>
                  </CSSTransition>
                </SwitchTransition>
              )
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
