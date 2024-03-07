import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

//初期の状態を定義する
const initialState = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  // user: {
  //   _id: "65dc3e81a50d870706ffdfd9",
  //   username: "ann",
  //   email: "a@a.jp",
  //   password: "123456",
  //   profilePicture: "/person/1.jpeg",
  //   coverPicture: "",
  //   followers: [],
  //   followings: ["65dc3ecfa50d870706ffdfe6"],
  //   isAdmin: false,
  // },
  user: null,
  isFetching: false,
  error: false,
};

//状態をグローバルに管理する
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    // localStorageからユーザー情報を読み込む
    const userData = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
    if (userData) {
      const user = JSON.parse(userData);
      dispatch({ type: 'SET_USER', payload: user });
    }
  }, []);

  useEffect(() => {
    // ユーザー情報が更新されたらlocalStorageに保存
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

