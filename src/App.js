import React from "react";
import { MantineProvider } from "@mantine/core";
import { Tasks } from "./features/tasks/Tasks.tsx";

function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div className="App">
        <header className="App-header">
          <Tasks />
        </header>
      </div>
    </MantineProvider>
  );
}

export default App;
