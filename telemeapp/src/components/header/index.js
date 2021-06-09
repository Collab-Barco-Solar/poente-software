import React from 'react'
import './style.css'
import Logo from './icones/logo_Sol.png'
import Bandeira from './icones/espirito_santo.png'
import Voltas from './voltas/voltas'
import Swal from 'sweetalert2'

import { FcSettings } from "react-icons/fc";

//import Voltas from '../../components/body/gerenciador/indexTempoVolta.js'

import Tempo from './tempo/index'
//import Gerenciador from '../../components/body/gerenciador/indexTempoVolta.js'


async function configMenu() {
    const { value: formValues } = await Swal.fire({
        title: 'Menu de configurações',
        html: `<div class="container-config"> 

                </div>`,
        focusConfirm: false,
        width: 600,
        padding: '3em',
        background: '#fff',
        preConfirm: () => {
            return [

            ]
        }
    })
}



const Header = ()=> (

    
    <div className= "cabecalho">
        <p id="poente--name">POENTE</p>
        <img src= {Logo} width ="50px" height="50px" id="logo" alt=""/>
        <p id="voltas--name">VOLTAS</p>

        <div className="voltas--componente-container">
            <Voltas id="voltas--componente"/>
        </div>

        <p id="tempo--name">TEMPO</p>

        <div className="tempo--componente--container">
            <Tempo id="tempo--componente"/>
        </div>

        <img src={Bandeira} width ="70px" height="50px" id="bandeira" alt=""/>
       
        <FcSettings onClick = {()=>{configMenu()}} className="menu-config"/>

    </div>
);

export default Header