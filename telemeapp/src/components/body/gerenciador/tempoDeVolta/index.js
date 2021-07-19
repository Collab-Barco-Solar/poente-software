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

    calculaTempoRestanteCorrida(distanciaTotal,numeroDeVoltasCorridas,velocidade,numVoltas){

        velocidade = velocidade*0.51
        let distanciaDeUmaVolta = distanciaTotal/numVoltas
        let distanciaPercorrida = distanciaDeUmaVolta*numeroDeVoltasCorridas
        let distanciaRestante = distanciaTotal - distanciaPercorrida

        let estimativa = distanciaRestante/velocidade


        let tempo = {
            seconds: Math.floor(estimativa%60),
            minutes: Math.floor(estimativa/60),
            hours: Math.floor(estimativa/3600)
        }

        return <p>{tempo.hours ? ('00' + tempo.hours).slice(-2): "00"}:
                    {tempo.minutes ? ('00' + tempo.minutes).slice(-2): "00"}:
                    {tempo.seconds ? ('00' + tempo.seconds).slice(-2): "00"}
                </p>
    }


    calculaTempoRestanteDeVolta(tempoDaVoltaAtual, numeroDeVoltasCorridas, tempoTotal,velocidade,distanciaTotal,numVoltas) {

       
        

        let tempoTotalEmSeg = tempoTotal.getTimeValues().hours *3600 + tempoTotal.getTimeValues().minutes *60 + tempoTotal.getTimeValues().seconds


        let tempoDaVoltaAtualEmSeg = tempoDaVoltaAtual?.hours*3600 + tempoDaVoltaAtual?.minutes*60 + tempoDaVoltaAtual?.seconds


        if(numeroDeVoltasCorridas === 0 || numeroDeVoltasCorridas === 1){
            

            let distanciaVolta = distanciaTotal/numVoltas
            velocidade = velocidade * 0.51 // convertendo nós em metros


            let distanciaPercorrida = velocidade*tempoDaVoltaAtualEmSeg


            let distanciaRestante = distanciaVolta-distanciaPercorrida

            let estimativa = distanciaRestante/velocidade


            let tempo = {
                seconds: Math.floor(estimativa%60),
                minutes: Math.floor(estimativa/60),
                hours: Math.floor(estimativa/3600)
            }

            return <p>{tempo.hours ? ('00' + tempo.hours).slice(-2): "00"}:
                        {tempo.minutes ? ('00' + tempo.minutes).slice(-2): "00"}:
                        {tempo.seconds ? ('00' + tempo.seconds).slice(-2): "00"}
                    </p>
  
          }
        

        let mediaTempoPorVolta = tempoTotalEmSeg/numeroDeVoltasCorridas


        let estimativa = mediaTempoPorVolta - tempoDaVoltaAtualEmSeg

    
       

        let tempo = {
            seconds: Math.floor(estimativa%60),
            minutes: Math.floor(estimativa/60),
            hours: Math.floor(estimativa/3600)
        }


        return <p>{tempo.hours ? ('00' + tempo.hours).slice(-2): "00"}:
                {tempo.minutes ? ('00' + tempo.minutes).slice(-2): "00"}:
                {tempo.seconds ? ('00' + tempo.seconds).slice(-2): "00"}
            </p>

    }



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
                                <div className="infos--D-P">
                                    {contextoGeral.iniciado ? this.calculaTempoRestanteDeVolta(
                                        contextoGeral.tempoDasVoltas?.[contextoGeral.tempoDasVoltas.length-1],
                                        contextoGeral.voltasAtuais,
                                        contextoGeral.timer,
                                        contextoGeral.mediasAtuais.velocidade,
                                        contextoGeral.distanciaTotal,
                                        contextoGeral.voltasTotais                             
                                    ) : "?"}
                                </div>
                                <div className="infos--D-P">{contextoGeral.iniciado ? this.calculaTempoRestanteCorrida(
                                    contextoGeral.distanciaTotal,contextoGeral.voltasAtuais,contextoGeral.mediasAtuais.velocidade,
                                    contextoGeral.voltasTotais
                                ) : "?"}</div>
                                <p className="infos--D-P">{contextoGeral.iniciado ? (contextoGeral.mediasAtuais.velocidade.toFixed(2))+` nós`: "?"} </p>
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