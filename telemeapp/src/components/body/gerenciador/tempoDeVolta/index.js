import React  from 'react'
import './style.css'
import { ContextoVoltas  } from "../../../../contextos/contexto-voltas";
import TempoVoltaDinamico from "./tempoVoltaDinamico"

class TempoDeVolta extends React.Component {
    
    IncrementaVolta(voltas) {
        //Incrementa o número de voltas no contexto
        if(voltas.voltasAtuais + 1 > voltas.voltasTotais){
            console.log("Número de voltas máximo atingido")
        } else {
            voltas.alteraVoltasAtuais(voltas.voltasAtuais + 1);
            if(voltas.voltasAtuais + 1 < voltas.voltasTotais){
                voltas.tempoDasVoltas.push({seconds: 0, minutes: 0, hours: 0});
            }
        }         
    };

    render(){
        return(
            <ContextoVoltas.Consumer>
                { voltas => (
                    <div className="tempoDeVolta">
                        <div className="title--tempoDeVolta">
                            <p id="tempoDeVolta--name">Tempos de volta</p>
                            <button onClick={() => this.IncrementaVolta(voltas)} 
                                id="botao--tempoDeVolta" 
                                disabled={!voltas.timer.isRunning() || (voltas.voltasAtuais>=voltas.voltasTotais)}>
                                    Mais uma volta
                            </button>
                            <p id="estimativa--name">Estimativas</p>
                        </div>

                        <div className="infos">

                            <div className="placeHolderTime">
                                <div id="infos--A">
                                    {(voltas.tempoDasVoltas.length >= 1) && 
                                        voltas.tempoDasVoltas.map((item, index) => {
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
                                    {(voltas.tempoDasVoltas.length >= 1) && 
                                        voltas.tempoDasVoltas.map((item, index) => {
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
            </ContextoVoltas.Consumer>             
        )
    }
}



export default TempoDeVolta