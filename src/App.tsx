import React from 'react';

import './App.css';
// import LoginView from './Login/Login';
import Queue from './Queue/Queue';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
        Antridoc
      </header> */}
      {/* <LoginView/> */}
      <Queue />
    </div>
  );
}

export default App;
