import styled, { keyframes } from 'styled-components/macro'
import spacings from '../../style/spacings'
import { ReactComponent as JavaScriptLogo } from './javascript.svg'

export const Container = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #12223c;
  margin: ${spacings[4]} 0 -54px 0;

  @media (min-width: 550px) and (max-width: 767px) {
    margin: ${spacings[5]} 0 -66px 0;
  }
  @media (min-width: 768px) {
    margin: ${spacings[6]} 0 -88px 0;
  }
`

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

export const Logo = styled(JavaScriptLogo)`
  z-index: 1;
  margin: ${spacings[4]};
  height: ${spacings[6]};

  @media (min-width: 550px) and (max-width: 767px) {
    height: ${spacings[7]};
  }
  @media (min-width: 768px) {
    height: ${spacings[8]};
  }

  .logo path:nth-of-type(1) {
    fill: none;
    stroke: black;
    stroke-width: 4;
    stroke-dasharray: 881;
    stroke-dashoffset: 881;
    animation: ${jAnimation} 2s linear 1s forwards;
  }

  .logo path:nth-of-type(2) {
    fill: none;
    stroke: black;
    stroke-width: 4;
    stroke-dasharray: 1241;
    stroke-dashoffset: 1241;
    animation: ${sAnimation} 2s linear 1s forwards;
  }
`
