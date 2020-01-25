import React from "react";

// import Queue from "./Queue/Queue";
// import { poliID } from "./config";
import Clinic from "./Clinic/Clinic";
// import LoginView from './Login/Login';

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
        Antridoc
      </header> */}
      {/* <LoginView/> */}
      {/* <Queue poliID={poliID} /> */}
      <Clinic/>
    </div>
  );
};

export default App;
