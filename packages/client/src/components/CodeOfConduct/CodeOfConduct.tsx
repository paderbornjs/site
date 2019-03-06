import React from 'react'
import styled from 'styled-components/macro'
import Link from '../Link/Link'
import Slanted from '../Slanted'

const ColumnWrapper = styled.div`
  @media (min-width: 768px) {
    column-gap: 5rem;
    column-count: 2;
  }
`

const CodeOfConduct: React.FunctionComponent = () => (
  <Slanted>
    <h5>Code of Conduct</h5>
    <ColumnWrapper>
      <p>
        This meetup's primary goal is to have an awesome, inclusive and safe
        community meetup where people meet, hang out together, chat, listen to
        talks, exchange ideas and make new friends.
      </p>
      <p>
        We invite all those who participate in our events to help us create a
        safe and positive experience for everyone. Any harmful or discriminating
        behaviour will not be tolerated. We reserve the right to exclude people
        from the events.
      </p>
      <p>
        For details on what kinds of behaviour are not tolerated and
        consequences for violating these rules, we refer to the{' '}
        <Link href="http://berlincodeofconduct.org/">
          Berlin Code of Conduct
        </Link>
        .
      </p>
    </ColumnWrapper>
  </Slanted>
)

export default CodeOfConduct
