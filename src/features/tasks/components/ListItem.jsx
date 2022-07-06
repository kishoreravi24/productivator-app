import React, { useEffect, useState } from "react";
import { ActionIcon, Card, Checkbox, Drawer, Group, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { deleteTask, toggleDone } from "../taskSlice";
import { AlignRight, ChevronRight, Trash } from "tabler-icons-react";
import EditTask from "./EditTask";
import ViewTask from "./ViewTask";

const ListItem = ({ id, title, done, description, ...props }) => {
  const [isDrawOpen, setDrawOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setEdit(false);
  }, [isDrawOpen]);
  /**
   * TODO:
   *  - Add Transitions to Edit
   */
  return (
    <>
      <Drawer
        opened={isDrawOpen}
        title={`${isEdit ? "Edit" : "View"} Task`}
        size="xl"
        padding="xl"
        position="right"
        onClose={() => {
          setDrawOpen(false);
        }}
      >
        {!isEdit ? (
          <ViewTask {...{ title, done, description, setEdit, setDrawOpen }} />
        ) : (
          <EditTask
            taskId={id}
            handleSubmit={() => {
              setEdit(false);
            }}
          />
        )}
      </Drawer>
      <Card
        key={id}
        component="li"
        my={16}
        {...props}
        tabIndex={0}
        onClick={() => {
          setDrawOpen(true);
        }}
      >
        <Group position="apart">
          <Group>
            <Checkbox
              checked={done}
              onChange={(e) => {
                dispatch(toggleDone(id));
              }}
            />
            <Text
              transform="capitalize"
              size="lg"
              mx={"auto"}
              {...(done && { color: "dimmed" })}
            >
              {title}
            </Text>
          </Group>
          <Group>
            {description?.length && <ActionIcon size={'md'}><AlignRight/></ActionIcon> }
            {done ? (
              <ActionIcon
                variant="transparent"
                color="red"
                size={"lg"}
                onClick={(e) => {
                  dispatch(deleteTask(id));
                }}
              >
                <Trash />
              </ActionIcon>
            ) : (
              <ActionIcon variant="transparent" color="gray" size={"md"}>
                <ChevronRight />
              </ActionIcon>
            )}
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default ListItem;
