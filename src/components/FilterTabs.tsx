import { HStack, Button } from '@chakra-ui/react'
import type { FilterType } from '../types'

type FilterTabsProps = {
    currentFilter: FilterType
    onFilterChange: (filter: FilterType) => void
    counts: {
        all: number
        active: number
        completed: number
    }
}

export function FilterTabs({ currentFilter, onFilterChange, counts }: FilterTabsProps) {
    const filters: { key: FilterType; label: string }[] = [
        { key: 'all', label: 'Todas' },
        { key: 'active', label: 'Pendientes' },
        { key: 'completed', label: 'Completadas' },
    ]

    return (
        <HStack gap={2} w="100%">
            {filters.map(({ key, label }) => (
                <Button
                    key={key}
                    size="sm"
                    variant={currentFilter === key ? 'solid' : 'solid'}
                    colorPalette={currentFilter === key ? 'blue' : 'transparent'}
                    onClick={() => onFilterChange(key)}
                    flex={1}
                >
                    {label} ({counts[key]})
                </Button>
            ))}
        </HStack>
    )
}