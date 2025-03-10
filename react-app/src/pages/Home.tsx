import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import { useAuth } from "../contexts/UserContext";
import "../css/Home.css";

function Home() {
  return <>
  </>
  // const { user, isAuthenticated, login, logout } = useAuth();
  // if (!isAuthenticated) {
  //   return <h2>Please log in to see the homepage.</h2>;
  // }

  // return (
  //   <div>
  //     <h1>Welcome, {user?.firstName ?? "Guest"}</h1>{" "}
  //   </div>
  // );
}

export default Home;
