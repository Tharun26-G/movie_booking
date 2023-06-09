import React, { useEffect, useState } from 'react'
import axios from 'axios'

import EntertainmentCardSlider from '../components/Entertainment/EntertainmentCard.Component'
import HeroCarousel from '../components/HeroCarousel/HeroCarousel.Component'
import DefaultLayoutHoc from '../layout/Default.layout'
import PosterSlider from '../components/PosterSlider/PosterSlider.Component'

const HomePage = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
   const [premierMovies, setPremierMovies] = useState([]);
  const [onlineStreamEvents, setOnlineStreamEvents] = useState([]);

   useEffect(() => {
    const requestPopularMovies = async () => {
      const getPopularMovies = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=b7df10c5335d816eeb3691d76f9b7652");
      setRecommendedMovies(getPopularMovies.data.results);
    };

    requestPopularMovies();
  }, []);

  useEffect(() => {
    const requestTopRatedMovies = async () => {
      const getTopRatedMovies = await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=b7df10c5335d816eeb3691d76f9b7652");
      setPremierMovies(getTopRatedMovies.data.results);
    };

    requestTopRatedMovies();
  }, []);

  useEffect(() => {
    const requestUpcomingMovies = async () => {
      const getUpcomingMovies = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=b7df10c5335d816eeb3691d76f9b7652");
      setOnlineStreamEvents(getUpcomingMovies.data.results);
    };

    requestUpcomingMovies();
  }, []);


  return (<>
    <HeroCarousel />
    
    <div className='container mx-auto px-4 mc:px-12 my-8'>
       <h1 className="text-2xl font-bold text-gray-800 sm:ml-3 ml-0 my-3">
          The best of Entertainment
      </h1>
      <EntertainmentCardSlider />
    </div>
  <div className="container mx-auto px-4 md:px-12 my-8">
        <PosterSlider
          title="Recommended Movies"
          subtitle="List of recommended movies"
          posters={recommendedMovies}
          isDark={false}
        />
      </div>
  
      <div className="bg-premier-800 py-12">
        <div className="container mx-auto px-4 md:px-12 my-8 flex flex-col gap-3">
          <div className="hidden md:flex">
            <img
              src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png"
              alt="Rupay"
              className="w-full h-full"
            />
          </div>
          <PosterSlider
            title="Premiers"
            subtitle="Brand new releases every Friday"
            posters={premierMovies}
            isDark={true}
          />
        </div>
    </div> 
    <div className="container mx-auto px-4 md:px-12 my-8 ">
        <PosterSlider
          title="Online Streaming Event"
          subtitle=""
          posters={onlineStreamEvents}
          isDark={false}
        />
      </div>
  </>
  );
}

export default DefaultLayoutHoc(HomePage);