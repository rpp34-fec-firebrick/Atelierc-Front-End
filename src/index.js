import React from 'react';
import ReactDOM from 'react-dom';
import Widget1 from './Widget1/Widget1.js'
import Widget2 from './Widget2/Widget2.js'
import Widget3 from './Widget3/Widget3.js'
import Widget4 from './Widget4/Widget4.js'

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
        <Widget1 />
        <Widget2 />
        <Widget3 />
        <Widget4 />
      </div>
    );
  }
}


ReactDOM.render(<App />,document.getElementById('app'));