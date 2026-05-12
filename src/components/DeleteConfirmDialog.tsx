import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react'

type DeleteConfirmDialogProps = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    taskName: string
}

export function DeleteConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    taskName
}: DeleteConfirmDialogProps) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content bg="gray.800" borderColor="gray.700">
                        <Dialog.Header>
                            <Dialog.Title color="white">¿Borrar tarea?</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Text color="gray.300">
                                Vas a eliminar <Text as="span" fontWeight="bold">"{taskName}"</Text>
                            </Text>
                            <Text color="gray.500" fontSize="sm" mt={2}>
                                Esta acción no se puede deshacer.
                            </Text>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="ghost" onClick={onClose}>
                                    Cancelar
                                </Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="red"
                                onClick={() => {
                                    onConfirm()
                                    onClose()
                                }}
                            >
                                Borrar
                            </Button>
                        </Dialog.Footer>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}