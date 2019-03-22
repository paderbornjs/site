import {
  ArrayOrIterable,
  ResolverFn,
  Talk,
  UpcomingEvent,
} from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

const eventTalksResolver: ResolverFn<
  ArrayOrIterable<Talk>,
  UpcomingEvent,
  ContextType,
  {}
> = async (root, args, ctx) => {
  const eventDate = root.date.toISOString().substring(0, 10)
  return await ctx.eventTalksLoader.load(eventDate)
}

export default eventTalksResolver
