import React from 'react';
import Axios from 'axios';

class Answers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: props.answer,
      helpful: false,
      answerHelpfulness: props.answer.helpfulness,
      reported: false
    }
  }

  answerHelpful () {
    if (!this.state.helpful) {
      Axios.post('/answerHelpful', {
        answer_id: this.state.answer.id
      })
      .then(() => {
        this.setState({
          helpful: true,
          answerHelpfulness: this.state.answerHelpfulness+1
        })

      })

    }

  }

  render () {
    return (
      <div key={this.state.answer.id}>
        <div>
          <b>{this.state.answer.body}</b>
        </div>
        <div>
          by {this.state.answer.answerer_name === 'Seller' ? <b>Seller</b> : this.state.answer.answerer_name}, {this.state.answer.date}
        </div>
        <div>Helpful? | <div onClick={this.answerHelpful.bind(this)}><u>Yes</u></div> ({this.state.answerHelpfulness}) |</div>
        <div><u>Report</u></div>
      </div>
    )
  }
}

export default Answers;