import React from 'react';
import Answers from './Answers.js';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: props.question,
      helpful: false,
      reported: props.question.reported,
      answers: props.question.answers,
      displayedAnswers: props.question.answers.slice(0, 2)
    }

  }

  render () {
    console.log(this.state.displayedAnswers)
    return (
      <div key={this.state.question.question_id}>
        <h3>Q: {this.state.question.question_body}</h3>
        <div>
          <h4>A:</h4>
          {this.state.displayedAnswers.map((answer) =>
            <Answers answer={answer} />

          )}
        </div>
      </div>
    )
  }
}

export default Questions;