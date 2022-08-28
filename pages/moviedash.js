import React, {useEffect, useState} from 'react'
import dbConnect from '../utils/dbConnect'
import Movie from '../utils/models/movie'
import Layout from '../components/layout'
import Image from 'next/image'

const MovieDash = ({movies}) => {
  const [moviess, setMovies] = useState()

  const getMovies = async() => {
    const url = "http://localhost:3000/api/movies";
    const options = {
      mode: "no-cors",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
    };
    try {
      await fetch(url, options)
        .catch(console.error)
        .then((res) => res.json())
        .then((data) => setMovies(data.data))
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async(e) => {
    const dbKey = (e.target.parentNode.parentNode.getAttribute('dbKey'));
    const url = "/api/movies";
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(dbKey)
    };
    try {
      await fetch(url, options)
        .then((res) => res.json())
        .then((data) => console.log(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovies()
    console.log(moviess)
  }, [])

  return (
  <Layout>
    
    <div className='flex  flex-nowrap flex-row overflow-x-auto gap-10 max-h-full py-5'>
    {movies && movies.map((movie) => {
      
    return (
      
        <div className="flex flex-col bg-slate-400  mx-2 rounded-xl basis-0" key={movie._id} dbKey={movie._id} >
          <div className="align-bottom px-12 py-5">
            <Image 
              className='align-bottom h-2'
              alt="Movie Poster"
              src={ movie.Poster}
              objectFit='contain'
              width={300}
              height={300}
              layout="fixed"
              priority
            />
          </div>

          <div className='flex-1'>
            <div className='px-12'>
              <h1 className='text-3xl px-5 py-0 break-normal text-center whitespace-nowrap'>{movie.Title}</h1>

              <div className="flex text-center justify-center">
                <h2 className='w-14 text-xl'>{movie.Year}</h2>
                <h2 className='text-xl w-3.5'>|</h2>
                <h2 className='w-14 text-xl'>{movie.Rated}</h2>
                <h2 className='text-xl w-3.5'>|</h2>
                <h2 className='w-14 text-xl'>{movie.imdbRating}</h2>
              </div>
            </div>
            <div className='leading-relaxed px-3 pb-2  '>
              <p className="text-lg">{movie.Plot}</p>
            </div>
          </div>
          <div className='flex justify-center pb-5'>
            <button type="button" onClick={handleDelete} className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Delete</button>
          </div>
        </div>
    )})}
    </div>
  
  </Layout>
  
)}

export async function getServerSideProps() {
  await dbConnect()
  const result = await Movie.find({})
  const movies = result.map((doc) => {
    const movie = doc.toObject()
    movie._id = movie._id.toString()
    return movie
  })
  return { props: { movies: movies } }
}

export default MovieDash

