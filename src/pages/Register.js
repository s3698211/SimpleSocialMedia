import React, { useState, useEffect } from "react";

import { useHistory } from "react-router";
import { StyledRegister as SR } from "../components/register/RegisterStyling";
import moment from "moment";
export const Register = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    join: moment().format("MMM Do YYYY"),
    post: "0",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const ErrorMessageEmail = (
    <>
      <SR.ErrorMessage type="invalid">{error.email}</SR.ErrorMessage>
      <br />
    </>
  );
  const ErrorMessagePassword = (
    <>
      <SR.ErrorMessage type="invalid">{error.password}</SR.ErrorMessage>
      <br />
    </>
  );

  const handleSubmit = (e) => {
    let temp = localStorage.getItem(`user/${state.email}`);

    //Case1: Both email and password have error
    if (temp !== null) {
      e.preventDefault();
      setError((state) => ({
        ...state,
        email: "Email is already taken.",
      }));

      if (state.password !== state.confirmPassword) {
        setError((state) => ({
          ...state,
          password: "Password and confirm password do not match",
        }));
      }
      //Stop displaying error "password do not match" if it's already fine
      if (state.password === state.confirmPassword) {
        setError((state) => ({
          ...state,
          password: "",
        }));
      }

      return;
    }
    //Case2: Email is is fine, only password has error
    //Stop displaying the email error if it's already fine
    if ((state.password !== state.confirmPassword) & (temp == null)) {
      setError({
        email: "",
        password: "Password and confirm password do not match.",
      });

      e.preventDefault();
      return;
    }
    if (state.password === "") {
      e.preventDefault();
      return;
    }

    //All Fields are valid
    //Generate user

    let id = `user/${state.email}`;
    localStorage.setItem(id, JSON.stringify(state));

    alert("Successfull");
    history.push("/login");
  };

  return (
    <SR.Container>
      <center>
        <SR.Form onSubmit={handleSubmit}>
          <SR.FormControl
            required
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
          {error.email !== "" ? ErrorMessageEmail : ""}
          <SR.FormControl
            required
            name="name"
            type="text"
            value={state.name}
            onChange={handleChange}
            placeholder="Full name"
          />
          <SR.FormControl
            required
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
          />

          {error.password !== "" ? ErrorMessagePassword : ""}
          <SR.FormControl
            required
            name="confirmPassword"
            type="password"
            value={state.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />

          {error.password !== "" ? ErrorMessagePassword : ""}
          <SR.Button type="submit">Submit</SR.Button>
        </SR.Form>
      </center>
    </SR.Container>
  );
};
