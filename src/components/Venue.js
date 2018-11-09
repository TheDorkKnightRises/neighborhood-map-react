import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Venue extends Component {
    static propTypes = {
        venue: PropTypes.object.isRequired,
        onVenueClicked: PropTypes.func.isRequired,
        displayMarkerForVenue: PropTypes.func.isRequired,
        tabindex: PropTypes.number.isRequired
    }

    render() {
        const venue = this.props.venue

        this.props.displayMarkerForVenue(venue)

        return (
            <button className="venue material-button ripple" tabIndex={ this.props.tabindex } onClick={ () => this.props.onVenueClicked(venue)}>
                { venue.name }
            </button>
        )
    }
}

export default Venue
