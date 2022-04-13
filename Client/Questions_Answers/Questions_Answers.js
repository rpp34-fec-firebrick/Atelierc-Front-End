import React from 'react';
import axios from 'axios';
import Questions from './Questions.js';
import Search from './Search.js';

class Questions_Answers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      displayedQuestions: [],
      searchText: ''
    };

  }

  componentDidMount () {
    var orderAnswers = (ans) => {
      let orderedAnswers = [];
      let sellerAnswers = [];

      for (var key in ans) {
        if (orderedAnswers.length === 0) {
          if (ans[key].answerer_name === 'Seller') {
            console.log('Seller!');
            sellerAnswers.push(ans[key]);

          } else {
            orderedAnswers.push(ans[key]);

          }

        } else {
          if (ans[key].answerer_name === 'Seller') {
            sellerAnswers.push(ans[key]);
          } else {
            if (ans[key].helpfulness >= orderedAnswers[0].helpfulness) {
              orderedAnswers.unshift(ans[key]);

            } else if (ans[key].helpfulness <= orderedAnswers[0].helpfulness) {
              orderedAnswers.push(ans[key]);
            }

          }
        }
      }

      orderedAnswers.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      })

      if (sellerAnswers.length > 0) {
        console.log('OH MY GOD THERES ACTUALLY SELLER ANSWERS IN HERE', sellerAnswers)
      }

      return sellerAnswers.concat(orderedAnswers);
    }

    var randomIndex = Math.floor(Math.random() * 1011);
    randomIndex += 64620;

    axios.post('/questions', {
      productId: randomIndex
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
    })
  }

  onSearchChange (e) {
    this.setState({
      searchText: e.target.value
    })
  }

  loadMoreQuestions () {
    this.setState({
      displayedQuestions: this.state.questions
    })
  }

  render() {
    if (this.state.questions.length === 0) {
      return (
        <h3>There isn't any questions for this product yet</h3>
      )
    } else {
      return (
        <div>
          <h1>Questions and Answers</h1>
          <Search searchChange={this.onSearchChange.bind(this)} text={this.state.searchText}/>
          <div>
            {this.state.displayedQuestions.map((question) =>
              <Questions question={question} />
            )}

          </div>
          <div>
            {this.state.questions.length > 2 ? <button onClick={this.loadMoreQuestions.bind(this)}>More Answered Questions</button> : <div></div>}
            <button>Add a Question +</button>
          </div>
        </div>
      );

    }
  }
};

export default Questions_Answers;