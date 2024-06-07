import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RootState } from '../store';
import { IOffer } from '../types';

const defaultIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="blue" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const highlightedIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="orange" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapComponentProps {
  offers: IOffer[];
  cityCoords: [number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({ offers, cityCoords }) => {
  const mapRef = useRef<L.Map | null>(null);
  const highlightedOffer = useSelector(
    (state: RootState) => state.rental.highlightedOffer
  );

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(cityCoords, 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView(cityCoords, 12);
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current!.removeLayer(layer);
        }
      });

      offers.forEach((offer) => {
        const isHighlighted = highlightedOffer === Number(offer.id);
        L.marker([offer.location.latitude, offer.location.longitude], {
          icon: isHighlighted ? highlightedIcon : defaultIcon,
        })
          .addTo(mapRef.current!)
          .bindPopup(offer.title);
      });
    }
  }, [offers, highlightedOffer, cityCoords]);

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
    />
  );
};

export default MapComponent;
