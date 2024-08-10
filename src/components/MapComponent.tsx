import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from 'react-query';
import L from 'leaflet';

// Function to fetch country COVID-19 data from API
const fetchCountryData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');  // API endpoint
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

const isError = (error: unknown): error is Error => error instanceof Error;

const MapComponent: React.FC = () => {
    // Fetch country data using React Query
    const { data: countryData, error, isLoading } = useQuery('countryData', fetchCountryData);

    if (isLoading) return <p>Loading...</p>;

    // Display error message if there's an issue with data fetching
    if (error) return <p>Error: {isError(error) ? error.message : 'An unknown error occurred'}</p>;

    if (!countryData) return null;

    return (
        <div className="p-4 lg:w-5/12">
            <h2 className="font-bold text-blue-600 mb-6 text-lg">COVID-19 Cases Map</h2>
            <div className="h-80 sm:h-96 lg:h-[500px]">
                <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%", zIndex: "0"}}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {countryData.map((country: any) => (
                        <Marker
                            key={country.countryInfo.iso2}
                            position={[country.countryInfo.lat, country.countryInfo.long]}
                            icon={L.icon({
                                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
                                shadowSize: [41, 41]
                            })}
                        >
                            <Popup>
                                <strong>{country.country}</strong><br />
                                <span>Total Active Cases: {country.active}</span><br />
                                <span>Total Recovered Cases: {country.recovered}</span><br />
                                <span>Total Deaths: {country.deaths}</span>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;
