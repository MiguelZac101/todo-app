import { VStack, HStack, Text, Progress } from '@chakra-ui/react'

type TaskProgressProps = {
    completed: number
    total: number
}

export function TaskProgress({ completed, total }: TaskProgressProps) {
    if (total === 0) return null  // No mostrar si no hay tareas

    const percent = (completed / total) * 100
    const progressColor = percent === 100 ? "green" : percent > 50 ? "blue" : "orange"
    const isComplete = completed === total

    return (
        <VStack w="100%" gap={2} align="stretch">
            <HStack justify="space-between">
                <Text color="gray.300" fontSize="sm">
                    Progreso
                </Text>
                <Text color="gray.300" fontSize="sm" fontWeight="bold">
                    {completed}/{total}
                </Text>
            </HStack>

            <Progress.Root
                value={percent}
                colorPalette={progressColor}
                size="sm"
                borderRadius="full"
            >
                <Progress.Track bg="gray.700">
                    <Progress.Range transition="all 0.3s ease" />
                </Progress.Track>
            </Progress.Root>

            {isComplete && (
                <Text color="green.400" fontSize="xs" textAlign="center">
                    🎉 ¡Todas completadas!
                </Text>
            )}
        </VStack>
    )
}