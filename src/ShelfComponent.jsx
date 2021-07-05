import React from 'react';

import BookComponent from "./BookComponent";

function ShelfComponent(props) {
    return (
        <div className="bookshelf" >
            <h2 className="bookshelf-title" > {props["shelfTitle"]} </h2>
            <div className="bookshelf-books" >
                <ol className="books-grid" >
                    {
                        // Here we map to create the li elements (Books from BookComponent)
                        props["data"].map(book => {
                            let as_A_Prop = {};
                            as_A_Prop["org"] = book;
                            as_A_Prop["shelf"] = props["shelf"];
                            as_A_Prop["informClick"] = props["informClick"];
                            as_A_Prop["bgImage"] = book["imageLinks"]===undefined?"": book["imageLinks"]["thumbnail"];
                            as_A_Prop["bookTitle"] = book["title"];
                            as_A_Prop["bookAuthor"] = book["authors"] === undefined? "" : book["authors"];
                            return (<li key={book["id"]}>{BookComponent(as_A_Prop)}</li>);
                        })
                    }
                </ol>
            </div>
        </div>
    );
}

export default ShelfComponent;