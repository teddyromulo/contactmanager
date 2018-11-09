import React, {Component} from 'react'

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ALERT_MESSAGE':
      return {
        ...state,
        message: action.payload
      };    
    default:
      return state;
  }
};

export class Provider extends Component{  
  state = {      
    message:[],
    dispatch: action => this.setState(state => reducer(state, action))          
  }

  componentWillMount(){
    //console.log(this.state);
  }
  render() {
    
    return(
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;