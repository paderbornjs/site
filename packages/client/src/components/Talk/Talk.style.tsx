import Markdown from 'react-markdown'
import styled from 'styled-components/macro'
import fontSizes from '../../style/fontSizes'
import spacings from '../../style/spacings'

export const Description = styled(Markdown)`
  text-align: left;

  p:last-of-type {
    margin: 0;
  }
`

export const Title = styled.h3`
  margin: 0 0 ${spacings[2]} 0;
  font-size: ${fontSizes[2]};
  font-weight: 500;
`
