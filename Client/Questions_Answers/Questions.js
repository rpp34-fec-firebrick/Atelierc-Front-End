import React from 'react';
import Answers from './Answers.js';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onDisplay: props.display
    }
  }

  render () {
    return (
      <div>
        Questions here
        <Answers answers={this.state.onDisplay} />

      </div>
    )
  }
}

export default Questions;