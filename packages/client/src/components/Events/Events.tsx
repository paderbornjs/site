import React, { Component } from 'react'
import { EventsQueryComponent } from '../../typings/generated.d'
// import AnimatedSection from '../AnimatedSection/AnimatedSection'
import Slanted, { Props as SlantedProps } from '../Slanted/Slanted'
import Event from './Event'

class Events extends Component<SlantedProps> {
  public render() {
    return (
      <Slanted
        background={this.props.background}
        slantTop={this.props.slantTop}
        slantBottom={this.props.slantBottom}
      >
        <EventsQueryComponent>
          {({
            loading,
            error,
            data: { upcomingEvents = [], upcomingTalks = [] } = {
              upcomingEvents: [],
              upcomingTalks: [],
            },
          }) => {
            return upcomingEvents.length ? (
              <Event
                event={upcomingEvents[0]}
                talks={upcomingTalks}
                // talks={upcomingTalks.filter(
                //   talk =>
                //     new Date(talk.date).getUTCDate() ===
                //     new Date(upcomingEvents[0].date).getUTCDate()
                // )}
              />
            ) : error ? (
              error.message
            ) : (
              ''
            )

            // <AnimatedSection isLoading={loading} delayLoading={1000}>
            //   {upcomingEvents.length ? (
            //     <UpcomingEvent
            //       event={upcomingEvents[0]}
            //       talks={upcomingTalks}
            //       // talks={upcomingTalks.filter(
            //       //   talk =>
            //       //     new Date(talk.date).getUTCDate() ===
            //       //     new Date(upcomingEvents[0].date).getUTCDate()
            //       // )}
            //     />
            //   ) : error ? (
            //     error.message
            //   ) : (
            //     ''
            //   )}
            // </AnimatedSection>
          }}
        </EventsQueryComponent>
      </Slanted>
    )
  }
}

export default Events
