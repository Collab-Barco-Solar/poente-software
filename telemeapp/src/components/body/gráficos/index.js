import React, { Component } from 'react'
import './style.css'
import { Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Label } from 'recharts'



class Graficos extends Component {
    constructor() {
		super();
		this.generateDataPoints = this.generateDataPoints.bind(this);
	}
	
	generateDataPoints(noOfDps) {
		var xVal = 1, yVal = 100;
		var dps = [];
		for(var i = 0; i < noOfDps; i++) {
			yVal = yVal +  Math.round(5 + Math.random() *(-6-6));
			dps.push({tempo: xVal, Corrente: yVal});	
			xVal++;
		}
		return dps;
	}
	
	render() {
        var data = this.generateDataPoints(50);

		return (
        
        <div className= "grafico">
            <ResponsiveContainer width="100%" height="80%">
                <LineChart
                    data={data}
                    margin={{ top: 35, right: 30, left: 10, bottom: 30 }}
                    >
                    <CartesianGrid  verticalFill={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.6)']} horizontalFill={['#ccc', '#fff']} />
                    <Tooltip contentStyle={{backgroundColor:'rgba(0, 0, 0, 0.6)'}}/>
                    <XAxis dataKey="tempo" stroke='white'>
                        <Label value="Tempo" stroke='white' offset={-20} position="insideBottomRight" />
                    </XAxis>
                    <YAxis stroke='white'>
                        <Label value="Corrente" stroke='white' offset={20} position="top" />
                    </YAxis>
                    <Legend/>
                    <Line type='monotone' dataKey='Corrente' stroke='white' />
                </LineChart>
            </ResponsiveContainer>
            
        </div>    
        
		);
	}
    

}

export default Graficos