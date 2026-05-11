import './App.css'
import { useState } from "react"

// Type fuera del componente para que no se redeclare cada render
type Task = {
	id: number
	name: string
}

function App() {

	const [tasks, setTasks] = useState<Task[]>([])
	const [input, setInput] = useState('')

	const addTask = () => {
		if (input.trim() === '') return  // no agrega vacío

		const newTask: Task = {
			id: Date.now(), // id único
			name: input.trim()
		}

		setTasks([...tasks, newTask])  // agrega nueva tarea
		setInput('')  // limpia input
	}

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