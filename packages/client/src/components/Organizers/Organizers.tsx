import React, { Component } from 'react'
import { PoseGroup } from 'react-pose'
import {
  OrganizersQueryComponent,
  OrganizersQueryOrganizers,
} from '../../typings/generated.d'
import OrganizerCard from '../OrganizerCard/OrganizerCard'
import Slanted, { Props as SlantedProps } from '../Slanted/Slanted'
import { List, ListItem } from './Organizers.style'

class Organizers extends Component<SlantedProps> {
  public state = {
    profileImagesLoaded: false,
  }

  public render() {
    const { profileImagesLoaded } = this.state

    return (
      <Slanted
        background={this.props.background}
        slantTop={this.props.slantTop}
        slantBottom={this.props.slantBottom}
      >
        <OrganizersQueryComponent pollInterval={3600000}>
          {({
            loading,
            error,
            data: { organizers = [] } = { organizers: [] },
          }) => {
            // organizer profile pictures are not loaded, so we act as if
            // no organizer information is available until they are
            if (organizers.length && !profileImagesLoaded) {
              this.loadProfileImages(organizers).then(() => {
                this.setState({ profileImagesLoaded: true })
              })

              loading = true
              organizers = []
            }

            return (
              <List>
                <PoseGroup animateOnMount={true}>
                  {organizers.length ? (
                    organizers.map(
                      (organizer: OrganizersQueryOrganizers, i: number) => (
                        <ListItem key={i} itemIndex={i}>
                          <OrganizerCard itemIndex={i} organizer={organizer} />
                        </ListItem>
                      )
                    )
                  ) : error ? (
                    <div key={0}>{error.message}</div>
                  ) : (
                    <div key={0} />
                  )}
                </PoseGroup>
              </List>
            )
          }}
        </OrganizersQueryComponent>
      </Slanted>
    )
  }

  private loadProfileImages(
    organizers: OrganizersQueryOrganizers[]
  ): Promise<Event[]> {
    return Promise.all<Event>(
      organizers.map(
        o =>
          new Promise(resolve => {
            const img = new Image()
            img.onload = resolve
            img.src = o.twitter.profileImageUrl
          })
      )
    )
  }
}

export default Organizers
