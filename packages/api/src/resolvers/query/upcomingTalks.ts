import { QueryResolvers, Talk } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

const UPCOMING_TALK_LABEL = 'Upcoming Talk'
const LIGHTNING_TALK_LABEL = 'Lightning Talk'

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

const convertMilestoneToMeetupDate = (milestoneDate: string): Date => {
  const date = new Date(milestoneDate)
  date.setDate(date.getDate() - 1)
  date.setHours(19)
  return date
}

const upcomingTalksResolver: QueryResolvers.UpcomingTalksResolver = async (
  root,
  args,
  ctx: ContextType
) => {
  const githubIssues = await ctx.githubService.fetchOpenIssuesByLabels([
    UPCOMING_TALK_LABEL,
  ])
  const issuesWithFutureMilestone = ctx.githubService.filterIssuesByFutureMilestone(
    githubIssues
  )

  return issuesWithFutureMilestone
    .map(issue => {
      const talkInfo = parseIssueBody(issue.body)

      return talkInfo
        ? {
            date: convertMilestoneToMeetupDate(issue.milestone.due_on),
            description: talkInfo.description,
            isLightningTalk: issue.labels.some(
              label => label.name === LIGHTNING_TALK_LABEL
            ),
            labels: issue.labels
              .filter(
                label =>
                  ![UPCOMING_TALK_LABEL, LIGHTNING_TALK_LABEL].includes(
                    label.name
                  )
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
        : null
    })
    .filter(talk => talk !== null) as Talk[]
}

export default upcomingTalksResolver
