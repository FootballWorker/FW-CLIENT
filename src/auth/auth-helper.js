import { signout } from "./api-auth.js";

const auth = {
  // Check if token is stored
  isAuthenticated() {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else if (sessionStorage.getItem("jwt")) {
      return JSON.parse(sessionStorage.getItem("jwt"));
    } else {
      return false;
    }
  },

  // Store the token in client side
  authenticate(status, jwt, cb) {
    if (typeof window !== "undefined") {
      if (status) {
        localStorage.setItem("jwt", JSON.stringify(jwt));
      } else {
        sessionStorage.setItem("jwt", JSON.stringify(jwt));
      }
    }
    cb();
  },

  // Clear token in client-side
  clearJWT(cb) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      sessionStorage.removeItem("jwt");
    }
    cb();
    // optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu , 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};

export default auth;
