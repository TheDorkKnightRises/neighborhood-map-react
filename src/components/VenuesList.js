import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Venue from './Venue'

class VenuesList extends Component {
    static propTypes = {
        venues: PropTypes.array.isRequired,
        onVenueClicked: PropTypes.func.isRequired,
        onFilterValueChange: PropTypes.func.isRequired
    }

    render() {
        const venues = this.props.venues

        return (
            <div className="list">
                <h1 className="list-title">Places of Interest</h1>
                <div className="list-content">
                    <div className="search-bar">
                        <input type="text" tabIndex="1" aria-label="Filter text input" className="ripple" placeholder="Filter locations by name" onChange={ this.props.onFilterValueChange } />
                    </div>
                    <div>
                    {
                        venues.map((venue, index) => {
                            return (
                                <Venue venue= { venue } key={ venue.id } tabindex={ index + 1 } onVenueClicked={ this.props.onVenueClicked } />
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
