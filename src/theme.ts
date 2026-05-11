import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      bg: "gray.900",
      color: "white",
    }
  },
})