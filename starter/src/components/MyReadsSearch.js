import {useState} from "react";
import {search} from "../BooksAPI";
import Book from "./Book";
import {useNavigate} from "react-router-dom";

const MyReadsSearch = ({collection, setCollection}) => {
    const navigate = useNavigate();

    // const [collection, setCollection] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const getAllSearchResults = async () => {
        if (searchInput !== '') {
            return await search(searchInput);
        }
    }

    const setSearchResults = async () => {
        let results = await getAllSearchResults();

        if (results !== undefined && !('error' in results)) {
            setCollection({...collection, search: results});
        } else {
            setCollection({reading: [], want: [], read: [], search: []});
        }
    }

    const handleSearchInput = (e) => {
        let input = e.target.value.toLowerCase();
        setSearchInput(input);
        setSearchResults();
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                    className="close-search"
                    onClick={() => navigate("/")}
                >
                    Close
                </a>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={searchInput}
                        onChange={handleSearchInput}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        collection.search.map((result) => {
                            return <Book key={result.id} bookData={result}/>
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

export default MyReadsSearch;