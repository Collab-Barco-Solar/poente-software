import React from 'react';
import './style/cabecalho.css'
import Logo from "./img/logo.png";
import Bandeira from "./img/Bandeira_do_Espírito_Santo.svg";

class Cabecalho extends React.Component {
    render() {
        return (
            <div class="row no-gutters">

                <div class="col">
                    <h1>
                        <p class="card-title">Solares</p>
                    </h1>
                    <img src={Logo} height="30%" width="30%"></img>
                </div>

                <div class="col">
                    <h2>
                        <p class="card-text">VOLTAS</p>
                    </h2>
                    <div class="box-voltas">
                        <h4>0/0</h4>
                    </div>
                </div>

                <div class="col">
                    <h3>
                        <p class="card-text">TEMPO</p>
                    </h3>
                    <div class="box-tempo">
                        <h5>00:00:00</h5>
                    </div>
                    <img src={Bandeira} height="30%" width="30%"></img>
                </div>

            </div>
        );
    }
}


export default Cabecalho;