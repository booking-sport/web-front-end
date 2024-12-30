import apiClient from "./apiClient";

export const getSportsFields = async (type, name) => {
  try {
    // const response = await apiClient.get(`/stadiums/all?${queryParams}`);
    const response = await apiClient.get(
      `/stadiums/all/?stadiumType=${type}&name=${name}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sports fields:", error);
    throw error;
  }
};

// Hàm để lấy chi tiết 1 sân cụ thể
export const getFieldDetails = async (id) => {
  try {
    const response = await apiClient.get(`/stadiums/${id}`);
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
    const response = await apiClient.post(`/orders/stadium/${id}`, {
      orders: orders,
      note: note,
      deposit: deposit,
      fullName: userName,
      phoneNumber: userNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating field:", error);
    throw error;
  }
};

export const getPaymentInfoByStadiumId = async (id) => {
  try {
    const response = await apiClient.get(`/stadiums/${id}/payment-info`);
    return response.data;
  } catch (error) {
    console.error("Error creating field:", error);
    throw error;
  }
};
export const getUserInfoById = async (id) => {
  try {
    const response = await apiClient.get(`/players/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetch data:", error);
    throw error;
  }
};

export const editNumberById = async (id, phoneNumber) => {
  try {
    const response = await apiClient.put(`/players/${id}/`, {
      phoneNumber: phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error change number:", error);
    throw error;
  }
};
export const editPasswordById = async (id, oldPassword, newPassword) => {
  try {
    const response = await apiClient.put(`/players/${id}/`, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error change password:", error);
    throw error;
  }
};
export const editNameById = async (id, fullName) => {
  try {
    const response = await apiClient.put(`/players/${id}/`, {
      fullName: fullName,
    });
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
export const updatePaymentSuccess = async (orderCode) => {
  try {
    const response = await apiClient.put(`/orders/${orderCode}`, {
      paymentStatus: "paid",
    });
    return response.data;
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
};