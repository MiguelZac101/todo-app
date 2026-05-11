# Todo List App ✅

App de lista de tareas hecha con React + TypeScript + Vite. Proyecto para practicar hooks, tipado y manejo de estado.

## 🚀 Demo
[Ver demo en vivo] *próximamente*

## ✨ Features
- Agregar tareas con validación de input vacío
- Eliminar tareas por ID único
- Soporte para tecla Enter
- Persistencia con LocalStorage *próximamente*
- UI con Chakra UI *próximamente*

## 🛠️ Tech Stack
| Tecnología | Uso |
| --- | --- |
| React 18 | Librería UI |
| TypeScript | Tipado estático |
| Vite | Build tool + dev server |
| React Hooks | useState, useEffect |

## 📦 Instalación local

1. Clona el repo
```bash
git clone https://github.com/MiguelZac101/todo-app.git
cd todo-app

2. Instala dependencias

   npm install

3. Corre en dev

   npm run dev

4. Abre http://localhost:5173

## 📝 Scripts disponibles
| Comando | Descripción |
| --- | --- |
| `npm run dev` | Levanta server de desarrollo |
| `npm run build` | Compila para producción en `/dist` |
| `npm run preview` | Preview del build de producción |

## 🧠 Lo que aprendí
- Manejo de estado con `useState` tipado `useState<Task[]>`
- Eventos en TS: `React.KeyboardEvent<HTMLInputElement>`
- Inmutabilidad: actualizar arrays sin mutar `[...tasks, newTask]`
- Buenas prácticas: usar `key={id}` en lugar de `index`
- Commits semánticos con Conventional Commits

## 📸 Screenshots
![screenshot](./public/screenshot.png) *próximamente*
