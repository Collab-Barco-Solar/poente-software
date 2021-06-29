import React from 'react'
import './style.css'
import Gerenciador from './gerenciador'
import {Component} from 'react'
import Graficos from './gráficos/index'
import Instantaneas from './instantaneas/index'
import Switch from "react-switch";
import {ContextoGeral} from "../../contextos/contexto-geral"

class SwitchButton extends Component {
    constructor() {
      super();
      this.state = { checked: false };
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(checked) {
      this.setState({ checked });
    }
  
    render() {
      return (
        <ContextoGeral.Consumer> 
          {ContextoGeral =>(
          
          <label>
                <Switch
                checked={ContextoGeral.switchButton}
                onChange={ContextoGeral.alteraSwitchButton}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={15}//30
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={15}
                width={30}
                className="react-switch"
                id="material-switch"
              />
          </label>
        )} 
        </ContextoGeral.Consumer>
      )
    }
  }

const Body = ()=>(

      <div className="corpo">
          <div id="title-1">
              <h6 id="telemetria--name">Telemetria</h6>
              <h6 id="gerenciador--name">Gerenciador de Prova</h6>
          </div>
          <div id="title-2">
              <h6 id ="graficos--name--box">Gráficos</h6>
              <h6 id="instantaneas--name--box">
                  <div style={{marginRight:15}}>Instantâneas</div>
                  <div id="button-switch">
                    
                      <SwitchButton />
                  </div>
                  <div style={{marginLeft:15}}>Médias</div>
              </h6>
              <Gerenciador/>
          </div>
          <div className="container--infos">
              <Graficos info_name={document.getElementById("graficos-select")?.value}/>
              <Instantaneas/>
          </div>

      </div>
);

export default Body