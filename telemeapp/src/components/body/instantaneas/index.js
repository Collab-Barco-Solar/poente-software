import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { FiSettings } from "react-icons/fi";
import './style.css'

import { ContextoGeral } from "../../../contextos/contexto-geral";


// esses dadods ainda não estão dispostos no db
let bombBB = 0;
let bombBE = 0;


/** LEGENDA dos paramentros
 * parametros[0] ---> corrente no motor
 * parametros[1] ---> tensao dos modulos
 * parametros[2] ---> corrente nas baterias
 * parametros[3] ---> tensao nas baterias
 * parametros[4] ---> corrente nas baterias auxiliares
 * parametros[5] ---> tensao nas baterias auxiliares
 * parametros[6] ---> posicao no potenciometro
 * parametros[7] ---> velocidade
 * parametros[8] ---> temperatura
 */

let paramentros = [
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 },
    { minimo: 0, maximo: 0 }
];

// 1 -> se refere a configuracao das correntes
// 2 -> configuracao da bomba
async function config(value,text) {
    const { value: formValues } = await Swal.fire({
        title: `Entradas - ${text}`,
        html: `<div class="input-area"> 
                    <div class="input-1">
                        <p class="input-text">Valor mínimo</p> 
                        <input id="swal-input1" class="swal2-input" value=${paramentros[value].minimo} /> 
                    </div>  
                    <div class="input-2">
                        <p class="input-text">Valor máximo </p> 
                        <input id="swal-input2" class="swal2-input" value=${paramentros[value].maximo} /> 
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
        paramentros[value].minimo = formValues[0];
        paramentros[value].maximo = formValues[1];

        Swal.fire(JSON.stringify(formValues))
    }
}

// Essa função verifica os valores do barco com os minimos e maximos setados, retornando
// um display com as cores certas
const DisplayInstantaneas = (data) => {
    if(data?.value <= paramentros[data.parametro].minimo || data?.value >= paramentros[data.parametro].maximo){
        return <div className="display-instantaneas" />
    }
    return <div className="display-instantaneas" style={{ backgroundColor: 'green'}}/>;
}


class Instantaneas extends Component {
    
    render() {
        return (
            <ContextoGeral.Consumer> 
                    {contextoGeral => (
                        <div className="instantaneas">
                            <div className="instantaneas--superior">
                                <div className="valores">
                                    <div className="container-infos-instantaneas">
                                        <DisplayInstantaneas value={contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.cBarramento} parametro={0}/>                            
                                        <p className="valores--itens">
                                            {contextoGeral.switchButton ? 
                                                contextoGeral.mediasAtuais?.cBarramento.toFixed(2) : 
                                                (contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.cBarramento?.toFixed(2)) 
                                        || "Carregando"} A</p>
                                    </div>

                                    <div className="container-infos-instantaneas">
                                        <DisplayInstantaneas value={contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.tModulos} parametro={1}/>
                                        <p className="valores--itens">
                                            {contextoGeral.switchButton ? 
                                                contextoGeral.mediasAtuais?.tModulos.toFixed(2) : 
                                                (contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.tModulos?.toFixed(2)) 
                                        || "Carregando"} V</p>
                                    </div>

                                    <div className="container-infos-instantaneas">
                                        <DisplayInstantaneas value={contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.cBaterias} parametro={2}/>
                                        <p className="valores--itens">
                                            {contextoGeral.switchButton ? 
                                                contextoGeral.mediasAtuais?.cBaterias.toFixed(2) :
                                                (contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.cBaterias?.toFixed(2)) 
                                        || "Carregando"} A</p>
                                    </div>

                                    <div className="container-infos-instantaneas">
                                        <DisplayInstantaneas value={contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.tBaterias} parametro={3}/>
                                        <p className="valores--itens">
                                            {contextoGeral.switchButton ? 
                                                contextoGeral.mediasAtuais?.tBaterias.toFixed(2) :
                                                (contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.tBaterias?.toFixed(2)) 
                                        || "Carregando"} V</p>
                                    </div>

                                    <div className="container-infos-instantaneas">
                                        <DisplayInstantaneas value={contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.cBateriasAux} parametro={4}/>
                                        <p className="valores--itens">
                                            {contextoGeral.switchButton ? 
                                                contextoGeral.mediasAtuais?.cBateriasAux.toFixed(2)  :
                                                (contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.cBateriasAux?.toFixed(2)) 
                                        || "Carregando"} A</p>
                                    </div>

                                    <div className="container-infos-instantaneas">
                                        <DisplayInstantaneas value={contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.tBateriasAux} parametro={5}/>
                                        <p className="valores--itens">
                                            {contextoGeral.switchButton ? 
                                                contextoGeral.mediasAtuais?.tBateriasAux.toFixed(2) :
                                                (contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.tBateriasAux?.toFixed(2)) 
                                        || "Carregando"} V</p>
                                    </div>

                                    <div className="container-infos-instantaneas">
                                        <DisplayInstantaneas value={contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.pPotenciometro} parametro={6}/>
                                        <p className="valores--itens">
                                            {contextoGeral.switchButton ? 
                                                contextoGeral.mediasAtuais?.pPotenciometro.toFixed(2) :
                                                (contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.pPotenciometro?.toFixed(2)) 
                                        || "Carregando"}</p>
                                    </div>

                                    <div className="container-infos-instantaneas">
                                        <DisplayInstantaneas value={contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.velocidade} parametro={7}/>
                                        <p className="valores--itens">
                                            {contextoGeral.switchButton ? 
                                                contextoGeral.mediasAtuais?.velocidade.toFixed(2) :
                                                (contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.velocidade?.toFixed(2)) 
                                        || "Carregando"} nós</p>
                                    </div>

                                    <div className="container-infos-instantaneas">
                                        <DisplayInstantaneas value={contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.temperatura} parametro={8}/>
                                        <p className="valores--itens">
                                            {contextoGeral.switchButton ? 
                                                contextoGeral.mediasAtuais?.temperatura.toFixed(2) :
                                                (contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.temperatura?.toFixed(2)) 
                                        || "Carregando"} ºC</p>
                                    </div>

                                </div>
                                {!contextoGeral.switchButton ? 
                                
                                <div className="nomes">
                                    <p className="nomes--itens">Corrente Motor
                                        <FiSettings onClick={() => config(0,'Corrente motor INST')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Tensão Módulos
                                        <FiSettings onClick={() => config(1,'Tensão módulos INST')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Corrente Baterias
                                        <FiSettings onClick={() => config(2,'Corrente baterias INST')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Tensão Baterias
                                        <FiSettings onClick={() => config(3,'Tensão baterias INST')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Corrente Bateria Aux
                                        <FiSettings onClick={() => config(4,'Corrente bateriasAux INST')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Tensão Bateria Aux
                                        <FiSettings onClick={() => config(5,'Tensão bateriasAux INST')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Posição Potenciômetro
                                        <FiSettings onClick={() => config(6,'Posição potenciômetro INST')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Velocidade
                                        <FiSettings onClick={() => config(7,'Velocidade INST')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Temperatura
                                        <FiSettings onClick={() => config(8,'Temperatura INST')} size={15} className="config-input" />
                                    </p>
                                </div>
                                :                                 
                                <div className="nomes">
                                    <p className="nomes--itens">Corrente Motor
                                        <FiSettings onClick={() => config(9,'Corrente motor MED')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Tensão Módulos
                                        <FiSettings onClick={() => config(10,'Tensão módulos MED')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Corrente Baterias
                                        <FiSettings onClick={() => config(11,'Corrente baterias MED')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Tensão Baterias
                                        <FiSettings onClick={() => config(12,'Tensão baterias MED')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Corrente Bateria Aux
                                        <FiSettings onClick={() => config(13,'Corrente bateriasAux MED')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Tensão Bateria Aux
                                        <FiSettings onClick={() => config(14,'Tensão bateriasAux MED')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Posição Potenciômetro
                                        <FiSettings onClick={() => config(15,'Posição potenciômetro MED')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Velocidade
                                        <FiSettings onClick={() => config(16,'Velocidade MED')} size={15} className="config-input" />
                                    </p>
                                    <p className="nomes--itens">Temperatura
                                        <FiSettings onClick={() => config(17,'Temperatura MED')} size={15} className="config-input" />
                                    </p>
                                </div>
                                }
                            </div>
                            <div className="acionamentos">
                                <div className="acionamentos--superior">
                                    <div className="on-off-display">
                                        {(contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.onOFF) !== 0 ? <div className="on-off-ON"></div> : <div className="on-off-OFF"></div>}
                                        <p className="on-off-name">ON/OFF</p>
                                    </div>
                                    <div className="dms-display">
                                        {(contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.dms) !== 0 ? <div className="dms-ON"></div> : <div className="dms-OFF"></div>}
                                        <p className="dms-name">DMS</p>
                                    </div>
                                    <div className="re-display">
                                        {(contextoGeral.dadosRecebidos?.[contextoGeral.dadosRecebidos.length-1]?.re) !== 0 ? <div className="re-ON"></div> : <div className="re-OFF"></div>}
                                        <p className="re-name">RÉ</p>
                                    </div>
                                </div>
                                <div className="acionamentos--inferior">
                                    <div className="bomba-bb-display">
                                        {bombBB === 1 ? <div className="bomba-bb-ON"></div> : <div className="bomba-bb-OFF"></div>}
                                        <p className="bomba-bb-name">BMB-BB</p>
                                    </div>
                                    <div className="bomba-be-display">
                                        {bombBE === 1 ? <div className="bomba-be-ON"></div> : <div className="bomba-be-OFF"></div>}
                                        <p className="bomba-be-name">BMB-BE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </ContextoGeral.Consumer> 
        );
    }
}

export default Instantaneas