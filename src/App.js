import React, { Component } from 'react';
import Routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'; 
import {Provider} from './context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//import Test from './components/Test/Test';


class App extends Component {

  constructor(){
    super();
    this.state={
      appName: "Lexibook Aftersales",
      home: false
    }
  }

  render() {
    return (
 
      <Provider>
        <div className="App" >          
          <Header name={this.state.appName}/>         
          <div className="app-body">
          <Routes name={this.state.appName}/>
          </div>          
          <hr/>
         <Footer/>
        </div>
      </Provider> 

    );
  }
}

export default App;
