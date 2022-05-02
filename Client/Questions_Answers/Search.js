import React from 'react';

function Search (props) {
    return (
      <div className="QnAPadDown" key="search">
        <input type="text" id="searchText" onChange={props.searchChange} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." value={props.text} />
      </div>
    )
}

export default Search;