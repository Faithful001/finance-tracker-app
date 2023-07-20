"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const body = { email, password };
  const formSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/signup",
        body
      );
      // const token = response.data.token;
      localStorage.setItem("user", response);
      console.log(response.data);
      dispatch({ type: "LOGIN", payload: JSON.stringify(response.data) });
      setMessage(response.data?.message);
      setError("");
      navigate("/login");
      return response.data;
    } catch (error) {
      //   console.log(error.message);
      setError(error.response.data?.error);
      setMessage("");
    }
  };

  const { mutate, isLoading } = useMutation(formSignup, {
    onSuccess: () => {
      queryClient.invalidateQueries("login");
      // console.log("signed up successfully");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleFormSignup = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="login w-[30rem] h-screen pb-5 px-[10px] bg-white">
      <div className="section p-10 mx-16">
        <form
          className="flex max-w-md flex-col gap-4"
          onSubmit={handleFormSignup}
        >
          <h1 className="flex justify-center font-bold text-[30px] text-g">
            Sign up
          </h1>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name1" value="Your email" />
            </div>
            <TextInput
              id="name"
              placeholder="example@gmail.com"
              required
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="Your password"
                placeholder="*****"
              />
            </div>
            <TextInput
              id="password"
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isLoading ? (
            <button
              className="bg-[#1A1A1A] hover:bg-[#444444] w-full 5 p-2 rounded-md text-white"
              type="submit"
            >
              Loading...
            </button>
          ) : (
            <button
              className="bg-[#1A1A1A] hover:bg-[#444444] w-full 5 p-2 rounded-md text-white"
              type="submit"
            >
              Sign up
            </button>
          )}
          {message && <p className="text-dark">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
          <p>
            Already have an account?
            <Link to="/login">
              <u>Log in</u>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
