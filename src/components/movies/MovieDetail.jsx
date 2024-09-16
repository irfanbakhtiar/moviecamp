import { useEffect } from "react";

const imageUrl = process.env.REACT_APP_BASEIMGURL;

const MovieDetail = ({ isOpen, closeModal, movie }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!movie) return null;

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full py-10 bg-black bg-opacity-50">
      <div className="w-full max-w-md max-h-full overflow-y-auto rounded-md bg-warm sm:max-w-xl sm:rounded-2xl">
        <div className="w-full">
          <div className="my-20 max-w-[350px] sm:max-w-md mx-auto">
            <div className="flex justify-center">
              <img
                src={`${imageUrl}/${movie.poster_path}`}
                alt={movie.title}
                className="w-3/4 md:w-full rounded-3xl"
              />
            </div>
            <div className="my-8">
              <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
                {movie.title}
              </h1>
              <div className="text-sm font-semibold text-gray-700 sm:text-lg">
                <div className="mb-2">
                  Synopsis:
                  <p className="font-normal text-justify text-gray-500">
                    {movie.overview}
                  </p>
                </div>
                <p className="mb-2 font-normal">
                  <span className="font-medium">Release: </span>
                  <span className="text-gray-500">{movie.release_date}</span>
                </p>
                <p className="mb-2 font-normal">
                  <span className="font-medium">Genres: </span>
                  {movie.genres.map((genre, index) => (
                    <span className="text-gray-500" key={index}>
                      {index ? ", " : ""} {genre.name}
                    </span>
                  ))}
                </p>
                <p className="mb-2 font-normal">
                  <span className="font-medium">Rating: </span>
                  <span className="text-gray-500">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </p>
                <p className="font-normal">
                  <span className="font-medium">Adult: </span>
                  <span className="text-gray-500">
                    {movie.adult === true ? "Yes" : "No"}
                  </span>
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <button
                onClick={closeModal}
                className="w-full p-3 text-sm font-semibold text-white bg-orange-500 rounded-md shadow-sm font hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
              >
                Back to all movies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
