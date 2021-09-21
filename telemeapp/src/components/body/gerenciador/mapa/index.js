import React, { useEffect, useState } from 'react'
import './style.css'
import { TileLayer, MapContainer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import boat from './boat.jpeg';
import flag from './flag.png';
import localforage from 'localforage';
import 'leaflet-offline';
import { FiCornerUpLeft, FiFlag, FiPlus, FiEye, FiPlayCircle, FiStopCircle, FiUpload, FiDownload } from "react-icons/fi";
import Swal from 'sweetalert2'
import lineColor from './lineColor';
import positions from './positionsFake';
import { saveAs } from "file-saver";


let i = 0;

let flags = [];
let voltaAtual = [];
let voltas = [];


const BoatIcon = L.icon({
    iconUrl: boat,
    iconSize: [30, 30], // size of the icon
});

const FlagIcon = L.icon({
    iconUrl: flag,
    iconSize: [30, 30], // size of the icon
});


// Função para adicionar uma bandeira no mapa
async function addFlagCoords() {
    const { value: formValues } = await Swal.fire({
        title: `Coordenadas`,
        html: `<div class="input-area"> 
                    <div class="input-1">
                        <p class="input-text">Latitude</p> 
                        <input id="swal-input1" class="swal2-input" /> 
                    </div>  
                    <div class="input-2">
                        <p class="input-text">Longitude </p> 
                        <input id="swal-input2" class="swal2-input" /> 
                    </div> 
                </div>`,
        focusConfirm: false,
        width: 600,
        padding: '3em',
        background: '#fff',
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value
            ]
        }
    })

    if (formValues) {
        if(formValues[0] !== "" && formValues[1] !== "")
            flags.push([ formValues[0], formValues[1]]);

        Swal.fire(JSON.stringify(formValues))
    }
}


const Mapa = () => {
    const [posicaoAtual, setPosicaoAtual] = useState([-20.279682, -40.314660])
    const [addFlag, setAddFlag] = useState(false);
    const [numVoltas, setNumVoltas] = useState(0);
    const [numVoltaEspecifica, setNumVoltaEspecifica] = useState(-1);
    const [startRecording, setStartRecording] = useState(false)
    const [stopRecording, setStopRecording] = useState(false)

    function recordingRoute(){
        if(startRecording === true && stopRecording === false){
            voltaAtual.push(positions[i]);
        }
        else if(startRecording === true && stopRecording === true){
            voltas.push(voltaAtual);
            let pos = numVoltas;
            pos = pos + 1;
            voltaAtual = [];
            setNumVoltas(pos);
            setStartRecording(false);
            setStopRecording(false);
        }
    }

    useEffect(() => {
        //Defining the offline layer for the map
        const map = L.map('map-id');
        map.off();
        map.remove();
        const offlineLayer = L.tileLayer.offline('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', localforage, {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abc',
        minZoom: 12,
        maxZoom: 19,
        crossOrigin: true
    });
        offlineLayer.addTo(map);//add the offline layer
        map.zoomControl.remove();
    },[])


    // Esse useEffect representa uma simulação do banco de dados
    // Funcionamento: Ele tá pegando uma coordenada "[-20.280080, -40.313748]" de um vetor de coordenadas fake
    //                que eu criei no arquivo positionsFake.js. Essa posição que ele pega é salva na variável
    //                posicaoAtual, usando o setPosicaoAtual. Se for usar o banco de dados real, substituir apenas
    //                a lógica desse useEffect.
    useEffect(() => {
        setTimeout(() => {
            if(i === 30){
                i = 0;
            }
            recordingRoute();
            setPosicaoAtual(positions[i]);
            i++;
        }, 1000)
    },[posicaoAtual])

    
    const Markers = () => {
        useMapEvents({
            click(e) {
                if(addFlag === false){
                    return null;
                }
                flags.push([ e.latlng.lat, e.latlng.lng ]);
                setAddFlag(!addFlag);                
            },            
        })
        return null;
    }

    // Mostra a trilha atual do barco
    const BoatRoute = () => {
        return <Polyline pathOptions={lineColor[numVoltas]} positions={voltaAtual} />
    }

    // Mostra as trilhas das voltas selecinadas
    const ShowEspecificRoute = (props) => {
        if(voltas.length > 0){
            return <Polyline pathOptions={lineColor[props.pos]} positions={voltas[props.pos]} />
        }
        return null;
    }


    async function selectEspecificRoute(){
        let voltasFeitas = []
        voltasFeitas.push("nenhuma")
        for(let i = 1; i <= numVoltas; i++){
            voltasFeitas.push(i)
        }
        const { value: voltaSelecionada } = await Swal.fire({
            title: 'Selecione a volta que deseja ver',
            input: 'select',
            inputOptions: {
              voltasFeitas
            },
            inputPlaceholder: 'Voltas feitas',
            showCancelButton: true,
    
          })
          
          if (voltaSelecionada) {
              if(voltaSelecionada > 0){
                let pos = voltaSelecionada - 1;
                setNumVoltaEspecifica(pos);
                Swal.fire(`Você selecionou a volta ${voltaSelecionada}`)
              }
              else{
                setNumVoltaEspecifica(-1);
              }
          }
    }

    function handleDownloadData() {
        const jsonObj = JSON.stringify(voltas);
        const blob = new Blob([jsonObj], {type: "application/json"});
        saveAs(blob, "dados-mapa.json");
    };

    function handleFileSelect(event) {
        const reader = new FileReader()
        reader.onload = handleFileLoad;
        reader.readAsText(event.target.files[0])
    }
    
    function handleFileLoad(event) {
        const result = event.target.result
        const finalObj = JSON.parse(result);
        // console.log(finalObj);
        voltas = finalObj;
        setNumVoltas(finalObj.length);
    }


    return(
        <div className="container" id="map-id" style={{backgroundColor: '#393640'}}>
            <div className="mapHeader">
                <div className="addRoute">
                    {
                        startRecording === true ?
                        <FiStopCircle 
                            color="#FFFFFF"
                            size={25} 
                            style={{ fill: 'red' }}
                            onClick={() => setStopRecording(true)}
                        />:
                        <FiPlayCircle 
                            color="#FFFFFF"
                            size={25} 
                            style={{ fill: 'green' }}
                            onClick={() => setStartRecording(true)}
                        />
                    }
                    
                    <FiEye 
                        color="#FFFFFF"
                        size={25} 
                        onClick={() => selectEspecificRoute()}
                    />

                    <div>
                        <label htmlFor="arquivo">
                            <FiUpload
                                color="#FFFFFF"
                                size={22} 
                                type="file"
                            />    
                        </label>
                        <input type="file" name="arquivo" id="arquivo" onChange={handleFileSelect}/>
                    </div>

                    <FiDownload
                        color="#FFFFFF"
                        size={22} 
                        onClick={() => handleDownloadData()}
                    />
                </div>

                <div className="addFlags" >
                    <FiPlus 
                        color="#FFFFFF"
                        size={25} 
                        onClick={() => addFlagCoords()}
                    />
                    <FiFlag 
                        color="#FFFFFF"
                        size={25} 
                        style={ addFlag ? { fill: 'red' } : {}} 
                        onClick={() => setAddFlag(!addFlag)}
                    />    
                    {flags.length > 0 && 
                    <FiCornerUpLeft 
                        color="#FFFFFF"
                        size={25} 
                        onClick={() => flags.pop()}
                    />}
                </div>
            </div>
            
            <MapContainer 
                center={[-20.2769499, -40.3068654]} 
                zoom={15} 
                style={{width: '100%', height: '100%' }}
                
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={posicaoAtual} icon={BoatIcon}>
                    <Popup>
                        Poente - Solares <br /> Última atualização: 07:30
                    </Popup>
                </Marker>

                {flags.map((position, idx) =>
                    <Marker key={idx} position={position} icon={FlagIcon}></Marker>
                )}
                
                <Markers />

                {startRecording === true && <BoatRoute />}

                {numVoltaEspecifica !== -1 && <ShowEspecificRoute pos={numVoltaEspecifica}/>}

            </MapContainer>
        </div>
    )
}
    
export default Mapa