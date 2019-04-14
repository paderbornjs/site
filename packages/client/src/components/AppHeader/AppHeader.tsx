import React from 'react'
import { Flex } from 'rebass'
import { Logo } from './AppHeader.style'
import { ReactComponent as JavaScriptLogo } from './javascript.svg'

const AppHeader: React.FC = () => (
  <Flex as="h1" justifyContent="center" alignItems="center" mt={[2, 2, 3]}>
    <Logo as={JavaScriptLogo} m={5} height={[48, 72, 96]} />
  </Flex>
)

export default AppHeader
