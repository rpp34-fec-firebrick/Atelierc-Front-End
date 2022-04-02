import React from 'react';
import ReactDOM from 'react-dom';
import Product_Detail_Page from './Product_Detail_Page/Product_Detail_Page.js'
import Ratings_Reviews from './Ratings_Reviews/Ratings_Reviews.js'
import Questions_Answers from './Questions_Answers/Questions_Answers.js'
import Related_Items_Comparisons from './Related_Items_Comparisons/Related_Items_Comparisons.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <Product_Detail_Page />
        <Ratings_Reviews />
        <Questions_Answers />
        <Related_Items_Comparisons />
      </div>
    );
  }
}


ReactDOM.render(<App />,document.getElementById('app'));