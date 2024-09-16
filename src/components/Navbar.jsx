import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="w-full max-w-screen-xl py-5 mx-auto text-base">
      <div className="container flex flex-wrap items-center justify-between mx-auto tracking-wide text-gray-700">
        <NavLink
          to="/"
          className="text-base font-semibold text-gray-900 md:text-xl"
        >
          MOVIESCAMP
        </NavLink>
        <ul className="flex flex-row gap-4 font-normal">
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center text-orange-500"
                  : "flex items-center  hover:text-orange-500"
              }
            >
              Movies
            </NavLink>
          </li>
          <li>
            <a
              href="https://github.com/irfanbakhtiar"
              className="flex items-center hover:text-orange-500"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
