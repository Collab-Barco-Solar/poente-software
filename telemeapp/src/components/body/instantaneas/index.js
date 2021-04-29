import React, { Component } from 'react'
import './style.css'

import sendAsync from '../../../message-control/renderer';

let bombBB = 0;
let bombBE = 0;

class Instantaneas extends Component {
    constructor() {
        super();
        this.timer = null;
        this.state = {data: null};
    }

    fetchData(sql_message) {
        sendAsync(sql_message).then((result) => this.setState({data: result})); 
        if(this.state.data != null){
            //console.log(this.state.data[0].emergencia); //data é um vetor, com cada posição sendo uma linha
        } else {
            console.log("Não foram encontrados dados no banco de dados"); 
        }
    }

    componentDidMount() {  
        let sqlCommandMaxId = 'SELECT * FROM Dados WHERE id = (SELECT MAX(id) FROM dados);';    
        this.fetchData(sqlCommandMaxId);
        this.timer = setInterval(() => this.fetchData(sqlCommandMaxId), 2000); //5000 ms tempo entre leituras
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        return(
            <div className= "instantaneas">
                <div className="instantaneas--superior">

                    <div className="valores">
                        <p className="valores--itens">{( this.state.data && this.state.data[0].cBarramento ) || "Carregando"} A</p>
                        <p className="valores--itens">{( this.state.data && this.state.data[0].tModulos ) || "Carregando"} V</p>
                        <p className="valores--itens">{( this.state.data && this.state.data[0].cBaterias ) || "Carregando"} A</p>
                        <p className="valores--itens">{( this.state.data && this.state.data[0].tBaterias ) || "Carregando"} V</p>
                        <p className="valores--itens">{( this.state.data && this.state.data[0].cBateriasAux ) || "Carregando"} A</p>
                        <p className="valores--itens">{( this.state.data && this.state.data[0].tBateriasAux ) || "Carregando"} V</p>
                        <p className="valores--itens">{( this.state.data && this.state.data[0].pPotenciometro ) || "Carregando"}</p>
                        <p className="valores--itens">{( this.state.data && this.state.data[0].velocidade ) || "Carregando"} nós</p>
                        <p className="valores--itens">{( this.state.data && this.state.data[0].temperatura ) || "Carregando"} ºC</p>
                    </div>
                    <div className="nomes">
                        <p className="nomes--itens">Corrente Motor</p>
                        <p className="nomes--itens">Tensão Módulos</p>
                        <p className="nomes--itens">Corrente Baterias</p>
                        <p className="nomes--itens">Tensão Baterias</p>
                        <p className="nomes--itens">Corrente Bateria Aux</p>
                        <p className="nomes--itens">Tensão Bateria Aux</p>
                        <p className="nomes--itens">Posição Potenciômetro</p>
                        <p className="nomes--itens">Velocidade</p>
                        <p className="nomes--itens">Temperatura</p>
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