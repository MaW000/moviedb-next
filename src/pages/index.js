import { useEffect, useState } from 'react'
import {ThumbUpOutlined, ThumbDownOutlined, ThumbUpAlt } from '@mui/icons-material';
import dbConnect from '../utils/dbConnect'
import Likes from '../utils/models/likes'
import Layout from '../components/layout'
import Image from 'next/image'
const Index = ({ likes }) => {
  const [inputs, setInputs] = useState({title: 'a'})
  const [movie, setMovie] = useState()
  const [like, setLike] = useState(0)
  const [liked, setLiked] = useState(false)
  
  function handleChange(e) {
    const {name, value} = e.target
    setInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSaveMovie = async (e) => {
    e.preventDefault();

    const url = "/api/movies"
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(movie)
    };

    try {
      await fetch(url, options)
        .then((res) => res.json())
        .then((data) => console.log(data))
    } catch (error) {
      console.log(error);
    }
  }

  const handleLike = async(e) => {
    e.preventDefault();
    const url = "/api/likes"
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(movie.imdbID)
    };

    try {
      await fetch(url, options)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then(setLike(prev => prev + 1 ))
        .then(setLiked(true))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      fetch(`http://www.omdbapi.com/?t=${inputs.title}&y=${inputs.year}&apikey=c450e1a6`)
        .then((response) => response.json())
        .then((data) => {
          if(Object.keys(data).length > 3){
            if(data.Poster && data.Poster.substring(0, 8) !== 'https://') {
              delete data.Poster
              console.log(data)
              setMovie(data)
              setLike(likes.reduce((counter, obj) => {
                if(obj.imdbID === data.imdbID) counter += 1
                return counter;
              }, 0))
            } else {
              setMovie(data)
              setLike(likes.reduce((counter, obj) => {
                if(obj.imdbID === data.imdbID) counter += 1
                return counter;
              }, 0))
            }}
        })
    } catch (error) {
      console.log(error);
    }
  }, [inputs])

  return (
    <Layout className="homepage">
    <div className='text-center bg-slate-600 rounded-3xl flex flex-col'>
      <div className='flex justify-center p-5'>
        <div className='basis-1/5'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
          <input onChange={handleChange} name="title" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A Beautiful Mind" required/>
        </div>
        <div className='basis-1/5'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Year</label>
          <input onChange={handleChange} type="text" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2001" required/>
        </div>
      </div>
      <div className="" >
        <div className='flex justify-center hover:cursor-pointer p-2'>
          <div className="flex mr-2">
            {liked ?  <ThumbUpAlt />:
            <ThumbUpOutlined onClick={handleLike}/>}
            <h1 className="ml-1">{like}</h1>
          </div>
          
          <div className="flex ml-2 hover:cursor-pointer">
            <ThumbDownOutlined />
            <h1 className="ml-1">1</h1>
          </div>
        </div>
        {movie &&
          <div className="movie-obj">
            <center className="">{movie.Poster &&
              <Image
                alt="Movie Poster"
                src={ movie.Poster.substring(0, 7) !== 'http://' ? movie.Poster : null}
                objectFit='contain'
                width={300}
                height={100}
                layout="responsive"
                priority
              />}
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
            <button onClick={handleSaveMovie} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>

          </div>
        }
        </div>
    </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await dbConnect()
  const like = await Likes.find({})
  const likes = like.map((doc) => {
    const like = doc.toObject()
    like._id = like._id.toString();
    delete like.__v;
    return like
  })
  return { props: { likes: likes } }
}

export default Index