import Timer from 'easytimer.js';
import React from 'react'

export const ContextoVoltas = React.createContext({
    voltasTotais: 0,
    voltasAtuais: 0,
    alteraVoltasTotais: () => {},
    alteraVoltasAtuais: () => {},
    Iniciar: () => {},

    tempoDasVoltas: [],
    alteraTempoVoltas: () => {},

    timer: new Timer(),
}) ;
