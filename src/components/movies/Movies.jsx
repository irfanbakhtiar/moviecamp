import { useState, useEffect } from "react";
import axios from "axios";
import MovieDetail from "./MovieDetail";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

const Movies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorFind, setErrorFind] = useState("");

  const fetchGetMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/discover/movie?api_key=${apiKey}&language=en-US&page=${page}`
      );
      setFavoriteMovies((prevMovies) => [
        ...prevMovies,
        ...response.data.results,
      ]);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching movies:", err);
      setLoading(false);
    }
  };

  const fetchSearchMovies = async (q) => {
    const search = await axios.get(
      `${baseUrl}/search/movie?query=${q}&page=1&api_key=${apiKey}`
    );
    return search.data;
  };

  useEffect(() => {
    fetchGetMovies();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = async (movieId) => {
    try {
      const detail = await axios.get(
        `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`
      );
      setSelectedMovie(detail.data);
      setIsModalOpen(true);
    } catch (err) {
      console.log("Error fetching movie details:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const GetMovies = () => {
    return (
      <>
        {favoriteMovies.map((movie, index) => (
          <div className="flex flex-col" key={index}>
            <div className="py-3 sm:max-w-lg sm:mx-auto">
              <div className="flex items-center p-4 space-x-8 bg-orange-100 border border-orange-100 rounded-lg shadow-lg sm:p-8 bg-opacity-70 max-h-80 sm:rounded-3xl">
                <div className="w-1/3">
                  <img
                    className="shadow-lg rounded-3xl"
                    src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className="flex flex-col w-2/3 space-y-2 sm:space-y-4">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-bold text-gray-800 sm:text-2xl line-clamp-2 sm:line-clamp-3">
                      {movie.title}
                    </h2>
                    <div className="p-2 font-bold text-white bg-orange-400 rounded-xl">
                      {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Release</div>
                    <div className="text-gray-800 text-md">
                      {movie.release_date}
                    </div>
                  </div>
                  <div className="flex text-2xl font-bold ">
                    <button
                      onClick={() => openModal(movie.id)}
                      className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const searchMovies = async (q) => {
    if (q.length > 3) {
      const query = await fetchSearchMovies(q);
      setFavoriteMovies(query.results);
    } else {
      setErrorFind("No movies found");
    }
  };

  return (
    <>
      <div className="relative max-w-full mx-auto my-8 sm:max-w-lg">
        <h1 className="pb-4 text-3xl font-semibold text-center">
          Discover Movies
        </h1>
        <input
          placeholder="Find movies..."
          className="w-full h-12 p-4 text-gray-900 bg-white border-2 border-orange-200 rounded-lg shadow sm:rounded-full focus:outline-orange-500"
          onChange={({ target }) => searchMovies(target.value)}
        />
      </div>
      <div className="grid items-start gap-2 mx-auto md:gap-6 lg:grid-cols-2 lg:max-w-fit">
        <GetMovies />
        {isModalOpen && (
          <MovieDetail
            isOpen={isModalOpen}
            movie={selectedMovie}
            closeModal={closeModal}
          />
        )}
      </div>
      {errorFind && (
        <p className="font-semibold text-center text-orange-400">{errorFind}</p>
      )}

      {loading && (
        <p className="flex justify-center pt-2 text-2xl font-bold text-gray-700 uppercase">
          Loading movies...
        </p>
      )}
    </>
  );
};

export default Movies;
