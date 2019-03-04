import styled from 'styled-components/macro'
import { background } from '../../style/colors'
import { SlantedProps, SlantValue } from './Slanted'

export const Inner = styled.div`
  max-width: 100rem;
  margin: 0 auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 550px) and (max-width: 767px) {
    padding: 4rem;
  }
  @media (min-width: 768px) {
    padding: 5rem;
  }
`

const abs = (slant: SlantValue) => Math.abs(slant as number)

export const Outer = styled.section<SlantedProps>`
  position: relative;
  background: ${props => props.background || 'transparent'};
  z-index: 0;

  margin: ${props => abs(props.slantTop || 0)}vw 0
    ${props => abs(props.slantBottom || 0)}vw 0;

  &::before,
  &::after {
    background: inherit;
    position: absolute;
    width: 100vw;
    z-index: -1;
    border-style: solid;
  }

  &::before {
    top: -${props => abs(props.slantTop || 0)}vw;
    content: ${props => (props.slantTop ? `''` : 'none')};
    height: ${props => abs(props.slantTop || 0)}vw;
    border-width: ${props => abs(props.slantTop || 0)}vw 100vw 0 0;
    border-color: ${background} ${props => props.background} transparent
      transparent;
    transform: rotateY(${props => ((props.slantTop || 0) < 0 ? 180 : 0)}deg);
  }
  &::after {
    bottom: -${props => abs(props.slantBottom || 0)}vw;
    content: ${props => (props.slantBottom ? `''` : 'none')};
    height: ${props => abs(props.slantBottom || 0)}vw;
    border-width: ${props => abs(props.slantBottom || 0)}vw 100vw 0 0;
    border-color: ${props => props.background} ${background} transparent
      transparent;
    transform: rotateY(${props => ((props.slantBottom || 0) < 0 ? 180 : 0)}deg);
  }
`
