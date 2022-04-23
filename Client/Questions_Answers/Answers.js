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
        });
      })
    }
  }

  reportAnswer () {
    if (!this.state.reported) {
      Axios.post('/answerReport', {
        answer_id: this.state.answer.id
      })
      .then(() => {
        this.setState({
          reported: true
        });

      })
    }
  }

  render () {
    return (
        <>
          <span className="QnAPad" id="answerBody">{this.state.answer.body}</span>
          {
            this.state.answer.photos.length > 0 ?

            <div className="QnAPadLeft">
              {this.state.answer.photos.map((photo) => <img className="answerImage" onClick={(e) => {
                let srcArr = e.target.src.split('/');
                for (var i = 0; i < this.state.answer.photos.length; i++) {
                  if (this.state.answer.photos[i].includes(srcArr[srcArr.length - 1])) {
                    console.log('Found it!');
                  }
                } }} src={photo} />)}
            </div>

            :
            <></>
          }
          <div className="QnAPad" id="answerInfo">
            by {this.state.answer.answerer_name === 'Seller' ? <b>Seller</b> : this.state.answer.answerer_name}, {this.state.answer.date} &nbsp; | &nbsp; Helpful? <span onClick={this.answerHelpful.bind(this)}><u>Yes</u> ({this.state.answerHelpfulness})</span> &nbsp; | &nbsp; <span onClick={this.reportAnswer.bind(this)}><u>{!this.state.reported ? 'Report' : 'Reported'}</u></span>
          </div>
        </>
    )
  }
}

export default Answers;