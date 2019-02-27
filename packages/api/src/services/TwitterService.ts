import fetch from 'node-fetch'
import getResponseCache from '../utils/getResponseCache'

export interface TwitterUser {
  name: string
  description: string
  screen_name: string
  profile_image_url_https: string
}

export default class TwitterService {
  public static BASE_URL = 'https://api.twitter.com/1.1'
  public static TOKEN_URL = 'https://api.twitter.com/oauth2/token'

  public constructor(private apiKey: string, private apiSecret: string) {}

  public async fetchToken(): Promise<string> {
    const response = await fetch(TwitterService.TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${this.apiKey}:${this.apiSecret}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: 'grant_type=client_credentials',
    })

    const { access_token: token } = await response.json()
    return token
  }

  public async fetchUsersByScreenName(
    twitterHandles: string[]
  ): Promise<TwitterUser[]> {
    const cache = getResponseCache('TwitterService.fetchUsersByScreenName')
    const url = `${
      TwitterService.BASE_URL
    }/users/lookup.json?screen_name=${twitterHandles.join(',')}`

    let responsePromise = cache.get(url)
    if (!responsePromise) {
      responsePromise = fetch(url, {
        headers: {
          Authorization: `Bearer ${await this.fetchToken()}`,
        },
      })
      cache.set(url, responsePromise)
    }

    return await (await responsePromise).clone().json()
  }
}
