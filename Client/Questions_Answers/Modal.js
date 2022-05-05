import React from 'react';
import axios from 'axios';

class Modal extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      questionBody: '',
      answerBody: '',
      nickname: '',
      email: '',
      images: [],
      locations: []
    }
  }

  handleTextChange (e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleUpload () {
    if (this.state.images.length <= 5) {
      let fd = new FormData ();

      for(var i = 0; i < this.state.images.length; i++) {
        fd.append('images', this.state.images[i]);

      }

      axios.post('/uploadImages', fd)
      .then((res) => {
        this.setState({
          images: res.data.urls,
          locations: res.data.keys
        }, () => { console.log(this.state.images, this.state.locations) });
      })
    } else {
      alert('Please only upload five images.');
    }
  }

  handleSubmission (type) {
    let canSubmit, body;

    if (type === 'question') {
      body = this.state.questionBody;
    } else {
      body = this.state.answerBody;
    }

    let entry = this.state;

    if (body.length === 0 || entry.nickname.length === 0 || entry.email.length === 0) {
      canSubmit = false;
    } else {
      canSubmit = true;
    }

    if (type === 'question') {
      if (canSubmit) {
        axios.post('/questionSubmit', {
          body: entry.questionBody,
          name: entry.nickname,
          email: entry.email,
          product_id: this.props.productId
        })
        .then(() => {
          this.props.refresh();
        })
        .then(() => {
          this.setState({
            questionBody: '',
            nickname: '',
            email: ''
          }, this.props.toggleModal());
        })

      } else {
        alert(`Couldn't submit your quesiton. Either a field was left blank or the email is in an incorrect format.`);
      }

    } else {
      if (canSubmit) {
        axios.post('/answerSubmit', {
          question_id: this.props.question.question_id,
          answerContents: {
            body: entry.answerBody,
            name: entry.nickname,
            email: entry.email,
            photos: entry.images
          }
        })
        .then(() => {
          this.props.refresh();
        })
        .then(() => {
          this.setState({
            answerBody: '',
            nickname: '',
            email: '',
            photos: []
          }, this.props.toggleModal());
        })
      } else {
        alert(`Couldn't submit your quesiton. Either a field was left blank, the email is in an incorrect format, or an image uploaded was not able to be processed.`);
      }
    }

  }

  render () {
    return (
      <div className="lightText" id={`${this.props.type}Modal`} data-testid="modal">
        <div id={`${this.props.type}ModalContent`}>
          <span className="close" onClick={() => { this.props.toggleModal() }}>&times;</span>
          {
            this.props.type === 'question' ?
            <div>
              <h2>Ask Your Question</h2>
              <h3>About the {this.props.product}</h3>
              <div>
                Your question:
              </div>
              <textarea id="questionBody" data-testid="questionBody" maxLength="1000" rows="5" cols="33" placeholder="Why did you like the product or not?" value={this.state.questionBody} onChange={(e) => { this.handleTextChange(e) }}></textarea>
            </div>

            :

            <div>
              <h2>Submit Your Answer</h2>
              <h3>{this.props.product}: "{this.props.question.question_body}"</h3>
              <div>
                Your answer:
              </div>
              <textarea id="answerBody" data-testid="answerBody" maxLength="1000" rows="5" cols="33" placeholder="What would you like to say for this question?" value={this.state.answerBody} onChange={(e) => { this.handleTextChange(e) }}></textarea>
            </div>
          }

          <div className="QnAPadTop">
            Nickname:
            <input type="text" id="nickname" data-testid="nickname" maxLength="60" placeholder={this.props.type === 'question' ? 'Example: jackson11!' : 'Example: jack543!'} value={this.state.nickname} onChange={(e) => { this.handleTextChange(e) }} />
          </div>
          <div id="noticeText">For privacy reasons, do not use your full name or email address.</div>

          <div>
            E-mail:
            <input type="email" id="email" data-testid="email" maxLength="60" placeholder="sample@email.com" value={this.state.email} onChange={(e) => { this.handleTextChange(e) }} />
          </div>
          <div id="noticeText">For authentication reasons, you will not be emailed.</div>

          {
            this.state.locations.length > 0 ?
            this.state.locations.map((imageKey) => <span><img className="answerImage" src={`/images/${imageKey}`}></img></span>)

            :

            <></>
          }

          {
            this.props.type === 'answer' ?
            <div>
              <input type="file" accept="image/*"
              onChange={(e) => { this.setState({ images: e.target.files }, () => { this.handleUpload() }) }}
              ref={fileUpload => this.fileUpload = fileUpload}
              style={{display: 'none'}}
              multiple/>
              <div className="questionButton" data-testid="uploadBtn" onClick={() => { this.fileUpload.click() }}><b>UPLOAD IMAGES</b></div>
              <div className="questionButton" data-testid="submitAnswer" onClick={() => { this.handleSubmission('answer') }}><b>SUBMIT ANSWER</b></div>
            </div>

            : <></>
          }


          {
            this.props.type === 'question' ?
            <div>
              <div className="questionButton" data-testid="submitQuestion" onClick={() => { this.handleSubmission('question') }}><b>SUBMIT QUESTION</b></div>
            </div>
            :
            <></>
          }
        </div>
      </div>
    )
  }
}

export default Modal;