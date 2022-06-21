import React from "react";
import { MantineProvider } from "@mantine/core";
import { Counter } from "./features/counter/Counter";

function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <div className="App">
        <header className="App-header">
          <Counter />
        </header>
      </div>
    </MantineProvider>
  );
}

export default App;
