import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Venue extends Component {
    static propTypes = {
        venue: PropTypes.object.isRequired,
        onVenueClicked: PropTypes.func.isRequired,
        tabindex: PropTypes.number.isRequired
    }

    render() {
        const venue = this.props.venue

        return (
            <button className="list-item material-button ripple" aria-labelledby="venue-name" tabIndex={ this.props.tabindex } onClick={ () => this.props.onVenueClicked(venue)}>
                <div id="venue-name">{ venue.name }</div>
            </button>
        )
    }
}

export default Venue
