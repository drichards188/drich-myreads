import {useState} from "react";
import {search} from "../BooksAPI";
import Book from "./Book";

const MyReadsSearch = () => {
    const [searchData, setSearchData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const getAllSearchResults = async () => {
        if (searchInput !== '') {
            let resp = await search(searchInput)
            return resp;
        }
    }

    const setSearchResults = async () => {
        let results = await getAllSearchResults();
        alert(JSON.stringify(results));
        if (results !== undefined && !('error' in results)) {
            setSearchData(results);
        } else {
            setSearchData([]);
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
                    // onClick={() => setShowSearchpage(!showSearchPage)}
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
                        searchData.map((result) => {
                            return <Book key={result.id} bookData={result}/>
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

export default MyReadsSearch;