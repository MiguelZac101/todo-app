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
			<h1>Todo List</h1>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Escribe una tarea..."
			/>
			<button onClick={addTask}>Add Task</button>
			<ul>
				{tasks.map((task) => (
					<li key={task.id}>
						{task.name}
						<button onClick={() => deleteTask(task.id)}>Delete</button>
					</li>
				))}
			</ul>
		</>
	)
}

export default App