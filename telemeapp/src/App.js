import React from 'react';

import Header from './components/header/index'
import Body from './components/body/index'
import Footer from './components/footer/index'


class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Body/>
        <Footer/>
      </div>
    );
  }

}


export default App;
