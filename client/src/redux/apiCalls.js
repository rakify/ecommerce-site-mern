import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
} from "./productRedux";
import {
  getCartStart,
  getCartSuccess,
  getCartFailure,
  addCartStart,
  addCartSuccess,
  addCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure,
} from "./cartRedux";
import axios from "axios";
axios.defaults.withCredentials = true; //so its can set automatically the cookie i want
axios.defaults.baseURL = "http://localhost:4000/api";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const getCartProducts = async (id, dispatch) => {
  dispatch(getCartStart());
  try {
    const res = await axios.get(`/carts/find/${id}`);
    dispatch(getCartSuccess(res.data));
  } catch (err) {
    dispatch(getCartFailure());
  }
};

export const addCart = async (id, product, dispatch) => {
  dispatch(addCartStart());
  try {
    const res = await axios.post(`/carts/${id}`, product);
    dispatch(addCartSuccess(res.data));
  } catch (err) {
    dispatch(addCartFailure());
  }
};

export const deleteCart = async (id, dispatch) => {
  dispatch(deleteCartStart());
  try {
    const res = await axios.delete(`/carts/${id}`);
    dispatch(deleteCartSuccess(res.data));
  } catch (err) {
    dispatch(deleteCartFailure());
  }
};
