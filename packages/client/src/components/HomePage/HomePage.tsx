import React from 'react'
import About from '../About'
import AppLayout from '../AppLayout'
import CodeOfConduct from '../CodeOfConduct'
import Events from '../Events'
import Location from '../Location'
import OrganizerList from '../OrganizerList'
import Slanted from '../Slanted'
import Sponsors from '../Sponsors'

const HomePage: React.FC = () => (
  <AppLayout>
    <Slanted slantTop={3} slantBottom={-2}>
      <Events />
    </Slanted>
    <Slanted type="light">
      <About />
    </Slanted>
    <Slanted type="dark" slantTop={2} slantBottom={-1}>
      <OrganizerList />
    </Slanted>
    <Slanted type="light">
      <Location />
    </Slanted>
    <Slanted slantTop={1} slantBottom={-3}>
      <Sponsors />
    </Slanted>
    <Slanted type="light">
      <CodeOfConduct />
    </Slanted>
  </AppLayout>
)

export default HomePage
