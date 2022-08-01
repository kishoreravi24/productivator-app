import React from "react";
import {
  Burger,
  Drawer,
  Group,
  Header,
  MantineProvider,
  Title,
} from "@mantine/core";
import { Tasks } from "./features/tasks/Tasks";
import Sections from "./features/sections/Sections";
import { useDisclosure } from "@mantine/hooks";

function App() {
  const [isDrawOpen, drawHandle] = useDisclosure(false);

  return (
    <MantineProvider
      theme={{ colorScheme: "dark", overflow: 'hidden' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Header px={"md"} py={"xs"}>
        <Group position="apart">
          <Title order={3}>Productivator</Title>
          <Burger size={'sm'} onClick={drawHandle.toggle} />
        </Group>
      </Header>
      <nav>
        <Drawer opened={isDrawOpen} onClose={drawHandle.toggle} position={'right'} title={<Title order={4} px={'xs'}>Sections</Title>}>
          <Sections close={() => drawHandle.close()}/>
        </Drawer>
      </nav>
      <main>
        <Tasks />
      </main>
    </MantineProvider>
  );
}

export default App;
