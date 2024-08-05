import { memo } from "react";
const MoviesDisplay = (props) => {
  return (
    <div className="movie_container">
      {props.result.map((movie) => {
        return (
          <div key={movie.imdbID} className="movies">
            <div className="imageContainer">
              <img src={movie.Poster} alt="Poster" />
            </div>
            <div className="movieTitle">
              <p>{movie.Title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default memo(MoviesDisplay);
