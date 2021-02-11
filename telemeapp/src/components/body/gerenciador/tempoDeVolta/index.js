import React from 'react'
import './style.css'


const TempoDeVolta = () => (
    <div className="tempoDeVolta">
        <div className="title--tempoDeVolta">
            <p id="tempoDeVolta--name">Tempos de volta</p>
            <button id="botao--tempoDeVolta">Mais uma volta</button>
            <p id="estimativa--name">Estimativas</p>
        </div>

        <div className="infos">
            <div id="infos--A">
                <p className="infos--A-P">1- 00:26:12</p>
                <p className="infos--A-P">2- 00:34:52</p>
                <p className="infos--A-P">3- 00:20:23</p>
            </div>
            <div id = "infos--B">
                <p className="infos--B-P">4- 00:26:12</p>
                <p className="infos--B-P">5- 00:34:52</p>
                <p className="infos--B-P">6- 00:20:23</p>
            </div>
            <div id = "infos--C">
                <p className = "infos--C-P">Tempo Restante de Volta</p>
                <p className = "infos--C-P">Tempo Restante de Corrida</p>
                <p className = "infos--C-P">Velocidade Média</p>
            </div>
            <div id = "infos--D">
                <p className = "infos--D-P">00:11:45</p>
                <p className = "infos--D-P">02:47:18</p>
                <p className = "infos--D-P">4,6 nós</p>
            </div>
        </div>
    </div>
)


export default TempoDeVolta