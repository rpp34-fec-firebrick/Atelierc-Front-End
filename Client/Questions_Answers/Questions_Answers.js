import React from 'react';
import axios from 'axios';
import Questions from './Questions.js';
import Search from './Search.js';
import Modal from './Modal.js';

class Questions_Answers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 64912,
      productName: '',
      questions: [],
      displayedQuestions: [],
      searched: [],
      questionIndex: 2,
      modalUp: false,
      searchText: '',
    };

  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.productId !== prevState.productId) {
  //     return { productId: nextProps.productId };
  //   } else {
  //     return null;
  //   }
  // }

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
    let search = [];

    for (var i = 0; i < this.state.questions.length; i++) {
      let currentQuestion = this.state.questions[i].question_body;
      if (currentQuestion.includes(this.state.searchText)) {
        search.push(this.state.questions[i]);
      }
    }

    this.setState({
      searched: search
    }, () => { console.log(this.state.searched) });
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

  render() {
    if (this.state.questions.length === 0) {
      return (
        <div className="QnAContainer">
          <h3>There isn't any questions for this product yet</h3>
          <button onClick={this.handleQuestionModal.bind(this)}>Add a Question +</button>

          <Modal type={'question'} product={this.state.productName} productId={this.state.productId} toggleModal={this.handleQuestionModal.bind(this)} refresh={this.componentDidMount.bind(this)} />

        </div>
      )
    } else {
      return (
        <div className="QnAContainer">
          <div>
            <h4>Questions and Answers</h4>
            <Search text={this.state.searchText}  searchChange={this.onTextChange.bind(this)} />
            <div id="questionList">
              <div>
                {this.state.searchText.length < 2 ? this.state.displayedQuestions.map((question) => <Questions question={question} product={this.state.productName} refresh={this.componentDidMount.bind(this)}/> ) : this.state.searched.map((search) => <Questions question={search} product={this.state.productName} refresh={this.componentDidMount.bind(this)} />)}

              </div>
              <div>
                <Modal type={'question'} product={this.state.productName} productId={this.state.productId} toggleModal={this.handleQuestionModal.bind(this)} refresh={this.componentDidMount.bind(this)} />

              </div>
            </div>
            {this.state.questions.length > 2 ? (this.state.questions.length === this.state.displayedQuestions.length ? <></> : <div className="questionButton" onClick={this.loadMoreQuestions.bind(this)}>More Answered Questions</div>) : <></>}
            <div className="questionButton" onClick={this.handleQuestionModal.bind(this)}>Add a Question +</div>
          </div>
        </div>
      );

    }
  }
};

export default Questions_Answers;