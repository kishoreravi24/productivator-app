import React from "react";
import {
  Title,
  Group,
  Text,
  Container,
  Stack,
  Button,
  Badge,
  Checkbox,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { updateTask } from "../taskSlice";
import EditableType from "./EditableType.tsx";

const ViewTask = ({ task, drawToggle }) => {
  const {id, title, description, done} = task;
  const dispatch = useDispatch();
  return (
    <>
      <Stack justify={"space-between"} style={{ height: "90%" }}>
        <Container style={{ width: "100%" }}>
          <Group position="apart" my={"lg"} style={{ width: "100%" }}>
            <Group>
              <Checkbox
                checked={done}
                onChange={() => {
                  dispatch(updateTask({ ...task, done: !done }));
                }}
              />
              <EditableType
                TypeComponent={Title}
                TypeComponentProps={{ order: 3 }}
                text={title}
                textSize={"lg"}
                setText={(updatedTitle) => {
                  dispatch(
                    updateTask({  ...task, title: updatedTitle })
                  );
                }}
              />
            </Group>
            <Badge color={`${done ? "green" : "gray"}`}>
              {done ? "DONE" : "TODO"}
            </Badge>
          </Group>
          <EditableType
            TypeComponent={Text}
            text={description}
            inputType="textarea"
            setText={(updatedDescription) => {
              dispatch(
                updateTask({ ...task, description: updatedDescription })
              );
            }}
          />
        </Container>
        <Group position="right">
          <Button
            variant={'outline'}
            color={"red"}
            leftIcon={<X />}
            onClick={() => {
              drawToggle();
            }}
          >
            Close
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default ViewTask;
