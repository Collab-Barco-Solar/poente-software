import React, { Component } from 'react'
import './style.css'
import Mapa from './mapa/index'
import TempoDeVolta from './tempoDeVolta/index'
import { ContextoGeral } from "../../../contextos/contexto-geral";


class Botao extends Component{

    render(){
        return <button className="botao" onClick={this.props.onClick}>{this.props.label}</button>
    }
}

class Input extends Component{
    render(){
        return <input onChange={this.props.onChange} 
        type="number" 
        name={this.props.name} 
        id={this.props.id} 
        placeholder={this.props.name} />
    }
}

class Gerenciador extends Component{

    constructor(props){
        super(props);

        this.state = {
            entradaVoltas: 0,
            entradaDistancia: 0,
        };
    }

    atualizaNumeroDeVoltas = (event) => {
        this.setState({entradaVoltas: parseInt(event.target.value, 10)});
    };

    atualizaDistancia = (event) => {
        this.setState({entradaDistancia: parseFloat(event.target.value)});
    };

    render(){
        return(
            <ContextoGeral.Consumer>
                { contextoGeral => (
                    <div className="gerenciador">
                        <div className="bandeiras-largada">
                            <button className="tempo-largada">10min</button>
                            <button className="tempo-largada">5min</button>
                            <button className="tempo-largada">3min</button>
                        </div>
                        <div className= "inputs">
                            <div className="entradas--A">
                                {/* {console.log(contextoGeral.timerBarcoParado.getTimeValues().seconds)} */}
                            {/* {console.log(contextoGeral.timerBarcoParado.getTimeValues().seconds ? ('00'+contextoGeral.timerBarcoParado.getTimeValues().seconds).slice(-2) : "00")} */}
                                <Input onChange={this.atualizaDistancia} value={this.state.entradaDistancia} name="Distancia Total" id="distanciaTotal" placeholder="Distância total"/>  
                                <Botao onClick={() => contextoGeral.Iniciar(this.state.entradaVoltas,this.state.entradaDistancia)} label = "INICIAR"/>
                                <Botao onClick={() => contextoGeral.pausarTimer()}  label = {contextoGeral.timer.isRunning() ? "PAUSAR" : "RETOMAR"}/>
                                <Botao onClick={() => contextoGeral.barcoParado()} label = {contextoGeral.timerBarcoParado.isRunning() ? "MOVENDO" : "PARADO"}/>
                            </div>

                            <div className="entradas--B">
                                <Input onChange={this.atualizaNumeroDeVoltas} value={this.state.entradaVoltas} name="Numero Voltas" id="Número de voltas" placeholder="Número de voltas"/>  
                            </div>
                        </div>
                    
                        <TempoDeVolta/>
                        <Mapa/>
                    </div>
                )}       
            </ContextoGeral.Consumer>             
        )
    }

};

export default Gerenciador;