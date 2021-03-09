import React from 'react';

import Header from './components/header/index'
import Body from './components/body/index'
import Footer from './components/footer/index'

import { ContextoVoltas } from "./contextos/contexto-voltas";

var { Timer } = require('easytimer.js');

var timer = new Timer();

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

        this.Iniciar = (TotalVoltas) => {
            this.alteraVoltasTotais(TotalVoltas);
            this.alteraVoltasAtuais(0);


            //Zerar e iniciar cronômetro
            timer.reset();
            timer.start();
            var selfThis = this;

            timer.addEventListener('secondsUpdated', function (e) {
                //console.log(timer.getTimeValues().toString());
                selfThis.setState(state => ({
                    timer: timer.getTimeValues(),
                }));
                //console.log(selfThis.state.timer);
            });           
            
        }


        this.state = {
            voltasAtuais: 0,
            voltasTotais: 0,
            alteraVoltasTotais: this.alteraVoltasTotais,
            alteraVoltasAtuais: this.alteraVoltasAtuais,
            Iniciar: this.Iniciar,


            //Coisas internas
            timer: new Timer(),
        };
    } 

    


    render() {
        return (
            <div>
            <ContextoVoltas.Provider value={ this.state }>
                <Header/>
                <Body/>
                <Footer/>
            </ContextoVoltas.Provider>
            </div>
        );  
    }

}


export default App;
