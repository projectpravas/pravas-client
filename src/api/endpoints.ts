export default {
  serverBaseURL: "http://localhost:9999",
  api: {
    users: {
      create: "/users",
      update: "/users/",
      delete: "/users/",
      getOne: "/users/",
      getAll: "/users",
    },
    tours: {
      create: "/tours",
      update: "/tours/",
      delete: "/tours/",
      getOne: "/tours/",
      getAll: "/tours",
    },
    auth: {
      login: "/auth/user-login",
      validateToken: "/auth/validate-token",
      resetPassword: "/auth/password-reset-link",
      refreshToken: "/auth/refresh-token",
    },
  },
};
