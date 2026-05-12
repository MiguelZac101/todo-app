import { Checkbox, HStack, IconButton, Input, Text } from "@chakra-ui/react";
import type { Task } from "../types";
import { useState } from "react";
import { LuCheck, LuPencil, LuTrash2, LuX } from "react-icons/lu";

type TaskItemProps = {
    task: Task
    onCompleted: (id: number) => void
    onDelete: (id: number) => void
	onEdit: (id: number, newName: string) => void
}

export const TaskItem = ({ task, onDelete, onCompleted, onEdit }: TaskItemProps) => {
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
			<HStack flex={1} >			
			
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

			</HStack>
			<HStack>
				{isEditing ? (
					<>
						<IconButton
							size="sm"
							variant="ghost"
							colorPalette="green"
							onClick={handleSave}
							aria-label="Guardar"
						>
							<LuCheck />
						</IconButton>
						<IconButton
							size="sm"
							variant="ghost"
							colorPalette="red"
							onClick={handleCancel}
							aria-label="Cancelar"
						>
							<LuX />
						</IconButton>
					</>
				) : (
					<>
						<IconButton
							size="sm"
							variant="ghost"
							colorPalette="blue"
							onClick={() => setIsEditing(true)}
							disabled={task.completed}
							aria-label="Editar"
						>
							<LuPencil />
						</IconButton>
						<IconButton
							size="sm"
							variant="ghost"
							colorPalette="red"
							onClick={() => onDelete(task.id)}
							aria-label="Borrar"
						>
							<LuTrash2 />
						</IconButton>
					</>
				)}
			</HStack>
		</HStack>
	)
}