import React from 'react'
import { Helmet } from 'react-helmet'
import { lightBackground } from '../../style/colors'
import AppLayout from '../AppLayout/'
import Events from '../Events/'

const HomePage: React.SFC = () => (
  <AppLayout>
    <Helmet>
      <title>Work in Progress</title>
    </Helmet>
    <Events background={lightBackground} slantTop={0} slantBottom={-2} />
    {/* <AboutSection />
    <OrganizerSection
      background={darkBackground}
      slantTop={2}
      slantBottom={-1}
    />
    <LocationSection />
    <SponsorSection
      background={lightBackground}
      slantTop={1}
      slantBottom={-3}
    />
    <CocSection /> */}
  </AppLayout>
)

export default HomePage
