import {Link} from "react-router-dom";
import {Button} from "@mui/material";

function Header() {
    const linkStyle = {
        margin: "2%",
    };

    return (
        <div style={{marginBottom: "5%"}}>
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <nav>

                <Link style={linkStyle} to={"/"}>
                    <Button variant="contained">Home</Button>
                </Link>

                <Link style={linkStyle} to={"/search"}>
                    <Button variant="contained">Search</Button>
                </Link>
            </nav>
        </div>
    );
}

export default Header;
