import React from 'react'
import './style.css'

import Mapa from './mapa/index'
import TempoDeVolta from './tempoDeVolta/index'

const Gerenciador = ()=>(


    <div className="gerenciador">
        <div className= "inputs">
            <div className="entradas--A">
                <input type="text" placeholder="Distância total"/>   
                <button className="botao">INICIAR</button>
                <button className="botao">RESETAR</button>        
            </div>

            <div className="entradas--B">
                <input type="text" placeholder="Número de voltas totais"/>
            </div>
        </div>
        <TempoDeVolta/>
        <Mapa/>
    </div>


);

export default Gerenciador