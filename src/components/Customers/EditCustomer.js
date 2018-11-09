import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import TextInputGroup from './TextInputGroup';
import classnames from 'classnames'; // takes 2 parameters, the initial class we want to apply then another class using object that depend on a condition
import {Consumer} from '../../context';


class EditCustomer extends Component {

  constructor(){
    super();
    this.state = {
      customer_id:'',          
      user_data:[],
      user_id:'',
      user_token:'',      
      isLoggedIn:false,
      customer_acct:'',
      customer_name:'',
      customer_addr:'',
      country:'FR',
      errors:{} 

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

  componentDidMount(){
    const {id} = this.props.match.params;
    this.setState({customer_id:id});
    this.getCustomer();
    //console.log(this.state);
  }

  getCustomer() {
    //console.log('get customer called');
    const {id} = this.props.match.params;
    let data = JSON.parse(sessionStorage.getItem("userData"));
    let postData = { user_id: data.userData.id, token: data.userData.token, customer_id:id}; 
    if (data) {
      PostData('getCustomer', postData).then((result) => {
        let responseJson = result;                
        const customer_data = responseJson.customerData;        
        this.setState({
            customer_acct:customer_data[0].customer_acct,
            customer_name:customer_data[0].customer_name,
            customer_addr:customer_data[0].customer_addr,
            country:customer_data[0].country,

          });
        //console.log(customer_data);
        //console.log(this.state);
      });
    }    

  } 


  static defaultProps = {
      countries:["FR", "EN", "DE", "ES", "PT"]
  }

  handleOnSubmit(dispatch, e){
    e.preventDefault();
    const {id} = this.props.match.params;
    const {customer_acct, customer_name, customer_addr} = this.state;

    // all input is using TextInputGroup component, customer_addr is using this component form and error checking.
    // .is-valid and is-invalid is custom made css since it is not working from bootstrap.
    


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


   
     
    if ( customer_acct && customer_name && customer_addr){
      
      let postData = { // assign values to be posted
          user_id:this.state.user_id,
          user_token:this.state.user_token,
          customer_id:id, // from props.params
          customer_acct:this.state.customer_acct,
          customer_name:this.state.customer_name,
          customer_addr:this.state.customer_addr,
          country:this.state.country
        }

        //console.log(postData);
        

      PostData('customerUpdate', postData)
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

    const {customer_id, customer_acct, customer_name, customer_addr, errors, country} = this.state;

      //let selectedValue;
      
      let countryOptions = this.props.countries.map(optcountry => {        
        return <option value={optcountry} key={optcountry}>{optcountry}</option>
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
                <h3 className="mb-3">Edit Customer #{customer_id}</h3>                             
                <Link to={`/customers`} className="btn btn-secondary btn-sm mb-4">&lt; Back</Link>

                  <form onSubmit={this.handleOnSubmit.bind(this, dispatch)}>                   
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
                      <label htmlFor="Country">Country:</label>
                      <select name="country" className="form-control form-control-sm" onChange={this.onChange} value={country}>                                  
                        {countryOptions}
                      </select>
                      </div>
                      <div className="form-group">
                      <input className="btn btn-orange btn-sm" type="submit" value="Save" />
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

export default EditCustomer;