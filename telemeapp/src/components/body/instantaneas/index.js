import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { FiSettings } from "react-icons/fi";
import './style.css'

import sendAsync from '../../../message-control/renderer';

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
    { minimo: 0, maximo: 0 }
];

let bancoEncontrado = false;

//<input id="swal-input1" class="swal2-input">
//<input id="swal-input2" class="swal2-input">
// 1 -> se refere a configuracao das correntes
// 2 -> configuracao da bomba
async function config(value) {
    const { value: formValues } = await Swal.fire({
        title: 'Entradas',
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
    constructor() {
        super();
        this.timer = null;
        this.state = { data: null };
    }

    fetchData(sql_message) {
        sendAsync(sql_message).then((result) => this.setState({ data: result }));
        if (this.state.data != null) {
            //console.log(this.state.data[0].emergencia); //data é um vetor, com cada posição sendo uma linha
            if (!bancoEncontrado) {
                console.log("Banco de dados conectado com sucesso!");
                bancoEncontrado = true;
            }
        } else {
            console.log("Buscando dados no banco de dados...");
            bancoEncontrado = false;
        }
    }

    componentDidMount() {
        let sqlCommandMaxId = 'SELECT * FROM Dados WHERE id = (SELECT MAX(id) FROM dados);';
        this.fetchData(sqlCommandMaxId);
        this.timer = setInterval(() => this.fetchData(sqlCommandMaxId), 2000); //5000 ms tempo entre leituras
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        return (
            <div className="instantaneas">
                <div className="instantaneas--superior"> 
                    <div className="valores">
                        {/* se o valor que está for > max*0.9 && <max || se valor que está for <min*1.1 && > min */}
                        <div className="container-infos-instantaneas">
                            <DisplayInstantaneas value={this.state.data?.[0].cBarramento} parametro={0}/>                            
                            <p className="valores--itens">{(this.state.data?.[0].cBarramento) || "Carregando"} A</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            <DisplayInstantaneas value={this.state.data?.[0].tModulos} parametro={1}/>
                            <p className="valores--itens">{(this.state.data?.[0].tModulos) || "Carregando"} V</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            <DisplayInstantaneas value={this.state.data?.[0].cBaterias} parametro={2}/>
                            <p className="valores--itens">{(this.state.data?.[0].cBaterias) || "Carregando"} A</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            <DisplayInstantaneas value={this.state.data?.[0].tBaterias} parametro={3}/>
                            <p className="valores--itens">{(this.state.data?.[0].tBaterias) || "Carregando"} V</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            <DisplayInstantaneas value={this.state.data?.[0].cBateriasAux} parametro={4}/>
                            <p className="valores--itens">{(this.state.data?.[0].cBateriasAux) || "Carregando"} A</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            <DisplayInstantaneas value={this.state.data?.[0].tBateriasAux} parametro={5}/>
                            <p className="valores--itens">{(this.state.data?.[0].tBateriasAux) || "Carregando"} V</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            <DisplayInstantaneas value={this.state.data?.[0].pPotenciometro} parametro={6}/>
                            <p className="valores--itens">{(this.state.data?.[0].pPotenciometro) || "Carregando"}</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            <DisplayInstantaneas value={this.state.data?.[0].velocidade} parametro={7}/>
                            <p className="valores--itens">{(this.state.data?.[0].velocidade) || "Carregando"} nós</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            <DisplayInstantaneas value={this.state.data?.[0].temperatura} parametro={8}/>
                            <p className="valores--itens">{(this.state.data?.[0].temperatura) || "Carregando"} ºC</p>
                        </div>

                    </div>
                    <div className="nomes">
        
                        <p className="nomes--itens">Corrente Motor
                            <FiSettings onClick={() => config(0)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Tensão Módulos
                            <FiSettings onClick={() => config(1)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Corrente Baterias
                            <FiSettings onClick={() => config(2)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Tensão Baterias
                            <FiSettings onClick={() => config(3)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Corrente Bateria Aux
                            <FiSettings onClick={() => config(4)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Tensão Bateria Aux
                            <FiSettings onClick={() => config(5)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Posição Potenciômetro
                            <FiSettings onClick={() => config(6)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Velocidade
                            <FiSettings onClick={() => config(7)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Temperatura
                            <FiSettings onClick={() => config(8)} size={15} className="config-input" />
                        </p>
                    </div>
                </div>
                <div className="acionamentos">
                    <div className="acionamentos--superior">
                        <div className="on-off-display">
                            {(this.state.data?.[0].onOFF) !== 0 ? <div className="on-off-ON"></div> : <div className="on-off-OFF"></div>}
                            <p className="on-off-name">ON/OFF</p>
                        </div>
                        <div className="dms-display">
                            {(this.state.data?.[0].dms) !== 0 ? <div className="dms-ON"></div> : <div className="dms-OFF"></div>}
                            <p className="dms-name">DMS</p>
                        </div>
                        <div className="re-display">
                            {(this.state.data?.[0].re) !== 0 ? <div className="re-ON"></div> : <div className="re-OFF"></div>}
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

        );
    }
}

export default Instantaneas