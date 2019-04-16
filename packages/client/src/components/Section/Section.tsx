import React from 'react'
import 'styled-components/macro'
import { Box } from 'rebass'

interface SectionProps {
  bright?: boolean
}

const Section: React.FC<SectionProps> = ({ bright = false, children }) => {
  return (
    <Box bg={bright ? 'greyXBright' : 'transparent'}>
      <Box
        css={{ maxWidth: 1000 }}
        mx="auto"
        my={0}
        px={[4, 5, 6]}
        py={[5, 6, 7]}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Section
