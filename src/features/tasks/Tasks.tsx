import React from "react";
import {
  Container,
  Title,
  ActionIcon,
  TextInput,
  ScrollArea,
  Header,
  List,
} from "@mantine/core";
import { useFocusTrap, useFocusReturn } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Plus } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, selectTasksList } from "./taskSlice";
import { Flipped, Flipper } from "react-flip-toolkit";
import TaskItem from "./components/TaskItem";
import { Task } from './Task.d';
import { FlipId } from "flip-toolkit/lib/types";

export function Tasks() {
  const form = useForm({
    initialValues: {
      task: '',
    },
    validate: {
      task: (value) => value.trim().length ? null : "Task title must not be empty"
    }
  })

  const focusRef = useFocusTrap(true);
  const focusReturn = useFocusReturn({opened: true});
  const taskList: Task[] = useSelector(selectTasksList);
  const dispatch = useDispatch();
  return (
    <>
      <Container p={'md'}>
        <Header height={'3rem'} m={8}>
          <Title>Productivator</Title>
        </Header>
        <form
          onSubmit={form.onSubmit(({task}) => {
            dispatch(addTask(task));
            form.reset();
            focusReturn();
          })}
        >
          <TextInput
            ref={focusRef}
            {...form.getInputProps('task')}
            placeholder="Enter task here"
            style={{ width: "100%", padding: "0.25rem 0.5rem" }}
            rightSection={<ActionIcon color={"blue"} variant={"light"} type={"submit"}>
              <Plus />
            </ActionIcon>}
            autoFocus
            required 
          />
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
