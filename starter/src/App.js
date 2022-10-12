import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyReads from "./components/MyReads";
import MyReadsSearch from "./components/MyReadsSearch";
import Header from "./components/Header";
import {useState} from "react";

function App() {
    const [collection, setCollection] = useState({reading: [], want: [], read: [], search: []});

    return (

        <BrowserRouter>
            <div className="app">
                <Header/>
                <Routes>
                    <Route exact path="/" element={<MyReads collection={collection} setCollection={setCollection}/>}/>
                    <Route exact path="/search"
                           element={<MyReadsSearch collection={collection} setCollection={setCollection}/>}/>
                    <Route path="*" element={<p>404 Ruh Roh</p>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
