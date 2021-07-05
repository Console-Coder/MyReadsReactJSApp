import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookComponent from './BookComponent'
const BooksAPI = require('./BooksAPI')

class SearchComponent extends Component {
    state = { searchText: "", fetchedBooks: [] };
    initBookList = async (searchText) => {
        let booksArr = await BooksAPI.search(searchText, 20);
        let rtrnVal = []
        if (booksArr.length !== undefined)
            for (let el of booksArr) {
                let propsToGive = {};
                propsToGive["org"] = el;
                propsToGive["informClick"] = this.props.mainAppState["informClick"];
                propsToGive["bgImage"] = el["imageLinks"]===undefined?"": el["imageLinks"]["thumbnail"];
                propsToGive["bookTitle"] = el["title"];
                propsToGive["bookAuthor"] = el["authors"] === undefined? "" : el["authors"];
                let found_on_A_Shelf = false;
                let shelfNames = ['currentlyReadingBookList', 'wantToReadBookList', 'ReadBookList'];
                // starting from here we prepare the props of the book component
                for (let shelfN of shelfNames) { //shelfN represents a shelf name
                    this.props.mainAppState[shelfN].map((e) => { // here we map through shelf books if found this book in it, we now know the prop left ("shelf")
                        if (!found_on_A_Shelf) {
                            if (e["id"] === el["id"]) {
                                propsToGive["shelf"] = shelfN;
                                found_on_A_Shelf = true;

                            }
                        }
                        return "return value not important here actually";
                    })
                }
                if (!found_on_A_Shelf) {
                    propsToGive["shelf"] = "none";
                }
                // -------------------------------------------------------------
                rtrnVal.push((<li key={el.id}>{BookComponent(propsToGive)}</li>))
            }
        return rtrnVal;
    }
    async showTheBooks() {
        if (this.state.searchText !== "") {
            let Lis = await this.initBookList(this.state.searchText);
            this.setState({ fetchedBooks: Lis })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={(e) => {
                            this.setState({ searchText: e.target.value });
                            this.showTheBooks();
                        }} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.fetchedBooks.map(e => e)}
                    </ol>
                </div>
            </div>
        );
    }

}



export default SearchComponent;