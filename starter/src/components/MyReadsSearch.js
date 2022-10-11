import {useEffect, useState} from "react";
import {getAll, search} from "../BooksAPI";
import Book from "./Book";

const MyReadsSearch = () => {

    const [searchData, setSearchData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        // getAllSearchResults();
        // alert(JSON.stringify(resp));
    }, []);

    //todo search needs to use api search query not filtering getAll
    const getAllSearchResults = async () => {
        // alert('search input is ' + searchInput);
        if (searchInput !== '') {
            let resp = await search(searchInput)
            return resp;
        }

        // console.log(JSON.stringify(resp));
    }

    const setSearchResults = async () => {
        let results = await getAllSearchResults();
        alert(JSON.stringify(results));
        if (results !== undefined && !('error' in results)) {
            setSearchData(results);
        }
    }

    const handleSearchInput = (e) => {
        let input = e.target.value.toLowerCase();
        setSearchInput(input);
        setSearchResults();
        // alert(JSON.stringify(results));
    }

    // const searchResults = searchData.filter((result) => {
    //     if (searchInput === '') {
    //         // return result;
    //     }
    //     //return the item which contains the user input
    //     else {
    //         return result.title.toLowerCase().includes(searchInput)
    //     }
    // });

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
                            return <Book key={result.id} bookData={result} />
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

export default MyReadsSearch;