import React from 'react';
import Axios from 'axios';
import Photo from './Photo.js';

class Answers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: props.answer,
      helpful: false,
      answerHelpfulness: props.answer.helpfulness,
      reported: false,
      photo: '',
      modalUp: false
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

  handlePhotoModal () {
    if (!this.state.modalUp) {
      this.setState({
        modalUp: true
      }, () => {
        let photoModal = document.getElementById('photoModal');
        photoModal.style.display = "block";
      });

    } else {
      let photoModal = document.getElementById('photoModal');
      photoModal.style.display = "none";

      this.setState({
        modalUp: false
      });
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
                    this.setState({
                      photo: this.state.answer.photos[i]
                    }, () => { this.handlePhotoModal() })
                  }
                } }} src={photo} />)}
            </div>

            :
            <></>
          }

          {this.state.modalUp ? <Photo photo={this.state.photo} togglePhoto={this.handlePhotoModal.bind(this)} /> : <></>}

          <div className="QnAPad" id="answerInfo">
            by {this.state.answer.answerer_name === 'Seller' ? <b>Seller</b> : this.state.answer.answerer_name}, {this.state.answer.date} &nbsp; | &nbsp; Helpful? <span onClick={this.answerHelpful.bind(this)}><u>Yes</u> ({this.state.answerHelpfulness})</span> &nbsp; | &nbsp; <span onClick={this.reportAnswer.bind(this)}><u>{!this.state.reported ? 'Report' : 'Reported'}</u></span>
          </div>
        </>
    )
  }
}

export default Answers;