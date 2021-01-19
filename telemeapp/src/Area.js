import React, { Component } from 'react';
import './style/area.css'


class Area extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div class="container-fluid">
                <div class="row-t no-gutters">
                    <div class="col-titulo">
                        <p class="card-titulo">Telemetria</p>
                        <p class="card-titulo">Gerenciador de Provas</p>
                    </div>
                </div>

                <div class="row-a no-gutters">
                    <div class="col-graficos">
                        <div class="box">
                            <div class="card">

                                <div class="card-body">
                                    <h5 class="card-title">Gráficos</h5>

                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Selecione</button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="#">Alguma ação</a>
                                            <a class="dropdown-item" href="#">Outra ação</a>
                                            <a class="dropdown-item" href="#">Alguma coisa aqui</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="col-instantaneas">
                        <div class="box">
                            <div class="card">
                                <div class="card-body">
                                    <p class="card-title">Instantâneas</p>


                                    <p class="card-text">Corrente do Mortor</p>
                                    <p class="card-text">Tensão Módulos</p>
                                    <p class="card-text">Corrente Baterias</p>
                                    <p class="card-text">Tensão Baterias</p>
                                    <p class="card-text">Corrente Baterias Aux</p>
                                    <p class="card-text">Tensão Baterias Aux</p>
                                    <p class="card-text">Posição Potenciômetro</p>
                                    <p class="card-text">Velocidade</p>
                                    <p class="card-text">Temperatura</p>


                                    <div>
                                        <p class="card-title">On/Off</p>
                                        <button name="button-red"></button>
                                        <p class="card-title">Dms</p>
                                        <button name="button-red"></button>
                                        <p class="card-title">Re</p>
                                        <button name="button-red"></button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-gerenciador">
                        <div class="box">
                            <div class="card">
                                <div class="card-body">
                                    <p class="card-text"></p>
                                    <form>
                                        <label>
                                            <input type="text" name="Distancia total" />
                                        </label>
                                    </form>
                                    <form>
                                        <label>
                                            <input type="text" name="Numero de voltas" />
                                        </label>
                                    </form>

                                    <a href="#" class="btn btn-primary">Iniciar</a>
                                    <a href="#" class="btn btn-primary">Resetar</a>
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="card">

                                <div class="card-body">

                                    <p class="card-text"></p>
                                    <a href="#" class="btn btn-primary">Mais uma volta</a>
                                </div>
                            </div>
                        </div>
                        <div class="box">
                            <div class="card">
                                <div class="card-body">

                                    <p class="card-text"></p>
                                    <a href="#" class="btn btn-primary">Ir para o mapa</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Area;