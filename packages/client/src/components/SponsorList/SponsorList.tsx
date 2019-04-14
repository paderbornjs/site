import React from 'react'
import { Flex } from 'rebass'
import Link from '../Link/Link'
import SectionHeading from '../SectionHeading'
import SponsorDetails from '../SponsorDetails'
import connectIoLogo from './connect-io.png'
import { ReactComponent as DspaceLogo } from './dspace.svg'
import { ReactComponent as SputnikLogo } from './sputnik.svg'

const SponsorList: React.FC = () => (
  <>
    <SectionHeading>Sponsors</SectionHeading>
    <Flex as="ul" flexWrap="wrap" mr={-7} mb={-7}>
      <SponsorDetails logo={DspaceLogo}>
        dSPACE allows Christoph to work on Paderborn.js organization in his
        working time and is always looking for{' '}
        <Link href="https://www.dspace.com/de/gmb/home/career/jobfinder/stellen.cfm?fuseaction=einzel&jid=35658&t=Softwareentwickler%2A%20Web">
          motivated colleagues!
        </Link>
      </SponsorDetails>
      <SponsorDetails logo={connectIoLogo}>
        connect-io pays for our hosting expenses and Meetup account and is
        looking for{' '}
        <Link href="https://www.connect-io.de/jobs/#contactus">
          new colleagues
        </Link>{' '}
        as well!
      </SponsorDetails>
      <SponsorDetails logo={SputnikLogo}>
        Sputnik provides our Paderborn.js location. Have a few drinks and spread
        the word, if you like it!
      </SponsorDetails>
    </Flex>
  </>
)

export default SponsorList
