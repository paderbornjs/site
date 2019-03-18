import React from 'react'
import { Helmet } from 'react-helmet'
import HomePage from '../HomePage/HomePage'

const App: React.FC = () => (
  <React.Fragment>
    <Helmet defaultTitle="Paderborn.JS" titleTemplate="%s – Paderborn.JS" />
    <HomePage />
  </React.Fragment>
)

export default App
