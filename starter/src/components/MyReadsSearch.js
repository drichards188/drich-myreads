import {useState} from "react";
import {getAll, search} from "../BooksAPI";
import Book from "./Book";
import {useNavigate} from "react-router-dom";

const MyReadsSearch = ({collection, setCollection}) => {
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState('');

    const getAllSearchResults = async () => {
        if (searchInput !== '') {
            return await search(searchInput);
        }
    }

    const getAllOwnedBooks = async () => {
        return await getAll();
    }

    const setSearchResults = async () => {
        let searchResults = await getAllSearchResults();
        let ownedBooks = await getAllOwnedBooks();

        if (searchResults !== undefined && !('error' in searchResults)) {
            let foundDuplicates = searchOnShelves(searchResults, ownedBooks);
            setCollection({...collection, search: foundDuplicates});
        } else {
            setCollection({reading: [], want: [], read: [], search: []});
        }
    }

    const searchForDuplicate = (id, collection) => {
        let foundDuplicate = collection.find((book) => book.id === id);
        if (foundDuplicate !== undefined) {
            return foundDuplicate;
        }
        return false;
    }

    const searchOnShelves = (searchResults, ownedBooks) => {
        return searchResults.map((book) => {
            let duplicateResult = searchForDuplicate(book.id, ownedBooks);
            if (duplicateResult) {
                book = {...book, shelf: duplicateResult.shelf};
                return book;
            } else {
                book = {...book, shelf: 'none'};
                return book;
            }
        });
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