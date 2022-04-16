import React from 'react';
import StyleRender from './SubComponentLevel1/StyleRender.js'

class StyleSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles : [],
      handleStyleClick : ''
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    if (props !== undefined) {
      this.setState({['styles']: props.styles})
      this.setState({['handleStyleClick']: props.onClick})
    }
  }


  render() {
    return (
      <div>
          {(this.state.styles.length !== 0) ?
          this.state.styles.results?.map((style) =>
            <StyleRender onclick = {this.state.handleStyleClick}
            style = {style} key = {style.style_id}
            value = {style.style_id}/>)
          : null}
      </div>
    );
  }
}


export default StyleSelection;