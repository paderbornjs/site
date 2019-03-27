import styled from 'styled-components/macro'
import fontSizes from '../../style/fontSizes'
import spacings from '../../style/spacings'
import Link from '../Link'

export const Emphasize = styled.em`
  font-style: normal;
  font-weight: 500;
`

export const CallToAction = styled(Link)`
  padding: ${spacings[2]} ${spacings[4]};
  background: ${props => props.theme.colors.blue[5]};
  border-radius: ${spacings[1]};
  font-size: ${fontSizes[4]};
  font-weight: 500;

  &:link,
  &:visited,
  &:focus,
  &:hover,
  &:active {
    color: ${props => props.theme.colors.blue[1]};
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
