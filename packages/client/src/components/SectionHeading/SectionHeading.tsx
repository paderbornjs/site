import React from 'react'
import { Heading, HeadingProps } from 'rebass'

const SectionHeading: React.FC<HeadingProps> = ({ children, ...rest }) => {
  return (
    <Heading
      as="h2"
      fontFamily="serif"
      fontSize={[4, 6, 6]}
      fontWeight={300}
      mb={[4, 5, 6]}
      mt={0}
      textAlign="center"
      {...rest}
    >
      {children}
    </Heading>
  )
}

export default SectionHeading
