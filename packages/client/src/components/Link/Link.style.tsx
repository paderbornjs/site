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
  z-index: 1;

  &,
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
  }

  &::before {
    border-top: 1px solid ${props => props.theme.colors.primaryBright};
    background: transparent;
    transition-delay: 0.15s;
    transform: translateY(calc(100% - 2px));
    z-index: -1;
  }

  &::after {
    background: ${props => props.theme.colors.primaryXBright};
    transform: translateY(-100%);
    z-index: -2;
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
