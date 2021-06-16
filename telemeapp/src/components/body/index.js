import React from 'react'
import './style.css'
import Gerenciador from './gerenciador'
import Graficos from './gráficos/index'
import Instantaneas from './instantaneas/index'


const Body = ()=>(
    <div className="corpo">
        <div id="title-1">
            <h6 id="telemetria--name">Telemetria</h6>
            <h6 id="gerenciador--name">Gerenciador de Prova</h6>
        </div>
        <div id="title-2">
            <h6 id ="graficos--name--box">
                <div id="graficos--name">Gráficos</div>
                <select name="graficos" id="graficos-select">
                    <option>Corrente Motor</option>
                    <option>Tensão Mod</option>
                    <option>Corrente Baterias</option>
                    <option>Tensão Baterias</option>
                    <option>Corrente BatAux</option>
                    <option>Tensão BatAux</option>
                    <option>Posição Pot.</option>
                    <option>Velocidade</option>
                    <option>Temperatura</option>
                </select>
            </h6>
            <h6 id="instantaneas--name">Instantâneas</h6>
            <Gerenciador/>
        </div>
        <div className="container--infos">
            <Graficos info_name={document.getElementById("graficos-select")?.value}/>
            <Instantaneas/>
         </div>

    </div>
);

export default Body