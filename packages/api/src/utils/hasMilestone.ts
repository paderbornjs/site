import { GithubIssue } from '../services/GithubService'
import { isBefore } from 'date-fns'

/**
 * Returns true if the github issue has a future milestone,
 * false if it has none or one that lies in the past.
 *
 * Can be used to filter a list of github issues.
 *
 * @param issue Github issue
 */
const hasMilestone = (issue: GithubIssue): boolean => {
  if (!issue.milestone) {
    return false
  }

  return isBefore(new Date(), new Date(issue.milestone.due_on))
}

export default hasMilestone
