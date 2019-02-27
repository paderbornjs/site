import { Response } from 'node-fetch'

interface ResponseCacheStorage {
  [namespace: string]: Map<
    string,
    {
      response: Promise<Response>
      lastUpdated: number
    }
  >
}

interface ResponseCache {
  get: (key: string) => Promise<Response> | null
  set: (key: string, response: Promise<Response>) => void
}

const cache: ResponseCacheStorage = {}
const timeToLive = 600000 // 10 minutes

const getResponseCache = (namespace: string): ResponseCache => {
  if (!cache[namespace]) {
    cache[namespace] = new Map()
  }

  return {
    get: (key: string): Promise<Response> | null => {
      const entry = cache[namespace].get(key)
      return !entry || Date.now() - entry.lastUpdated >= timeToLive
        ? null
        : entry.response
    },
    set: (key: string, response: Promise<Response>): void => {
      cache[namespace].set(key, {
        response: response,
        lastUpdated: Date.now(),
      })
    },
  }
}

export default getResponseCache
