import React from 'react'
import styled from 'styled-components/macro'
import fontSizes from '../../style/fontSizes'
import spacings from '../../style/spacings'

const Headline = styled.h1`
  font-family: Merriweather, serif;
  font-size: ${fontSizes[4]};
  font-weight: 300;
  text-align: center;
  margin: 0 0 ${spacings[3]} 0;

  @media (min-width: 550px) and (max-width: 767px) {
    font-size: ${fontSizes[5]};
    margin: 0 0 ${spacings[4]} 0;
  }

  @media (min-width: 768px) {
    font-size: ${fontSizes[6]};
    margin: 0 0 ${spacings[5]} 0;
  }

  em {
    font-style: normal;
    border-bottom: 5px solid ${props => props.theme.colors.yellow[4]};
  }
`
interface SectionHeadlineProps {
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const SectionHeadline: React.FC<SectionHeadlineProps> = ({
  children,
  element = 'h1',
}) => {
  return <Headline as={element}>{children}</Headline>
}

export default SectionHeadline
