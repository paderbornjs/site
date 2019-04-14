import React from 'react'
import { Helmet } from 'react-helmet'
import About from '../About'
import AppHeader from '../AppHeader'
import CodeOfConduct from '../CodeOfConduct'
import EventList from '../EventList'
import OrganizerList from '../OrganizerList'
import Slanted from '../Slanted'
import SponsorList from '../SponsorList'

const App: React.FC = () => {
  return (
    <>
      <Helmet defaultTitle="Paderborn.JS" titleTemplate="%s – Paderborn.JS" />
      <AppHeader />
      <main>
        <Slanted>
          <EventList />
        </Slanted>
        <Slanted type="dark">
          <About />
        </Slanted>
        <Slanted>
          <OrganizerList />
        </Slanted>
        <Slanted type="dark">
          <SponsorList />
        </Slanted>
        <Slanted>
          <CodeOfConduct />
        </Slanted>
      </main>
    </>
  )
}

export default App
