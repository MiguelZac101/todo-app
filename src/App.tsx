import { Box, Button, HStack, Input, VStack, Text, Heading, Container, Center } from '@chakra-ui/react'
import './App.css'
import { useEffect, useState } from "react"

// Type fuera del componente para que no se redeclare cada render
type Task = {
	id: number
	name: string
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
			name: input.trim()
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

	return (
		<>
			<Box minH="100vh" bg="gray.900"> {/* Fondo oscuro full screen */}
				<Container maxW="container.md" py={10}>
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
							{tasks.map(task => (
								<HStack
									key={task.id}
									p={4}
									bg="gray.800"        // Tarjeta gris oscuro
									borderRadius="md"
									borderWidth="1px"
									borderColor="gray.700"
								>
									<Text color="gray.100" flex="1">{task.name}</Text>
									<Button
										colorPalette="red"
										size="sm"
										variant="ghost"
										onClick={() => deleteTask(task.id)}
									>
										Borrar
									</Button>
								</HStack>
							))}
						</VStack>
					</VStack>
				</Container>
			</Box>
		</>
	)
}

export default App