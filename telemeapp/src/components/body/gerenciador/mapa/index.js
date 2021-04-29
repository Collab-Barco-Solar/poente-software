import React, { useEffect, useState } from 'react'
import './style.css'
import { TileLayer, MapContainer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from './boat.jpeg';

const BoatIcon = L.icon({
    iconUrl: icon,
    iconSize:     [30, 30], // size of the icon
});

const positions = [
    [-20.280135, -40.313995],
    [-20.280155, -40.313179],
    [-20.280034, -40.312450],
    [-20.279753, -40.311312],
    [-20.279340, -40.310219],
]

let i = 0;

L.Marker.prototype.options.icon = BoatIcon;

const Mapa = () => {
    const [posicaoAtual, setPosicaoAtual] = useState([-20.279682, -40.314660])

    useEffect(() => {
        setTimeout(() => {
            if( i === 5){
                i = 0;
            }
            setPosicaoAtual(positions[i]);
            // console.log(posicaoAtual)
            i++;
        }, 1500)
    },[posicaoAtual])

    return(
        <div className ="container">
            <MapContainer center={[-20.2769499, -40.3068654]} zoom={15} scrollWheelZoom={false} style={{width: '100%', height: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={posicaoAtual}>
            <Popup>
                Poente - Solares <br /> Última atualização: 07:30
            </Popup>
            </Marker>
            </MapContainer>
        </div>
    )
}
    
export default Mapa