import React from 'react'
import Slanted from '../Slanted/Slanted'
import { Headline, Logo, LogoContainer, Punchline } from './AppHeader.style'

const AppHeader: React.FunctionComponent = () => (
  <Slanted>
    <LogoContainer>
      <Headline>Paderborn</Headline>
      <Logo />
    </LogoContainer>
    <Punchline>
      Welcome to Paderborn.js – the JavaScript Meetup in Paderborn.
    </Punchline>
  </Slanted>
)

export default AppHeader
