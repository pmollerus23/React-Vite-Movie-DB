import { useState, useEffect } from "react";
import { validateEmail } from "../utils/utils";
import { requestLogin } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import "../css/Login.css";

export interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  // const { login } = useUser(); // Get the login function from context
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const getIsFormValid = () => {
    return validateEmail(formData.email) && formData.password.length >= 8;
  };

  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData);
      navigate("/");
      alert("You are now logged in");
      clearForm();
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      clearForm();
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Login</h2>

          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email address"
            />
          </div>

          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              value={formData.password}
              type="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              onBlur={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              placeholder="Password"
            />
          </div>

          <button type="submit" disabled={!getIsFormValid()}>
            Log In
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
