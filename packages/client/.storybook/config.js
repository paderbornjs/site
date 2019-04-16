import centered from '@storybook/addon-centered/react'
import { addDecorator, configure } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import 'typeface-merriweather'
import theme from '../src/style/theme'
import GlobalStyle from '../src/components/GlobalStyle'

const req = require.context('../src/components', true, /\.stories\.tsx$/)

const loadStories = () => {
  req.keys().forEach(filename => req(filename))
}

addDecorator(centered)
addDecorator(story => (
  <>
    <GlobalStyle />
    {story()}
  </>
))
addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)

configure(loadStories, module)
