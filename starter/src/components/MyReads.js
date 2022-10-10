import {useCallback, useEffect, useState} from "react";
import {getAll, update} from "../BooksAPI";
import { useNavigate } from "react-router-dom";
import Bookshelf from "./Bookshelf";

//shelf names: currentlyReading | wantToRead | read

const MyReads = () => {
    const navigate = useNavigate();
    const [showSearchPage, setShowSearchpage] = useState(false);

    const [collection, setCollection] = useState({reading: [], want: [], read: []})

    //effect loads each shelf with correct books
    useEffect(() => {
        fetchMyAPI();
    }, [])

    async function fetchMyAPI() {

        let resp = await getAll();

        let reading = resp.filter((book) => (book.shelf === 'currentlyReading'));

        let want = resp.filter((book) => (book.shelf === 'wantToRead'));

        let read = resp.filter((book) => (book.shelf === 'read'))
        setCollection({'reading': reading, 'want': want, 'read': read});
        // alert('done fetching');
    }

    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-content">
                    <div>
                        <Bookshelf shelfName={'Currently Reading'} collection={collection.reading} apiFetch={fetchMyAPI}/>
                        <Bookshelf shelfName={'Want to Read'} collection={collection.want} apiFetch={fetchMyAPI}/>
                        <Bookshelf shelfName={'Read'} collection={collection.read} apiFetch={fetchMyAPI}/>
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => navigate("/search")}>Add a book</a>
                </div>
            </div>
            )}
        </div>
    )
}

export default MyReads;