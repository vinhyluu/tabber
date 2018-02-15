import React from "react";

export default class SearchTab extends React.Component {
    render() {
        return (
            <div>
                <form action="" onSubmit={this.props.search} className="searchTab">
                    <div>
                        <label htmlFor="tabSearch"></label>
                        <input type="text" id="searchedTab" name="enteredTab" onChange={this.props.value} className="searchInput" placeholder="Search for guitar tabs here" autoComplete="off" />
                        <button type="submit" className="magnify"><span className="sr-only">Magnifying glass that's also a search button</span><i className="fa fa-search" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        )
    }
}