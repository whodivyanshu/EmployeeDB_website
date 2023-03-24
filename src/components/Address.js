import * as React from 'react';
import Map, { NavigationControl, Marker } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PieChart, Pie } from 'recharts';

function App(props) {
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [error, setError] = React.useState(null);
  const datta = [
    { label: 'A', value: 20, type: 'type1' },
    { label: 'B', value: 30, type: 'type2' },
    { label: 'C', value: 10, type: 'type1' },
    { label: 'D', value: 40, type: 'type3' },
  ];

  const address = props.addd;
  const apiKey = '386658c6df27471d8f9b9fd7e7e26045';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          setLatitude(lat);
          setLongitude(lng);
        } else {
          setError('No results found');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [url]);

  if (error) {
    return <div>{error}</div>;
  }

  if (latitude === null || longitude === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Employee Location</h1>
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 14,
        }}
        style={{
          width: '700px',
          height: '350px',
          position: 'relative',
          left: '50px',
          top: '-10px',
        }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=O3hyGb236OQ11l0lXp7d"
      >
        <NavigationControl position="top-left" />
        <Marker longitude={longitude} latitude={latitude}>
          <div style={{ width: '20px', height: '20px', background: 'red', borderRadius: '50%' }}>
          <FaMapMarkerAlt size={24} color="blue" />
          </div>
        </Marker>
      </Map>

    </div>
  );
}

export default App;
