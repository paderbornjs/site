import fetch from 'node-fetch'
import getResponseCache from '../utils/getResponseCache'

export interface GithubIssue {
  body: string
  labels: { name: string }[]
  milestone?: {
    due_on: string
  }
  title: string
  user: {
    avatar_url: string
  }
}

type GithubIssueWithMilestone = GithubIssue &
  Required<Pick<GithubIssue, 'milestone'>>

export default class GithubService {
  public static BASE_URL = 'https://api.github.com/repos/paderbornjs/talks'

  public async fetchOpenIssuesByLabels(
    labels: string[]
  ): Promise<GithubIssue[]> {
    const cache = getResponseCache('GithubService.fetchOpenIssuesByLabels')
    const url = `${GithubService.BASE_URL}/issues?state=open&labels=${labels}`

    let responsePromise = cache.get(url)
    if (!responsePromise) {
      responsePromise = fetch(url)
      cache.set(url, responsePromise)
    }

    return await (await responsePromise).clone().json()
  }

  public filterIssuesByFutureMilestone(
    issues: GithubIssue[]
  ): GithubIssueWithMilestone[] {
    return issues.filter(issue => {
      if (!issue.milestone) {
        return false
      }

      const now = new Date()
      const milestone = new Date(issue.milestone.due_on)

      return (
        now.getUTCFullYear() <= milestone.getUTCFullYear() &&
        now.getUTCMonth() <= milestone.getUTCMonth() &&
        now.getUTCDate() <= milestone.getUTCDate()
      )
    }) as GithubIssueWithMilestone[]
  }
}
