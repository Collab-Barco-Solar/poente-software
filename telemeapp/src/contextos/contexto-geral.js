import Timer from 'easytimer.js';
import React from 'react'

export const ContextoGeral = React.createContext({
    //Contagem das voltas
    voltasTotais: 0,
    voltasAtuais: 0,
    alteraVoltasTotais: () => {},
    alteraVoltasAtuais: () => {},
    Iniciar: () => {},

    //Contagem do tempo
    tempoDasVoltas: [],
    alteraTempoVoltas: () => {},

    dadosRecebidos: [],

    alteraSwitchButton: () => {},

    timer: new Timer(),
    switchButton: false,
}) ;
