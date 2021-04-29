import React from "react";


function SearchBar(props) {
    console.log(props);
    return (
        <form>
        <div className="form-group">
          <label htmlFor="search">Search:</label>
          <input
            onChange={props.handleInput}
            value={props.search}
            name="search"
            type="text"
            className="form-control"
            placeholder="Search for a Gif"
            id="search"
          />
          <button onClick={props.handleFormSubmit} className="btn btn-primary mt-3">
            Search
          </button>
        </div>
      </form>
    )
}

export default SearchBar;