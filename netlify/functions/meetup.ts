import type { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

const MEETUP_API = 'https://api.meetup.com/paderborn-js'
const cache = new Map<string, string>()

const handler: Handler = async (_event, _context) => {
  const url = `${MEETUP_API}/events?status=upcoming`
  let response = cache.get(url)

  if (!response) {
    response = await (await fetch(url)).text()
    cache.set(url, response)
  }

  return { body: response, statusCode: 200 }
}

export { handler }
