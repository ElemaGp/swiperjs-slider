import React from 'react'
import "./multipleSlides.css"

import { useEffect, useState } from 'react'
import axios from "axios";

// import Swiper core and required modules
import { Autoplay, Navigation, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import useWindowSize from '../../useWindowSize';
import { Link } from 'react-router-dom';




const MultipleSlides = () => {
    const [movies, setMovies] = useState(""); //for storing the fetched movies
    const [searchTerm, setSearchTerm] = useState(""); //for storing movies searched term
    const [searchType, setSearchType] = useState(""); //for storing movie type/category
    const size = useWindowSize();

useEffect(()=>{
    getMovies(searchTerm, searchType);
},[searchTerm, searchType]);

const getMovies = async (searchTerm, searchType) =>{
    try{
        const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&type=${searchType}&apikey=d9c7bea4`);
        console.log(response.data.Search);
        setMovies(response.data.Search);
    }catch(err){
      
    }
}

  return (
    <div className='generalDiv'>
        {size.width > 600 ? <div>"BIG SCREEN. CHECK MOBILE SIZE LESS THAN 600px WIDTH TO SEE CAROUSEL"</div> :
        <div className="allMovies">
            <input type="text" onChange={(e)=>setSearchTerm(e.target.value)}/>
                <select onChange={(e)=>setSearchType(e.target.value)}>
                    <option value="" disabled>Select Type</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>
            <Swiper 
            // install Swiper modules
        modules={[Autoplay, Navigation, Pagination, A11y]}
        spaceBetween={10}
        slidesPerView={2}
        navigation
        autoplay = {{
            delay: 2500,
            disableOnInteraction: false,
            }}
        pagination={{ clickable: true }}
            className="theMovies">
                {movies &&
            movies.map(({imdbID, Poster, Title, Type, Year})=>{ //i chose to destructure it here. Alternaltively, i could just put eg "person" in the bracket, and in the jsx below, write "person.title", "person.age" etc.
                return(
                    <SwiperSlide className="card" key={imdbID}>
                        <div className="imgWrapper">
                            <img src={Poster} alt="pictures" className="cardImage" />
                        </div>
                        <div>
                            <p>Title: {Title}</p>
                            <p>Type: {Type}</p>
                            <p>Year: {Year}</p>
                        </div>
                    </SwiperSlide>
                
                )
            })
            
            }
                
            </Swiper>
    </div>
    }
    <Link to="/">Go back to homepage</Link>
</div>
  )
}

export default MultipleSlides
