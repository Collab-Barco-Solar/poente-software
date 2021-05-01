import React, { Component } from 'react'
import './style.css'
import Mapa from './mapa/index'
import TempoDeVolta from './tempoDeVolta/index'
import { ContextoVoltas } from "../../../contextos/contexto-voltas";


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
            <ContextoVoltas.Consumer>
                { voltas => (
                    <div className="gerenciador">
                        <div className="bandeiras-largada">
                            <button className="tempo-largada">10min</button>
                            <button className="tempo-largada">5min</button>
                            <button className="tempo-largada">3min</button>
                        </div>
                        <div className= "inputs">
                            <div className="entradas--A">
                                <Input onChange={this.atualizaDistancia} value={this.state.entradaDistancia} name="Distancia Total" id="distanciaTotal" placeholder="Distância total"/>  
                                <Botao onClick={() => voltas.Iniciar(this.state.entradaVoltas)} label = "INICIAR"/>
                                <Botao onClick={() => {
                                    voltas.alteraVoltasTotais(0); 
                                    voltas.alteraVoltasAtuais(0); 
                                    }}  label = "RESETAR"/>
                                <Botao label = "PAUSAR"/>
                            </div>

                            <div className="entradas--B">
                                <Input onChange={this.atualizaNumeroDeVoltas} value={this.state.entradaVoltas} name="Numero Voltas" id="Número de voltas" placeholder="Número de voltas"/>  
                            </div>
                        </div>
                    
                        <TempoDeVolta/>
                        <Mapa/>
                    </div>
                )}       
            </ContextoVoltas.Consumer>             
        )
    }

};

export default Gerenciador;