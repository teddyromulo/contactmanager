import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';

class Login extends Component {

  constructor(){
    super();
   
    this.state = {
     password: '',
     isLoggedIn: false,
     errors:{}
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);

  }

  

  login() {
    if(this.state.password){
      PostData('login',this.state).then((result) => {
       let responseJson = result;
       if(responseJson.userData){     
         sessionStorage.setItem('userData',JSON.stringify(responseJson));
         this.setState({isLoggedIn: true});         
       }else{
        this.setState({errors:{ msg:'Wrong username or password' }        
      });
        
       }              
      });           
    }    
   }

  onChange(e){
    this.setState({[e.target.name]:(e.target.value).toUpperCase()});
   }

   _onKeyPress(e){
      if (e.key ==="Enter"){
        this.login();
      }

   }   



  render() {

     if (this.state.isLoggedIn) {
      return (<Redirect to={'/'}/>)
    }
   
    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/'}/>)
    }

    console.log(this.state);

     return (
      
        <div className="container">
            <div className="row">
              <div className="shadow col-md-4 offset-md-4 login-app">
                <h4> Please enter your Lexibook ID <br /><br /></h4>
                <div className="form-group">
                <input type="text" className="form-control form-control-sm col-md-10 offset-md-1" name="password"  onChange={this.onChange} onKeyPress={this._onKeyPress} /><br />
                <input type="submit" className="btn btn-sm btn-orange btn-block col-md-10 offset-md-1" value="Login" onClick={this.login}/>
                </div>                                       
                {this.state.errors.msg &&              
                  <div className="col-md-10 offset-md-1 msg-box-error">{this.state.errors.msg}</div>                                
                }
              </div>
            </div>
        </div>   
    );
  }
}

export default Login;