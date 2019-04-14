import { Flex } from 'rebass'
import styled from 'styled-components/macro'

export const Wrapper = styled(Flex)``

export const ProfileImage = styled.svg`
  max-width: 200px;
  max-height: 200px;

  use:last-of-type {
    opacity: 0.8;
    transition: opacity 2s;
  }

  ${Wrapper}:hover & use:last-of-type {
    opacity: 0.3;
  }

  @media (min-width: 768px) {
    max-width: 250px;
    max-height: 250px;
  }
`
