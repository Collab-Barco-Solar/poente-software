import React from 'react'
import './style.css'


class TempoVoltaDinamico extends React.Component{
    

    render(){
        return(
            <div className= "info-tempo">
                <p className = "info-tempo-key">{this.props.id + 1}-</p>
                <p className= "info-tempo-valor">{this.props.tempo.hours ? ('00'+this.props.tempo.hours).slice(-2) : "00"}:{
                                            this.props.tempo.minutes ? ('00'+this.props.tempo.minutes).slice(-2) : "00"}:{
                                            this.props.tempo.seconds ? ('00'+this.props.tempo.seconds).slice(-2) : "00"}</p>
            </div>
        );
    }
}

export default TempoVoltaDinamico