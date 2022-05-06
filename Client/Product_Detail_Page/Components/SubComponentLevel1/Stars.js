import React from 'react';

class StarsProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.stars === 1) {
      return (
        <div>
          <span></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-o"></span>
          <span class="fa fa-star-o"></span>
          <span class="fa fa-star-o"></span>
          <span class="fa fa-star-o"></span>
        </div>
      );
    } else if (this.props.stars === 2) {
      return (
        <div>
          <span></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-o"></span>
          <span class="fa fa-star-o"></span>
          <span class="fa fa-star-o"></span>
        </div>
      );
    } else if (this.props.stars === 3) {
      return (
        <div>
          <span></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-o"></span>
          <span class="fa fa-star-o"></span>
        </div>
      );
    } else if (this.props.stars === 4) {
      return (
        <div>
          <span></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-o"></span>
        </div>
      );
    } else if (this.props.stars === 5) {
      return (
        <div>
          <span></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-o"></span>
        </div>
      );
    }
  }
}

export default StarsProductPage;