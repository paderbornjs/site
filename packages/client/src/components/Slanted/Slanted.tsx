import React from 'react'
import { Flex } from 'rebass'
import 'styled-components/macro'
import { Outer } from './Slanted.style'

export type SlantValue = -3 | -2 | -1 | 0 | 1 | 2 | 3

export interface Props {
  type?: 'dark' | 'light'
  slantBottom?: SlantValue
  slantTop?: SlantValue
}

const Slanted: React.FC<Props> = ({
  type = 'light',
  children,
  slantBottom,
  slantTop,
}) => (
  <Outer type={type} slantBottom={slantBottom} slantTop={slantTop}>
    <Flex
      flexDirection="column"
      px={[4, 5, 6]}
      py={[5, 6, 7]}
      mx="auto"
      my={0}
      css={{ maxWidth: 1000 }}
    >
      {children}
    </Flex>
  </Outer>
)

export default Slanted
