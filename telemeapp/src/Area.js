import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Bg, Obj, BtnRed, BtnGreen, BtnRound } from "./style/styleBg.js";

class Area extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        Telemetria
                        <div class="box">
                            <div class="card">
                                <Obj>
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
                                </Obj>
                            </div>

                        </div>
                        <div class="box">
                            <div class="card">
                                <Obj>
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
                                            <BtnGreen>
                                                <button name="button-red"></button>
                                            </BtnGreen>
                                            <p class="card-title">Dms</p>
                                            <BtnRed>
                                                <button name="button-red"></button>
                                            </BtnRed>
                                            <p class="card-title">Re</p>
                                            <BtnGreen>
                                                <button name="button-red"></button>
                                            </BtnGreen>
                                        </div>

                                    </div>
                                </Obj>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        Gerenciador de Provas
                        <div class="box">
                            <div class="card">
                                <Obj>
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
                                </Obj>
                            </div>
                        </div>
                        <div class="box">
                            <div class="card">
                                <Obj>
                                    <div class="card-body">

                                        <p class="card-text"></p>
                                        <a href="#" class="btn btn-primary">Mais uma volta</a>
                                    </div>
                                </Obj>
                            </div>
                        </div>
                        <div class="box">
                            <div class="card">
                                <Obj>
                                    <div class="card-body">

                                        <p class="card-text"></p>
                                        <a href="#" class="btn btn-primary">Ir para o mapa</a>
                                    </div>
                                </Obj>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Area;