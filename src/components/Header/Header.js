import React, { Component } from 'react';
import './Header.css';
//import {Link} from 'react-router-dom';

class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn:false
    }
  }

  componentWillMount() {

    if(sessionStorage.getItem("userData")){    
    this.setState({isLoggedIn: true});
    }     
 }

  render() {
  
    return (
        <div className="header">   
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                <a href="/" className="branding"><img src="https://aftersales.ext.lexibook.com/img/logo.jpg" alt="Lexibook" /></a>
                </div>
                <div className="col-md-6">                
                <span className="float-right header-links">
                  <a href="/">Home</a>
                  <a href="/" onClick={this.logout} style={{"display":"none"}}>Logout</a>                  
                 </span>                                  
                </div>   
              </div>                           
            </div>
        </div>
    );
  }
}

export default Header;