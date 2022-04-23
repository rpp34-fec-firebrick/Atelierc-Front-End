import React from 'react';
import RelatedCard from './RelatedCard';
import RelatedCardImg from './RelatedCardImg';

class RelatedCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      dataToFeedTable: {
        currentProductName: "shoes1",
        relatedProductName: "shoes2",
        charas: [
          {
            currentProdVal: null,
            chara: 'pretty',
            relatedProdVal: 'yes'
          },
          {
            currentProdVal: 'no',
            chara: 'ugly',
            relatedProdVal: null
          }
        ]
      }
    };


  }

  render() {
    return (
      <div className="Related-Card-list">
        <h2>Related Product card list:</h2>
        <div className="Related-Card">
          {this.props.productInfo.map((product, index) => {
            return (<RelatedCard
              product={product}
              key={index}
              eventHandler={this.props.eventHandler}
              dataToFeedTable={this.props.dataToFeedTable}
              currProdInfo={this.props.currProdInfo}
            />);
          })}
          {this.props.productStyle.map((productStyle, index) => {
            return (<RelatedCardImg productStyle={productStyle} key={index} eventHandler={this.props.eventHandler} />);
          })}
        </div>
      </div>
    )
  }
};


export default RelatedCardList;