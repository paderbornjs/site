import styled from 'styled-components/macro'
import { ReactComponent } from './twitter.svg'

export const Name = styled.span`
  font-size: 2rem;
  font-weight: 500;
  margin-top: 1.6rem;
  line-height: 1.25;

  @media (min-width: 550px) and (max-width: 767px) {
    font-size: 2.2rem;
  }
  @media (min-width: 768px) {
    font-size: 2.4rem;
  }
`

export const Text = styled.div<{ itemIndex: number }>`
  background: #f9fdfd;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  margin: -2rem 0 2rem 0;

  @media (min-width: 550px) and (max-width: 767px) {
  }

  @media (min-width: 768px) {
    // large
    justify-content: center;
    z-index: 0;
    height: 180px;
    width: calc(95% - 130px);
    ${props =>
      props.itemIndex % 2 === 0 ? 'margin-left: 130px' : 'margin-right: 130px'};
    ${props =>
      props.itemIndex % 2 === 0
        ? 'padding-left: 146px'
        : 'padding-right: 146px'};
  }
`

export const LinkWrapper = styled.div`
  margin: 0.5rem 0 1rem 0;
`

export const TwitterLogo = styled(ReactComponent)`
  fill: #1da1f2;
  height: 1.4rem;
  margin-right: 0.3rem;
`
