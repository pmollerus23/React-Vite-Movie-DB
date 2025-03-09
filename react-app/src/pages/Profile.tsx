import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import { useAuth } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { isPhoneNumValid } from "../utils/utils";
import { ProfileFormData } from "../types/auth";
import "../css/Login.css";


import "../css/Home.css";

function Profile() {
  const { user, isAuthenticated, login, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileFormData>({
    FirstName: "",
    LastName: "",
    PrefName: "",
    PhoneNumber: "",
  });

  const getIsFormValid = () => {
    return (
      formData.FirstName &&
      formData.LastName &&
      isPhoneNumValid(formData.PhoneNumber ?? "")
    );
  };

  const clearForm = () => {
    setFormData({
      FirstName: "",
      LastName: "",
      PrefName: "",
      PhoneNumber: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO swap login function for new setProfile API call
      await updateUserProfile(formData);
      navigate("/");
      alert("Profile set successfully");
      navigate("/");
      clearForm();
    } catch (error) {
      console.error(error);
      alert("Error occured while setting profile");
      logout();
    } finally {
      clearForm();
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Profile</h2>

          <div className="Field">
            <label>
              First Name<sup>*</sup>
            </label>
            <input
              value={formData.FirstName}
              onChange={(e) =>
                setFormData({ ...formData, FirstName: e.target.value })
              }
              onBlur={(e) => {
                setFormData({ ...formData, FirstName: e.target.value });
              }}
              placeholder="First Name"
            />
          </div>

          <div className="Field">
            <label>
              Last Name <sup>*</sup>
            </label>
            <input
              value={formData.LastName}
              type="password"
              onChange={(e) => {
                setFormData({ ...formData, LastName: e.target.value });
              }}
              onBlur={(e) => {
                setFormData({ ...formData, LastName: e.target.value });
              }}
              placeholder="Last Name"
            />
          </div>

          <button type="submit" disabled={!getIsFormValid()}>
            Save
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Profile;
