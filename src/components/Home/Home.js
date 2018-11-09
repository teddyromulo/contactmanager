import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import {PostData} from '../../services/PostData';
import Customers from "../Customers/Customers";
//import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; 
//import '../../styles/react-confirm-alert.css';

class Home extends Component {
 

  constructor(props) {
    super(props);

    this.state = {
      data:[],
      isLoggedIn: false,
      name:'',
    };

    this.logout = this.logout.bind(this);
  }

  componentWillMount() {

   if(sessionStorage.getItem("userData")){    
    //this.getCustomers();
    this.setState({isLoggedIn: true});
    //console.log(sessionStorage.getItem("userData"));
   }
  
   else{     
    this.setState({isLoggedIn: false});
   }   
   

  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }


  getUserFeed() {
  
    let data = JSON.parse(sessionStorage.getItem("userData"));
    this.setState({name:data.userData.name});
    let postData = { user_id: data.userData.user_id, token: data.userData.token}; 

    if (data) {
      PostData('feed', postData).then((result) => {
        let responseJson = result;
        this.setState({data: responseJson.feedData});
        //console.log(this.state);
      });
    }
    
  }

   logout(){
     sessionStorage.setItem("userData",'');
     sessionStorage.clear();
     this.setState({isLoggedIn: false});
   }

  render() {
    if (!this.state.isLoggedIn) {
      return (<Redirect to={'/login'}/>)
    }

    return (
      <div className="row" id="Body">
        <div className="medium-12 columns">
        <a href="#" onClick={this.logout} className="logout">Logout</a>
        </div>
        <Customers />        
      
      </div>
    );
  }
}

export default Home;