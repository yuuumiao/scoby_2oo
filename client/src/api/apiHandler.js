import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfo() {
    return service
      .get("/api/users/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUserInfos(data) {
    return service
      .patch("/api/users/me", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getItems() {
    return service
      .get("/api/items")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createItems(data) {
    return service
      .post("/api/items", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateItems(id, data) {
    return service
      .patch(`/api/items/${id}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteItem(id) {
    return service
      .delete(`/api/items/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
