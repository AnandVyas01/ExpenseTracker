import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createExpense = async (expense) => {
  try {
    const res = await axios.post(API_URL, expense);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getExpenses = async (category, sort) => {
  try {
    const params = {};
    if (category) params.category = category;
    if (sort) params.sort = sort;

    const res = await axios.get(API_URL, { params });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
