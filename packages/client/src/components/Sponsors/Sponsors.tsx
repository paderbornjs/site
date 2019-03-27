import React from 'react'
import Link from '../Link/Link'
import SectionHeadline from '../SectionHeadline'

const Sponsors: React.FC = () => (
  <>
    <SectionHeadline element="h5">Sponsors</SectionHeadline>
    <p>
      Sponsors that provide expense reimbursements for hosting, domain and the{' '}
      <Link href="https://meetup.com/paderborn-js">meetup.com</Link> account are
      welcome and will be linked both here and on the meetup.com page.
    </p>
  </>
)

export default Sponsors
