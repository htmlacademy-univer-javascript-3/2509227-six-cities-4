import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ offers }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = L.map('map').setView([52.38333, 4.9], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      offers.forEach((offer) => {
        L.marker(offer.coords).addTo(mapRef.current).bindPopup(offer.title);
      });
    }
  }, [offers]);

  return (
    <div
      id="map"
      style={{
        height: '579px',
        width: '100%',
        marginBottom: '50px',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );
};

export default MapComponent;
