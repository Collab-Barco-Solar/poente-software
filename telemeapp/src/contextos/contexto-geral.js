import Timer from 'easytimer.js';
import React from 'react'

export const ContextoGeral = React.createContext({
    //Contagem das voltas
    voltasTotais: 0,
    voltasAtuais: 0,
    distanciaTotal: 0,
    alteraVoltasTotais: () => {},
    alteraVoltasAtuais: () => {},
    alteraDistanciaTotal: () => {},
    alteraIniciado: () => {},
    iniciado: false,
    Iniciar: () => {},

    //Contagem do tempo
    tempoDasVoltas: [],
    alteraTempoVoltas: () => {},
    pausarTimer: () => {},

    dadosRecebidos: [], //Cada posição no vetor é uma linha do banco de dados, podendo acessar cada coluna com um '.' e o nome da informação
    //Por exemplo:  dadosRecebidos[contextoGeral.dadosRecebidos.length-1].cBarramento
    mediasAtuais: [],

    atualizaMedias: () => {},

    alteraSwitchButton: () => {},

    timer: new Timer(),
    switchButton: false,
}) ;
