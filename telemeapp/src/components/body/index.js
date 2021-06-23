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
            <h6 id ="graficos--name--box">Gráficos</h6>
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