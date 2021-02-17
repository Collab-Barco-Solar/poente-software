import React, { Component } from 'react'
import { render } from 'react-dom'
import './style.css'
import '../../body/gerenciador/indexTempoVolta.js'



let voltaAtual='0';

//const Voltas = () => (

class Voltas extends Component(){
    /*state = {
        title : '0/0',
    }*/

    //this.setState({Gerenciador.props.})
    //<div className="voltas">{this.props.title}</div>
    //<Gerenciador 
                //render={entradaVoltas => <Input ={entradaV}/>}/>

        /*return(
            <div className="voltas">{this.props.title}</div> 
        );*/

};

let AtualizaTela = 0;
const voltaTotais;
let distanciaPercorrida;
/*pensar se vamos sinalizar a volta ou calcularemos manualmente */
function voltaAtual(distanciaTotal){
    return(
        (distanciaTotal/voltasTotais* distanciaPercorrida)
    );
}

/*function atualizaVoltas = (event) => {
    this.setState({entradaV: event.target.value});
    AtualizaTela = voltaAtual + '/' + this.entradaV;
}*/

export default Voltas;