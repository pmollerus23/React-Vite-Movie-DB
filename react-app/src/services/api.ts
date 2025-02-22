import { LoginFormData } from "../pages/Login";
import { RegistrationFormData } from "../pages/Register";

const API_KEY = "c62e64ee8d699d4571b7633fb77a867f";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

// Example API function
export const requestRegister = async (data: RegistrationFormData) => {
  const tmpData = {
    email: data.email,
    password: data.password,
    firstname: data.firstName,
    lastname: data.lastName
  };
  const response = await fetch("http://localhost:5281/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(tmpData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return;
  //return response.json();
  // re // Or handle the response as needed
};

export const requestLogin = async (data: LoginFormData) => {
  const tmpData = {
    email: data.email,
    password: data.password,
  };
  const response = await fetch("http://localhost:5281/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(tmpData),
  });

  if (response.ok) {
    const data = await response.json();
    const token = data.accessToken;
    localStorage.setItem("authToken", token); // Store token in localStorage
    console.log("login successful. token saved in localstorage");
  } else {
    throw new Error("login failed");
  }
  return;
};

const fetchWithAuth = async (url: string, options = {}) => {
  const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

  // If token exists, add it to the headers of the request
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  return response;
};

export const getUserId = async () => {
  const response = await fetchWithAuth("http://localhost:5281/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("i fire once");
    return data;
  } else {
    throw new Error("error passing auth");
  }
};