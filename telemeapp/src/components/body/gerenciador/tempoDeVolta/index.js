import React  from 'react'
import './style.css'
import { ContextoGeral  } from "../../../../contextos/contexto-geral";
import TempoVoltaDinamico from "./tempoVoltaDinamico"

class TempoDeVolta extends React.Component {
    
    IncrementaVolta(contextoGeral) {
        //Incrementa o número de voltas no contexto
        if(contextoGeral.voltasAtuais + 1 > contextoGeral.voltasTotais){
            console.log("Número de voltas máximo atingido")
        } else {
            contextoGeral.alteraVoltasAtuais(contextoGeral.voltasAtuais + 1);
            if(contextoGeral.voltasAtuais + 1 < contextoGeral.voltasTotais){
                contextoGeral.tempoDasVoltas.push({seconds: 0, minutes: 0, hours: 0});
            }
        }         
    };

    render(){
        return(
            <ContextoGeral.Consumer>
                { contextoGeral => (
                    <div className="tempoDeVolta">
                        <div className="title--tempoDeVolta">
                            <p id="tempoDeVolta--name">Tempos de volta</p>
                            <button onClick={() => this.IncrementaVolta(contextoGeral)} 
                                id="botao--tempoDeVolta" 
                                disabled={!contextoGeral.timer.isRunning() || (contextoGeral.voltasAtuais>=contextoGeral.voltasTotais)}>
                                    +1 VOLTA
                            </button>
                            <p id="estimativa--name">Estimativas</p>
                        </div>

                        <div className="infos">

                            <div className="placeHolderTime">
                                <div id="infos--A">
                                    {(contextoGeral.tempoDasVoltas.length >= 1) && 
                                        contextoGeral.tempoDasVoltas.map((item, index) => {
                                            if(index < 5){
                                                return (
                                                    <TempoVoltaDinamico key={index} id={index} tempo={item}/>
                                                );
                                            } else {
                                                return null
                                            }
                                        })                                       
                                    }
                                </div>
                                <div id = "infos--B">
                                    {(contextoGeral.tempoDasVoltas.length >= 1) && 
                                        contextoGeral.tempoDasVoltas.map((item, index) => {
                                            if(index >= 5){
                                                return (
                                                    <TempoVoltaDinamico key={index} id={index} tempo={item}/>
                                                );
                                            } else {
                                                return null
                                            }
                                        }) 
                                    }
                                </div>
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
            </ContextoGeral.Consumer>             
        )
    }
}



export default TempoDeVolta