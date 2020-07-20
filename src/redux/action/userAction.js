const loginWithEmail = (email, password) => async (dispatch) => {
  const res = await fetch(`http://localhost:3001/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const body = await res.json();
  console.log(body);
  localStorage.setItem("token", body.data.token);
  dispatch({
    type: "LOGIN",
    payload: body.data.user,
  });
};
const fetchUser = () => async (dispatch) => {
  if (!localStorage.getItem("token")) {
    dispatch({ type: "APP_LOADED" });
    return;
  }
  const res = await fetch(`http://localhost:3001/auth/users/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    // body: JSON.stringify({ email, password }),
  });
  const body = await res.json();

  dispatch({ type: "LOGIN", payload: body.data });
  dispatch({ type: "APP_LOADED" });
};
const logout = () => async (dispatch) => {
  const res = await fetch(`http://localhost:3001/auth/logout`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 204) {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }
};
export { loginWithEmail, fetchUser, logout };
