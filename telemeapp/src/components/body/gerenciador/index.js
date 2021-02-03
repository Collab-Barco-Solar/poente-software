import React from 'react'
import './style.css'

const Gerenciador = ()=>(


    <div className="inputs">
        <div className="entradas--A">
            <input type="text" placeholder="Distância total"/>   
            <button className="botao">INICIAR</button>
            <button className="botao">RESETAR</button>        
        </div>

        <div className="entradas--B">
            <input type="text" placeholder="Número de voltas totais"/>
        </div>


    </div>


);

export default Gerenciador