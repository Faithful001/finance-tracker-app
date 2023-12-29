import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../api/api";

const Login = () => {
	const { user, dispatch } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [visible, setVisible] = useState(false);
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	function handleVisibility() {
		setVisible(!visible);
	}

	const body = { email, password };
	const formLogin = async () => {
		try {
			const response = await axios.post(`${API.prodAPI}/api/user/login`, body);
			// const token = response.data.token;
			localStorage.setItem("user", JSON.stringify(response.data));
			console.log(response.data);
			dispatch({ type: "LOGIN", payload: response.data });
			setMessage(response.data?.message);
			setError("");
			navigate("/user");
			return response.data;
		} catch (error) {
			console.log(error.response.data?.error);
			setError(error.response.data?.error);
			setMessage("");
		}
	};

	const { mutate, isLoading } = useMutation(formLogin, {
		onSuccess: () => {
			queryClient.invalidateQueries("login");

			// console.log("logged in successfully");
		},
		onError: (error) => {
			console.log(error.message);
		},
	});

	const handleFormLogin = (e) => {
		e.preventDefault();
		mutate();
	};

	return (
		<div className="login w-[30rem] h-screen pb-5 px-[10px] bg-white">
			<div className="section p-10 mx-16">
				<form
					className="flex max-w-md flex-col gap-4"
					onSubmit={handleFormLogin}
				>
					<h1 className="flex justify-center font-bold text-[30px]">Log in</h1>
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
						<div className="relative">
							<TextInput
								id="password1"
								required
								type={visible ? "text" : "password"}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{!visible ? (
								<span
									onClick={handleVisibility}
									className="material-symbols-outlined absolute text-xl top-2 right-2 text-black pl-5 cursor-pointer"
								>
									visibility_off
								</span>
							) : (
								<span
									onClick={handleVisibility}
									className="material-symbols-outlined absolute text-xl top-2 right-2 text-black pl-5 cursor-pointer"
								>
									visibility
								</span>
							)}
						</div>
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
							Log in
						</button>
					)}
					{message && <p className="text-dark">{message}</p>}
					{error && <p className="text-red-600">{error}</p>}
					<p>
						Don't have an account?
						<Link to="/signup">
							<u>Sign up</u>
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
