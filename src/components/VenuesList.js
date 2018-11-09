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
                    <div className="search-bar">
                        <input type="text" tabindex="1" className="ripple" placeholder="Filter locations by name" />
                    </div>
                    <div>
                    {
                        venues.map((venue, index) => {
                            return (
                                <Venue venue= { venue } key={ venue.id } tabindex={ index + 1 } onVenueClicked={ this.props.onVenueClicked } displayMarkerForVenue={ this.props.displayMarkerForVenue } />
                            )
                        })
                    }
                    </div>
                    <div>
                        <p className="center"> Data provided by Fourquare </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default VenuesList
