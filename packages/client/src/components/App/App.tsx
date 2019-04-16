import React from 'react'
import { Helmet } from 'react-helmet'
import About from '../About'
import AppHeader from '../AppHeader'
import CodeOfConduct from '../CodeOfConduct'
import EventList from '../EventList'
import OrganizerList from '../OrganizerList'
import SponsorList from '../SponsorList'
import Section from '../Section'

const App: React.FC = () => {
  return (
    <>
      <Helmet defaultTitle="Paderborn.JS" titleTemplate="%s – Paderborn.JS" />
      <AppHeader />
      <main>
        <Section bright>
          <EventList />
        </Section>
        <Section>
          <About />
        </Section>
        <Section bright>
          <OrganizerList />
        </Section>
        <Section>
          <CodeOfConduct />
        </Section>
        <Section bright>
          <SponsorList />
        </Section>
      </main>
    </>
  )
}

export default App
