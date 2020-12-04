import React from 'react';
import {ParteUm, Bg} from "./style/styleBg.js";

class Cabecalho extends React.Component {
    render() {
        return (

            <div class="col-sm-6">

                <div class="card-body">

                    <h1>
                        <ParteUm>
                            <p class="card-title">Solares</p>
                            <img src="img.jpg"></img>
                        </ParteUm>
                    </h1>


                    <h2>
                        <p class="card-text">VOLTAS</p>
                    </h2>
                    <h3>
                        <p class="card-text">TEMPO</p>
                    </h3>

                </div>
            </div>

        );
    }
}


export default Cabecalho;