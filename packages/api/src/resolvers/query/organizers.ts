import {
  ArrayOrIterable,
  Organizer,
  Query,
  ResolverFn,
} from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

const organizersResolver: ResolverFn<
  ArrayOrIterable<Organizer>,
  Query,
  ContextType,
  {}
> = async (root, args, ctx) => {
  const twitterUsers = await ctx.twitterService.fetchUsersByScreenName([
    'code_punkt',
    'tobi_pb',
  ])

  return twitterUsers.map(user => ({
    name: user.name,
    description: user.description,
    twitterName: user.screen_name,
    profileImageUrl: user.profile_image_url_https.replace(/_normal/, ''),
  }))
}

export default organizersResolver
