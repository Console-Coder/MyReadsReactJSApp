import React from 'react';
import { update } from './BooksAPI';

function BookComponent(props) {
    function resolveShelfName(x){
        if(x === "currentlyReadingBookList")
        return "currentlyReading";
        else if(x === "wantToReadBookList")
        return "wantToRead";
        else if(x === "ReadBookList")
        return "read";
    }
    let funcy = (e) => {
        props.informClick(props["bookTitle"], props["shelf"], e.target.value, props["org"]);
        props["shelf"] = e.target.value;
        e.value = e.target.value;
        e.target.parentElement.querySelectorAll(`option[style]`)[0].style.backgroundColor = "";
        e.target.parentElement.querySelectorAll(`option[value="${props["shelf"]}"]`)[0].style.backgroundColor = "rgba(130, 33, 56, 0.5)";
        update(props["org"], resolveShelfName(e.target.value))
    };
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${props.bgImage}')` }}></div>
                <div className="book-shelf-changer">{/* need fix because click func doesn't take args only e i think */}
                    <select onChange={funcy} value={props["shelf"]}>
                        <option value="move" disabled>Move to...</option>
                        <option style={(props["shelf"] === "currentlyReadingBookList") ? { backgroundColor: 'rgba(130, 33, 56, 0.5)' } : {}} value="currentlyReadingBookList">Currently Reading</option>
                        <option style={(props["shelf"] === "wantToReadBookList") ? { backgroundColor: 'rgba(130, 33, 56, 0.5)' } : {}} value="wantToReadBookList" >Want to Read</option>
                        <option style={(props["shelf"] === "ReadBookList") ? { backgroundColor: 'rgba(130, 33, 56, 0.5)' } : {}} value="ReadBookList" >Read</option>
                        <option disabled style={(props["shelf"] === "none") ? { backgroundColor: 'rgba(130, 33, 56, 0.5)' } : {}} value="none" >None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props["bookTitle"]}</div>
            <div className="book-authors">{props["bookAuthor"]}</div>
        </div>
    );
}


export default BookComponent;