declare module 'pigeon-maps' {
  const React: import('react')

  interface Props {
    center: any
    zoom: number
    width: number
    height: number
  }

  const type: React.FC<any>

  export default type
}

declare module 'pigeon-marker' {
  export default {}
}

declare module 'pigeon-overlay' {
  export default {}
}
