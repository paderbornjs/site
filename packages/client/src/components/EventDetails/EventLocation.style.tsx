import { Link } from 'rebass'
import styled from 'styled-components/macro'

export const CallToAction = styled(Link)`
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  display: inline-block;
  border: 1px solid ${props => props.theme.colors.primaryMBright};
  transition: background 0.3s ease-in-out;

  &:link,
  &:visited,
  &:focus,
  &:hover,
  &:active {
    color: ${props => props.theme.colors.primaryMedium};
  }

  &:focus,
  &:hover,
  &:active {
    background: ${props => props.theme.colors.primaryXBright};
    border: 1px solid ${props => props.theme.colors.primaryMedium};
  }
`
