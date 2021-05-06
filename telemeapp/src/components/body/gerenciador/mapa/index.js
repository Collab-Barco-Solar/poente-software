import React, { useEffect, useState } from 'react'
import './style.css'
import { TileLayer, MapContainer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from './boat.jpeg';
import localforage from 'localforage';
import 'leaflet-offline';

const BoatIcon = L.icon({
    iconUrl: icon,
    iconSize:     [30, 30], // size of the icon
});

const positions = [
    [-20.280080, -40.313748],
    [-20.280075, -40.313448],
    [-20.280075, -40.313099],
    [-20.280034, -40.312767],
    [-20.280014, -40.312482],
    [-20.279974, -40.312219],
    [-20.279924, -40.312010],
    [-20.279858, -40.311672],
    [-20.279828, -40.311517],
    [-20.279753, -40.311281],
    [-20.279687, -40.311066],
    [-20.279602, -40.310809],
    [-20.279521, -40.310615],
    [-20.279466, -40.310406],
    [-20.279415, -40.310186],
    [-20.279385, -40.310009],
    [-20.279345, -40.309795],
    [-20.279280, -40.309612],
    [-20.279244, -40.309446],
    [-20.279204, -40.309280],
    [-20.279169, -40.309097],
    [-20.279149, -40.308851],
    [-20.279159, -40.308647],
    [-20.279199, -40.308437],
    [-20.279259, -40.308282],
    [-20.279390, -40.308137],
    [-20.279556, -40.308003],
    [-20.279727, -40.307885],
    [-20.279904, -40.307788],
    [-20.280065, -40.307719],
    [-20.280256, -40.307649],
]

let i = 0;

L.Marker.prototype.options.icon = BoatIcon;

const Mapa = () => {
    const [posicaoAtual, setPosicaoAtual] = useState([-20.279682, -40.314660])

    useEffect(() => {
        //Defining the offline layer for the map
        const map = L.map('map-id');
        map.off();
        map.remove();
        const offlineLayer = L.tileLayer.offline('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', localforage, {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abc',
        minZoom: 13,
        maxZoom: 19,
        crossOrigin: true
    });
        offlineLayer.addTo(map);//add the offline layer
        map.zoomControl.remove();
    })

    useEffect(() => {
        setTimeout(() => {
            if( i === 30){
                i = 0;
            }
            setPosicaoAtual(positions[i]);
            // console.log(posicaoAtual)
            i++;
        }, 1000)
    },[posicaoAtual])

    return(
        <div className ="container" id="map-id">
            <MapContainer center={[-20.2769499, -40.3068654]} zoom={15} style={{width: '100%', height: '100%' }}>
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