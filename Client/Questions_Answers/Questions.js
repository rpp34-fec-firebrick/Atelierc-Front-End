import React from 'react';
import Answers from './Answers.js';
import Axios from 'axios';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: props.question,
      questionHelpfulness: this.props.question.question_helpfulness,
      helpful: false,
      reported: false,
      answers: props.question.answers,
      displayedAnswers: props.question.answers.slice(0, 2)
    }
  }

  questionHelpful () {
    if (!this.state.helpful) {
      Axios.post('/questionHelpful', {
        question_id: this.state.question.question_id
      })
      .then(() => {
        this.setState({
          helpful: true,
          questionHelpfulness: this.state.questionHelpfulness+1
        })

      })

    }

  }

  render () {
    // Probably need to add an actual link to Yes and Add Answer instead of using <u> tags
    return (
      <div key={this.state.question.question_id}>
        <h3>Q: {this.state.question.question_body}</h3>
        <div>Helpful? | <div onClick={this.questionHelpful.bind(this)}><u>Yes</u></div> ({this.state.questionHelpfulness}) | </div>
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