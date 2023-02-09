import { API, endpoints } from "../api";
import User from "../shared/models/userModel";

class AuthService {
  static userLogin(user: User) {
    return API.post(endpoints.api.auth.login, user);
  }

  static validateToken(token: string) {
    return API.post(endpoints.api.auth.verifyToken, { token });
  }

  static sendPasswordResetLink(email: string) {
    return API.post(endpoints.api.auth.resetPasswordLink, { email });
  }

  static resetPassword(
    newPassword: string,
    token: string,
    passwordTimeStamp: Number,
    password = ""
  ) {
    return API.post(endpoints.api.auth.resetPassword, {
      password,
      newPassword,
      token,
      passwordTimeStamp,
    });
  }

  static refreshToken() {
    const rToken = sessionStorage.getItem("rToken") as string;

    if (rToken) {
      return API.post(endpoints.api.auth.refreshToken, { rToken });
    } else {
      return Promise.reject({ message: "rToken not Available", error: null });
    }
  }
}

export default AuthService;
