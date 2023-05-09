import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCast } from 'services';
import defaultImg from 'images/default-img.jpg';

import css from 'components/Cast/Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    (async () => {
      const movieCast = await getMovieCast(movieId);
      setCast(movieCast);
    })().catch(error => console.log(error));
  }, [movieId]);
  return (
    <>
      <ul className={css.list}>
        {cast.map(({ id, name, character, profile_path }) => (
          <li key={id} className={css.item}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                  : defaultImg
              }
              width="250px"
              height="350px"
              alt={name}
            />
            <p className={css.title}>{name}</p>
            <p>
              <span className={css.title}>Character: </span>
              {character}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
