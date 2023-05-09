export const transformMovieReviews = reviews => {
  return reviews.map(({ id, author, content }) => ({
    id,
    author,
    content,
  }));
};
