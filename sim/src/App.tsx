import React, { useState } from "react";
import { Layout } from "./components/lays";
import { MenuSelector, Menu } from "./components/default";
import { Algorithm } from "./components/main/algorithm";
import { SymbolRecognition } from "./components/main/symbol_recognition";
import { RaspberryPi } from "./components/main/raspberry_pi";

function App() {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(
    Menu.Algorithm
  );

  return (
    <div id="app-container" className="font-poppins"
    style={{ userSelect: "none", caretColor: "transparent" }}
>
      <Layout>
        <MenuSelector
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />

        {/* Feature-specific Content */}
        {selectedMenu === Menu.Algorithm && <Algorithm />}
        {selectedMenu === Menu.Symbol_Recognition && (
          <SymbolRecognition />
        )}
        {selectedMenu === Menu.Raspberry_Pi && <RaspberryPi />}
      </Layout>
    </div>
  );
}

export default App;