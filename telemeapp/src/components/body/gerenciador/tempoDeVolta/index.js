import React  from 'react'
import './style.css'
import { ContextoVoltas  } from "../../../../contextos/contexto-voltas";
import TempoVoltaDinamico from "./tempoVoltaDinamico"

class TempoDeVolta extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          temposVoltaDinamico: []
        };
      }
    
    IncrementaVolta(voltas) {
        //Incrementa o número de voltas no contexto
        if(voltas.voltasAtuais + 1 > voltas.voltasTotais){
            console.log("Número de voltas máximo atingido")
        } else {
            voltas.alteraVoltasAtuais(voltas.voltasAtuais + 1);
        } 

        //Salva o tempo da última volta 
        //Cria novo array
        let novoTempoDasVoltas = voltas.tempoDasVoltas;
        let tempoTotalAteUltimaVolta=0;
        // participando nao ativamente - passei por aqui. att agricio
        if(novoTempoDasVoltas.length > 0){
            novoTempoDasVoltas.forEach(tempoVolta => {
                tempoTotalAteUltimaVolta += tempoVolta.seconds + tempoVolta.minutes*60 + tempoVolta.hours*3600;
            });
        }
        console.log("Tempo total até a penúltima volta: " + tempoTotalAteUltimaVolta);
        
        //Acha o tempo da última volta
        let tempoUltimaVolta = voltas.timer.seconds + voltas.timer.minutes*60 + voltas.timer.hours*3600
                                - tempoTotalAteUltimaVolta;
        console.log("Tempo ultima volta: " + tempoUltimaVolta);
        novoTempoDasVoltas.push({seconds: tempoUltimaVolta%60, minutes: Math.floor(tempoUltimaVolta/60) - Math.floor(tempoUltimaVolta/3600), hours: Math.floor(tempoUltimaVolta/3600)});

        
        
        
        //Cria mais um componente tempoVoltaDinamico
        this.setState(state => ({
            temposVoltaDinamico: [...this.state.temposVoltaDinamico, this.state.temposVoltaDinamico.length + 1],
        })); 
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
                                disabled={voltas.timer.isRunning ? true : false}>
                                    Mais uma volta
                            </button>
                            <p id="estimativa--name">Estimativas</p>
                        </div>

                        <div className="infos">

                            <div className="placeHolderTime">
                                <div id="infos--A">
                                    {(this.state.temposVoltaDinamico.length >= 1) &&
                                        this.state.temposVoltaDinamico.map((item, index) => {
                                            if(index < 5){
                                                return (
                                                    <TempoVoltaDinamico key={index} id={index} tempo={voltas.tempoDasVoltas[index]}/>
                                                );
                                            } else {
                                                return null
                                            }
                                    })}
                                </div>
                                <div id = "infos--B">
                                    {this.state.temposVoltaDinamico.length >= 5 &&
                                        this.state.temposVoltaDinamico.map((item, index) => {
                                            if(index >= 5){
                                                return (
                                                    <TempoVoltaDinamico key={index} id={index} tempo={voltas.tempoDasVoltas[index]}/>
                                                );
                                            } else {
                                                return null
                                            }
                                    })}
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