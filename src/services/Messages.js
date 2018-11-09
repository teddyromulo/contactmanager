import React, {Component} from 'react';

class Messages extends Component {

  constructor(){
    super();

    this.state = {
      msg:''
    }
  }

  componentDidMount(){
    //this.updateMessage();
  }
  
  updateMessage(msg_string){
    this.setState({msg:msg_string});
  }

  render() {    
        return (
          <div className="app-messages">
            <div className="alert-info">   
            {this.state.msg}
            </div>
          </div>
      );

  }

}

export default Messages;