import { QueryResolvers } from '../../typings/generated'
import { ContextType } from '../../utils/createContext'

const upcomingEventsResolver: QueryResolvers.UpcomingEventsResolver = async (
  root,
  args,
  ctx: ContextType
) => {
  const meetupEvents = await ctx.meetupService.fetchEventsByStatus('upcoming')

  return meetupEvents.map(event => ({
    talks: [],
    date: new Date(event.time),
    goingCount: event.yes_rsvp_count,
    url: event.link,
    venue: {
      city: event.venue.city,
      country: event.venue.country,
      lat: event.venue.lat,
      lon: event.venue.lon,
      name: event.venue.name,
      street: event.venue.address_1,
    },
  }))
}

export default upcomingEventsResolver
