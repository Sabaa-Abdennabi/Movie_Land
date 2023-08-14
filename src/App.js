import React from 'react'
import { useEffect } from 'react'
import './App.css'
import MovieCard from './component/MovieCard'
import { useState } from 'react'
// c032e2d7
const API_URL = "http://www.omdbapi.com/?apikey=c032e2d7"

const App = () => {
    const [movies, setMovies] = useState([]);
    const[title,setTitle]=useState("");

    useEffect(() => {
        searchMovies("batman");

    }, [])
    const searchMovies = async (title) => {
        const res = await fetch(`${API_URL}&s=${title}`);
        const data = await res.json();
        setMovies(data.Search);
    };
    return (
        <div className="app">
            <h1>Movie Land</h1>
            <div className='search'>
                <input type='text'
                    placeholder='Search for Movies'
                    onChange={(e) => { e.target.value.length > 0 ? setTitle(e.target.value) : searchMovies("batman")}}
                />
                <img src="https://img.icons8.com/ios-filled/50/search--v1.png"
                    alt="search"
                    onClick={(e) => { e.preventDefault();
                    searchMovies(title)}}
                />
            </div>
            {movies.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>)
                : (<div className='empty'>
                    <h2>No Movies Found</h2>
                </div>)
            }


        </div>

    );
};

export default App
