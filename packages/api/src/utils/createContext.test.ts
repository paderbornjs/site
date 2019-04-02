import EventTalksLoader from '../loaders/EventTalksLoader'
import MeetupService from '../services/MeetupService'
import TwitterService from '../services/TwitterService'
import createContext from './createContext'

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
