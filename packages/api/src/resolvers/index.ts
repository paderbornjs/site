import { GraphQLDateTime } from 'graphql-iso-date'
import organizers from './query/organizers'
import upcomingEvents from './query/upcomingEvents'
import upcomingTalks from './query/upcomingTalks'

export default {
  // root resolvers
  Query: {
    organizers,
    upcomingEvents,
    upcomingTalks,
  },

  // scalar resolvers
  DateTime: GraphQLDateTime,
}
