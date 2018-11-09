import React, { Component } from "react";
import NumberContext from "./Context";

function Counter(props) {
  return (
    //by using consumer we are using value in our component.
    // we need to use a function to get our value
    <NumberContext.Consumer>{val => <h3>{val} </h3>}</NumberContext.Consumer>
  );
}

class Test extends Component {
  state = {
    number: 0
  };

  onIncHandler = () => {
    this.setState({
      number: this.state.number + 1
    });
  };

  onDecHandler = () => {
    this.setState({
      number: this.state.number - 1
    });
  };
  render() {
    return (
      <div className="App">

        {/* by using provider we are providing value to the counter component */}
        <NumberContext.Provider value={this.state.number}>
          <Counter />
        </NumberContext.Provider>

        <button onClick={this.onIncHandler} className="btn">
          Inc (+)
        </button>
        <button onClick={this.onDecHandler} className="btn">
          Dec (-)
        </button>
      </div>
    );
  }
}
export default Test;