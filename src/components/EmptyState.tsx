import { Center, Text, VStack } from "@chakra-ui/react"

const EmptyState = () => {
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
				<Text fontSize="4xl">📝</Text>
				<Text color="gray.400" fontSize="lg">
					No hay tareas todavía
				</Text>
				<Text color="gray.500" fontSize="sm">
					Agrega una arriba para empezar
				</Text>
			</VStack>
		</Center>
	)
}

export default EmptyState