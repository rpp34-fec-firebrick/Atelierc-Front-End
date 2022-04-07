import React from 'react';

class Product_Detail_Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test : props.productData.campus
    };
  }

  componentDidMount () {
    console.log(props.productData.campus)
  }

  render() {
    return (
      <div>
        {this.state.test}
      </div>
    );
  }
};

export default Product_Detail_Page;