import React from 'react';
import DescriptionListRender from './DescriptionListRender.js';

class DescriptionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems : null
    }
  }

  UNSAFE_componentWillReceiveProps (props) {
    if (props !== undefined) {
      this.setState({['listItems']: props.listItems})
    }
  }

  render () {
    return (
      <div>
        {(typeof this.state.listItems !== 'array') ?
        console.log('hi')
          // this.state.listItems.features.map((item) =>
          // <DescriptionListRender item = {item}/>)
          : null}
      </div>
    );
  }
}


export default DescriptionList;