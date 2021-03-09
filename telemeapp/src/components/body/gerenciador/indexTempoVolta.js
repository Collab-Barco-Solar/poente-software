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
            entradaV: 0,
            entradaD: 0,
        };
    }

    atualizaNumeroDeVoltas = (event) => {
        this.setState({entradaV: parseInt(event.target.value, 10)});
    };

    atualizaDistancia = (event) => {
        this.setState({entradaD: parseFloat(event.target.value)});
    };

    render(){
        return(
            <ContextoVoltas.Consumer>
                { voltas => (
                    <div className="gerenciador">
                        <div className= "inputs">
                            <div className="entradas--A">
                                <Input onChange={this.atualizaDistancia} value={this.state.entradaD} name="Distancia Total" id="distanciaTotal" placeholder="Distância total"/>  
                                <Botao onClick={() => voltas.Iniciar(this.state.entradaV)} label = "INICIAR"/>
                                <Botao onClick={() => {
                                    voltas.alteraVoltasTotais(0); 
                                    voltas.alteraVoltasAtuais(0); 
                                    }}  label = "RESETAR"/>
                            </div>

                            <div className="entradas--B">
                                <Input onChange={this.atualizaNumeroDeVoltas} value={this.state.entradaV} name="Numero Voltas" id="Número de voltas" placeholder="Número de voltas"/>  
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