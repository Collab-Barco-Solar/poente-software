import React from 'react'
import './style.css'

const Instantaneas = () => (
    <div className= "instantaneas">
        <div className="nomes">
            <p className="nomes--itens">Corrente Motor</p>
            <p className="nomes--itens">Tensão Módulos</p>
            <p className="nomes--itens">Corrente Baterias</p>
            <p className="nomes--itens">Tensão Baterias</p>
            <p className="nomes--itens">Corrente Bateria Aux</p>
            <p className="nomes--itens">Tensão Bateria Aux</p>
            <p className="nomes--itens">Posição Potenciômetro</p>
            <p className="nomes--itens">Velocidade</p>
            <p className="nomes--itens">Temperatura</p>
        </div>
        <div className="valores">
            <div className="valores--itens">30,01 A</div>
            <div className="valores--itens">140,01 V</div>
            <div className="valores--itens">32,45 A</div>
            <div className="valores--itens">48,10 V</div>
            <div className="valores--itens">0,00 A</div>
            <div className="valores--itens">30,01 V</div>
            <div className="valores--itens">3</div>
            <div className="valores--itens">5 nós</div>
            <div className="valores--itens">56 ºC</div>
        </div>
    </div>
);

export default Instantaneas