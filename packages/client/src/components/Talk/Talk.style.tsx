import Markdown from 'react-markdown'
import styled from 'styled-components/macro'

export const Description = styled(Markdown)`
  text-align: left;

  p:last-of-type {
    margin: 0;
  }
`

export const Title = styled.h3`
  margin: 0 0 ${props => props.theme.spacings[2]} 0;
  font-size: ${props => props.theme.fontSizes[2]};
  font-weight: 500;
`
