import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPopularMovies } from 'services';
import { Loader } from 'components';
import defaultImg from 'images/default-img.jpg';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const movies = await getPopularMovies();
      setPopularMovies(movies);
      setIsLoading(false);
    })().catch(error => {toast.error(`${error.message}`)});
  }, []);

  return (
    <div className="container">
      <h1 className="title">Trending today</h1>
      {isLoading && <Loader />}
      <ul className="list">
        {popularMovies.map(({ id, title, poster_path }) => (
          <li key={id} className="item">
            <Link
              className="link"
              to={`movies/${id}`}
              state={{ from: location }}
            >
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                    : defaultImg
                }
                width="350px"
                height="500px"
                alt={title}
              />
              <p className="subTitle">{title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
