import React from 'react'
import { Helmet } from 'react-helmet'
import { darkBackground, lightBackground } from '../../style/colors'
import About from '../About'
import AppLayout from '../AppLayout'
import CodeOfConduct from '../CodeOfConduct'
import Events from '../Events'
import Location from '../Location'
import Organizers from '../Organizers'
import Sponsors from '../Sponsors'

const HomePage: React.FunctionComponent = () => (
  <AppLayout>
    <Helmet>
      <title>Work in Progress</title>
    </Helmet>
    <Events background={lightBackground} slantTop={0} slantBottom={-2} />
    <About />
    <Organizers background={darkBackground} slantTop={2} slantBottom={-1} />
    <Location />
    <Sponsors background={lightBackground} slantTop={1} slantBottom={-3} />
    <CodeOfConduct />
  </AppLayout>
)

export default HomePage
