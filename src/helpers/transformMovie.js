export const transformMovie = ({
  title,
  poster_path,
  genres,
  overview,
  vote_average,
}) => ({
  title,
  poster_path,
  genres,
  overview,
  rating: vote_average,
});
