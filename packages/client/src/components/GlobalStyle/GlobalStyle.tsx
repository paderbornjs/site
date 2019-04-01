import { createGlobalStyle } from 'styled-components/macro'

const GlobalStyle = createGlobalStyle<{}>`
*, *::before, *::after {
  box-sizing: border-box;
}
html {
  font-size: ${props => props.theme.fontSizes[2]};
  overflow-x: hidden;
}
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Noto Sans",Ubuntu,Cantarell,"Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${props => props.theme.colors.blue[0]};
  background: ${props => props.theme.colors.gray[4]};
  line-height: 1.625;
  overflow-x: hidden;
  font-size: ${props => props.theme.fontSizes[1]};

  @media (min-width: 550px) and (max-width: 767px) {
    font-size: ${props => props.theme.fontSizes[2]};
  }
  @media (min-width: 768px) {
    font-size: ${props => props.theme.fontSizes[3]};
  }
}
a, a:link, a:visited, a:focus, a:hover, a:active {
  color: ${props => props.theme.colors.blue[3]};
  text-decoration: none;
}
p {
  margin: 0 0 ${props => props.theme.spacings[3]} 0;
}
ul, ol {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
`

export default GlobalStyle
