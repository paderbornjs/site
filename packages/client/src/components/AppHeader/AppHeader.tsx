import React from 'react'
import { Container, Logo } from './AppHeader.style'

const AppHeader: React.FC = () => (
  <Container>
    <Logo role="img" aria-labelledby="title" />
  </Container>
)

export default AppHeader
