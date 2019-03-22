import styled from 'styled-components/macro'
import fontSizes from '../../style/fontSizes'
import { ReactComponent } from './twitter.svg'

export const Name = styled.span`
  font-size: ${fontSizes[4]};
  font-weight: 500;
  line-height: 1.25;

  @media (min-width: 768px) {
    font-size: ${fontSizes[5]};
  }
`

export const Text = styled.div<{ itemIndex: number }>`
  background: #f9fdfd;
  display: flex;
  flex-direction: column;
  width: 100%;

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

export const LinkWrapper = styled.div``

export const TwitterLogo = styled(ReactComponent)`
  fill: #1da1f2;
`
