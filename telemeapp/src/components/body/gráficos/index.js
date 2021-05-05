import React, { Component } from 'react'
import './style.css'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Label } from 'recharts'

let fontAxis = 'Arial';
let fontLabel = 'Arial';
let fontSizeAxis = '1rem';
let fontSizeLabel = '1.2rem';

let intervalID;

class Graficos extends Component {
    constructor() {
		super();
		this.generateDataPoints = this.generateDataPoints.bind(this);
        this.state = {
            data: []
        }
	}
	
	generateDataPoints(noOfDps) {
		var xVal = noOfDps, yVal = 100;
		var dps = [];
		for(var i = 0; i < noOfDps; i++) {
			yVal = yVal +  Math.round(5 + Math.random() *(-6-6));
			dps.push({tempo: xVal, Corrente: yVal});	
			xVal--;
		}
		return dps;
	}
	
    componentDidMount(){
        this.setState({data: this.generateDataPoints(500)});
        intervalID = setInterval(() => { 
            var novoData = this.state.data;
            novoData.shift();
            novoData.push({tempo: 0, Corrente: this.state.data[this.state.data.length-1].Corrente + 5 + Math.random()*(-10)});

            novoData.forEach((value, index) => {
                value.tempo = index;
            })
            this.setState({data: novoData});

            //Vai aumentando o número de pontos exibidos
            //this.setState({data: [...this.state.data,  {tempo: this.state.data[this.state.data.length-1].tempo+1 , Corrente: Math.random()*100}]});
            //console.log(this.state.data); 
        }, 500);
    }

    componentWillUnmount(){
        clearInterval(intervalID);
    }

	render() {

		return (
        
        <div className= "grafico">
            <ResponsiveContainer width="100%" height="80%">
                <LineChart
                    data={this.state.data}
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
                        <Label value="Corrente" stroke='white' offset={20} position="top"             style={{  fontSize: fontSizeLabel,
                                                                                                                fontFamily: fontLabel,
                                                                                                                fill: 'white', }} />
                    </YAxis>
                    <Legend/>
                    <Line type='monotone' dataKey='Corrente' stroke='white' dot={false} />
                </LineChart>
            </ResponsiveContainer>
            
        </div>    
        
		);
	}
    

}

export default Graficos