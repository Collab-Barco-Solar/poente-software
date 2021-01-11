

//import { Renderer } from "electron";
import React from 'react';
import Cabecalho from './Cabecalho';
import Area from './Area';
import {Bg} from "./style/styleBg.js";



function App() {
  /*const [message, setMessage] = useState('SELECT * FROM Dados WHERE ID = (SELECT MAX(ID) FROM Dados);'); //INSERT into Dados values('1')
  const [response, setResponse] = useState();
  
  function send(sql_message) {
    sendAsync(sql_message).then((result) => setResponse(result));
  }*/
 
  
  return (
    <div>
      <Bg>
        <Cabecalho />
        <Area />
      </Bg>
    </div>
  );

}

export default App;
