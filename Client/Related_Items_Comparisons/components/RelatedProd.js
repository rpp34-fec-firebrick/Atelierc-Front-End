import React from 'react';

class RelatedProd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: props.productInfo
    }
  }


  
  render () {
    return (
      <div>
        <h2>Related Product goes here.</h2>
        <h3>{this.props.relatedProduct}</h3>
      </div>
    )
  }
}

export default RelatedProd;