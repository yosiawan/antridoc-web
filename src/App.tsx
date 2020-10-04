import React from "react";

import "./App.css"
import HeaderView from "./Header/Header";
import MenuBarView from "./MenuBar/MenuBar";

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <MenuBarView />
      <div style={{ width: "100%" }}>
        <HeaderView />
      </div>
    </div>
  );
};

export default App;
