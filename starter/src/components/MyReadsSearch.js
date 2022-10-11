import {useEffect, useState} from "react";
import {getAll} from "../BooksAPI";
import Book from "./Book";

const MyReadsSearch = () => {

    const [searchData, setSearchData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const [readingCheck, setReadingCheck] = useState(false);
    const [wantCheck, setWantCheck] = useState(false);
    const [readCheck, setReadCheck] = useState(false);

    useEffect(() => {

        getAllSearchResults();
        // alert(JSON.stringify(resp));
    },[]);

    const getAllSearchResults = async () => {
        let resp = await getAll();
        setSearchData(resp);
    }

    const handleSearchInput = (e) => {
        let input = e.target.value.toLowerCase();
        setSearchInput(input);
        // alert(JSON.stringify(results));
    }

    const searchResults = searchData.filter((result) => {
        if (searchInput === '') {
            return result;
        }
        //return the item which contains the user input

        else {
            return result.title.toLowerCase().includes(searchInput) && result.shelf === 'currentlyReading'
        }
    });

    const handleCheckboxChange = (checkState, stateSetter) => {
        stateSetter(!checkState);
    };

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

                <label className="checkbox"><input type="checkbox" checked={readingCheck} onChange={()=> {handleCheckboxChange(readingCheck, setReadingCheck)}}/>Reading</label>
                <label className="checkbox"><input type="checkbox" checked={wantCheck} onChange={()=> {handleCheckboxChange(wantCheck, setWantCheck)}}/>Want</label>
                <label className="checkbox"><input type="checkbox" checked={readCheck} onChange={()=> {handleCheckboxChange(readCheck, setReadCheck)}}/>Read</label>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        searchResults.map((result) => {
                            return <Book bookData={result}/>
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

export default MyReadsSearch;