import React from 'react';

import Header from './components/header/index'
import Body from './components/body/index'
import Footer from './components/footer/index'

import { ContextoGeral } from "./contextos/contexto-geral";
import sendAsync from './message-control/renderer';

var { Timer } = require('easytimer.js');

let timer = new Timer();
let timerDatabase;
let bancoEncontrado = false;

class App extends React.Component {
    constructor(){
        super();

        this.alteraVoltasTotais = (TotalVoltas) => {
            this.setState(state => ({
                voltasTotais: TotalVoltas,
            }));
        };

        this.alteraVoltasAtuais = (VoltasAtuais) => {
            this.setState(state => ({
                voltasAtuais: VoltasAtuais,
            }));
        };


        this.eventHandlerSeconds = () => {
            if(this.state.voltasAtuais >= this.state.voltasTotais){
                timer.removeEventListener('secondsUpdated', this.eventHandlerSeconds);
                return;
            } 
            
            //Atualiza o timer para atualizar outros componentes
            this.setState(state => ({
                timer: timer,
            }));

            if(this.state.tempoDasVoltas.length !== 0){
                ////Conta o tempo da volta atual
                //Acha o tempo em segundos da volta atual
                let tempoAtualDaVolta = this.state.tempoDasVoltas[this.state.tempoDasVoltas.length-1];
                let tempoSegundosAtual = tempoAtualDaVolta.hours*3600 + tempoAtualDaVolta.minutes*60 + tempoAtualDaVolta.seconds;
                tempoSegundosAtual++; //passa o segundo
                let novoTempoDasVoltas = this.state.tempoDasVoltas;
                
                novoTempoDasVoltas[novoTempoDasVoltas.length-1] = 
                    {seconds: tempoSegundosAtual%60, minutes: Math.floor(tempoSegundosAtual/60) - Math.floor(tempoSegundosAtual/3600), hours: Math.floor(tempoSegundosAtual/3600)};
                
                this.setState(state => ({
                    tempoDasVoltas: novoTempoDasVoltas,
                }));              
            }
        };


        this.Iniciar = (TotalVoltas) => {
            this.alteraVoltasTotais(TotalVoltas);
            this.alteraVoltasAtuais(0);

            timer.removeEventListener('secondsUpdated', this.eventHandlerSeconds);

            //Zerar e iniciar cronômetro
            timer.reset();

            //Atualiza o timer visto pelos outros componentes
            this.setState(state => ({
                timer: timer,
            }));

            //Zera as voltas
            this.setState(state => ({
                tempoDasVoltas: [{seconds: 0, minutes: 0, hours: 0}]
            }))

            timer.addEventListener('secondsUpdated', this.eventHandlerSeconds);                  
        }


        this.alteraTempoVoltas = (novoTempoDasVoltas) => {
            this.setState(state => ({
                tempoDasVoltas: novoTempoDasVoltas,
            }))
        }

        this.alteraSwitchButton = () =>{
            if(this.state.switchButton == false){
                this.setState(state => ({switchButton:true}))
            }
            else this.setState(state =>({switchButton:false}))
    
        }


        this.state = {
            voltasAtuais: 0,
            voltasTotais: 0,
            alteraVoltasTotais: this.alteraVoltasTotais,
            alteraVoltasAtuais: this.alteraVoltasAtuais,
            Iniciar: this.Iniciar,
            
            tempoDasVoltas: [],
            alteraTempoVoltas: this.alteraTempoVoltas,

            dadosRecebidos: [],

            alteraSwitchButton: this.alteraSwitchButton,
            //Coisas internas
            timer: new Timer(),
            switchButton: false,
        };
    } 





    /////////////////////////////////////////////////////////////
    // Busca as informações no banco de dados //////////////////
    fetchData(sql_message) {
        sendAsync(sql_message).then((result) => this.setState({ dadosRecebidos: result }));
        if (this.state.dadosRecebidos != null) {
            //console.log(this.state.data[0].emergencia); //data é um vetor, com cada posição sendo uma linha
            if (!bancoEncontrado) {
                console.log("Banco de dados conectado com sucesso!");
                bancoEncontrado = true;
            }
        } else {
            console.log("Buscando dados no banco de dados...");
        }
    }

    componentDidMount(){
        let sqlCommandMaxId = 'SELECT * FROM (SELECT * FROM Dados ORDER BY id DESC LIMIT 500) ORDER BY id ASC;';
        this.fetchData(sqlCommandMaxId);
        timerDatabase = setInterval(() => this.fetchData(sqlCommandMaxId), 500);
    }

    componentWillUnmount(){
        clearInterval(timerDatabase);
        timerDatabase = null;
    }






    render() {
        return (
            <div>
            <ContextoGeral.Provider value={ this.state }>
                <Header/>
                <Body/>
                <Footer/>
            </ContextoGeral.Provider>
            </div>
        );  
    }

}


export default App;
