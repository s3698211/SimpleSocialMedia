import React, { useState } from "react";
import { StyledLogin as SL } from "../components/login/LoginStyling";

import { useHistory } from "react-router-dom";
const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    let loginResponse = JSON.parse(localStorage.getItem(`user/${state.email}`));

    //case1: Email doesnt exist
    if (loginResponse == null) {
      e.preventDefault();
      setError((state) => ({
        ...state,
        email: "Email doesnt exist",
      }));

      return;
    }
    //case2: Email exist but incorrect password
    if (loginResponse !== null) {
      //if the email is fine,stop displaying the error
      setError((state) => ({
        ...state,
        email: "",
      }));

      if (loginResponse.password !== state.password) {
        setError((state) => ({
          ...state,
          password: "You entered wrong password",
        }));
        console.log(loginResponse);
        e.preventDefault();
        return;
      }

      if (loginResponse.password === state.password) {
        e.preventDefault();
        localStorage.setItem("currentUser", JSON.stringify(loginResponse));
        alert("Login Successful");
        history.push("/home");
      }
    }
  };

  const ErrorMessageEmail = (
    <>
      <SL.ErrorMessage type="invalid">{error.email}</SL.ErrorMessage>
      <br />
    </>
  );
  const ErrorMessagePassword = (
    <>
      se
      <SL.ErrorMessage type="invalid">{error.password}</SL.ErrorMessage>
      <br />
    </>
  );

  return (
    <SL.Container>
      <center>
        <SL.Form onSubmit={handleSubmit}>
          <SL.FormControl
            name="email"
            type="email"
            placeholder="name@example.com"
            value={state.email}
            onChange={handleChange}
          />
          {error.email !== "" ? ErrorMessageEmail : ""}
          <SL.FormControl
            name="password"
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
          {error.password !== "" ? ErrorMessagePassword : ""}
          <SL.Button type="submit">Login</SL.Button>
        </SL.Form>
      </center>
    </SL.Container>
  );
};

export default Login;
