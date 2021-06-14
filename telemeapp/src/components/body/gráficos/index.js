import React, { Component } from 'react'
import './style.css'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Label } from 'recharts'

import { ContextoGeral } from "../../../contextos/contexto-geral";

//Configurações estéticas do gráfico
let fontAxis = 'Arial';
let fontLabel = 'Arial';
let fontSizeAxis = '1rem';
let fontSizeLabel = '1.2rem';


//Configurações do conteúdo do gráfico
let dadoExibido = 'tModulos';
var dictionaryInfoNames = {
    "Corrente Motor": "cBarramento",
    "Tensão Mod": "tModulos",
    "Corrente Baterias": "cBaterias" ,
    "Tensão Baterias": "tBaterias",
    "Corrente BatAux": "cBateriasAux",
    "Tensão BatAux": "tBateriasAux",
    "Posição Pot.": "pPotenciometro",
    "Velocidade": "velocidade",
    "Temperatura": "temperatura"
  };


//Pega o Array completo retirado do banco de dados e extrai a informação a ser exibida no gráfico
function organizarDadosParaGrafico(linhaAtual){
    return {tempo: linhaAtual.id , valor: linhaAtual[dadoExibido] };
}

class Graficos extends Component {
	render() {
        dadoExibido = dictionaryInfoNames[this.props.info_name];

		return (
        <ContextoGeral.Consumer> 
        {contextoGeral => (
        <div className= "grafico">
            <h3>{this.props.info_name} x Tempo</h3>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart
                    data={contextoGeral.dadosRecebidos.map(organizarDadosParaGrafico)}
                    margin={{ top: 35, right: 30, left: 10, bottom: 30 }}
                    >
                    <CartesianGrid  verticalFill={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)']} horizontalFill={['#ccc', '#fff']} />
                    <Tooltip contentStyle={{backgroundColor:'rgba(0, 0, 0, 0.6)'}}/>
                    <XAxis dataKey="tempo" stroke='white' minTickGap={50} interval="preserveStartEnd" style={{  fontSize: fontSizeAxis,
                                                                                                                fontFamily: fontAxis, }}>
                        <Label value="Tempo" stroke='white' offset={-20} position="insideBottomRight" style={{  fontSize: fontSizeLabel,
                                                                                                                fontFamily: fontLabel,
                                                                                                                fill: 'white', }}/>
                    </XAxis>
                    <YAxis stroke='white'                                                             style={{  fontSize: fontSizeAxis,
                                                                                                                fontFamily: fontAxis, }}>
                        <Label value="Valor" stroke='white' offset={20} position="top"             style={{  fontSize: fontSizeLabel,
                                                                                                                fontFamily: fontLabel,
                                                                                                                fill: 'white', }} />
                    </YAxis>
                    <Legend/>
                    <Line type='monotone' dataKey='valor' stroke='white' dot={false} isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
            
        </div>   )} 
        </ContextoGeral.Consumer>
		);
	}
    

}

export default Graficos