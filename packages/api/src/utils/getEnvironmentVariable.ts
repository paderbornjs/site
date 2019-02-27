export default function getEnvironmentVariable(key: string): string {
  const value = process.env[key]

  if (value === undefined) {
    throw new Error(`missing env variable: '${key}'`)
  }

  return value
}
