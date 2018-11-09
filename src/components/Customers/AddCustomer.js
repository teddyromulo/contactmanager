import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import TextInputGroup from './TextInputGroup';
import classnames from 'classnames'; // takes 2 parameters, the initial class we want to apply then another class using object that depend on a condition
import {Consumer} from '../../context';

class AddCustomer extends Component {

  constructor(){
    super();
    this.state = {      
      user_data:[],
      user_id:'',
      user_token:'',      
      isLoggedIn:false,
      login:'',
      customer_acct:'',
      customer_name:'',
      customer_addr:'',
      country:'FR',
      errors:{},
      rest_message:{},
      new_message_str:'',
      new_message_type:''

    }
  }


  componentWillMount(){
    if(sessionStorage.getItem("userData")){
      let user_data = JSON.parse(sessionStorage.getItem("userData"));      
      this.setState({isLoggedIn: true}); // set login to true      
      this.setState({user_id:user_data.userData.id});
      this.setState({user_token:user_data.userData.token});

      //console.log(sessionStorage.getItem("userData"));
    }
  }

  static defaultProps = {
      countries:["FR", "EN", "DE", "ES", "PT"]
  }

  handleOnSubmit(dispatch, e){
    e.preventDefault();
    const {login, customer_acct, customer_name, customer_addr} = this.state;

    // all input is using TextInputGroup component, customer_addr is using this component form and error checking.
    // .is-valid and is-invalid is custom made css since it is not working from bootstrap.
    

    if (login===''){
      this.setState({errors:{login:"Login is required"}});
      return;
    }

    if (customer_acct===''){
      this.setState({errors:{customer_acct:"Customer Account is required"}});
      return;
    }

    if (customer_name===''){
      this.setState({errors:{customer_name:"Customer Name is required"}});
      return;
    }

    if (customer_addr===''){
      this.setState({errors:{customer_addr:"Customer Address is required"}});
      return;
    }

    // const newCustomer = {
    //   //if key and value is the same no need to do assignmen
    //   login, //login:login
    //   customer_acct, //customer_acct:customer_acct
    //   customer_name, //customer_name:customer_name 
    //   customer_addr,  // etc...
    //   country,
    // }

    //console.log(this.state);

    //dispatch
   
     
    if (login && customer_acct && customer_name && customer_addr){
      
      let postData = { // assign values to be posted
          user_id:this.state.user_id,
          user_token:this.state.user_token,
          login:this.state.login,
          customer_acct:this.state.customer_acct,
          customer_name:this.state.customer_name,
          customer_addr:this.state.customer_addr,
          country:this.state.country
        }

        //console.log(postData);
        

      PostData('customerAdd', postData)
        .then((result) => {
            let responseJson = result;
            if (responseJson.success){            
              //this.setState({new_message_str:responseJson.success});
              
              dispatch({ type: 'ALERT_MESSAGE', payload:{messageStr: responseJson.success.text, messageType: "success"}});

              this.props.history.push('/');
            }else{
              dispatch({ type: 'ALERT_MESSAGE', payload:{messageStr: responseJson.error.text, messageType: "error"}});
              
              this.props.history.push('/');
              //this.setState({rest_message:responseJson.error});             
            
            }
            //console.log(responseJson);
            //console.log(this.state);            
        });

    }
    
    
    //clear state
    this.setState({
      login:'',
      customer_acct:'',
      customer_name:'',
      customer_addr:'',
      country:'FR',
      errors:{}
    }); 
  } // handleOnSubmit

  onChange = e => this.setState({[e.target.name]:e.target.value});

  render() {

    if (!this.state.isLoggedIn) { // check if login is true
      return (<Redirect to={'/login'}/>)
    }

    const {login, customer_acct, customer_name, customer_addr, errors} = this.state;

      let countryOptions = this.props.countries.map(country => {
        //let selectedValue;
        return <option value={country} key={country}>{country}</option>
      })     

        return (

          <Consumer>
                {value => {
                  const {dispatch} = value;
                  return(
                    <div className="add-Customer">   
            <div className="container">
              <div className="row mt-4">
                <div className="col-md-6 offset-md-3">                
                <h3 className="mb-3">Add Customer</h3>
                <Link to={`/customers`} className="btn btn-secondary btn-sm mb-4">&lt; Back</Link>
                  <form onSubmit={this.handleOnSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      label="Login" 
                      name="login"
                      value={login}
                      onChange={this.onChange}
                      error = {errors.login} 
                    /> 
                     <TextInputGroup
                      label="Customer Account" 
                      name="customer_acct"
                      value={customer_acct}
                      onChange={this.onChange}
                      error = {errors.customer_acct} 
                    />
                    <TextInputGroup
                      label="Customer Name" 
                      name="customer_name"
                      value={customer_name}
                      onChange={this.onChange}
                      error = {errors.customer_name} 
                    />
                    <div className="form-group">
                      <label htmlFor="Address">Address:</label>
                      <textarea 
                        name="customer_addr"
                        className={classnames("form-control form-control-sm", {
                          "is-invalid":errors.customer_addr
                        })}                        
                        value={customer_addr} 
                        onChange={this.onChange}></textarea>
                        {errors.customer_addr && <div className="text-danger">{errors.customer_addr}</div>}
                     </div>
                    <div className="form-group">
                      <label htmlFor="Login">Country:</label>
                      <select name="country" className="form-control form-control-sm" onChange={this.onChange}>                                  
                        {countryOptions}
                      </select>
                      </div>
                      <div className="form-group">
                      <input className="btn btn-orange btn-sm" type="submit" value="Submit" />
                      </div>
                  </form>
                </div>
                </div>
              </div>
          </div>
                  )
                }}
          </Consumer>

          
      );

  }

}

export default AddCustomer;