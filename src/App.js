import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'
import VenuesList from './components/VenuesList'

mapboxgl.accessToken = 'pk.eyJ1IjoidGVzdGVyZ3V5IiwiYSI6ImNqbzNrbzlnYzB5N3EzcG5uMXRkazBkaG4ifQ.ktqoIeyuZnSUmbJd7nqOmQ';
const FOURSQUARE_CLIENT_ID = 'QGLTDYJB1FGBJ3VV5YAW1YBUMWMTQ2ZC0OLSSWLIVLRYXHDM'
var map

class App extends Component {
    state = {
        venues: [],
        shownVenues: [],
        selectedVenue: null,
        query: '',
        errors: []
    }

    onVenueClicked = (venue) => {
        this.resetSelectedVenue()

        console.log(venue.name + ' clicked')

        // Remove old marker
        venue.marker.remove()

        // Add new marker with class 'marker-selected'
        var el = document.createElement('div');
        el.className = 'marker-selected';
        var marker = new mapboxgl.Marker(el)
            .setLngLat([venue.location.lng, venue.location.lat])
            .addTo(map)
        venue.marker = marker

        map.flyTo({
            center: marker.getLngLat(),
            zoom: 17.5
        })

        this.setState({
            selectedVenue: venue
        })
        window.scroll({
          top: 0,
          behavior: 'smooth'
        });
    }

    resetSelectedVenue = () => {
        if (this.state.selectedVenue != null) {
            const venue = this.state.selectedVenue

            // Remove old marker
            venue.marker.remove()

            // Add new marker with class 'marker'
            var el = document.createElement('div');
            el.className = 'marker';
            el.addEventListener('click', () =>
               {
                  this.onVenueClicked(venue)
               }
            );
            var marker = new mapboxgl.Marker(el)
                .setLngLat([venue.location.lng, venue.location.lat])
                .addTo(map)
            venue.marker = marker

            // Reset selectedVenue
            this.setState({
                selectedVenue: null
            })
        }
    }

    onFilterValueChange = (e) => {
        this.resetSelectedVenue()
        const queryText = e.target.value
        this.setState(() => {
            return { query: queryText.toString() }
        })
        if (queryText.length > 0) {
            var shownVenues = this.state.venues.filter((venue) => venue.name.toLowerCase().includes(queryText.toLowerCase()))
            this.setState(() => {
                return { shownVenues }
            })
        } else {
            this.setState(() => {
                return { shownVenues: this.state.venues, query: '' }
            })
        }
    }

    componentDidMount() {
        var errors = []

        // Set bounds to New York, New York
        var bounds = [
            [-73.99, 40.756], // Southwest coordinates
            [-73.98, 40.762]  // Northeast coordinates
        ];

        map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v10',
          center: [-73.9855998, 40.7588542],
          zoom: 17.5,
          maxBounds: bounds
        });

        map.on('error', (error) => {
            console.log(error)
            errors.push('Error fetching map data from MapBox API')
            this.setState({
                errors: errors
            })
        })

        fetch('https://api.foursquare.com/v2/venues/search?client_id=' + FOURSQUARE_CLIENT_ID + '&client_secret=' + process.env.REACT_APP_FOURSQUARE_API_KEY + '&v=20180323&ll=40.7588542,-73.9855998&limit=10')
            .then((response) => response.json()).then((data) => {
                let venues = data.response.venues
                if (venues.length > 0) {
                    venues.forEach((venue) => {
                        var el = document.createElement('div');
                        el.className = 'marker';
                        el.addEventListener('click', () =>
                           {
                              this.onVenueClicked(venue)
                           }
                        );

                        var marker = new mapboxgl.Marker(el)
                            .setLngLat([venue.location.lng, venue.location.lat])

                        venue.marker = marker
                    })
                    this.setState({
                        venues: venues,
                        shownVenues: venues,
                        query: ''
                    })
                } else {
                    errors.push('Error fetching locations from Foursquare API')
                    this.setState({
                        errors: errors
                    })
                }
            })
            .catch((error) => {
                console.log(error)
                errors.push('Error fetching locations from Foursquare API')
                this.setState({
                    errors: errors
                })
            });

    }

    PopUpArea = (props) => {
        // Function to return the div for showing errors or venue details
        if (props.errors.length > 0) {
            // Show error messages
            return (
                <div className="popup">
                    <div className="container">
                        <ul>
                        {
                            props.errors.map((error, index) => <li key={index}>{error}</li>)
                        }
                        </ul>
                    </div>
                </div>
            )

        } else if (props.venue == null) {
            // Return empty div if no errors or no venue details to show
            return <div></div>
        } else {
            // Show venue details
            return (
                <div className="popup">
                    <button className="close" tabIndex="12" onClick={ this.resetSelectedVenue }>Close</button>
                    <div className="container">
                        <h3>{ this.state.selectedVenue.name }</h3>
                        <h4>{ this.state.selectedVenue.categories[0].name }</h4>
                        <p>{ this.state.selectedVenue.location.formattedAddress.join(', ') }</p>
                    </div>
                </div>
            )
        }
    }

    showMarkers = (shownVenues) => {
        this.state.venues.forEach((venue) => {
            if (shownVenues.includes(venue))
                venue.marker.addTo(map)
            else venue.marker.remove()
        })
    }

    render() {
        this.showMarkers(this.state.shownVenues)
        return (
            <div className="app">
                <this.PopUpArea venue={ this.state.selectedVenue } errors={ this.state.errors }/>
                <div ref={el => this.mapContainer = el} className="map" />
                <VenuesList venues={ this.state.shownVenues } onVenueClicked={ this.onVenueClicked } onFilterValueChange={ this.onFilterValueChange } />
            </div>
        );
    }
}

export default App;
