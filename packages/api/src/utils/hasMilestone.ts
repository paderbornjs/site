import { GithubIssue } from '../services/GithubService'

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

  const now = new Date()
  const milestone = new Date(issue.milestone.due_on)

  return (
    now.getUTCFullYear() <= milestone.getUTCFullYear() &&
    now.getUTCMonth() <= milestone.getUTCMonth() &&
    now.getUTCDate() <= milestone.getUTCDate()
  )
}

export default hasMilestone
