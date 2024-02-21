import { AuthProvider } from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL;

const authProvider: AuthProvider = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.status !== 200) {
        return Promise.reject("Usuario o contraseña incorrectos");
      }
      const data = await response.json();
      localStorage.setItem("role", data.role);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          email: data.email,
          fullName: data.name,
        })
      );
      localStorage.setItem("token", data.token);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return Promise.resolve();
  },
  checkAuth: () => {
    if (window.location.pathname === "/register") {
      return Promise.resolve();
    }
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401) {
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: () => {
    const user = localStorage.getItem("user");
    return Promise.resolve(JSON.parse(user || "{}"));
  },
  getPermissions: () => {
    const role = localStorage.getItem("role");
    return Promise.resolve(role);
  },
};

export default authProvider;
