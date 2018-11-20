// Import react from npm react as 'React'
import React, {Component} from "react";

// create a new class called 'Counter' with adding all React features using extends React.Component
class NameComponent extends Component {
  // Set a state with a variable called 'count'.
  // STATE HERE <=====
  state = {
    count: 0
  };

  componentDidMount() {
    // STUFF YOU WANT RAN ON RENDER <=====
  }

  // Create a state handler that focuses on 'count' and then change the count +1 or -1
  // METHODS HERE <=====
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // Call a method on the Counter class aka Counter.render as a feature from 'react.component'
  render() {
    // The method returns this jsx.
    return (
      // HTML CONTENT HERE <=====
    );
  }
}

export default NameComponent;
