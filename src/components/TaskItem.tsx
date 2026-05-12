import { Button, Checkbox, HStack, Text } from "@chakra-ui/react";
import type { Task } from "../types";

type TaskItemProps = {
    task: Task
    onCompleted: (id: number) => void
    onDelete: (id: number) => void
}

const TaskItem = ({ task, onDelete, onCompleted }: TaskItemProps) => {
	return (
		<HStack
			p={4}
			bg="gray.800"
			borderRadius="md"
			borderWidth="1px"
			borderColor="gray.700"
			opacity={task.completed ? 0.6 : 1}
		>
			<Checkbox.Root
				checked={task.completed}
				onCheckedChange={() => onCompleted(task.id)}
				colorPalette="green"
			>
				<Checkbox.HiddenInput />
				<HStack>
					<Checkbox.Control />
					<Checkbox.Label>
						<Text
							color="gray.100"
							textDecoration={task.completed ? "line-through" : "none"}
						>
							{task.name}
						</Text>
					</Checkbox.Label>
				</HStack>
			</Checkbox.Root>

			<Button
				colorPalette="red"
				size="sm"
				variant="ghost"
				onClick={() => onDelete(task.id)}
				ml="auto"
			>
				🗑️ Borrar
			</Button>
		</HStack>
	)
}

export default TaskItem