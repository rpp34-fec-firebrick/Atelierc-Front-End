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
      expanded: false,
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

  loadMoreAnswers () {
    this.setState({
      expanded: true,
      displayedAnswers: this.state.answers
    })
  }

  collapseAnswers () {
    this.setState({
      expanded: false,
      displayedAnswers: this.state.answers.slice(0, 2)
    })
  }

  render () {

    if (this.state.question === undefined) {
      return (
        <h3>There are no questions for this product</h3>
      )
    } else {
      return (
        <div key={this.state.question.question_id}>
          <h3 id="questionHead">Q: {this.state.question.question_body}</h3>
          <span>Helpful? <span onClick={this.questionHelpful.bind(this)}><u>Yes</u> ({this.state.questionHelpfulness})</span>

          &nbsp; | &nbsp;

          <span><u>Add Answer</u></span>
          </span>
          <div>
            {this.state.displayedAnswers.length === 0 ? <h4>There are no answers for this question</h4> : <h4 id="answerHead">A:</h4>}

            {this.state.displayedAnswers.map((answer) =>
              <Answers answer={answer} />

            )}
          </div>
          <div>
          {this.state.answers.length > 2 ? (!this.state.expanded ? <div onClick={this.loadMoreAnswers.bind(this)}><b>Load more answers</b></div> : <div onClick={this.collapseAnswers.bind(this)}><b>Collapse answers</b></div>) : <div></div>}

          </div>
        </div>
      )

    }
  }
}

export default Questions;