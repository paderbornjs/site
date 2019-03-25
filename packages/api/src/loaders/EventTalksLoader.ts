import DataLoader from 'dataloader'
import { UPCOMING_TALK_LABEL } from '../constants'
import GithubService from '../services/GithubService'
import { Talk } from '../typings/generated'
import hasMilestone from '../utils/hasMilestone'
import issueToTalk from '../utils/issueToTalk'

class EventTalksLoader extends DataLoader<string, Talk[]> {
  /**
   * Collects and batches data loading requests for events talks
   * spread throughout multiple resolver calls.
   */
  constructor(
    options: DataLoader.Options<string, Talk[]>,
    githubService: GithubService
  ) {
    super(async eventDates => {
      const issues = await githubService.fetchOpenIssuesByLabels([
        UPCOMING_TALK_LABEL,
      ])

      const talks = issues
        .filter(hasMilestone)
        .map(issueToTalk)
        .filter(talk => talk !== null) as Talk[]

      return eventDates.map(eventDate =>
        talks.filter(issue => {
          const issueDate = issue.date.toISOString().substring(0, 10)
          return eventDate === issueDate
        })
      )
    }, options)
  }
}

export default EventTalksLoader
