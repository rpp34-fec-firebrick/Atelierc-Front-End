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
      displayedAnswers: props.question.answers.slice(0, 2),
      modalUp: false,
      answerBody: '',
      nickname: '',
      email: ''
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

  handleAnswerSubmission () {
    let canSubmit;

    let entry = this.state;

    if (entry.questionBody.length === 0 || entry.nickname.length === 0 || entry.email.length === 0) {
      console.log('empty field');
      canSubmit = false;
    } else if (entry.email.indexOf('.') < entry.email.indexOf('@') || entry.email.indexOf('@') === -1) {
      console.log('email format bad');
      canSubmit = false;
    } else {
      canSubmit = true;
    }

    if (canSubmit) {
      axios.post('/answerSubmit', {
        body: entry.questionBody,
        name: entry.nickname,
        email: entry.email,
        product_id: entry.productId
      })
      .then(() => {
        // add another then block that calls componentDidMount to update questions
        this.handleAnswerModal();
      })
    } else {
      alert(`Couldn't submit your quesiton. Either a field was left blank or the email is in an incorrect format.`);
    }
  }


  render () {
    return (
      <div key={this.state.question.question_id}>
        <h3 id="questionHead">Q: {this.state.question.question_body}</h3>
        <span>Helpful? <span><u>Yes</u> ({this.state.questionHelpfulness})</span>

        &nbsp; | &nbsp;

        <span onClick={this.handleAnswerModal.bind(this)}><u>Add Answer</u></span>
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

        <div id="answerModal">
            <div id="answerModalContent">
              <span className="close" onClick={this.handleAnswerModal.bind(this)}>&times;</span>
              <h2>Submit Your Answer</h2>
              <h3>[PRODUCT NAME]: [QUESTION BODY]</h3>
              <div>
                Your answer:
              </div>
              <textarea id="answerBody" maxLength="1000" rows="5" cols="33" placeholder="Why did you like the product or not?" onChange={(e) => { this.handleTextChange(e) }}></textarea>

              <div>
                Nickname:
                <input type="text" id="nickname" maxLength="60" placeholder="Example: jack543!" onChange={(e) => { this.handleTextChange(e) }} />
              </div>
              <div>For privacy reasons, do not use your full name or email address.</div>

              <div>
                E-mail:
                <input type="text" id="email" maxLength="60" placeholder="Example: jack@email.com" onChange={(e) => { this.handleTextChange(e) }} />
              </div>
              <div>For authentication reasons, you will not be emailed.</div>

              <div>ADD PICTURE UPLOADER HERE</div>

              <button onClick={this.handleAnswerModal.bind(this)}>Submit Question</button>
            </div>
          </div>

      </div>
    )

  }
}

export default Questions;