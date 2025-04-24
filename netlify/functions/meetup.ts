import type { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

const MEETUP_API = 'https://api.meetup.com/gql-ext'
const cache = new Map<string, string>()

const query = /* graphql */ `
  query {
    groupByUrlname(urlname: "paderborn-js") {
      events(first: 1, sort:ASC, status:ACTIVE) {
        edges {
          node {
            dateTime
            eventUrl
            rsvps {
              edges {
                node {
                  id
                }
              }
            }
            venues {
              address
              city
              lat
              lon
              name
              country
            }
          }
        }
      }
    }
  }`

const handler: Handler = async (_event, _context) => {
  const response = cache.get('response')

  if (!response) {
    const text = await (await fetch(MEETUP_API, {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' },
    })).text()
    const json = JSON.parse(text) as { data: { groupByUrlname: { events: { edges: { node: object }[] } } } }
    const response = JSON.stringify(json.data.groupByUrlname.events.edges[0]!.node)
    cache.set('response', response)
  }

  return { body: response, statusCode: 200 }
}

export { handler }
