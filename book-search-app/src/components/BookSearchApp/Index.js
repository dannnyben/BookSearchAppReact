import React, { useState } from "react";
import {v4} from 'uuid';
import './index.css';
import BookItem from "./BookItem";

const BookSearchApp = () => {
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);

const getSearchResults = async ()=>{
    const response = await fetch(`https://apis.ccbp.in/book-store?title=${searchTerm}`);
    const data = await response.json();
    const updateData = data.search_results.map(each=>({
        id:v4(),
        author:each.author,
        imageLink:each.imageLink,
        title:each.title
    }))
    setSearchResults(updateData);
}

const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
        getSearchResults();
    }
}

    return (
        <div>
            <header>
                <h1><strong> Book Search App </strong></h1>
                <input onKeyDown={handleKeyDown} onChange={(e)=>setSearchTerm(e.target.value)} type="Search" placeholder="Enter Book Name" />
            </header>
            <main>
                <ul>
                    {searchResults.map(each=><BookItem key={each.id} bookDetails={each} />)}
                </ul>
            </main>
        </div>
    )
}

export default BookSearchApp