import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services';
import css from 'components/Reviews/Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    (async () => {
      const movieReviews = await getMovieReviews(movieId);
      setReviews(movieReviews);
    })().catch(error => console.log(error));
  }, [movieId]);

  return (
    <>
      <ul className={css.list}>
        {reviews.length === 0
          ? "We don't have any reviews for this movie"
          : reviews.map(({ id, author, content }) => (
              <li key={id}>
                <p className={css.title}>{author}</p>
                <p>{content}</p>
              </li>
            ))}
      </ul>
    </>
  );
};

export default Reviews;
