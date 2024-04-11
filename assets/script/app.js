'use strict';

// This app requires a server to handle import statements
// and CORS issues
import { select, listen, } from './utils.js';

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Selectors                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
const trackButton = select('.track-button')

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Mapbox                                               */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtYmpqIiwiYSI6ImNsdXN5dDgyczBteHAyanA0a2thd3hxZHEifQ.BjLGCobl62MQZTu6b3ve2A';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserHeading: true
}));

// Marker
function addMarker(location) {
  let marker = new mapboxgl.Marker({
    color: "var(--medium-gold)",
    width: '1rem',
    height: '1rem',
    draggable: true
    }).setLngLat(location)
    .addTo(map);
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Geolocation                                          */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getGeolocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getLocation, errorHandler);
  } else {
    alert('Geolocation is not supported by your browser');
  }
}

function getLocation(position) {
  let { latitude, longitude } = position.coords;
  let userLocation = [longitude, latitude];
  map.flyTo({ center: userLocation, zoom: 16 });
  addMarker(userLocation);
}

function errorHandler() {
  alert('Unable to retrieve your location');
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Event Listeners                                      */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
listen('click', trackButton, getGeolocation);