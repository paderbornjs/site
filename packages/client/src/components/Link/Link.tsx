import React from 'react'
import { StyledLink } from './Link.style'

interface Props {
  href: string
}

const Link: React.FC<Props> = props => <StyledLink {...props} />

export default Link
