// src/services/auth.ts
import { LoginFormData, ProfileFormData, RegistrationFormData, User } from "../types/auth";
import { ERROR_CODES } from "../hooks/ErrorCodes";

const API_URL = "http://localhost:5281";

export class AuthService {
  static async login(
    data: LoginFormData
  ): Promise<{ user?: User; token: string }> {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const responseData = await response.json();

    try {
      const userProfile: User = await this.getUserProfile(
        responseData.accessToken
      );
    } catch (error: any) {
      if (error?.message === ERROR_CODES.PROFILE_NOT_EXIST) {
        // console.log("ayyyyy!")
        return {
          token: responseData.accessToken,
        };
      }
    }

    return {
      token: responseData.accessToken,
      user: await this.getUserProfile(responseData.accessToken),
    };
  }

  static async register(data: RegistrationFormData): Promise<void> {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        firstname: data.firstName,
        lastname: data.lastName,
      }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }
  }

  static async getUserProfile(token: string): Promise<User> {
    const response = await fetch(`${API_URL}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      // console.log(data);
      if (data.code == ERROR_CODES.PROFILE_NOT_EXIST) {
        // console.log(data.code);

        throw new Error(data.code);
      } else {
        throw new Error("An unexpected error has occured");
      }
    }

    return response.json();
  }
  static async updateUserProfile(token: string, data: ProfileFormData): Promise<User> {
    

    const response = await fetch(`${API_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        FirstName: data.FirstName,
        LastName: data.LastName,
        PrefName: data.PrefName,
        PhoneNumber: data.PhoneNumber
      })
    });
    if (!response.ok) {
      throw new Error("something went wrong here")
    }
    return response.json();
  }
}
