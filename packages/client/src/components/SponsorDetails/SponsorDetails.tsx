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
      as="li"
      flexDirection="column"
      alignItems="center"
      flex="1 1 200px"
      mr={7}
      mb={7}
    >
      <Flex
        as="a"
        href="https://www.dspace.com/de/gmb/home.cfm"
        mb={3}
        alignItems="center"
        css={{ height: 55 }}
      >
        {typeof logo === 'string' ? <Logo src={logo} /> : <Logo as={logo} />}
      </Flex>
      <Text as="p" m={0} textAlign="center" css={{ maxWidth: 350 }}>
        {children}
      </Text>
    </Wrapper>
  )
}

export default SponsorDetails
