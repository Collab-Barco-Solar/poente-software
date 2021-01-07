import React from 'react';
import { ParteUm, Bg } from "./style/styleBg.js";

class Cabecalho extends React.Component {
    render() {
        return (
            <div class="row no-gutters">

                <div class="col order-first">
                    <h1>
                        <ParteUm>
                            <p class="card-title">Solares</p>
                            <img src="img.jpg"></img>
                        </ParteUm>
                    </h1>
                </div>

                <div class="col">
                    <h2>
                        <p class="card-text">VOLTAS</p>
                    </h2>
                </div>

                <div class="col">
                    <h2>
                        <p class="card-text">VOLTASda gigi</p>
                    </h2>
                </div>

                <div class="col order-last">
                    <h3>
                        <p class="card-text">TEMPO</p>
                        <img src="./img/Bandeira_do_Espírito_Santo.svg" alt=""></img>
                    </h3>
                </div>

            </div>
        );
    }
}


export default Cabecalho;