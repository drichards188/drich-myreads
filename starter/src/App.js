import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyReads from "./components/MyReads";
import MyReadsSearch from "./components/MyReadsSearch";
import Header from "./components/Header";

function App() {
    return (
        //todo place state here and use in both pages

        <BrowserRouter>
            <div className="app">
                <Header />
                <Routes>
                    <Route exact path="/" element={<MyReads />}/>
                    <Route exact path="/search" element={<MyReadsSearch/>}/>
                    <Route path="*" element={<p>404 Ruh Roh</p>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
