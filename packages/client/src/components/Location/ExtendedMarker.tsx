import React, { Component, createRef } from 'react'
import { Marker, MarkerProps } from 'react-leaflet'

export default class ExtendedMarker extends Component<MarkerProps> {
  private myRef = createRef<Marker<MarkerProps>>()

  public componentDidMount() {
    this.myRef.current!.leafletElement.openPopup()
  }

  public render() {
    // @ts-ignore - ref is not defined on Marker props
    return <Marker {...this.props} ref={this.myRef} />
  }
}
