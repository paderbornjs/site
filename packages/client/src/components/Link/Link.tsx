import React from 'react'
import { LinkProps } from 'rebass'
import { StyledLink } from './Link.style'

const Link: React.FC<
  LinkProps & {
    ref?: React.Ref<HTMLLinkElement>
  }
> = props => <StyledLink as="a" {...props} />

export default Link
