import React, { useState } from "react";
import {
  Container,
  Title,
  ActionIcon,
  TextInput,
  ScrollArea,
  Header,
  List,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, selectTasksList } from "./taskSlice";
import { Flipped, Flipper } from "react-flip-toolkit";
import TaskItem from "./components/TaskItem";
import { Task } from './Task.d';
import { FlipId } from "flip-toolkit/lib/types";

export function Tasks() {
  const [task, setTask] = useState("");
  const taskList: Task[] = useSelector(selectTasksList);
  const dispatch = useDispatch();
  return (
    <>
      <Container p={'md'}>
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
            style={{ width: "100%", padding: "0.25rem 0.5rem" }}
            onChange={(e) => {
              setTask(e.target.value);
              e.target.focus();
            }}
            rightSection={<ActionIcon color={"blue"} variant={"light"} type={"submit"}>
              <Plus />
            </ActionIcon>}
            autoFocus
            required />
        </form>
        <ScrollArea style={{ height: "85vh" }} px={'xs'}>
          <Flipper flipKey={taskList.map(({ timeStamp }) => timeStamp).join('')}>
            <List listStyleType={'none'} my={'xs'}>
              {taskList
                .map(taskItem => (
                  <List.Item key={taskItem.id as React.Key}>
                    <Flipped flipId={taskItem.id as FlipId}>
                      <TaskItem task={taskItem} />
                    </Flipped>
                  </List.Item>
                ))}
            </List>
          </Flipper>
        </ScrollArea>
      </Container>
    </>
  );
}
