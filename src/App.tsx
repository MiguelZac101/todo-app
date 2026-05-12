import { Box, Button, HStack, Input, VStack, Text, Heading, Container, Center, Checkbox } from '@chakra-ui/react'
import './App.css'
import { useEffect, useState } from "react"

// Type fuera del componente para que no se redeclare cada render
type Task = {
	id: number
	name: string
	completed: boolean
}

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

	const deleteTask = (idToDelete: number) => {
		// Elimina tarea por ID
		// Filtra tareas, manteniendo solo las que no coinciden con el ID a eliminar
		setTasks(tasks.filter((task) => task.id !== idToDelete))
	}

	// Función para alternar el estado de completado de una tarea
	const toggleComplete = (idToToggle: number) => {
		// Cambia el estado de completado de una tarea
		setTasks(tasks.map((task) => 
			task.id === idToToggle ? { ...task, completed: !task.completed } : task
		))
	}

	return (
		<>
			<Box minH="100vh" bg="gray.900"> {/* Fondo oscuro full screen */}
				<Container maxW="md" py={10}>
					<VStack gap={6}>
						<Heading color="white">Mi Todo List</Heading>

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

						<VStack w="100%" gap={3} align="stretch">
							{ tasks.length === 0 ? (
								<Center
									w="100%"
									py={10}
									bg="gray.800"
									borderRadius="md"
									borderWidth="1px"
									borderColor="gray.700"
									borderStyle="dashed"
								>
									<VStack>
										<Text fontSize="4xl">📝</Text>
										<Text color="gray.400" fontSize="lg">
											No hay tareas todavía
										</Text>
										<Text color="gray.500" fontSize="sm">
											Agrega una arriba para empezar
										</Text>
									</VStack>
								</Center>
							) : (						
							tasks.map(task => (
								<HStack
									key={task.id}
									p={4}
									bg="gray.800"        // Tarjeta gris oscuro
									borderRadius="md"
									borderWidth="1px"
									borderColor="gray.700"
									opacity={task.completed ? 0.6 : 1}
								>
									
									<Checkbox.Root
										checked={task.completed}  
										onCheckedChange={() => toggleComplete(task.id)}
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
										onClick={() => deleteTask(task.id)}
										ml="auto" // Empuja el botón a la derecha
									>
										🗑️ Borrar
									</Button>
								</HStack>
							)))}
						</VStack>
					</VStack>
				</Container>
			</Box>
		</>
	)
}

export default App