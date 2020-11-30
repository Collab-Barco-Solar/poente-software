import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
/*import styled from 'styled-components'


const Box = styled.div`
    background-color: #15141c;
`;*/



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
                                <div class="card-body">
                                    <h5 class="card-title">Gráficos</h5>
                                    <a href="#" class="btn btn-primary">Selecionar</a>
                                </div>
                            </div>
                        </div>
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

                                    <a href="#" class="btn btn-primary">On/Off</a>
                                    <a href="#" class="btn btn-primary">Dms</a>
                                    <a href="#" class="btn btn-primary">Re</a>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        Gerenciador de Provas
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
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Area;