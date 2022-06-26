import React, { useState } from "react";
import {
  Accordion,
  Container,
  Title,
  ActionIcon,
  TextInput,
  ScrollArea,
  Header,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, selectTasksList } from "./taskSlice";
import ListItem from './components/ListItem';

export function Tasks() {
  const [task, setTask] = useState("");
  const taskList = useSelector(selectTasksList);
  const dispatch = useDispatch();
  return (
    <>
      <Container p={12}>
        <Header height={'3rem'} m={8}>
          <Title>Productivator</Title>
        </Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!task.trim().length)
              return;
            dispatch(addTask(task));
            setTask("");
          }}
        >
          <TextInput
            id="add-task"
            placeholder="Enter task here"
            value={task}
            style={{ width: "100%", padding: "0 0.5rem" }}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            rightSection={<ActionIcon color={"blue"} variant={"light"} type={"submit"}>
              <Plus />
            </ActionIcon>}
            autoFocus
            required />
        </form>
        <Accordion
          my={12}
          styles={{ content: { paddingLeft: "0" } }}
          initialItem={0}
        >
          <Accordion.Item label="Tasks">
            <ScrollArea style={{ height: "60vh" }}>
              <ul style={{ padding: 0 }}>
                {taskList
                  .filter(({ done }) => !done)
                  .map(taskItem => (
                    <ListItem key={taskItem.id} {...taskItem} />
                  ))}
              </ul>
            </ScrollArea>
          </Accordion.Item>
          <Accordion.Item label="Older Tasks">
            <ScrollArea style={{ height: "60vh" }}>
              <ul style={{ padding: 0 }}>
                {taskList
                  .filter(({ done }) => done)
                  .map(taskItem => (
                    <ListItem key={taskItem.id} {...taskItem} />
                  ))}
              </ul>
            </ScrollArea>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}
