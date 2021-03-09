import React, { Component } from 'react'
import './style.css'
import { ContextoVoltas  } from "../../../../contextos/contexto-voltas";

class TempoDeVolta extends Component {
    IncrementaVolta(voltas) {
        if(voltas.voltasAtuais + 1 > voltas.voltasTotais){
            console.log("Número de voltas máximo atingido")
        } else {
            voltas.alteraVoltasAtuais(voltas.voltasAtuais + 1);
        }        
    };



   render(){
        return(
            <ContextoVoltas.Consumer>
                { voltas => (
                    <div className="tempoDeVolta">
                        <div className="title--tempoDeVolta">
                            <p id="tempoDeVolta--name">Tempos de volta</p>
                            <button onClick={() => this.IncrementaVolta(voltas)} id="botao--tempoDeVolta">Mais uma volta</button>
                            <p id="estimativa--name">Estimativas</p>
                        </div>

                        <div className="infos">
                            <div id="infos--A">
                                <p className="infos--A-P">1- 00:26:12</p>
                                <p className="infos--A-P">2- 00:34:52</p>
                                <p className="infos--A-P">3- 00:20:23</p>
                            </div>
                            <div id = "infos--B">
                                <p className="infos--B-P">4- 00:26:12</p>
                                <p className="infos--B-P">5- 00:34:52</p>
                                <p className="infos--B-P">6- 00:20:23</p>
                            </div>
                            <div id = "infos--C">
                                <p className = "infos--C-P">Tempo Restante de Volta</p>
                                <p className = "infos--C-P">Tempo Restante de Corrida</p>
                                <p className = "infos--C-P">Velocidade Média</p>
                            </div>
                            <div id = "infos--D">
                                <p className = "infos--D-P">00:11:45</p>
                                <p className = "infos--D-P">02:47:18</p>
                                <p className = "infos--D-P">4,6 nós</p>
                            </div>
                        </div>
                    </div>
                )}       
            </ContextoVoltas.Consumer>             
        )
    }
}



export default TempoDeVolta