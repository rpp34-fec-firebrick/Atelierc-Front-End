import React from 'react';

class Answers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: props.answer,
      helpful: false,
      reported: false
    }
  }

  render () {
    return (
      <div key={this.state.answer.id}>
        <div>
          <b>{this.state.answer.body}</b>
        </div>
        <div>
          by {this.state.answer.answerer_name}, {this.state.answer.date}
        </div>
      </div>
    )
  }
}

export default Answers;