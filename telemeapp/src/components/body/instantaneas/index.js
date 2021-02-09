import React, { Component } from 'react'
import './style.css'

import sendAsync from '../../../message-control/renderer';

class Instantaneas extends Component {
    constructor() {
        super();
        this.timer = null;
        this.state = {data: null};
    }

    fetchData(sql_message) {
        sendAsync(sql_message).then((result) => console.log("Resultado" + result));  //this.setState({data: result})
        if(this.state.data != null){
            console.log(this.state.data[0].emergencia); //data é um vetor, com cada posição sendo uma linha
        } else {
            console.log("Não foram encontrados dados no banco de dados"); 
        }
    }

    componentDidMount() {  
        //let sqlCommandMaxId = 'SELECT * FROM Dados WHERE ID = (SELECT MAX(ID) FROM Dados);';    
        this.fetchData('SELECT * FROM Dados WHERE ID = (SELECT MAX(ID) FROM Dados);');
        this.timer = setInterval(() => this.fetchData('SELECT * FROM Dados WHERE ID = (SELECT MAX(ID) FROM Dados);'), 2000); //5000 ms tempo entre leituras
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        return(
            <div className= "instantaneas">
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
                <div className="valores">
                    <p className="valores--itens">30,01 A</p>
                    <p className="valores--itens">140,01 V</p>
                    <p className="valores--itens">32,45 A</p>
                    <p className="valores--itens">48,10 V</p>
                    <p className="valores--itens">0,00 A</p>
                    <p className="valores--itens">30,01 V</p>
                    <p className="valores--itens">3</p>
                    <p className="valores--itens">5 nós</p>
                    <p className="valores--itens">56 ºC</p>
                </div>
            </div>
        );
    }
}

export default Instantaneas