import apiClient from "./apiClient";

export const getSportsFields = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();

    // const response = await apiClient.get(`/stadiums/all?${queryParams}`);
    const response = await apiClient.get(`/stadiums/all`);
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
export const getPriceDetails = async (id, day) => {
  try {
    const response = await apiClient.get(
      `/price/detail/${id}?dayOfWeek=${day}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching field with ID ${id}:`, error);
    throw error;
  }
};

// Hàm để tạo sân mới (nếu cần)
export const createField = async (fieldData) => {
  try {
    const response = await apiClient.post("/sports-fields", fieldData);
    return response.data;
  } catch (error) {
    console.error("Error creating field:", error);
    throw error;
  }
};
