import styled from 'styled-components/macro'
import { ReactComponent as JavaScriptLogo } from './javascript.svg'

export const Logo = styled(JavaScriptLogo)`
  width: 6rem;
  margin-left: 1em;

  @media (min-width: 550px) and (max-width: 767px) {
    width: 8rem;
  }
  @media (min-width: 768px) {
    width: 10rem;
  }
`

export const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 2em 0;
  color: #12223c;
  margin: 40px 0 0 0;
`

export const Headline = styled.h1`
  font-size: 3.4rem;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0;

  @media (min-width: 550px) and (max-width: 767px) {
    font-size: 5rem;
  }
  @media (min-width: 768px) {
    font-size: 6rem;
  }
`

export const Punchline = styled.p`
  text-align: center;
  font-size: 1.8rem;

  @media (min-width: 550px) and (max-width: 767px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`
