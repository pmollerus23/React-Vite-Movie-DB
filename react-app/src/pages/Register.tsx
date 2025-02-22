import { useState, useEffect } from "react";
import { validateEmail } from "../utils/utils";
import { requestRegister } from "../services/api";

// Password Error Message component
const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

// Define an interface to represent the form data
export interface RegistrationFormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

function Register() {
  // Use the interface to define the state types
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [passwordState, setPasswordState] = useState({
    value: "",
    isTouched: false,
  });

  const getIsFormValid = () => {
    return (
      validateEmail(formData.email) &&
      passwordState.value.length >= 8
    );
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
    setPasswordState({
      value: "",
      isTouched: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Pass the formData to the requestRegister API function
      await requestRegister(formData);
      alert("Account created!");
      clearForm();
    } catch (error) {
      console.error("Error registering account", error);
    } finally {
        clearForm();
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>

          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="First name"
            />
          </div>

          <div className="Field">
            <label>Last name</label>
            <input
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Last name"
            />
          </div>

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
              value={passwordState.value}
              type="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value})
                setPasswordState({ ...passwordState, value: e.target.value });
              }}
              onBlur={() => {
                setPasswordState({ ...passwordState, isTouched: true });
              }}
              placeholder="Password"
            />
            {passwordState.isTouched && passwordState.value.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
          </div>

          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
