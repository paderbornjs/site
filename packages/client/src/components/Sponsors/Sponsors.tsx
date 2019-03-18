import React from 'react'
import Link from '../Link/Link'
import Slanted, { Props as SlantedProps } from '../Slanted/Slanted'

const Sponsors: React.FC<SlantedProps> = ({
  background,
  slantTop,
  slantBottom,
}) => (
  <Slanted
    background={background}
    slantTop={slantTop}
    slantBottom={slantBottom}
  >
    <h5>Sponsors</h5>
    <p>
      Sponsors that provide expense reimbursements for hosting, domain and the{' '}
      <Link href="https://meetup.com/paderborn-js">meetup.com</Link> account are
      welcome and will be linked both here and on the meetup.com page.
    </p>
  </Slanted>
)

export default Sponsors
