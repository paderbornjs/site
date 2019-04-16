import { Link } from 'rebass'
import styled from 'styled-components/macro'

export const StyledLink = styled(Link)`
  position: relative;
  text-decoration: none;
  display: inline-block;
  vertical-align: bottom;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;

  &,
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
    outline: 0;
  }

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    transition: transform 0.15s;
    pointer-events: none;
    backface-visibility: hidden;
  }

  &::before {
    border-top: 1px solid ${props => props.theme.colors.blue[5]};
    background: transparent;
    transition-delay: 0.15s;
    transform: translateY(calc(100% - 2px));
  }

  &::after {
    z-index: -1;
    background: ${props => props.theme.colors.blue[6]};
    transform: translateY(-100%);
  }

  &:focus::after,
  &:hover::after {
    transition-delay: 0.15s;
  }

  &:focus::before,
  &:hover::before {
    transition-delay: 0s;
  }

  &:focus::before,
  &:hover::before,
  &:focus::after,
  &:hover::after {
    transform: translateX(0);
  }
`
