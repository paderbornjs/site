import React from 'react'
import ColumnWrapper from '../ColumnWrapper'
import Link from '../Link/Link'
import SectionHeadline from '../SectionHeadline'

const CodeOfConduct: React.FC = () => (
  <>
    <SectionHeadline element="h2">Code of Conduct</SectionHeadline>
    <ColumnWrapper>
      <p>
        This meetup’s primary goal is to have an awesome, inclusive and safe
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
  </>
)

export default CodeOfConduct
