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

      for (var key in ans) {
        if (orderedAnswers.length === 0) {
          orderedAnswers.push(ans[key]);

        } else {
          if (ans[key].helpfulness >= orderedAnswers[0].helpfulness) {
            orderedAnswers.unshift(ans[key]);

          } else if (ans[key].helpfulness <= orderedAnswers[0].helpfulness) {
            orderedAnswers.push(ans[key]);
          }
        }
      }

      // if answerer_name === Seller, it needs to be put on the top of the array
      // maybe that could be done in the top iteration? put sellers into a separate array and then merge it once others have been sorted

      orderedAnswers.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      })

      return orderedAnswers;
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
        questions: questions,
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

  render() {
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
          <button>More Answered Questions</button>
          <button>Add a Question +</button>
        </div>
      </div>
    );
  }
};

export default Questions_Answers;