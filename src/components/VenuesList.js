import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Venue from './Venue'

class VenuesList extends Component {
    static propTypes = {
        venues: PropTypes.array.isRequired,
        onVenueClicked: PropTypes.func.isRequired,
        displayMarkerForVenue: PropTypes.func.isRequired
    }

    render() {
        const venues = this.props.venues

        return (
            <div className="list">
                <div className="list-title">
                  <h1>Places of Interest</h1>
                </div>
                <div className="list-content">
                    <div>
                    {
                        venues.map((venue) => {
                            return (
                                <Venue venue= { venue } key={ venue.id } onVenueClicked={ this.props.onVenueClicked } displayMarkerForVenue={ this.props.displayMarkerForVenue } />
                            )
                        })
                    }
                    </div>
                </div>
                <div className="open-search">
                </div>
            </div>
        )
    }
}

export default VenuesList