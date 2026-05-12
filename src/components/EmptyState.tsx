import { Center, VStack, Text } from '@chakra-ui/react'
import type { FilterType } from '../types'

type EmptyStateProps = {
	filter: FilterType
}

export function EmptyState({ filter }: EmptyStateProps) {
	const messages = {
		all: {
			emoji: '📝',
			title: 'No hay tareas todavía',
			subtitle: 'Agrega una arriba para empezar'
		},
		active: {
			emoji: '🎉',
			title: 'No hay pendientes',
			subtitle: 'Todo al día'
		},
		completed: {
			emoji: '💪',
			title: 'Nada completado aún',
			subtitle: 'Marca una tarea como lista'
		}
	}

	const { emoji, title, subtitle } = messages[filter]

	return (
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
				<Text fontSize="4xl">{emoji}</Text>
				<Text color="gray.400" fontSize="lg">{title}</Text>
				<Text color="gray.500" fontSize="sm">{subtitle}</Text>
			</VStack>
		</Center>
	)
}