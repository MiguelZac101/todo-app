import { Button, Checkbox, HStack, Input, Text } from "@chakra-ui/react";
import type { Task } from "../types";
import { useState } from "react";

type TaskItemProps = {
    task: Task
    onCompleted: (id: number) => void
    onDelete: (id: number) => void
	onEdit: (id: number, newName: string) => void
}

const TaskItem = ({ task, onDelete, onCompleted, onEdit }: TaskItemProps) => {
	// Estado local para manejar la edición de la tarea
	const [isEditing, setIsEditing] = useState(false)
	// Estado local para manejar el nombre editado de la tarea, inicializado con el nombre actual de la tarea
	const [editedName, setEditedName] = useState(task.name)  	

	const handleSave = () => {
		if (editedName.trim() !== '') {
			onEdit(task.id, editedName.trim())
			setIsEditing(false)
		}
	}

	const handleCancel = () => {
		setEditedName(task.name)
		setIsEditing(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') handleSave()
		if (e.key === 'Escape') handleCancel()
	}

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
						{isEditing? (
							<Input
								value={editedName}
								onChange={e => setEditedName(e.target.value)}
								onKeyDown={handleKeyDown}
								onBlur={handleSave}
								autoFocus
								size="sm"
								variant="flushed"
								color="white"
							/>
						) : (
							<Text
								color="gray.100"
								textDecoration={task.completed ? "line-through" : "none"}
							>
								{task.name}
							</Text>
						)}
						
					</Checkbox.Label>
				</HStack>
			</Checkbox.Root>
		
			<Button
				colorPalette="green"
				size="sm"
				variant="outline"
				onClick={() => setIsEditing(true)}
				ml="auto"
			>
				Editar
			</Button>		

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