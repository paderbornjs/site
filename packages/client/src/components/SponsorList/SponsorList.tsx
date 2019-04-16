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
    <Flex as="ul" flexWrap="wrap" justifyContent="center" mr={[-5, -6, -7]}>
      <SponsorDetails logo={DspaceLogo}>
        encourages Christoph to work on Paderborn.js in his spare time and is
        looking for{' '}
        <Link href="https://www.dspace.com/de/gmb/home/career/jobfinder/stellen.cfm?fuseaction=einzel&jid=35658&t=Softwareentwickler%2A%20Web">
          motivated colleagues
        </Link>{' '}
        to join the team!
      </SponsorDetails>
      <SponsorDetails logo={connectIoLogo}>
        heps with our hosting expenses and our Meetup account and is looking for{' '}
        <Link href="https://www.connect-io.de/jobs/#contactus">
          new colleagues
        </Link>{' '}
        as well!
      </SponsorDetails>
      <SponsorDetails logo={SputnikLogo}>
        provides our Paderborn.js location. Have a few drinks and spread the
        word, if you like it!
      </SponsorDetails>
    </Flex>
  </>
)

export default SponsorList
