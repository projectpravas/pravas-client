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
      verifyToken: "/auth/validate-token",
      refreshToken: "/auth/refresh-token",
      resetPasswordLink: "/auth/reset-password-link",
      resetPassword: "/auth/reset-password",
      changePassword: "/auth/change-password",
    },

    blog: {
      create: "/blogs",
      update: "/blogs/",
      delete: "/blogs/",
      getOne: "/blogs/",
      getAll: "/blogs",
    },
    enquiries: {
      create: "/enquiries",
      update: "/enquiries/",
      delete: "/enquiries/",
      getOne: "/enquiries/",
      getAll: "/enquiries",
    },
  },
};
