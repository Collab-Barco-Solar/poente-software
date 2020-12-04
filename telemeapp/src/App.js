

//import { Renderer } from "electron";
import React from 'react';
import Cabecalho from './Cabecalho';
import Area from './Area';
import {Bg} from "./style/styleBg.js";



class App extends React.Component {
  render() {
    return (
      <div>
        <Bg>
          <Cabecalho />
          <Area />
        </Bg>
      </div>
    );
  }

}


export default App;
