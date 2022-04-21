import React from 'react';
import axios from 'axios';

import Answers from './Answers.js';
import Modal from './Modal.js';

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
      displayedAnswers: props.question.answers.slice(0, 2),
      modalUp: false
    }
  }

  questionHelpful () {
    if (!this.state.helpful) {
      axios.post('/questionHelpful', {
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

  handleTextChange (e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleAnswerModal () {
    let answerModal = document.getElementById('answerModal');

    if (!this.state.modalUp) {
      answerModal.style.display = "block";

      this.setState({
        modalUp: true
      })
    } else {
      answerModal.style.display = "none";


      this.setState({
        modalUp: false
      })
    }

  }


  render () {
    return (
      <div key={this.state.question.question_id}>
        <h3 id="questionHead">Q: {this.state.question.question_body}</h3>
        <span>Helpful? <span onClick={this.questionHelpful.bind(this)}><u>Yes</u> ({this.state.questionHelpfulness})</span>

        &nbsp; | &nbsp;

        <span onClick={this.handleAnswerModal.bind(this)}><u>Add Answer</u></span>
        </span>
        <div>
          {this.state.displayedAnswers.length === 0 ? <h4>There are no answers for this question</h4> : <h4 id="answerHead">A:</h4>}

          {this.state.displayedAnswers.map((answer) => <Answers answer={answer} /> )}
        </div>
        <div>

        {
        this.state.answers.length > 2 ?

        (!this.state.expanded ? <div onClick={this.loadMoreAnswers.bind(this)}><b>Load more answers</b></div> : <div onClick={this.collapseAnswers.bind(this)}><b>Collapse answers</b></div>)

        : <div></div>
        }

        </div>

        <Modal type={'answer'} product={this.props.product} question={this.state.question} toggleModal={this.handleAnswerModal.bind(this)} />

      </div>
    )

  }
}

export default Questions;