import React, { Component } from 'react'
// import UpcomingEvent from '../UpcomingEvent/UpcomingEvent'
import { EventsQueryComponent } from '../../typings/generated.d'
// import AnimatedSection from '../AnimatedSection/AnimatedSection'
import Slanted, { SlantedProps } from '../Slanted/Slanted'

class EventsSection extends Component<SlantedProps> {
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
            return (
              <>events</>
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
            )
          }}
        </EventsQueryComponent>
      </Slanted>
    )
  }
}

export default EventsSection
