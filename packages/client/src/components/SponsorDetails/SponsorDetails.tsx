import React from 'react'
import { Flex, Text } from 'rebass'
import 'styled-components/macro'
import { Logo, Wrapper } from './SponsorDetails.style'

interface SponsorDetailsProps {
  logo: React.FC | string
}

const SponsorDetails: React.FC<SponsorDetailsProps> = ({ children, logo }) => {
  return (
    <Wrapper
      alignItems="center"
      as="li"
      css={{
        border: '2px solid #eee',
        borderRadius: 5,
        minWidth: 275,
        maxWidth: 375,
      }}
      flex="1 1 200px"
      flexDirection="column"
      mb={[5, 6, 7]}
      mr={[5, 6, 7]}
      px={5}
      py={5}
    >
      <Flex
        alignItems="center"
        as="a"
        href="https://www.dspace.com/de/gmb/home.cfm"
        mb={3}
      >
        {typeof logo === 'string' ? <Logo src={logo} /> : <Logo as={logo} />}
      </Flex>
      <Text as="p" m={0} textAlign="center">
        {children}
      </Text>
    </Wrapper>
  )
}

export default SponsorDetails
