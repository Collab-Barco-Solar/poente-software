import React, { Component } from 'react'
import './style.css'

import { ContextoGeral } from "../../../contextos/contexto-geral";


class Tempo extends Component{
    
    render() {
        return (
            <div>
                <ContextoGeral.Consumer> 
                    {contextoGeral => (
                    <div className="tempo">{contextoGeral.timer.getTimeValues().hours ? ('00'+contextoGeral.timer.getTimeValues().hours).slice(-2) : "00"}:{
                                            contextoGeral.timer.getTimeValues().minutes ? ('00'+contextoGeral.timer.getTimeValues().minutes).slice(-2) : "00"}:{
                                            contextoGeral.timer.getTimeValues().seconds ? ('00'+contextoGeral.timer.getTimeValues().seconds).slice(-2) : "00"}</div> )}
                </ContextoGeral.Consumer> 
            </div>
        );
    };
}

export default Tempo