import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { getUserId } from "../services/api";

function Favorites() {
  const { favorites } = useMovieContext();

  const handleClick = async () => {
    try {
      await getUserId();
    } catch (error) {
      console.log(error);
    } finally {
      //pass
    }
  };

  // if (favorites) {
  return (
    // <div className="favorites">
    //   <h2>Your Faovrites</h2>
    //   <div className="movies-grid">
    //     {favorites.map((movie) => (
    //       <MovieCard movie={movie} key={movie.id} />
    //     ))}
    //   </div>
    // </div>

    <div>
      <button onClick={handleClick}></button>
    </div>
  );
}

export default Favorites;
