import React, { useRef } from 'react';
import Sidebar from './Sidebar';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const events = [
  { name: 'Speed Dating', date: '22/04/2024', location: 'Café Michel', maxParticipants: 20, coords: [40.7128, -74.0060] },
  { name: 'Speed Dating', date: '22/04/2024', location: 'Café Michel', maxParticipants: 20, coords: [34.0522, -118.2437] },
  { name: 'Speed Dating', date: '22/04/2024', location: 'Café Michel', maxParticipants: 20, coords: [51.5074, -0.1278] },
  { name: 'Speed Dating', date: '22/04/2024', location: 'Café Michel', maxParticipants: 20, coords: [48.8566, 2.3522] },
];

const EventMap = ({ center, zoom }) => {
  return (
    <MapContainer center={center} zoom={zoom} className="w-full h-[400px] rounded-md shadow-md">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events.map((event, index) => (
        <Marker key={index} position={event.coords}>
          <Popup>
            <strong>{event.name}</strong><br />
            {event.date}<br />
            {event.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const Events = () => {
  const mapRef = useRef();

  const handleEventClick = (coords) => {
    if (mapRef.current) {
      mapRef.current.setView(coords, 10, { animate: true });
    }
  };

  return (
    <div className='flex h-screen w-screen'>
    <Sidebar></Sidebar>
    <div className="h-screen w-full p-8 bg-white text-black">
      {/* Header */}
      <div className="mb-6 border-b-2 border-black">
        <h1 className="text-3xl mb-4">Events</h1>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Map Section */}
        <div className="w-2/3 pr-4">
          <MapContainer center={[37.0902, -95.7129]} zoom={4} ref={mapRef} className="w-full h-[400px] rounded-md shadow-md">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {events.map((event, index) => (
              <Marker key={index} position={event.coords}>
                <Popup>
                  <strong>{event.name}</strong><br />
                  {event.date}<br />
                  {event.location}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Events List Section */}
        <div className="w-1/3 h-[400px] overflow-y-scroll pl-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="border-2 border-gray-300 p-4 mb-2 cursor-pointer"
              onClick={() => handleEventClick(event.coords)}
            >
              <h2 className="font-bold text-lg">{event.name}</h2>
              <p className="text-sm">📍 {event.location}</p>
              <p className="text-sm">Max participants: {event.maxParticipants}</p>
              <p className="text-sm">{event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Events;
