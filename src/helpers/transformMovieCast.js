export const transformMovieCast = cast => {
  return cast.map(({ id, name, character, profile_path }) => ({
    id,
    name,
    character,
    profile_path,
  }));
};
