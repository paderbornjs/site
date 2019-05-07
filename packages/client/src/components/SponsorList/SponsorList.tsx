import React from 'react'
import Link from '../Link/Link'
import SectionHeading from '../SectionHeading'

const SponsorList: React.FC = () => (
  <>
    <SectionHeading>Sponsors</SectionHeading>
    <p>
      Sponsors that provide expense reimbursements for hosting, domain and the{' '}
      <Link href="https://meetup.com/paderborn-js">meetup.com</Link> account are
      welcome and will be linked both here and on the meetup.com page.
    </p>
  </>
)

export default SponsorList
