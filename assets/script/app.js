'use strict';

// This app requires a server to handle import statements
// and CORS issues
import { select, listen, } from './utils.js';

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Selectors                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
const trackButton = select('.track-button');
const mapDiv = select('#map');
const textOverlay = select('.no-map-text')

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Mapbox                                               */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
mapboxgl.accessToken = 'pk.eyJ1IjoiZXZhbjIwMjQiLCJhIjoiY2x1dW82Nmx1MGJ4MDJsbXA2cXl4MmtraCJ9.iBz6mImvl8OlBFIHvpLZ7g';
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
function removeMapOverlay() {
  textOverlay.classList.add('display-none');
  mapDiv.classList.remove('display-none');
  map.resize(); // forces map to recalibrate size and re-render itself
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Event Listeners                                      */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
listen('click', trackButton, () => {
  getGeolocation();
  removeMapOverlay();
});