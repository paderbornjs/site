import React, { createRef, useEffect } from 'react'
import { Marker, MarkerProps } from 'react-leaflet'

const ExtendedMarker: React.FunctionComponent<MarkerProps> = props => {
  const markerRef = createRef<Marker<MarkerProps>>()

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.leafletElement.openPopup()
    }
  }, [])

  return <Marker {...props} ref={markerRef} />
}

export default ExtendedMarker
