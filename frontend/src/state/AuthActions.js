export const LoginStart = (user) => {
  return {
    type: "LOGIN_START",
  };
};

export const LoginSuccess = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const LoginFailure = (error) => {
  return {
    type: "LOGIN_FAILAURE",
    payload: error,
  };
};

export const SetUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT",
  };
};
