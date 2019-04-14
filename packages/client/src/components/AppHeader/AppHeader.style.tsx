import { Image } from 'rebass'
import styled, { keyframes } from 'styled-components/macro'

const jAnimation = keyframes`
  0% { stroke-dashoffset: 881; }
  29% { stroke-dashoffset: 0; }
  30% { stroke-dashoffset: 0; fill: rgba(0, 0, 0, 0); }
  60% { stroke-dashoffset: 0; fill: rgba(0, 0, 0, 0); }
  100% { stroke-dashoffset: 0; fill: rgba(0, 0, 0, 1); }
`

const sAnimation = keyframes`
  0% { stroke-dashoffset: 1241; }
  29% { stroke-dashoffset: 1241; }
  59% { stroke-dashoffset: 0; }
  60% { stroke-dashoffset: 0; fill: rgba(0, 0, 0, 0); }
  100% { stroke-dashoffset: 0; fill: rgba(0, 0, 0, 1); }
`

export const Logo = styled(Image)`
  z-index: 1;

  .logo path {
    fill: none;
    stroke: black;
    stroke-width: 4;
  }

  .logo path:nth-of-type(1) {
    stroke-dasharray: 881;
    stroke-dashoffset: 881;
    animation: ${jAnimation} 2s linear 1s forwards;
  }

  .logo path:nth-of-type(2) {
    stroke-dasharray: 1241;
    stroke-dashoffset: 1241;
    animation: ${sAnimation} 2s linear 1s forwards;
  }
`
