import fetch from 'node-fetch'
import getResponseCache from '../utils/getResponseCache'

export interface MeetupEvent {
  link: string
  time: number
  venue: {
    name: string
    lat: number
    lon: number
    address_1: string
    city: string
    country: string
  }
  yes_rsvp_count: number
}

export default class MeetupService {
  public static BASE_URL = 'https://api.meetup.com/paderborn-js'

  public constructor(private meetupKey: string) {}

  public async fetchEventsByStatus(
    eventStatus: string
  ): Promise<MeetupEvent[]> {
    const cache = getResponseCache('MeetupService.fetchEventsByStatus')
    const url = `${MeetupService.BASE_URL}/events?status=${eventStatus}&key=${
      this.meetupKey
    }`

    let responsePromise = cache.get(url)
    if (!responsePromise) {
      responsePromise = fetch(url)
      cache.set(url, responsePromise)
    }

    return await (await responsePromise).clone().json()
  }
}
