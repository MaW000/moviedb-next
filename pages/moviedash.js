import dbConnect from '../utils/dbConnect'
import Movie from '../utils/models/movie'

import Layout from '../components/layout'
import Image from 'next/image'
const MovieDash = ({ movies }) => {
  
  return (
  <Layout>
    {/* Create a card for each pet */}
    <div className='flex'>
    {movies.map((movie) => {
      
    return (
      <div className="movie-obj" key={movie._id}>
      <center className="">
        <Image
          alt="Movie Poster"
          src={movie.Poster}
          objectFit='contain'
          width={100}
          height={200}
          layout="responsive"
        />
      </center>
      <h1 className='text-3xl p-5'>{movie.Title}</h1>
      <div className="flex text-center justify-center">
        <h2 className='w-14'>{movie.Year}</h2>
        <h2 className=''>|</h2>
        <h2 className='w-14'>{movie.Rated}</h2>
        <h2 className=''>|</h2>
        <h2 className='w-14'>{movie.imdbRating}</h2>
      </div>
      <div>
        <p className="p-5 ">{movie.Plot}</p>
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