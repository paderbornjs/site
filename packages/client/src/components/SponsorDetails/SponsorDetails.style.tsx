import { Flex } from 'rebass'
import styled from 'styled-components/macro'

export const Wrapper = styled(Flex)``

export const Logo = styled.img`
  width: 200px;
  filter: grayscale(50%);
  transition: filter 2s;
  object-fit: contain;

  ${Wrapper}:hover & {
    filter: grayscale(0%);
  }
`
