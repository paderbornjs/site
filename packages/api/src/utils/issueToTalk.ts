import { LIGHTNING_TALK_LABEL, UPCOMING_TALK_LABEL } from '../constants'
import { GithubIssue } from '../services/GithubService'
import { Talk } from '../typings/generated'

/**
 * Regular expression used to split an issue body into specific
 * talk related informations.
 */
const issueFormat = new RegExp(
  [
    /^[\s\S]*/, // most likely html comment from issue template
    /(?<!#)#{4} (.*)\s+/, // name
    /(?<!#)#{5} (.*)\s+/, // occupation
    /(?:#{6} \[(.+)\]\((.+)\)\s+)?/, // social link
    /([\s\S]+)$/, // description
  ]
    .map(r => r.source)
    .join('')
)

const parseIssueBody = (
  issueBody: string
): null | {
  name: string
  occupation: string
  socialName: string
  socialUrl: string
  description: string
} => {
  const matches = issueBody.match(issueFormat)

  return matches
    ? {
        name: matches[1],
        occupation: matches[2],
        socialName: matches[3],
        socialUrl: matches[4],
        description: matches[5],
      }
    : null
}

/**
 * Receives an issue and converts it to a Talk.
 * Returns `null` if the issue has no milestone or the body can't be parsed.
 *
 * @param issue Github issue
 */
const issueToTalk = (issue: GithubIssue): Talk | null => {
  const talkInfo = parseIssueBody(issue.body)

  if (!talkInfo || !issue.milestone) {
    return null
  }

  return {
    date: new Date(issue.milestone.due_on),
    description: talkInfo.description,
    isLightningTalk: issue.labels.some(
      label => label.name === LIGHTNING_TALK_LABEL
    ),
    // issue names, excluding those for upcoming and lightning talks
    labels: issue.labels
      .filter(
        label =>
          ![UPCOMING_TALK_LABEL, LIGHTNING_TALK_LABEL].includes(label.name)
      )
      .map(label => label.name),
    speaker: {
      avatarUrl: issue.user.avatar_url,
      name: talkInfo.name,
      occupation: talkInfo.occupation,
      socialName: talkInfo.socialName,
      socialUrl: talkInfo.socialUrl,
    },
    title: issue.title,
  }
}

export default issueToTalk
