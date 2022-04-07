import React from 'react';
import Questions from './Questions.js'

class Questions_Answers extends React.Component {
  constructor(props) {
    super(props);

    //sort by helpfulness, then sort answers by helpfulness

    this.state = {
      questions: props.questions,
      displayedQuestions: props.questions.results.slice(0, 2),
      searchText: ''
    };

  }

  render() {
    return (
      <div>
        <h1>Questions and Answers</h1>
        <Questions display={this.state.displayedQuestions} />
      </div>
    );
  }
};

export default Questions_Answers;