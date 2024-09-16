import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const Home = () => {
  return (
    <section className="flex flex-col items-center h-screen isolate">
      <Navbar />
      <div className="flex items-center justify-center flex-1 max-w-4xl">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-4xl font-semibold leading-relaxed tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            Find your favorite{" "}
            <span className="px-2 bg-orange-200 rounded-lg bg-opacity-70">
              Movies
            </span>
          </h1>
          <p className="mt-6 text-lg font-light leading-8 text-gray-700 md:text-xl">
            Find free movie information here and get ideas about similar movies
            you might like to watch next. What are you waiting for?
          </p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <Link
              to="/movies"
              className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Home;
