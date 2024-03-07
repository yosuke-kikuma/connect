import axios from "axios";

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      user
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
