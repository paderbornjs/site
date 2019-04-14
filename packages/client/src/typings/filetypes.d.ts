declare module '*.gql' {
  const value: import('graphql').DocumentNode
  export default value
}

declare module '*.graphql' {
  const value: import('graphql').DocumentNode
  export default value
}

declare module '*.md' {
  const value: string
  export default value
}

declare module '*.svg' {
  const content: string
  const ReactComponent: React.StatelessComponent<
    React.SVGAttributes<SVGElement>
  >
  export { ReactComponent }
  export default content
}
