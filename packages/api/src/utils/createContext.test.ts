import EventTalksLoader from '../loaders/EventTalksLoader'
import MeetupService from '../services/MeetupService'
import TwitterService from '../services/TwitterService'
import createContext from './createContext'

beforeAll(() => {
  process.env.TWITTER_API_KEY = 'test'
  process.env.TWITTER_API_SECRET = 'test'
})

afterAll(() => {
  delete process.env.TWITTER_API_KEY
  delete process.env.TWITTER_API_SECRET
})

describe('createContext', () => {
  it('returns appropriate loaders and services', () => {
    const ctx = createContext()

    expect(ctx).toEqual({
      eventTalksLoader: expect.any(EventTalksLoader),
      meetupService: expect.any(MeetupService),
      twitterService: expect.any(TwitterService),
    })
  })
})
