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
    // Probably need to add an actual link to Yes and Add Answer instead of using <u> tags
    return (
      <div key={this.state.question.question_id}>
        <h3>Q: {this.state.question.question_body}</h3>
        <div>Helpful? <u>Yes</u> ({this.state.question.question_helpfulness})</div>
        <div><u>Add Answer</u></div>
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