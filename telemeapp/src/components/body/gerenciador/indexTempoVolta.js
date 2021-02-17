import React, { Component } from 'react'
import './style.css'
//import '../../components/header/voltas/style.css'

import Mapa from './mapa/index'
import TempoDeVolta from './tempoDeVolta/index'


class Botao extends Component{

    render(){
        return <button className="botao">{this.props.label}</button>
    }
}

class Input extends Component{
    render(){
        return <input value={this.props.value} 
        onChange={this.props.onChange} 
        type="number" 
        name={this.props.name} 
        id={this.props.id} 
        placeholder={this.props.name} />
    }
}
/*
let voltaAtual='0';

class Voltas extends React.Component {
    state = {
        title : '0/0',
    }

    render(){
        return(
            <div className="voltas">{this.props.title}</div>
        );
    }
}*/

class Gerenciador extends Component{

    constructor(props){
        super(props);

        this.state = {
            entradaV: '0',
        };
    }

    atualizaNumeroDeVOltas = (event) => {
        this.setState({entradaV: event.target.value});
        console.log(event.target.value);
        //voltaAtualizada = voltaAtual + '/' + this.entradaV;
    };

    render(){
    return(
        <div className="gerenciador">
            <div className= "inputs">
                <div className="entradas--A">
                    <Input value={this.state.entradaV} onChange={this.atualizaNumeroDeVOltas} name="distanciaTotal" id="distanciaTotal" placeholder="Distância total"/>  
                    <Botao  label = "INICIAR"/>
                    <Botao  label = "RESETAR"/>
                </div>

                <div className="entradas--B">
                    <input type="text" name="numeroVoltas"placeholder="Número de voltas"/>
                </div>
            </div>
            <TempoDeVolta/>
            <Mapa/>
        </div>
        )
    }

};

export default Gerenciador;