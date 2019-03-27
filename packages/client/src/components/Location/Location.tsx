import Map from 'pigeon-maps'
import React from 'react'
import styled from 'styled-components/macro'
import SectionHeadline from '../SectionHeadline'

const StyledMap = styled(Map)`
  border: 3px solid white;
`

// https://codepen.io/andreasstorm/pen/ClguF
// http://cssdeck.com/labs/tedyvui4
const StyledMarker = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: ${props => props.theme.colors.blue[3]};
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
  animation-name: bounce;
  animation-fill-mode: both;
  animation-duration: 1s;
  -webkit-mask-image: radial-gradient(
    7px at 50% 50%,
    transparent 99%,
    black 100%
  );

  &:after {
    content: '';
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: white;
    position: absolute;
    border-radius: 50%;
  }
`

const position = { lat: 51.718143463134766, lng: 8.745869636535645 }
const zoom = 15

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Marker: React.FC<any> = ({ left, top }) => {
  return <StyledMarker style={{ left, top }} />
}

const Location: React.FC = () => {
  return (
    <>
      <SectionHeadline element="h2">Location</SectionHeadline>
      <StyledMap
        center={[position.lat, position.lng]}
        zoom={zoom}
        height={400}
        attribution={false}
      >
        <Marker anchor={[position.lat, position.lng]} offset={[0, 0]} />
        <Marker anchor={[position.lat, position.lng]} offset={[-100, 0]} />
      </StyledMap>
    </>
  )
}

export default Location
