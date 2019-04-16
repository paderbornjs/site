import EventTalksLoader from '../loaders/EventTalksLoader'
import GithubService from '../services/GithubService'
import MeetupService from '../services/MeetupService'
import TwitterService from '../services/TwitterService'

export interface ContextType {
  eventTalksLoader: EventTalksLoader
  meetupService: MeetupService
  twitterService: TwitterService
}

export default function createContext(): ContextType {
  if (!process.env.TWITTER_API_KEY) {
    throw new Error(`missing env variable: 'TWITTER_API_KEY'`)
  }
  if (!process.env.TWITTER_API_SECRET) {
    throw new Error(`missing env variable: 'TWITTER_API_SECRET'`)
  }
  if (!process.env.MEETUP_KEY) {
    throw new Error(`missing env variable: 'MEETUP_KEY'`)
  }

  const twitterApiKey = process.env.TWITTER_API_KEY
  const twitterApiSecret = process.env.TWITTER_API_SECRET
  const meetupKey: string = process.env.MEETUP_KEY

  return {
    eventTalksLoader: new EventTalksLoader(
      { batch: true },
      new GithubService()
    ),
    meetupService: new MeetupService(meetupKey),
    twitterService: new TwitterService(twitterApiKey, twitterApiSecret),
  }
}
