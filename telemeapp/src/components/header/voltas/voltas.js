import React, { Component } from 'react'
import './style.css'
import '../../body/gerenciador/indexTempoVolta.js'

import { ContextoVoltas } from "../../../contextos/contexto-voltas";

class Voltas extends Component {


    render(){
        return ( 
            <div>
                <ContextoVoltas.Consumer> 
                    {voltas => ( 
                        <div className="voltas">{voltas.voltasAtuais}/{voltas.voltasTotais}</div> )} 
                </ContextoVoltas.Consumer>
            </div> 
        );
    }
}


export default Voltas;