import { QueryResolvers } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

const organizersResolver: QueryResolvers.OrganizersResolver = async (
  root,
  args,
  ctx: ContextType
) => {
  const twitterUsers = await ctx.twitterService.fetchUsersByScreenName([
    'code_punkt',
    'tobi_pb',
  ])

  return twitterUsers.map(user => ({
    name: user.name,
    description: user.description,
    twitter: {
      name: user.screen_name,
      profileImageUrl: user.profile_image_url_https,
    },
  }))
}

export default organizersResolver
