import { Link } from 'rebass'
import styled from 'styled-components/macro'

export const CallToAction = styled(Link)`
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  display: inline-block;
  border: 1px solid ${props => props.theme.colors.blue[4]};

  &:link,
  &:visited,
  &:focus,
  &:hover,
  &:active {
    color: ${props => props.theme.colors.blue[3]};
  }

  &:focus,
  &:hover,
  &:active {
    background: ${props => props.theme.colors.blue[6]};
    border: 1px solid ${props => props.theme.colors.blue[3]};
  }
`
