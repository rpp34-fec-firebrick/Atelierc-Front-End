import React from 'react';
import Questions from './Questions.js';
import Search from './Search.js';

class Questions_Answers extends React.Component {
  constructor(props) {
    super(props);

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
        <Search />
        <div>
          {this.state.displayedQuestions.map((question) =>
            <Questions question={question} />
          )}

        </div>
      </div>
    );
  }
};

export default Questions_Answers;