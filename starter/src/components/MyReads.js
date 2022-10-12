import {useEffect} from "react";
import {getAll} from "../BooksAPI";
import {useNavigate} from "react-router-dom";
import Bookshelf from "./Bookshelf";

const MyReads = ({collection, setCollection}) => {
    const navigate = useNavigate();

    //effect loads each shelf with correct books
    useEffect(() => {
        fetchMyAPI();
    });

    async function fetchMyAPI() {

        let resp = await getAll();

        let reading = resp.filter((book) => (book.shelf === 'currentlyReading'));

        let want = resp.filter((book) => (book.shelf === 'wantToRead'));

        let read = resp.filter((book) => (book.shelf === 'read'))
        setCollection({'reading': reading, 'want': want, 'read': read, 'search': []});
    }

    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-content">
                    <div>
                        <Bookshelf shelfName={'Currently Reading'} collection={collection.reading}
                                   apiFetch={fetchMyAPI}/>
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