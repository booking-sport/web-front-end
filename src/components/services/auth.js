import apiClient from "./apiClient";
import Cookies from "js-cookie";
export const login = async (username, password) => {
  try {
    const response = await apiClient.post("/players/login", {
      email: username,
      password: password,
    });
    const responseData = response.data;
    if (responseData) {
      Cookies.set("jwt", responseData.data.token, { expires: 1 });
      localStorage.setItem("user", JSON.stringify(responseData.data.user));
      return { success: true, user: responseData.data.user };
    } else {
      return { success: false, message: responseData.data.message };
    }
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Đăng nhập thất bại. Vui lòng thử lại!" };
  }
};
export const register = async (username, password, phoneNumber, fullName) => {
  try {
    const response = await apiClient.post("/players", {
      email: username,
      password: password,
      phoneNumber: phoneNumber,
      fullName: fullName,
    });
    const responseData = response.data;
    if (responseData) {
      console.log(responseData.data);
      return { success: true, user: responseData.data.user };
    } else {
      return { success: false, message: responseData.data.message };
    }
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Đăng kí thất bại. Vui lòng thử lại!" };
  }
};


export const logout = async () => {
  try {
    await apiClient.post("/players/logout");
  } catch (error) {
    console.error("Logout Error:", error);
  } finally {
    Cookies.remove("jwt");
    window.location.reload();
  }
};
