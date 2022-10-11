import {update} from "../BooksAPI";

const Book = ({bookData, apiFetch}) => {

    const handleShelfChange = async (e) => {
        update({id: bookData.id}, e.target.value)
            .then((result) => {
                alert(JSON.stringify(result));
                if (apiFetch) {
                    apiFetch()
                }

            });
    }

    let thumbnail;
    if (bookData.imageLinks.thumbnail) {
        thumbnail =
            <div
                className="book-cover"
                style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                        `url(${bookData.imageLinks.thumbnail})`,
                }}
            ></div>
    } else {
        thumbnail = <p>No thumbnail</p>
    }

    return (
        <div className="book">
            <div className="book-top">

                {thumbnail}

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
            <div className="book-authors">{bookData.authors}</div>
        </div>
    )
}

export default Book;