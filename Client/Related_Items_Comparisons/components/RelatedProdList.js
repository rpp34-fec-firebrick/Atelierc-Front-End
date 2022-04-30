import React from 'react';
import RelatedCard from './RelatedCard';

class RelatedCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dataToFeedTable: {}
    };


  }

  render() {
    return (
      <div className="Related-Card list">
        {this.props.productInfo.map((product, index) => {
          return (<RelatedCard
            product={product}
            key={index}
            eventHandler={this.props.eventHandler}
            dataToFeedTable={this.props.dataToFeedTable}
            currProdInfo={this.props.currProdInfo}
            productStyle={this.props.allRelatedProductStyle}
          />);
        })}
      </div>
    )
  }
};


export default RelatedCardList;