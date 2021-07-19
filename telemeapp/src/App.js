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

        this.alteraVoltasTotais = async (TotalVoltas) => {
            this.setState(state => ({
                voltasTotais: TotalVoltas,
            }));
        };

        this.alteraVoltasAtuais = async (VoltasAtuais) => {
            this.setState(state => ({
                voltasAtuais: VoltasAtuais,
            }));
        };

        //Todo segundo, essa função é chamada
        this.eventHandlerSeconds = () => {
            //Se a prova acabou, para de contar o cronômetro
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

        this.alteraDistanciaTotal = async (DistanciaTotal) =>{
            this.setState(state => ({
                distanciaTotal: DistanciaTotal,
            }));
        };

        this.alteraIniciado = async () =>{
            this.setState(state => ({iniciado:true}))
        }


        this.Iniciar = async (TotalVoltas,DistanciaTotal) => {

            //condição para o calculo das estimativas, contornando o erro da inicialização dos calculos com 0
            await this.alteraIniciado()


            await this.alteraVoltasTotais(TotalVoltas);
            await this.alteraVoltasAtuais(0);
            await this.alteraDistanciaTotal(DistanciaTotal);


            

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

        //É chamada toda vez que as informações dos banco de dados
        this.atualizaMedias = () => {
            var novasMedias = {
                cBarramento: 0,
                tModulos: 0,
                cBaterias: 0,
                tBaterias: 0,
                cBateriasAux: 0,
                tBateriasAux: 0, 
                pPotenciometro: 0,
                velocidade: 0,
                temperatura: 0,
            };
            
            //Passa por todas as linhas dos dados recebidos e soma os valores
            this.state.dadosRecebidos.forEach( (value) => {
                novasMedias.cBarramento += parseFloat(value.cBarramento);
                novasMedias.tModulos += parseFloat(value.tModulos);
                novasMedias.cBaterias += parseFloat(value.cBaterias);
                novasMedias.tBaterias += parseFloat(value.tBaterias);
                novasMedias.cBateriasAux += parseFloat(value.cBateriasAux);
                novasMedias.tBateriasAux += parseFloat(value.tBateriasAux);
                novasMedias.pPotenciometro += parseFloat(value.pPotenciometro);
                novasMedias.velocidade += parseFloat(value.velocidade);
                novasMedias.temperatura += parseFloat(value.temperatura);
            });

            var length = this.state.dadosRecebidos.length;
            //Divide os valores pelo tamanho do vetor para encontrar a média
            novasMedias.cBarramento = novasMedias.cBarramento / length;
            novasMedias.tModulos = novasMedias.tModulos / length;
            novasMedias.cBaterias = novasMedias.cBaterias / length;
            novasMedias.tBaterias = novasMedias.tBaterias / length;
            novasMedias.cBateriasAux = novasMedias.cBateriasAux / length;
            novasMedias.tBateriasAux = novasMedias.tBateriasAux / length;
            novasMedias.pPotenciometro = novasMedias.pPotenciometro / length;
            novasMedias.velocidade = novasMedias.velocidade / length;
            novasMedias.temperatura = novasMedias.temperatura / length;

            


            this.setState(state => ({
                mediasAtuais: novasMedias,
            }))
        }

        this.alteraSwitchButton = () =>{
            if(this.state.switchButton === false){
                this.setState(state => ({switchButton:true}))
            }
            else this.setState(state =>({switchButton:false}))
    
        }
        
        


        this.pausarTimer = () => {

            this.state.timer.isRunning() ? this.state.timer.pause() : this.state.timer.start();
        }


     


        this.state = {
            distanciaTotal: 0,
            voltasAtuais: 0,
            voltasTotais: 0,
            alteraVoltasTotais: this.alteraVoltasTotais,
            alteraVoltasAtuais: this.alteraVoltasAtuais,
            alteraDistanciaTotal: this.alteraDistanciaTotal,
            alteraIniciado: this.alteraIniciado,
            iniciado: false,
            Iniciar: this.Iniciar,
            
            tempoDasVoltas: [],
            alteraTempoVoltas: this.alteraTempoVoltas,
            pausarTimer: this.pausarTimer,

            dadosRecebidos: [],
            mediasAtuais: [],
            atualizaMedias: this.atualizaMedias,

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
            this.atualizaMedias();
        } else {
            console.log("Buscando dados no banco de dados...");
        }
    }

    //Essa função é chamada assim que o componente é montado, neste caso no começo da aplicação
    componentDidMount(){
        let sqlCommandMaxId = 'SELECT * FROM (SELECT * FROM Dados ORDER BY id DESC LIMIT 500) ORDER BY id ASC;';
        this.fetchData(sqlCommandMaxId); //Executa o comando acima no SQL e salva o retorno no state
        timerDatabase = setInterval(() => this.fetchData(sqlCommandMaxId), 500); // Cria um intervalo que executa a função fetchData a cada vez que esse intervalo ocorre
    }

    //Essa função é chamada quando o componente vai ser destruido
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
