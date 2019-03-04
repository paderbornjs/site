import React from 'react'
import { Inner, Outer } from './Slanted.style'

export type SlantValue =
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8

export interface SlantedProps {
  background?: string
  slantBottom?: SlantValue
  slantTop?: SlantValue
}

const Slanted: React.SFC<SlantedProps> = ({
  background,
  children,
  slantBottom,
  slantTop,
}) => (
  <Outer background={background} slantBottom={slantBottom} slantTop={slantTop}>
    <Inner>{children}</Inner>
  </Outer>
)

export default Slanted
