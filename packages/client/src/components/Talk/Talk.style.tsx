import { Box } from 'rebass'
import styled from 'styled-components/macro'
import theme from '../../style/theme'

interface ArrowPositionProps {
  arrowPosition: 'left' | 'right'
  theme: typeof theme
}

const positionArrow = () => (props: ArrowPositionProps) =>
  `${props.arrowPosition}: ${props.theme.space[5]}px;`

export const Bubble = styled(Box)<ArrowPositionProps>`
  border-radius: ${props => props.theme.space[2]}px;
  border: 2px solid ${props => props.theme.colors.gray[4]};
  background: ${props => props.theme.colors.gray[5]};
  position: relative;
  z-index: 0;

  &::before,
  &::after {
    ${positionArrow()}
    display: block;
    position: absolute;
    bottom: -18px;
    width: 0;
    height: 0;
    content: ' ';
    border: solid 20px transparent;
    border-bottom: 0;
    border-top-color: ${props => props.theme.colors.gray[5]};
    overflow: hidden;
    z-index: 2;
  }

  &::before {
    bottom: -20px;
    border-top-color: ${props => props.theme.colors.gray[4]};
    z-index: 1;
  }
`
