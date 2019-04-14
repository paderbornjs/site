import React from 'react'
import { Heading, HeadingProps } from 'rebass'

const SectionHeading: React.FC<HeadingProps> = ({ children, ...rest }) => {
  return (
    <Heading
      as="h2"
      textAlign="center"
      fontSize={[4, 6, 7]}
      fontFamily="serif"
      fontWeight={300}
      mt={0}
      mb={[5, 6, 7]}
      {...rest}
    >
      {children}
    </Heading>
  )
}

export default SectionHeading
