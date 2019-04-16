import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyle = createGlobalStyle<{}>`
*, *::before, *::after {
  box-sizing: border-box;
}
html {
  overflow-x: hidden;
}
body {
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.fonts.sans};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${props => props.theme.colors.primaryXDark};
  background: ${props => props.theme.colors.greyMBright};
  line-height: 1.625;
  overflow-x: hidden;

  font-size: ${props => props.theme.fontSizes[1]}px;
  @media (min-width: 550px) {
    font-size: ${props => props.theme.fontSizes[2]}px;
  }
  @media (min-width: 768px) {
    font-size: ${props => props.theme.fontSizes[3]}px;
  }
}
a, a:link, a:visited, a:focus, a:hover, a:active {
  color: ${props => props.theme.colors.primaryMedium};
  text-decoration: none;
}
p {
  margin: 0 0 ${props => props.theme.space[3]}px 0;
}
ul, ol, figure {
  margin: 0;
  padding: 0;
}
ul, ol {
  list-style-type: none;
}
b {
  font-weight: 500;
}
`

export default GlobalStyle
