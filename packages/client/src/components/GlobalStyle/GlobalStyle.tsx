import { createGlobalStyle } from 'styled-components/macro'
import { background, link, text } from '../../style/colors'

const GlobalStyle = createGlobalStyle<{}>`
*, *::before, *::after {
  box-sizing: border-box;
}
html {
  font-size: 10px;
  overflow-x: hidden;
}
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${text};
  background: ${background};
  line-height: 1.625;
  overflow-x: hidden;
  font-size: 1.6rem;

  @media (min-width: 550px) and (max-width: 767px) {
    font-size: 1.7rem;
  }
  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
}
a, a:link, a:visited, a:focus, a:hover, a:active {
  color: ${link};
  text-decoration: none;
}
p {
  margin: 0 0 2rem 0;
}
.leaflet-container {
  border: 0.3rem solid white;
  height: 50rem;
  max-height: 100vw;
  overflow: hidden;
  margin: 0 -1.5rem;
  font: inherit;

  @media (min-width: 550px) {
    margin: 0;
  }
}
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  box-shadow: none;
  color: ${text};
}
.leaflet-popup-close-button {
  display: none;
}
`

export default GlobalStyle
