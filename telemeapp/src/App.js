import React from 'react';

import Header from './components/header/index'
import Body from './components/body/index'
import Footer from './components/footer/index'

import { ContextoVoltas } from "./contextos/contexto-voltas";


class App extends React.Component {
    constructor(){
        super();

        this.alteraVoltasTotais = (TotalVoltas) => {
            this.setState(state => ({
                voltasTotais: TotalVoltas,
            }));
        };


        this.state = {
            voltasAtuais: 0,
            voltasTotais: 0,
            alteraVoltasTotais: this.alteraVoltasTotais,
        };
    } 

    alteraVoltasTotais


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
