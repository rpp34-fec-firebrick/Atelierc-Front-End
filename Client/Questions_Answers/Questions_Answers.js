import React from 'react';
import axios from 'axios';
import Questions from './Questions.js';
import Search from './Search.js';
import Modal from './Modal.js';

class Questions_Answers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: props.productId,
      productName: '',
      questions: [],
      displayedQuestions: [],
      searched: [],
      questionIndex: 2,
      modalUp: false,
      searchText: '',
      questionBody: '',
      nickname: '',
      email: ''
    };

  }

  // UNSAFE component will recieve props

  componentDidMount () {
    var orderAnswers = (ans) => {
      let orderedAnswers = [];
      let sellerAnswers = [];

      for (var key in ans) {
        if (orderedAnswers.length === 0) {
          if (ans[key].answerer_name === 'Seller') {
            sellerAnswers.push(ans[key]);

          } else {
            orderedAnswers.push(ans[key]);

          }

        } else {
          if (ans[key].answerer_name === 'Seller') {
            sellerAnswers.push(ans[key]);
          } else {
            orderedAnswers.push(ans[key]);
          }
        }
      }

      orderedAnswers.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      });

      if (sellerAnswers.length > 0) {
        console.log('OH MY GOD THERES ACTUALLY SELLER ANSWERS IN HERE', sellerAnswers);
      }

      return sellerAnswers.concat(orderedAnswers);
    }

    axios.post('/questions', {
      productId: this.state.productId
    })
    .then((response) => {
      console.log('Successful Question Request: ', response.data);

      response.data.results.forEach((question) => {
        question.answers = orderAnswers(question.answers)
      })

      return response.data;
    })
    .then((questions) => {
      this.setState({
        questions: questions.results,
        displayedQuestions: questions.results.slice(0, 2)
      })
    })
    .catch((error) => {
      console.log(`There was an error getting question data: ${error}`);
    });

    axios.post('/productsForQuestions', {
      productId: this.state.productId
    })
    .then((productData) => {
      this.setState({
        productName: productData.data
      })
    })
  }

  onTextChange (e) {
    this.setState({
      [e.target.id]: e.target.value
    }, this.searchUpdate());
  }

  searchUpdate () {
    // ARRAY SEEMS TO BE BEHIND BY ONE CHARACTER
    if (this.state.searchText.length >= 3) {
      let search = [];
      for(var i = 0; i < this.state.questions.length; i++) {
        if (this.state.questions[i].question_body.includes(this.state.searchText)) {
          search.push(this.state.questions[i]);
        }
      }

      this.setState({
        searched: search
      })
    }
  }

  loadMoreQuestions () {
    if (this.state.displayedQuestions.length !== this.state.questions.length) {
      if (this.state.questions.slice(0, this.state.questionIndex + 2) !== undefined) {
        this.setState({
          displayedQuestions: this.state.questions.slice(0, this.state.questionIndex + 2),
          questionIndex: this.state.questionIndex + 2
        });

      } else {
        this.setState({
          displayedQuestions: this.state.questions,
          questionIndex: this.state.questionIndex + 1
        })
      }
    }
  }

  handleQuestionModal () {
    let questionModal = document.getElementById('questionModal');

    if (!this.state.modalUp) {
      questionModal.style.display = "block";

      this.setState({
        modalUp: true
      })
    } else {
      questionModal.style.display = "none";

      this.setState({
        modalUp: false
      })
    }

  }

  handleQuestionSubmission () {
    let canSubmit;

    let entry = this.state;

    if (entry.questionBody.length === 0 || entry.nickname.length === 0 || entry.email.length === 0) {
      canSubmit = false;
    } else if (entry.email.indexOf('.') < entry.email.indexOf('@') || entry.email.indexOf('@') === -1) {
      canSubmit = false;
    } else {
      canSubmit = true;
    }

    if (canSubmit) {
      axios.post('/questionSubmit', {
        body: entry.questionBody,
        name: entry.nickname,
        email: entry.email,
        product_id: entry.productId
      })
      .then(() => {
        // add another then block that calls componentDidMount to update questions
        this.setState({
          questionBody: '',
          nickname: '',
          email: ''
        }, this.handleQuestionModal());
      })
    } else {
      alert(`Couldn't submit your quesiton. Either a field was left blank or the email is in an incorrect format.`);
    }
  }

  render() {
    if (this.state.questions.length === 0) {
      return (
        <div>
          <h3>There isn't any questions for this product yet</h3>
          <button onClick={this.handleQuestionModal.bind(this)}>Add a Question +</button>

          <Modal type={'question'} product={this.state.productName} productId={this.state.productId} toggleModal={this.handleQuestionModal.bind(this)} />

        </div>
      )
    } else {
      return (
        <div>
          <h1>Questions and Answers</h1>
          <Search searchChange={this.onTextChange.bind(this)} text={this.state.searchText}/>
          <div>
            {this.state.searchText.length < 3 ? this.state.displayedQuestions.map((question) => <Questions question={question} product={this.state.productName} /> ) : this.state.searched.map((search) => <Questions question={search} product={this.state.productName}/>)}

          </div>
          <div>
            {this.state.questions.length > 2 ? (this.state.questions.length === this.state.displayedQuestions.length ? <div></div> : <button onClick={this.loadMoreQuestions.bind(this)}>More Answered Questions</button>) : <div></div>}
            <button onClick={this.handleQuestionModal.bind(this)}>Add a Question +</button>

            <Modal type={'question'} product={this.state.productName} productId={this.state.productId} toggleModal={this.handleQuestionModal.bind(this)} />

          </div>
        </div>
      );

    }
  }
};

export default Questions_Answers;