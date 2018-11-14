// Import react from npm react as 'React'
import React from "react";

// create a new class called 'Counter' with adding all React features using extends React.Component
class Counter extends React.Component {
  // Set a state with a variable called 'count'.
  state = {
    count: 0
  };

  // Create a state handler that focuses on 'count' and then change the count +1 or -1
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleDecrement = () => {
    this.setState({count: this.state.count -1 });
  }

  // Call a method on the Counter class aka Counter.render as a feature from 'react.component'
  render() {
    // The method returns this jsx.
    return (
      <div className="card text-center">
        <div className="card-header bg-primary text-white">
          Click Counter!
        </div>
        <div className="card-body">
          {/* Display the count of the this.state.count */}
          <p className="card-text">Click Count: {this.state.count}</p>
          {/* When this button is clicked run the method of Counter called 'handleIncrement */}
          <button className="btn btn-primary" onClick={this.handleIncrement}>
            Increment
          </button>
          {/* When this button is clicked run the method of Counter called 'handleDecrement */}
          <button className="btn btn-danger" onClick={this.handleDecrement}>
            Decrement
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
