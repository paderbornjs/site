import React from 'react'
import { render as rtlRender } from 'react-testing-library'
import { ThemeProvider } from 'styled-components/macro'
import theme from '../style/theme'

export const render = (ui: React.ReactElement) => {
  const utils = rtlRender(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

  return {
    ...utils,
    theme,
  }
}
