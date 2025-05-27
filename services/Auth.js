import { createAbortableFetch } from "./Utils";

class AuthService {
  static TOKEN_KEY = "token";
  static REFRESH_TOKEN_KEY = "refresh_token";
  static USER_ID_KEY = "user_id";

  static isAuthenticated() {
    return !!this.getToken();
  }

  static getToken() {
    return window.localStorage?.getItem(this.TOKEN_KEY);
  }

  static getRefreshToken() {
    return window.localStorage?.getItem(this.REFRESH_TOKEN_KEY);
  }

  static getUserId() {
    return window.localStorage?.getItem(this.USER_ID_KEY);
  }

  static setTokens(token, refreshToken) {
    window.localStorage?.setItem(this.TOKEN_KEY, token);
    window.localStorage?.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  static setUserId(userId) {
    window.localStorage?.setItem(this.USER_ID_KEY, userId);
  }

  static clearAuth() {
    window.localStorage?.removeItem(this.TOKEN_KEY);
    window.localStorage?.removeItem(this.REFRESH_TOKEN_KEY);
    window.localStorage?.removeItem(this.USER_ID_KEY);
  }

  static async login(email, password) {
    try {
      const { promise } = createAbortableFetch(
        "https://ainutritioner.click/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const response = await promise;
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const result = await response.json();

      if (result?.user?.user_id && result?.token) {
        this.setUserId(result.user.user_id);
        this.setTokens(result.token, result.refresh_token);
        return result;
      }

      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  static async renewToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const { promise } = createAbortableFetch(
        "https://ainutritioner.click/users/renew-token",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const response = await promise;
      if (!response.ok) {
        throw new Error("Token renewal failed");
      }

      const result = await response.json();
      if (result?.token && result?.refresh_token) {
        this.setTokens(result.token, result.refresh_token);
        return result;
      }

      throw new Error("Invalid token renewal response");
    } catch (error) {
      console.error("Token renewal error:", error);
      // this.clearAuth();
      throw error;
    }
  }
}

export default AuthService;
