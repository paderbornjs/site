import styled from 'styled-components/macro'
import spacings from '../../style/spacings'
import Link from '../Link'

export const Emphasize = styled.em`
  font-style: normal;
  font-weight: 500;
`

export const CallToAction = styled(Link)`
  padding: ${spacings[1]} ${spacings[3]};
  background: green;

  &:link,
  &:visited,
  &:focus,
  &:hover,
  &:active {
    color: white;
  }

  &::before,
  &::after {
    content: none;
  }
`

export const Talks = styled.ol`
  display: flex;
  flex-wrap: wrap;
`
