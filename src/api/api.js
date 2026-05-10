const BASE_URL = "http://localhost/doormed-api";

// Reusable request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error.message);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

/* ================= PRODUCTS API ================= */

export const getProducts = async () => {
  return apiRequest("/products/getProducts.php");
};

export const addProduct = async (product) => {
  return apiRequest("/products/addProduct.php", {
    method: "POST",
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (product) => {
  return apiRequest("/products/updateProduct.php", {
    method: "POST",
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (id) => {
  return apiRequest("/products/deleteProduct.php", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
};

/* ================= INVENTORY API ================= */

export const getInventory = async () => {
  return apiRequest("/inventory/getInventory.php");
};

export const updateStock = async (id, stock) => {
  return apiRequest("/inventory/updateStock.php", {
    method: "POST",
    body: JSON.stringify({ id, stock }),
  });
};

/* ================= ORDERS API ================= */

export const getOrders = async () => {
  return apiRequest("/orders/getOrders.php");
};

export const updateOrderStatus = async (id, order_status) => {
  return apiRequest("/orders/updateOrderStatus.php", {
    method: "POST",
    body: JSON.stringify({ id, order_status }),
  });
};

/* ================= PATIENTS API ================= */

export const getPatients = async () => {
  return apiRequest("/patients/getPatients.php");
};

export const addPatient = async (patient) => {
  return apiRequest("/patients/addPatient.php", {
    method: "POST",
    body: JSON.stringify(patient),
  });
};


/* ================= AUTH API ================= */

export const registerUser = async (userData) => {
  return apiRequest("/auth/register.php", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (loginData) => {
  return apiRequest("/auth/login.php", {
    method: "POST",
    body: JSON.stringify(loginData),
  });
};