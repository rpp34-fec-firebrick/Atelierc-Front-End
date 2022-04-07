import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import Product_Detail_Page from './Product_Detail_Page/Product_Detail_Page.js'
import Ratings_Reviews from './Ratings_Reviews/Ratings_Reviews.js'
import Questions_Answers from './Questions_Answers/Questions_Answers.js'
import Related_Items_Comparisons from './Related_Items_Comparisons/Related_Items_Comparisons.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 0,
      starValue: 0,
      reviews : [],
      styles: [],
      relatedProducts : [],
      myOutfit : [],
      questions: this.props.questions
    };

  }

  // Initial Post Request to the Server
// componentDidMount () {
//   var randomIndex = Math.floor(Math.random() * 1011);
//   randomIndex += 64620;
//   // var randomIndex = 64620;
//   axios.post('/products', {
//     productId: randomIndex
//   })
//   .then((response) => {
//     console.log('Successful Post Request');
//     console.log(response.data);
//   }).catch((error) => {
//     console.log('error', 'error');
//   })

//   axios.post('/questions', {
//     productId: randomIndex
//   })
//   .then((response) => {
//     console.log('Successful Question Request: ', response.data);
//     this.setState({
//       questions: response.data
//     })
//   }).catch((error) => {
//     console.log(`There was an error getting question data: ${error}`);
//   })

//   axios.post('/reviews', {
//     productId: randomIndex,
//   })
//   .then((response) => {
//     console.log('Successful Reviews Request');
//     console.log(response.data);
//   }).catch((error) => {
//     console.log('error', 'error');
//   })

// }


  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is</h2>
        <Product_Detail_Page />
        <Ratings_Reviews />
        <Questions_Answers questions={this.state.questions}/>
        <Related_Items_Comparisons />
      </div>
    );
  }
}

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

  orderedAnswers.sort((a, b) => {
    return b.helpfulness - a.helpfulness;
  })

  return orderedAnswers;
}

var setUp = () => {

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
    ReactDOM.render(<App questions={questions} />, document.getElementById('app'));
  })
  .catch((error) => {
    console.log(`There was an error getting question data: ${error}`);
  })

}

setUp();