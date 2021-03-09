import React, { Component } from 'react'
import './style.css'

import { ContextoVoltas } from "../../../contextos/contexto-voltas";


class Tempo extends Component{
    
    render() {
        return (
            <div>
                <ContextoVoltas.Consumer> 
                    {voltas => (
                    <div className="tempo">{voltas.timer.hours ? ('00'+voltas.timer.hours).slice(-2) : "00"}:{
                                            voltas.timer.minutes ? ('00'+voltas.timer.minutes).slice(-2) : "00"}:{
                                            voltas.timer.seconds ? ('00'+voltas.timer.seconds).slice(-2) : "00"}</div> )}
                </ContextoVoltas.Consumer> 
            </div>
        );
    };
}

export default Tempo