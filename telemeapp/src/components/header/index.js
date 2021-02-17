import React from 'react'
import './style.css'
import Logo from './icones/logo_Sol.png'
import Bandeira from './icones/espirito_santo.png'
import Voltas from './voltas/index'
import Tempo from './tempo/index'


const Header = ()=> (

    <div className= "cabecalho">
        <p id="poente--name">POENTE</p>
        <img src= {Logo} width ="50px" height="50px" id="logo" alt=""/>
        <p id="voltas--name">VOLTAS</p>
        <Voltas id="voltas--componente"/>
        <p id="tempo--name">TEMPO</p>
        <Tempo id="tempo--componente"/>
        <img src={Bandeira} width ="70px" height="50px" id="bandeira" alt=""/>

    </div>
);

export default Header