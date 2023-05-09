export const transformMovies = movies => {
  return movies.map(({ id, title, poster_path }) => ({
    id,
    title,
    poster_path,
  }));
};
