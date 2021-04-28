import React from 'react'
import './style.css'
import { TileLayer, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = () => {

    return(
        <div className ="container">
            <MapContainer center={[-20.2769499, -40.3068654]} zoom={15} scrollWheelZoom={false} style={{width: '100%', height: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            </MapContainer>
        </div>
    )
}
    
export default Mapa