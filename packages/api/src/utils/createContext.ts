import EventTalksLoader from '../loaders/EventTalksLoader'
import GithubService from '../services/GithubService'
import MeetupService from '../services/MeetupService'
import TwitterService from '../services/TwitterService'
import getEnvironmentVariable from './getEnvironmentVariable'

export interface ContextType {
  eventTalksLoader: EventTalksLoader
  meetupService: MeetupService
  twitterService: TwitterService
}

export default function createContext(): ContextType {
  const twitterApiKey = getEnvironmentVariable('TWITTER_API_KEY')
  const twitterApiSecret = getEnvironmentVariable('TWITTER_API_SECRET')
  const meetupKey: string = getEnvironmentVariable('MEETUP_KEY')

  return {
    eventTalksLoader: new EventTalksLoader(
      { batch: true },
      new GithubService()
    ),
    meetupService: new MeetupService(meetupKey),
    twitterService: new TwitterService(twitterApiKey, twitterApiSecret),
  }
}
