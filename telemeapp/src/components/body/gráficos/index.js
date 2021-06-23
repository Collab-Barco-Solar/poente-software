import React, { Component } from 'react'
import './style.css'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Label } from 'recharts'
import Select from 'react-select';


import { ContextoGeral } from "../../../contextos/contexto-geral";


//Configurações estéticas do gráfico
let fontAxis = 'Arial';
let fontLabel = 'Arial';
let fontSizeAxis = '1rem';
let fontSizeLabel = '1.2rem';


//Configurações do conteúdo do gráfico
var InfoNames = [
    {value: "cBarramento", label: "Corrente Motor" },
    {value: "tModulos", label: "Tensão Mod" },
    {value: "cBaterias", label: "Corrente Baterias"  },
    {value: "tBaterias", label: "Tensão Baterias" },
    {value: "cBateriasAux", label: "Corrente BatAux"},
    {value: "tBateriasAux", label: "Tensão BatAux" },
    {value: "pPotenciometro", label: "Posição Pot." },
    {value: "velocidade", label: "Velocidade" },
    {value: "temperatura", label: "Temperatura" }
];
var colors = ['white', 'yellow', 'black', 'blue', 'red'];



const stylesSelect = {
    option: (provided, state) => ({
        ...provided,
        fontWeight: state.isSelected ? "bold" : "normal",
        fontSize: state.selectProps.fontSize
    }),

    input: (provided, state) => ({
        ...provided,
        color: 'white',
        fontSize: state.selectProps.fontSize
    }),

    multiValue: (provided, state) => ({
        ...provided,
        color: 'grey',
        fontSize: state.selectProps.fontSize
    }),
};


class Graficos extends Component {
	constructor(){
        super();

        this.state = {
            dadosExibidos: ['cBarramento'],
        };
    } 

    //Pega o Array completo retirado do banco de dados e extrai a informação a ser exibida no gráfico
    organizarDadosParaGrafico = (linhaAtual) => {
        var dict = [];
        this.state.dadosExibidos.forEach(dado => { //Pega cada dado a ser exibido e organiza num dictionary no formato {nomeDoDado: valorDoDado_nessaLinha}
            dict[dado] = linhaAtual[dado];
            //// !!! Mudar o tempo para o tempo de fato
            dict['tempo'] = linhaAtual['id'];
        }); 
    
        return dict;
    }

    //Pega os valores selecionados no Select e coloca no state
    handleChangeSelect = (selectedOptions) => {
        this.setState({ dadosExibidos: selectedOptions.map(o => o.value) }); 
    }
    
    render() {
		return (
        <ContextoGeral.Consumer> 
        {contextoGeral => (
        <div className= "grafico">
            <ResponsiveContainer width="90%" height="16%">
                <Select 
                    options={InfoNames}
                    isMulti={true}
                    closeMenuOnSelect={false}
                    styles={stylesSelect}
                    onChange={this.handleChangeSelect}
                    defaultValue={{ label: "Corrente Motor", value: "cBarramento" }}
                    fontSize='15px'
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                        ...theme.colors,
                        neutral0: '#2c2a31', //Background do select
                        primary25: 'grey', //Background do item selecionado
                        },
                    })}  
                />
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart
                    data={contextoGeral.dadosRecebidos.map(this.organizarDadosParaGrafico)}
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
                        <Label value='Valor' stroke='white' offset={20} position="top"             style={{  fontSize: fontSizeLabel,
                                                                                                                fontFamily: fontLabel,
                                                                                                                fill: 'white', }} />
                    </YAxis>
                    <Legend/>
                        
                    {this.state.dadosExibidos.map((item, index) => {
                        //Passa por todos os dados a serem exibidos e cria uma linha no gráfico para ele, com a próxima cor do array colors
                        return (
                            <Line type='monotone' dataKey={this.state.dadosExibidos[index]} key={index} stroke={colors[index]} dot={false} isAnimationActive={false} />
                        ); })}
                </LineChart>
            </ResponsiveContainer>
            
        </div>   )} 
        </ContextoGeral.Consumer>
		);
	}
    

}

export default Graficos