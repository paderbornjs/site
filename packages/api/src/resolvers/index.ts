import { GraphQLDateTime } from 'graphql-iso-date'
import eventTalksResolver from './event/talks'
import organizers from './query/organizers'
import upcomingEvents from './query/upcomingEvents'

export default {
  // root resolvers
  Query: {
    organizers,
    upcomingEvents,
  },

  // type resolvers
  UpcomingEvent: {
    talks: eventTalksResolver,
  },

  // scalar resolvers
  DateTime: GraphQLDateTime,
}
