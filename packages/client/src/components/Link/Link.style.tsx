import { lighten } from 'polished'
import styled from 'styled-components/macro'
import { link } from '../../style/colors'

export const linkLine = lighten(0.35, link)
export const linkBg = lighten(0.43, link)

export const StyledLink = styled.a`
  position: relative;
  text-decoration: none;
  display: inline-block;
  vertical-align: bottom;
  white-space: nowrap;
  overflow: hidden;

  &,
  &:link,
  &:visited,
  &:focus,
  &:hover,
  &:active {
    color: ${link};
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
    border-top: 1px solid ${linkLine};
    background: transparent;
    transition-delay: 0.15s;
    transform: translateY(calc(100% - 2px));
  }

  &::after {
    z-index: -1;
    background: ${linkBg};
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
