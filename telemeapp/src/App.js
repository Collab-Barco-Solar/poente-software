

//import { Renderer } from "electron";
import React, { useState } from 'react';
import Cabecalho from './Cabecalho';
import Area from './Area';
import {Bg} from "./style/styleBg.js";

import sendAsync from './message-control/renderer';



function App() {
  const [message, setMessage] = useState('SELECT * FROM Teste1');
  const [response, setResponse] = useState();
  
  function send(sql) {
    sendAsync(sql).then((result) => setResponse(result));
  }


  
  return (
    <div>
      <Bg>
        <Cabecalho />
        <Area />
      </Bg>
      <article>
          <p>
              Say <i>ping</i> to the main process.
          </p>
          <input
              type="text"
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
          />
          <button type="button" onClick={() => send(message)}>
              Send
          </button>
          <br />
          <p>Main process responses:</p>
          <br />
          <pre>
              {(JSON.stringify(response, null, 2)) ||
                  'No query results yet!'}
          </pre>
      </article>
    </div>
  );

}

export default App;
