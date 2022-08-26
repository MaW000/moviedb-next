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

  useEffect(() => {
    getMovies()
    console.log(moviess)
  }, [])

  return (
  <Layout>
    <div className='flex  flex-nowrap flex-row overflow-x-auto gap-10 max-h-full py-5'>
    {movies && movies.map((movie) => {
      
    return (
      <div className="flex flex-1 flex-col bg-slate-400  mx-2 rounded-xl" key={movie._id}>
        <div className=" align-bottom px-12">
          <Image 
            className='align-bottom h-1'
            alt="Movie Poster"
            src={movie.Poster}
            objectFit='contain'
            width={.005}
            height={.01}
            layout="responsive"
          />
        </div>

        <div className=' flex-1 -translate-y-10'>
          <div className='px-12'>
            <h1 className='text-3xl px-5 py-0 break-normal text-center whitespace-nowrap'>{movie.Title}</h1>

            <div className="flex text-center justify-center">
              <h2 className='w-14'>{movie.Year}</h2>
              <h2 className=''>|</h2>
              <h2 className='w-14'>{movie.Rated}</h2>
              <h2 className=''>|</h2>
              <h2 className='w-14'>{movie.imdbRating}</h2>
            </div>
          </div>
          <div className='leading-relaxed px-3 pb-5  '>
            <p className="text-2xl">{movie.Plot}</p>
          </div>
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