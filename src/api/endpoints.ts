export default {
  serverBaseURL: "https://pravastourism.com:9998",
  api: {
    users: {
      create: "/users",
      update: "/users/",
      delete: "/users/",
      getOne: "/users/",
      getAll: "/users",
      checkIds: "/users/isvalidId",
      addRemoveTourId: "/users/add-remove-tourId",
      addRemoveWishlist: "/users/add-remove-wishlist",
    },
    tours: {
      create: "/tours",
      update: "/tours/",
      delete: "/tours/",
      getOne: "/tours/",
      getAll: "/tours",
      getUpcoming: "/tours/upcoming-tours/",
      updateReview: "/tours/update-review/",
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

    bookingOrders: {
      bookNow: "/bookingOrders/create-order",
      verify: "/bookingOrders/verify-order",
      getPaymentHistory: "/bookingOrders/payment-history",
      refund: "/bookingOrders/refund",
    },
  },
};
