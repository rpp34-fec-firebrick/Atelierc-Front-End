import React from 'react';
import StyleRender from './SubComponentLevel1/StyleRender.js'

class StyleSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles : [],
      handleStyleClick : '',
      currentStyle: null
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    if (props !== undefined) {
      this.setState({['styles']: props.styles})
      this.setState({['handleStyleClick']: props.onClick})
      this.setState({['currentStyle']: props.styleId})
    }
  }


  render() {
    return (
      <div>
        <div>Style > {this.state.currentStyle?.name}</div>
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