import { Event } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

const eventTalksResolver = async (root: Event, args, ctx: ContextType) => {
  const eventDate = root.date.toISOString().substring(0, 10)
  return await ctx.eventTalksLoader.load(eventDate)
}

export default eventTalksResolver
