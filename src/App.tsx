import { Box, Button, HStack, Input, VStack, Heading, Container } from '@chakra-ui/react'
import './App.css'
import { useEffect, useState } from "react"
import EmptyState from './components/EmptyState.tsx'
import type { FilterType, Task } from './types'
import TaskItem from './components/TaskItem.tsx'
import { TaskProgress } from './components/TaskProgress.tsx'
import { FilterTabs } from './components/FilterTabs.tsx'
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog.tsx'

function App() {

	// useState con función inicial para cargar tareas desde localStorage solo una vez
	// La función se ejecuta solo en la primera renderización, no cada vez que el componente se actualiza
	const [tasks, setTasks] = useState<Task[]>(() => {
		// El bloque try-catch es para manejar casos donde el JSON en localStorage esté corrupto o no sea un array válido
		try {
			// Intenta obtener el item 'tasks' de localStorage
			const saved = localStorage.getItem('tasks')
			// Si hay algo guardado, parsea el JSON, sino devuelve un array vacío
			return saved ? JSON.parse(saved) : []
		} catch {
			return [] // Si el JSON está corrupto, empieza vacío
		}
	})

	const [input, setInput] = useState('')
	const [filter, setFilter] = useState<FilterType>('all') // ← nuevo estado para el filtro
	const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)	

	// Guarda tareas en localStorage cada vez que cambian
	useEffect(() => {
		// Convierte el array de tareas a JSON y lo guarda en localStorage
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const addTask = () => {
		if (input.trim() === '') return  // no agrega vacío

		const newTask: Task = {
			id: Date.now(), // id único
			name: input.trim(),
			completed: false
		}

		setTasks([...tasks, newTask])  // agrega nueva tarea
		setInput('')  // limpia input
	}

	// Maneja la tecla Enter para agregar tarea
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') addTask()  // Enter agrega task
	}

	// Función para alternar el estado de completado de una tarea
	const toggleComplete = (idToToggle: number) => {
		// Cambia el estado de completado de una tarea
		setTasks(tasks.map((task) => 
			task.id === idToToggle ? { ...task, completed: !task.completed } : task
		))
	}

	// Calcula cuántas tareas están completadas para mostrar el progreso
	const taskCompletedCount = tasks.filter(t => t.completed).length

	// Calcula cuántas tareas están activas (no completadas) para mostrar en los filtros
	const completedCount = tasks.filter(t => t.completed).length
	const activeCount = tasks.length - completedCount
	// Filtrar tareas según el filtro activo
	const filteredTasks = tasks.filter(task => {
		if (filter === 'all') return true
		if (filter === 'active') return !task.completed
		if (filter === 'completed') return task.completed
		return true
	})


	// En lugar de borrar directo, abrimos el dialog
	const handleDeleteClick = (id: number) => {
		const task = tasks.find(t => t.id === id)
		if (task) setTaskToDelete(task)
	}

	// Confirmación real
	const confirmDelete = () => {
		if (taskToDelete) {
			setTasks(tasks.filter(t => t.id !== taskToDelete.id))
			setTaskToDelete(null)
		}
	}

	const cancelDelete = () => {
		setTaskToDelete(null)
	}

	// Función para manejar la edición de una tarea
	const handleEditTask = (id: number, name: string) => {
		const task = tasks.find(t => t.id === id)
		if(task) {
			setTasks(tasks.map(t => t.id === id ? {...t, name} : t))
		}
	}

	return (
		<>
			<Box minH="100vh" bg="gray.900"> {/* Fondo oscuro full screen */}
				<Container maxW="md" py={10}>
					<VStack gap={6}>
						<Heading color="white">Mi Todo List</Heading>

						<TaskProgress
							completed={taskCompletedCount}
							total={tasks.length}
						/>

						<HStack w="100%">
							<Input
								placeholder="¿Qué tienes que hacer?"
								bg="gray.800"
								borderColor="gray.700"
								_hover={{ borderColor: "gray.600" }}
								_focus={{ borderColor: "blue.400" }}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
							<Button colorPalette="blue" onClick={addTask}>
								Agregar
							</Button>
						</HStack>

						{/* Filtros - solo si hay tareas */}
						{tasks.length > 0 && (
							<FilterTabs
								currentFilter={filter}
								onFilterChange={setFilter}
								counts={{
									all: tasks.length,
									active: activeCount,
									completed: completedCount
								}}
							/>
						)}

						{/* Lista filtrada */}
						<VStack w="100%" gap={3} align="stretch">
							{filteredTasks.length === 0 ? (
								<EmptyState filter={filter} />
							) : (
								filteredTasks.map(task => (
									<TaskItem
										key={task.id}
										task={task}
										onCompleted={toggleComplete}
										onDelete={handleDeleteClick}
										onEdit={handleEditTask}
									/>
								))
							)}
						</VStack>

					</VStack>
				</Container>

				{/* Dialog fuera del Container */}
				<DeleteConfirmDialog
					isOpen={!!taskToDelete}
					onClose={cancelDelete}
					onConfirm={confirmDelete}
					taskName={taskToDelete?.name || ''}
				/>
	  
			</Box>
		</>
	)
}

export default App