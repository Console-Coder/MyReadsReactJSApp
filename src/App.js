// I feel like I have made how state is changed more complicated than it had to be
import React from 'react'
import MyReadsComponent from './MyReadsComponent'
import SearchComponent from './SearchComponent'
import { Route, BrowserRouter } from 'react-router-dom'
import {getAll} from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    state = { // arrays of objects
        currentlyReadingBookList: [],
        wantToReadBookList: [],
        ReadBookList: []
    };
    prepareShelfName(x) {
        if (x === "currentlyReading")
            return "currentlyReadingBookList";
        else if (x === "wantToRead")
            return "wantToReadBookList";
        else if (x === "read")
            return "ReadBookList";
    }

    informClick = (bookTitle, oldShelf, newShelf, data) => {
        // set the new state by filtering the array of the old shelf
        // and then add it to the array of the new shelf
        let newStateObj = {};
        if (oldShelf !== "none") newStateObj[oldShelf] = this.state[oldShelf].filter(e => e["title"] !== bookTitle);
        if (newShelf !== "none") {
            this.state[newShelf].push(data)
            let newArr = this.state[newShelf]
            newStateObj[newShelf] = newArr
        }
        this.setState(newStateObj);
    };

    render() {

        return (
            <div className="app">
                <BrowserRouter>
                    <Route exact path="/">
                        {MyReadsComponent(Object.assign(this.state, { informClick: this.informClick }))}
                    </Route>
                    <Route exact path="/search" >
                        <SearchComponent key="AnyRandom" mainAppState={Object.assign(this.state, { informClick: this.informClick })} />
                    </Route>
                </BrowserRouter>
            </div>
        )
    }

    async componentDidMount() {
        let booksAndShelves = await getAll();
        let currentRead = [];
        let readArr = [];
        let wantToArr = [];
        if (booksAndShelves.length !== undefined) {
            booksAndShelves.map(e=>{
                if (e.shelf === "currentlyReading")
                currentRead.push(e);
                else if (e.shelf === "wantToRead")
                wantToArr.push(e);
                else if (e.shelf === "read")
                readArr.push(e);
                return "return value doesn't matter";

            })
        }
        this.setState({currentlyReadingBookList: currentRead, ReadBookList: readArr, wantToReadBookList: wantToArr})
    }
}



export default BooksApp;