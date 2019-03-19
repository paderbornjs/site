import EventTalksLoader from '../loaders/EventTalksLoader'
import MeetupService from '../services/MeetupService'
import TwitterService from '../services/TwitterService'
import createContext from './createContext'

describe('createContext', () => {
  const env = process.env

  beforeEach(() => {
    process.env = {
      ...env,
      MEETUP_KEY: 'test',
      TWITTER_API_KEY: 'test',
      TWITTER_API_SECRET: 'test',
    }
  })

  afterEach(() => {
    process.env = env
  })

  it('returns appropriate loaders and services', () => {
    const ctx = createContext()

    expect(ctx).toEqual({
      eventTalksLoader: expect.any(EventTalksLoader),
      meetupService: expect.any(MeetupService),
      twitterService: expect.any(TwitterService),
    })
  })
})
