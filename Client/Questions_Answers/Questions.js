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
      .catch((err) => {
        console.log(`Error submitting question to server: ${err}`);
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

  handleAnswerModal () {

    if (!this.state.modalUp) {
      this.setState({
        modalUp: true
      }, () => {
        let answerModal = document.getElementById('answerModal');
        answerModal.style.display = "block";
      });

    } else {
      let answerModal = document.getElementById('answerModal');
      answerModal.style.display = "none";

      this.setState({
        modalUp: false
      });
    }

  }


  render () {
    return (
      <div key={this.state.question.question_id}>
        <h3 id="questionHead">Q: {this.state.question.question_body}</h3>
        <span id="questionLinks">Helpful? <span onClick={this.questionHelpful.bind(this)}><u className="onHover">Yes</u> ({this.state.questionHelpfulness})</span>

        &nbsp; | &nbsp;

        <span onClick={this.handleAnswerModal.bind(this)}><u className="onHover">Add Answer</u></span>
        </span>
        <div>
          {this.state.displayedAnswers.length === 0 ? <h4 className="QnAPadLeft" id="noAnswers">There are no answers for this question</h4> : <h3 className="QnAPadDown" id="answerHead">A:</h3>}

          {this.state.displayedAnswers.map((answer) => <Answers answer={answer} /> )}
        </div>
        <div>

        {
        this.state.answers.length > 2 ?

        (!this.state.expanded ? <div className="QnAPad" id="toggleAnswers" onClick={this.loadMoreAnswers.bind(this)}><b className="onHover">LOAD MORE ANSWERS</b></div> : <div className="QnAPad" id="toggleAnswers" onClick={this.collapseAnswers.bind(this)}><b className="onHover">COLLAPSE ANSWERS</b></div>)

        : <div></div>
        }

        </div>
        {
          this.state.modalUp ?
          <Modal type={'answer'} product={this.props.product} question={this.state.question} toggleModal={this.handleAnswerModal.bind(this)} refresh={this.props.refresh} />
          : <></>
        }

      </div>
    )

  }
}

export default Questions;