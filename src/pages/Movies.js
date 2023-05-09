import { getSearchMovie } from 'services/movies-api';
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from 'components';
import defaultImg from 'images/default-img.jpg';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [movieValue, setMovieValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const movieName = searchParams.get('movieName') ?? '';

  const handleChangeInput = evt => {
    const movieValue = evt.target.value;
    setMovieValue(movieValue);
  };
  
  const handleSubmitForm = evt => {
    evt.preventDefault();
    if (movieValue === '') {
      toast.error(`Please enter a value`);
      return;
    }
    setSearchParams({ movieName: movieValue });
  };

  useEffect(() => {
    if (!movieName) {
      return;
    }
    (async () => {
      setIsLoading(true);
      const result = await getSearchMovie(movieName);
      if (result.length === 0) {
        toast.error(
          `Sorry, there are no movies matching your search query. Please try again.`
        );
        setSearchParams({});
        setMovies([]);
        setMovieValue('');
        return;
      }
      setMovies(result);
    })()
      .catch(error => toast.error(`${error.message}`))
      .finally(() => setIsLoading(false));
  }, [movieName, setSearchParams]);

  return (
    <div className="container">
      <form onSubmit={handleSubmitForm} className="searchForm">
        <input
          type="text"
          value={movieValue}
          className="searchFormInput"
          placeholder="Search movies"
          onChange={handleChangeInput}
        />
        <button type="submit" className="searchFormButton">
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      <ul className="list">
        {movies.map(({ id, title, poster_path }) => (
          <li key={id} className="item">
            <Link className="link" to={`${id}`} state={{ from: location }}>
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

export default Movies;
