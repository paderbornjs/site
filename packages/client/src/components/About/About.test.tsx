import React from 'react'
import { render } from 'react-testing-library'
import { ThemeProvider } from 'styled-components/macro'
import theme from '../../style/theme'
import About from './About'

describe('<About />', () => {
  test('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <About />
      </ThemeProvider>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
