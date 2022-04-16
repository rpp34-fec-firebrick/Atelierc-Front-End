import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: props.search
    }
  }


  render () {
    return (
      <div>
        <input type="text" id="searchText" onChange={this.props.searchChange} placeholder="Have a question? Search for answers..." value={this.props.text} />
      </div>
    )
  }
}

export default Search;