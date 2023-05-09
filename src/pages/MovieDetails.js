import { useEffect, useRef, useState, Suspense } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieById } from 'services';
import { Loader } from 'components';
import defaultImg from 'images/default-img.jpg';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [{ title, poster_path, genres, overview, rating }, setMovie] = useState(
    []
  );
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  useEffect(() => {
    (async () => {
      const movie = await getMovieById(movieId);
      setMovie(movie);
    })().catch(error => console.log(error));
  }, [movieId]);

  return (
    <div className="container">
      <Link to={backLinkLocationRef.current} className="btn">
        Go back
      </Link>
      <div className="box">
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
        <div className="wrap">
          <h2>{title}</h2>
          <p>
            <span>User Score: </span>
            {Math.round(rating * 10)}%
          </p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <ul className="listGenres">
            {genres && genres.map(({ id, name }) => <li key={id}>{name}</li>)}
          </ul>
        </div>
      </div>
      <h3>Additional information</h3>
      <ul className="listSub">
        <li>
          <NavLink to="cast" className="linkSub">
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className="linkSub">
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
