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
        Have a question? Search for answers...
      </div>
    )
  }
}

export default Search;