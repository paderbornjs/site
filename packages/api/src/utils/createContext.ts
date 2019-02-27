import express = require('express')
import GithubService from '../services/GithubService'
import MeetupService from '../services/MeetupService'
import TwitterService from '../services/TwitterService'
import getEnvironmentVariable from './getEnvironmentVariable'

export interface ContextCallbackParams {
  req: express.Request
  res: express.Response
}

export interface ContextType {
  githubService: GithubService
  meetupService: MeetupService
  queryString: string
  twitterService: TwitterService
}

export default function createContext(
  params: ContextCallbackParams
): ContextType {
  const twitterApiKey = getEnvironmentVariable('TWITTER_API_KEY')
  const twitterApiSecret = getEnvironmentVariable('TWITTER_API_SECRET')
  const meetupKey: string = getEnvironmentVariable('MEETUP_KEY')

  return {
    githubService: new GithubService(),
    meetupService: new MeetupService(meetupKey),
    queryString: params.req.body.query,
    twitterService: new TwitterService(twitterApiKey, twitterApiSecret),
  }
}
