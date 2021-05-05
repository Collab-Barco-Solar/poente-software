import React, { Component } from 'react'
import './style.css'
import '../../body/gerenciador'

import { ContextoGeral } from "../../../contextos/contexto-geral";

class Voltas extends Component {


    render(){
        return ( 
            <div>
                <ContextoGeral.Consumer> 
                    {voltas => ( 
                        <div className="voltas">{voltas.voltasAtuais}/{voltas.voltasTotais}</div> )} 
                </ContextoGeral.Consumer>
            </div> 
        );
    }
}


export default Voltas;