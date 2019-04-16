import styled, { keyframes } from 'styled-components/macro'

const ballAnimations = [
  keyframes`
    33% { transform: translate(18px, -36px); }
    66% { transform: translate(36px, 0px); }
    100% { transform: translate(0px, 0px); }`,
  keyframes`
    33% { transform: translate(18px, 36px); }
    66% { transform: translate(-18px, 36px); }
    100% { transform: translate(0px, 0px); }`,
  keyframes`
    33% { transform: translate(-36px, 0px); }
    66% { transform: translate(-18px, -36px); }
    100% { transform: translate(0px, 0px); }`,
]

const containerAnimation = keyframes`
  from { transform: scale(.8) rotate(0deg); }
  to { transform: scale(.8) rotate(360deg); }
`

export const BallContainer = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  animation: ${containerAnimation} 2s linear infinite;
`

export const Ball = styled.div<{ index: number }>`
  animation: ${props => ballAnimations[props.index]} 2.2s ease 0s infinite;
  animation-fill-mode: both;
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.primaryXDark};
  top: ${props => (props.index === 1 ? 0 : 36)}px;
  left: ${props => props.index * 18}px;
`
