// src/services/auth.ts
import { LoginFormData, RegistrationFormData, User } from '../types/auth';

const API_URL = 'http://localhost:5281';

export class AuthService {
  static async login(data: LoginFormData): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const responseData = await response.json();
    return {
      token: responseData.accessToken,
      user: await this.getUserProfile(responseData.accessToken),
    };
  }

  static async register(data: RegistrationFormData): Promise<void> {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        firstname: data.firstName,
        lastname: data.lastName,
      }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }
  }

  static async getUserProfile(token: string): Promise<User> {
    const response = await fetch(`${API_URL}/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return response.json();
  }
}