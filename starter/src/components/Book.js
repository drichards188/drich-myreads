import {update} from "../BooksAPI";

const Book = ({bookData, apiFetch}) => {

    const handleShelfChange = async (e) => {
        update({id: bookData.id}, e.target.value)
            .then((result) => {
                // alert(JSON.stringify(result));
                if (apiFetch) {
                    apiFetch()
                }

            });
    }

    return (
        <div className="book">
            {/*<button onClick={dataRefresh}>refresh</button>*/}
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url(${bookData.imageLinks.thumbnail})`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={handleShelfChange}>
                        <option value="none" disabled selected>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{bookData.title}</div>
            <div className="book-authors">{bookData.authors[0]}</div>
        </div>
    )
}

export default Book;