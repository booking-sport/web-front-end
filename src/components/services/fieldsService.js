import apiClient from "./apiClient";
import Cookies from "js-cookie";

const jwt = Cookies.get("jwt") || null;

export const getSportsFields = async (type, name) => {
  try {
    // const response = await apiClient.get(`/stadiums/all?${queryParams}`);
    const response = await apiClient.get(
      `/stadiums/all/?stadiumType=${type}&name=${name}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sports fields:", error);
    throw error;
  }
};

export const getFieldDetails = async (id) => {
  try {
    const response = await apiClient.get(`/stadiums/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching field with ID ${id}:`, error);
    throw error;
  }
};
export const getPriceDetails = async (id, day, date, order_type) => {
  try {
    const response = await apiClient.get(
      `/price/detail/${id}?dayOfWeek=${day}&date=${date}&orderType=${order_type}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching field with ID ${id}:`, error);
    throw error;
  }
};

export const createOrder = async (
  id,
  orders,
  deposit,
  note,
  userName,
  userNumber,
) => {
  try {
    const response = await apiClient.post(
      `/orders/stadium/${id}`,
      {
        orders: orders,
        note: note,
        deposit: deposit,
        fullName: userName,
        phoneNumber: userNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating field:", error);
    throw error;
  }
};

export const getPaymentInfoByStadiumId = async (id) => {
  try {
    const response = await apiClient.get(`/stadiums/${id}/payment-info`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating field:", error);
    throw error;
  }
};
export const getUserInfoById = async (id) => {
  try {
    const response = await apiClient.get(`/players/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetch data:", error);
    throw error;
  }
};

export const editNumberById = async (id, phoneNumber) => {
  try {
    const response = await apiClient.put(
      `/players/${id}/`,
      {
        phoneNumber: phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error change number:", error);
    throw error;
  }
};
export const editPasswordById = async (id, oldPassword, newPassword) => {
  try {
    const response = await apiClient.put(
      `/players/${id}/`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error change password:", error);
    throw error;
  }
};
export const editNameById = async (id, fullName) => {
  try {
    const response = await apiClient.put(
      `/players/${id}/`,
      {
        fullName: fullName,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error change name:", error);
    throw error;
  }
};

export const checkPaymentStatus = async (orderCode) => {
  try {
    const response = await apiClient.get(`/payment/${orderCode}`);
    return response.data;
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
};
export const updatePaymentStatus = async (orderCode, status) => {
  try {
    const response = await apiClient.put(
      `/orders/${orderCode}`,
      {
        paymentStatus: status,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
};
export const updateOrderDetailStatus = async (orderCode, status) => {
  try {
    const response = await apiClient.put(
      `/orders/detail/${orderCode}`,
      {
        orderStatus: status,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
};
export const getFieldComment = async (stadiumId) => {
  try {
    const response = await apiClient.get(`/comments/stadium/${stadiumId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comment:", error);
    throw error;
  }
};
export const getOrderHistory = async (userToken) => {
  try {
    const response = await apiClient.get(`/orders/self/player`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};
export const postReviewComment = async (stadiumId, reviewData) => {
  try {
    const response = await apiClient.post(
      `/comments/${stadiumId}`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};