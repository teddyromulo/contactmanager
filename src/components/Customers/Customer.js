import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Customer extends Component {

  render() {

      const customersData = this.props.customersData;
      let customerItem ;

      customerItem = customersData.map(function (customerData, index) {

          const {id, customer_name, customer_addr, country} = customerData; // deconstruct

          return (
            <tr className="customer" key={index}>          
            <td>{id}</td>
            <td>{customer_name}</td>
            <td>{customer_addr}</td>
            <td>{country}</td>
            <td><Link to={`customer/edit/${id}`} className="btn btn-secondary btn-sm">Edit</Link></td>
            </tr>         
          )
        }, this);

        if (customerItem===""){
          customerItem ='No records found';
        }

    return (
          <table className="table table-bordered tablepadd-8px">        
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">CUSTOMER NAME</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">COUNTRY</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
        {customerItem}
        </tbody>
        </table>
    );
  }

}

export default Customer;