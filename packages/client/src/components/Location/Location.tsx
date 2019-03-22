import leaflet from 'leaflet'
import React from 'react'
import { AttributionControl, Map, Popup, TileLayer } from 'react-leaflet'
import SectionHeadline from '../SectionHeadline'
import Slanted from '../Slanted'
import ExtendedMarker from './ExtendedMarker'

const position = { lat: 51.718143463134766, lng: 8.745869636535645 }
const zoom = 15

const markerIcon = leaflet.icon({
  iconAnchor: [12, 12],
  iconSize: [24, 24],
  iconUrl: require('../AppHeader/javascript.svg'),
})

const Location: React.FC = () => {
  return (
    <Slanted>
      <SectionHeadline element="h2">Location</SectionHeadline>
      <Map center={position} zoom={zoom} attributionControl={false}>
        <AttributionControl position="bottomright" prefix={false} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ExtendedMarker position={position} icon={markerIcon}>
          <Popup offset={[0, -6]}>
            Sputnik
            <br />
            Imadstraße 7
            <br />
            33102 Paderborn
          </Popup>
        </ExtendedMarker>
      </Map>
    </Slanted>
  )
}

export default Location
