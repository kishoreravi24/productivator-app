import React from 'react';
import { ActionIcon, Card, Checkbox, Group, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { deleteTask, toggleDone } from "../taskSlice";
import { Trash } from 'tabler-icons-react';


const ListItem = ({ id, task, done, ...props }) => {
    const dispatch = useDispatch();
    return (
        <Card key={id} component="li" my={16} {...props}>
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
                        {...(done && {color:"dimmed"})}
                    >
                        {task}
                    </Text>
                </Group>
               {done && <ActionIcon
                    variant="light"
                    color="red"
                    size={"lg"}
                    onClick={(e) => {
                        dispatch(deleteTask(id));
                    }}
                >
                    <Trash />
                </ActionIcon>}
            </Group>
        </Card>
    )
}

export default ListItem;
