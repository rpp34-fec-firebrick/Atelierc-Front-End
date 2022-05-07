import React from 'react';
class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.stars === 1) {
      return (
        <div class="starRating">
          <span class="fa fa-star checked"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span>
        </div>
      );
    } else if (this.props.stars === 2) {
      return (
        <div class="starRating">
          <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span>
        </div>
      );
    } else if (this.props.stars === 3) {
      return (
        <div class="starRating">
          <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star-o"></span><span class="fa fa-star-o"></span>
        </div>
      );
    } else if (this.props.stars === 4) {
      return (
        <div class="starRating">
          <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star-o"></span>
        </div>
      );
    } else if (this.props.stars === 5) {
      return (
        <div class="starRating">
          <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>
        </div>
      );
    } else if (this.props.stars === 0) {
      return (
        <div>No Stars</div>
      )
    }
  }
}

export default Stars;