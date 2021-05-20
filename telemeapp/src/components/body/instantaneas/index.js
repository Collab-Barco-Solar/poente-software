import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { FiSettings } from "react-icons/fi";
import './style.css'

import sendAsync from '../../../message-control/renderer';

let bombBB = 0;
let bombBE = 0;

let correnteMotorMin = 0;
let correnteMotorMax = 0;
let tensaoModulosMin = 0;
let tensaoModulosMax = 0;
let correnteBateriasMin = 0;
let correnteBateriasMax = 0;
let tensaoBateriasMin = 0;
let tensaoBateriasMax = 0;

let correnteBateriasAuxMin = 0;
let correnteBateriasAuxMax = 0;
let tensaoBateriasAuxMin = 0;
let tensaoBateriasAuxMax = 0;

let posPotenciometroMin = 0;
let posPotenciometroMax = 0;

let velocidadeMin = 0;
let velocidadeMax = 0;

let temperaturaMin = 0;
let temperaturaMax = 0;

let bancoEncontrado = false;

//<input id="swal-input1" class="swal2-input">
//<input id="swal-input2" class="swal2-input">
// 1 -> se refere a configuracao das correntes
// 2 -> configuracao da bomba
async function config(value) {
    const { value: formValues } = await Swal.fire({
        title: 'Entradas',
        html: '<div class="input-area"> <div class="input-1"><p class="input-text">Valor mínimo</p> <input id="swal-input1" class="swal2-input"> </div>  <div class="input-2"><p class="input-text">Valor máximo </p> <input id="swal-input2" class="swal2-input"> </div> </div>',
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

        if (value === 1) {
            correnteMotorMin = formValues[0];
            correnteMotorMax = formValues[1];
        }
        else if (value === 2) {
            tensaoModulosMin = formValues[0];
            tensaoModulosMax = formValues[1];
        }
        else if (value === 3) {
            correnteBateriasMin = formValues[0];
            correnteBateriasMax = formValues[1];
        }
        else if (value === 4) {
            tensaoBateriasMin = formValues[0];
            tensaoBateriasMax = formValues[1];
        }
        else if (value === 5) {
            correnteBateriasAuxMin = formValues[0];
            correnteBateriasAuxMax = formValues[1];
        }
        else if (value === 6) {
            tensaoBateriasAuxMin = formValues[0];
            tensaoBateriasAuxMax = formValues[1];
        }
        else if (value === 7) {
            posPotenciometroMin = formValues[0];
            posPotenciometroMax = formValues[1];
        }
        else if (value === 8) {
            velocidadeMin = formValues[0];
            velocidadeMax = formValues[1];
        }
        else if (value === 9) {
            temperaturaMin = formValues[0];
            temperaturaMax = formValues[1];
        }
        console.log(correnteMotorMin)
        console.log(correnteMotorMax)

        Swal.fire(JSON.stringify(formValues))
    }
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
                            {(this.state.data && this.state.data[0].cBarramento) <= correnteMotorMin || (this.state.data && this.state.data[0].cBarramento)>= correnteMotorMax ? <div className="display-motor-r"></div> : <div className="display-motor-g"></div> }                            
                            {/* <div className="display-motor-g"></div> */}
                            <p className="valores--itens">{(this.state.data && this.state.data[0].cBarramento) || "Carregando"} A</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            {(this.state.data && this.state.data[0].tModulos) <= tensaoModulosMin || (this.state.data && this.state.data[0].tModulos)>= tensaoModulosMax ? <div className="display-modulos-r"></div> : <div className="display-modulos-g"></div> }
                            {/* <div className="display-modulos"></div> */}
                            <p className="valores--itens">{(this.state.data && this.state.data[0].tModulos) || "Carregando"} V</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            {(this.state.data && this.state.data[0].cBaterias) <= correnteBateriasMin || (this.state.data && this.state.data[0].cBaterias)>= correnteBateriasMax ? <div className="display-corrente-baterias-r"></div> : <div className="display-corrente-baterias-g"></div> }
                            {/* <div className="display-corrente-baterias"></div> */}
                            <p className="valores--itens">{(this.state.data && this.state.data[0].cBaterias) || "Carregando"} A</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            {(this.state.data && this.state.data[0].tBaterias) <= tensaoBateriasMin || (this.state.data && this.state.data[0].tBaterias)>= tensaoBateriasMax ? <div className="display-tensao-baterias-r"></div> : <div className="display-tensao-baterias-g"></div> }
                            {/* <div className="display-tensao-baterias"></div> */}
                            <p className="valores--itens">{(this.state.data && this.state.data[0].tBaterias) || "Carregando"} V</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            {(this.state.data && this.state.data[0].cBateriasAux) <= correnteBateriasAuxMin || (this.state.data && this.state.data[0].cBateriasAux)>= correnteBateriasAuxMax ? <div className="display-corrente-bateriasAux-r"></div> : <div className="display-corrente-bateriasAux-g"></div>}
                            {/* <div className="display-corrente-bateriasAux"></div> */}
                            <p className="valores--itens">{(this.state.data && this.state.data[0].cBateriasAux) || "Carregando"} A</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            {(this.state.data && this.state.data[0].tBateriasAux) <= tensaoBateriasAuxMin || (this.state.data && this.state.data[0].tBateriasAux)>= tensaoBateriasAuxMax ? <div className="display-tensao-bateriasAux-r"></div> : <div className="display-tensao-bateriasAux-g"></div>}
                            {/* <div className="display-tensao-bateriasAux"></div> */}
                            <p className="valores--itens">{(this.state.data && this.state.data[0].tBateriasAux) || "Carregando"} V</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            {(this.state.data && this.state.data[0].pPotenciometro) <= posPotenciometroMin || (this.state.data && this.state.data[0].pPotenciometro)>= posPotenciometroMax ? <div className="display-potenciometro-r"></div> : <div className="display-potenciometro-g"></div>}
                            {/* <div className="display-potenciometro"></div> */}
                            <p className="valores--itens">{(this.state.data && this.state.data[0].pPotenciometro) || "Carregando"}</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            {(this.state.data && this.state.data[0].velocidade) <= velocidadeMin || (this.state.data && this.state.data[0].velocidade)>= velocidadeMax ? <div className="velocidade-r"></div> : <div className="velocidade-g"></div>}
                            {/* <div className="velocidade"></div> */}
                            <p className="valores--itens">{(this.state.data && this.state.data[0].velocidade) || "Carregando"} nós</p>
                        </div>

                        <div className="container-infos-instantaneas">
                            {(this.state.data && this.state.data[0].temperatura) <= temperaturaMin || (this.state.data && this.state.data[0].temperatura)>= temperaturaMax ? <div className="temperatura-r"></div> : <div className="temperatura-g"></div>}
                            {/* <div className="temperatura"></div> */}
                            <p className="valores--itens">{(this.state.data && this.state.data[0].temperatura) || "Carregando"} ºC</p>
                        </div>

                    </div>
                    <div className="nomes">
        
                        <p className="nomes--itens">Corrente Motor
                            <FiSettings onClick={() => config(1)} size={15} className="config-input" />
                        </p>
    
                        <p className="nomes--itens">Tensão Módulos
                            <FiSettings onClick={() => config(2)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Corrente Baterias
                            <FiSettings onClick={() => config(3)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Tensão Baterias
                            <FiSettings onClick={() => config(4)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Corrente Bateria Aux
                            <FiSettings onClick={() => config(5)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Tensão Bateria Aux
                            <FiSettings onClick={() => config(6)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Posição Potenciômetro
                            <FiSettings onClick={() => config(7)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Velocidade
                            <FiSettings onClick={() => config(8)} size={15} className="config-input" />
                        </p>
                        <p className="nomes--itens">Temperatura
                            <FiSettings onClick={() => config(9)} size={15} className="config-input" />
                        </p>
                    </div>
                </div>
                <div className="acionamentos">
                    <div className="acionamentos--superior">
                        <div className="on-off-display">
                            {(this.state.data && this.state.data[0].onOFF) !== 0 ? <div className="on-off-ON"></div> : <div className="on-off-OFF"></div>}
                            <p className="on-off-name">ON/OFF</p>
                        </div>
                        <div className="dms-display">
                            {(this.state.data && this.state.data[0].dms) !== 0 ? <div className="dms-ON"></div> : <div className="dms-OFF"></div>}
                            <p className="dms-name">DMS</p>
                        </div>
                        <div className="re-display">
                            {(this.state.data && this.state.data[0].re) !== 0 ? <div className="re-ON"></div> : <div className="re-OFF"></div>}
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