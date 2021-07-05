import React from 'react';
import { Link } from 'react-router-dom';
import ShelfComponent from './ShelfComponent';
function MyReadsComponent(props) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {ShelfComponent(Object.assign({ data: props.currentlyReadingBookList }, { shelf: "currentlyReadingBookList" },
                        { shelfTitle: "Currently Reading" }, { informClick: props.informClick }))}
                    {ShelfComponent(Object.assign({ data: props.wantToReadBookList }, { shelf: "wantToReadBookList" },
                        { shelfTitle: "Want to Read" }, { informClick: props.informClick }))}
                    {ShelfComponent(Object.assign({ data: props.ReadBookList }, { shelf: "ReadBookList" },
                        { shelfTitle: "Read" }, { informClick: props.informClick }))}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search" >Add a book</Link>
            </div>
        </div>
    );
}


export default MyReadsComponent;