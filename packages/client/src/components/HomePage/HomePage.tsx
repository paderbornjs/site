import React from 'react'
import { darkBackground, lightBackground } from '../../style/colors'
import About from '../About'
import AppLayout from '../AppLayout'
import CodeOfConduct from '../CodeOfConduct'
import Events from '../Events'
import Location from '../Location'
import OrganizerList from '../OrganizerList'
import Slanted from '../Slanted'
import Sponsors from '../Sponsors'

const HomePage: React.FunctionComponent = () => (
  <AppLayout>
    <Slanted background={lightBackground} slantTop={3} slantBottom={-2}>
      <Events />
    </Slanted>
    <About />

    <Slanted background={darkBackground} slantTop={2} slantBottom={-1}>
      <OrganizerList />
    </Slanted>
    <Location />
    <Sponsors background={lightBackground} slantTop={1} slantBottom={-3} />
    <CodeOfConduct />
  </AppLayout>
)

export default HomePage
