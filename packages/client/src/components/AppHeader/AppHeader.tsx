import React from 'react'
import { Flex } from 'rebass'
import { Logo } from './AppHeader.style'
import { ReactComponent as JavaScriptLogo } from './javascript.svg'

const AppHeader: React.FC = () => (
  <Flex alignItems="center" as="h1" justifyContent="center" mt={[2, 2, 3]}>
    <Logo
      as={({ height, m, ...rest }) => <JavaScriptLogo {...rest} />}
      height={[48, 72, 96]}
      m={5}
    />
  </Flex>
)

export default AppHeader
