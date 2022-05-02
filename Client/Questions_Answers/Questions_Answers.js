import React from 'react';
import axios from 'axios';
import Questions from './Questions.js';
import Search from './Search.js';
import Modal from './Modal.js';

class Questions_Answers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 0,
      productName: 'A Pretend Product, but only for now',
      questions: [],
      displayedQuestions: [],
      searched: [],
      questionIndex: 2,
      modalUp: false,
      searchText: '',
    };

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.productId !== prevState.productId) {
      return { productId: nextProps.productId };
    } else {
      return null;
    }
  }

  componentDidMount () {
    var configureDate = (date) => {
      if (date.indexOf('-') === -1) {
        return date;
      }

      let months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
      };

      date = date.split('-');
      let day = date[2].split('T')[0];
      let month = months[date[1]];
      let year = date[0]

      return `${month} ${day}, ${year}`;
    };

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

      orderedAnswers.forEach((answer) => {
        answer.date = configureDate(answer.date);
      });

      return sellerAnswers.concat(orderedAnswers);
    };

    axios.post('/questions', {
      productId: this.state.productId
    })
    .then((response) => {

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
    .catch((err) => {
      console.log(`There was an error getting question data: ${err}`);
    })
    .then(() => {
      axios.post('/productsForQuestions', {
        productId: this.state.productId
      })
      .then((productData) => {
        this.setState({
          productName: productData.data
        })
      })

    })
    .catch((err) => {
      console.log(`There was an error getting the product name: ${err}`);
    })

  }

  onTextChange (e) {
    this.setState({
      [e.target.id]: e.target.value
    }, () => { this.searchUpdate(this.state.searchText) });
  }

  searchUpdate () {
    let div = document.getElementById('questionList');

    if (this.state.searchText.length >= 3) {
      // div.removeChild(div.firstChild);
      div.style.display = 'none';

      let search = [];
      let searchTerm = this.state.searchText;

      for (var i = 0; i < this.state.questions.length; i++) {
        let currentQuestion = this.state.questions[i].question_body;

        if (currentQuestion.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          search.push(this.state.questions[i]);
        }
      }

      this.setState({
        searched: search
      }, () => { console.log(this.state.searched) });

    } else {
      div.style.display = '';
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

    if (!this.state.modalUp) {

      this.setState({
        modalUp: true
      }, () => {
        let questionModal = document.getElementById('questionModal');
        questionModal.style.display = "block";
      });
    } else {
      let questionModal = document.getElementById('questionModal');
      questionModal.style.display = "none";

      this.setState({
        modalUp: false
      });
    }
  }

  render() {
    if (this.state.questions.length === 0) {
      return (
        <div className="QnAContainer color" data-testid="QnAWidget">
          <h4 id="QnAHeader">QUESTIONS &amp; ANSWERS</h4>
          <h3 className="QnAPadLeft">There isn't any questions for this product yet</h3>
          <div className="questionButton" onClick={this.handleQuestionModal.bind(this)} data-testid="questionBtn">Add a Question +</div>

          {
            this.state.modalUp ?
            <Modal type={'question'} product={this.state.productName} productId={this.state.productId} toggleModal={this.handleQuestionModal.bind(this)} refresh={this.componentDidMount.bind(this)} />
            : <></>
          }

        </div>
      )
    } else {
      return (
        <div className="QnAContainer color" data-testid="QnAWidget">
          <div>
            <h4 id="QnAHeader">QUESTIONS &amp; ANSWERS</h4>
            <Search text={this.state.searchText} searchChange={this.onTextChange.bind(this)} />
            <div>
                <div id="questionList" data-testid="questionList">{this.state.displayedQuestions.map((question) => <Questions question={question} product={this.state.productName} refresh={this.componentDidMount.bind(this)}/> )}</div>

                {
                  this.state.searchText.length > 2 ? <div id="searchedList">{this.state.searched.map((search) => <Questions question={search} product={this.state.productName} refresh={this.componentDidMount.bind(this)} />)}</div> : <></>
                }

              <div>
                {
                  this.state.modalUp ?
                  <Modal type={'question'} product={this.state.productName} productId={this.state.productId} toggleModal={this.handleQuestionModal.bind(this)} refresh={this.componentDidMount.bind(this)} />
                  : <></>
                }
              </div>
            </div>
            {this.state.questions.length > 2 ? (this.state.questions.length === this.state.displayedQuestions.length ? <></> : <div className="questionButton" onClick={this.loadMoreQuestions.bind(this)}><b>MORE ANSWERED QUESTIONS</b></div>) : <></>}
            <div className="questionButton" onClick={this.handleQuestionModal.bind(this)} data-testid="questionBtn"><b>ADD A QUESTION +</b></div>
          </div>
        </div>
      );

    }
  }
};

export default Questions_Answers;