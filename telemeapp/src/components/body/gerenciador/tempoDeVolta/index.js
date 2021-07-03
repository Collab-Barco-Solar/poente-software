import React from 'react'
import './style.css'
import { ContextoGeral } from "../../../../contextos/contexto-geral";
import TempoVoltaDinamico from "./tempoVoltaDinamico"

class TempoDeVolta extends React.Component {

    IncrementaVolta(contextoGeral) {
        //Incrementa o número de voltas no contexto
        if (contextoGeral.voltasAtuais + 1 > contextoGeral.voltasTotais) {
            console.log("Número de voltas máximo atingido")
        } else {
            contextoGeral.alteraVoltasAtuais(contextoGeral.voltasAtuais + 1);
            if (contextoGeral.voltasAtuais + 1 < contextoGeral.voltasTotais) {
                contextoGeral.tempoDasVoltas.push({ seconds: 0, minutes: 0, hours: 0 });
            }
        }
    };


    // calculaTempoRestanteDeVolta(distanciaTotal, numeroDeVoltas, velocidade, tempoDaVoltaAtual) {

    //     tempoDaVoltaAtual = 0;

    //     let tempoEmSegundosVoltaAtual = tempoDaVoltaAtual.hours*3600 + tempoDaVoltaAtual.minutes*60 + tempoDaVoltaAtual.seconds
        

    //     let distanciaTotalDeUmaVolta = distanciaTotal / numeroDeVoltas
    //     let distanciaPercorrida = velocidade / tempoEmSegundosVoltaAtual //alterar para a posição real do mapa

    //     let distanciaRestanteDaVolta = distanciaTotalDeUmaVolta - distanciaPercorrida

    //     let tempoSegundos = (distanciaRestanteDaVolta/velocidade)
        
    //     let tempo = {
    //                     seconds: tempoSegundos%60,
    //                     minutes: Math.floor(tempoSegundos/60) - Math.floor(tempoSegundos/3600),
    //                     hours: Math.floor(tempoSegundos/3600)              
    //                 }
        

    //     return tempo.seconds
    // }


    render() {
        return (
            <ContextoGeral.Consumer>
                {contextoGeral => (
                    <div className="tempoDeVolta">
                        <div className="title--tempoDeVolta">
                            <p id="tempoDeVolta--name">Tempos de volta</p>
                            <button onClick={() => this.IncrementaVolta(contextoGeral)}
                                id="botao--tempoDeVolta"
                                disabled={!contextoGeral.timer.isRunning() || (contextoGeral.voltasAtuais >= contextoGeral.voltasTotais)}>
                                +1 VOLTA
                            </button>
                            <p id="estimativa--name">Estimativas</p>
                        </div>

                        <div className="infos">

                            <div className="placeHolderTime">
                                <div id="infos--A">
                                    {(contextoGeral.tempoDasVoltas.length >= 1) &&
                                        contextoGeral.tempoDasVoltas.map((item, index) => {
                                            if (index < 5) {
                                                return (
                                                    <TempoVoltaDinamico key={index} id={index} tempo={item} />
                                                );
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </div>
                                <div id="infos--B">
                                    {(contextoGeral.tempoDasVoltas.length >= 1) &&
                                        contextoGeral.tempoDasVoltas.map((item, index) => {
                                            if (index >= 5) {
                                                return (
                                                    <TempoVoltaDinamico key={index} id={index} tempo={item} />
                                                );
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </div>
                            </div>


                            <div id="infos--C">
                                {/* precisamos da distancia de uma volta */}
                                <p className="infos--C-P">Tempo Restante de Volta</p>
                                <p className="infos--C-P">Tempo Restante de Corrida</p>
                                <p className="infos--C-P">Velocidade Média</p>
                            </div>
                            <div id="infos--D">
                                <p className="infos--D-P">
                                    {/* {this.calculaTempoRestanteDeVolta(
                                    contextoGeral.distanciaTotal,
                                    contextoGeral.voltasTotais,
                                    contextoGeral.mediasAtuais.velocidade,
                                    contextoGeral.tempoDasVoltas?.[contextoGeral.tempoDasVoltas.length-1]
                                    )} */}aaaa
                                </p>
                                <p className="infos--D-P">02:47:18</p>
                                <p className="infos--D-P">4,6 nós</p>
                            </div>
                        </div>
                    </div>
                )}
            </ContextoGeral.Consumer>
        )
    }
}
//distanciaTotal,numeroDeVoltas,velocidade,tempoDaVoltaAtual


export default TempoDeVolta