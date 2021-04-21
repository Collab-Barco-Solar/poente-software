import React, { Component } from 'react'
import './style.css'

import { ContextoVoltas } from "../../../contextos/contexto-voltas";


class Tempo extends Component{
    
    render() {
        return (
            <div>
                <ContextoVoltas.Consumer> 
                    {voltas => (
                    <div className="tempo">{voltas.timer.getTimeValues().hours ? ('00'+voltas.timer.getTimeValues().hours).slice(-2) : "00"}:{
                                            voltas.timer.getTimeValues().minutes ? ('00'+voltas.timer.getTimeValues().minutes).slice(-2) : "00"}:{
                                            voltas.timer.getTimeValues().seconds ? ('00'+voltas.timer.getTimeValues().seconds).slice(-2) : "00"}</div> )}
                </ContextoVoltas.Consumer> 
            </div>
        );
    };
}

export default Tempo