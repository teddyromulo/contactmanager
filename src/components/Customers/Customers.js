import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import Customer from './Customer';
import Messages from '../../services/Messages';
import {Consumer} from '../../context';

//import {Link} from 'react-router-dom';

class Customers extends Component {

  constructor(props){
    super(props);  

    this.state = {
      data:[],
      isLoggedIn: false,    
      search_string:''
    };

    this.logout = this.logout.bind(this);
  }

  
  componentWillMount() {

      if(sessionStorage.getItem("userData")){         
      this.setState({isLoggedIn: true});
      //console.log(sessionStorage.getItem("userData"));           
      }else{     
      this.setState({isLoggedIn: false});
      }             
   }

   componentDidMount(){
    this.getCustomers();
     //console.log(this.state);
   }


   getCustomers() {
    let data = JSON.parse(sessionStorage.getItem("userData"));
    let postData = { user_id: data.userData.id, token: data.userData.token, search_string:this.state.search_string}; 
    if (data) {
      PostData('getCustomers', postData).then((result) => {
        let responseJson = result;
        if(responseJson.customersData){
          this.setState({data: responseJson.customersData});
        }else{
          this.setState({data:[]});
        }
        console.log(this.state);
      });
    }
  }  
  
  
  // getCustomer(search_text){
  //     let data = JSON.parse(sessionStorage.getItem("userData"));
  //     let postData = {user_id: data.userData.id, token:data.userData.token, search_string:search_text};
  //     if (data){
  //       PostData('getCustomer', postData).then((result) => {
  //         let responseJson = result;
  //         this.setState({data:responseJson.customersData});
  //       });
  //     }
  //   }
  

   logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.clear();
    this.setState({isLoggedIn: false});
  }

  searchOnChange = (e) => this.setState({search_string:e.target.value });
  

  searchCustomerHandle(e){
    e.preventDefault();

    this.getCustomers();
  }


  render() {

    if (!this.state.isLoggedIn) {
      return (<Redirect to={'/login'}/>)
    }

    return (
      <div className="container" id="customers">
          <div className="logout mb-3">
            <a href="/" onClick={this.logout}>Logout</a>
          </div>
          <Consumer>
            {value => {
              const {message} = value;
              if (message.messageType){
                let alertType;
                if (message.messageType==="success"){
                  alertType = "alert alert-success";
                }else{
                  alertType = "alert alert-danger";
                }
                return(                                       
                  <div className={alertType}>
                    {message.messageStr}      
                  </div>                
                )
              }
              return null;  

            }}
          </Consumer>

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 add-customer">
               <a href="/customer/add" className="btn btn-orange btn-sm btn-add" role="button">Add Customer </a>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 search-customer">               
              <form className="form-inline float-right" onSubmit={this.searchCustomerHandle.bind(this)}>
              <div className="form-group mx-sm-3 mb-2">
              <input type="text" name="search_string" className="form-control form-control-sm mb-2 mr-2 text-capt" onChange={this.searchOnChange} />
              <button type="submit" className="btn btn-orange mb-2 btn-sm">Search</button>
              </div>
              </form>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
            <div>
            <Messages />
            </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 list-customer">
            <Customer customersData = {this.state.data} />  
            </div>

          </div>                 
              
      
      </div>
    );
  }
}

export default Customers;