import React from 'react'
import ColumnWrapper from '../ColumnWrapper'
import Link from '../Link/Link'
import SectionHeading from '../SectionHeading'

const About: React.FC = () => (
  <>
    <SectionHeading>About Paderborn.js</SectionHeading>
    <ColumnWrapper>
      <p>
        Paderborn.js is a usergroup focused on JavaScript and related topics. We
        meet regularly at <a href="https://enpit.de/" rel="noopener">Enpit</a>, Marienplatz 11a in Paderborn.
      </p>
      <p>
        We welcome a diverse range of topics that are related in any way to
        JavaScript and the community around it. New speakers, experienced
        speakers, and everyone in between. If you have an idea you aren’t sure
        about, just reach out or add it as an issue in our Paderborn.js{' '}
        <Link href="https://github.com/paderbornjs/talks">
          talks repository
        </Link>
        !
      </p>
      <p>
        Join the{' '}
        <Link href="https://meetup.com/paderborn-js">Meetup community</Link> to
        get in contact with both organizers and other members of the community!
        Also, feel free to{' '}
        <Link href="https://twitter.com/paderbornjs">follow us on Twitter</Link>{' '}
        or tweet about our events using the hashtag <span>#paderbornjs</span>!
      </p>
      <p>
        This meetup is primarily in german, but if we have any non-german
        speaking attendees, we try to switch to english. We look forward to
        hearing from you, and to seeing you at an upcoming event!
      </p>
    </ColumnWrapper>
  </>
)

export default About
