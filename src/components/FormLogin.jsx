import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import AuthAPI from "../apis/auth.api";
import loginImg from "../assets/img/png/loginImg.png";

const FormLogin = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const [error, setError] = useState(null);
	const [passwordShown, setPasswordShown] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");
		await AuthAPI.login({ email, password })
			.then((result) => {
				if (result) {
					setTimeout(
						() => navigate("/dashboard"),
						Swal.fire({
							icon: "success",
							title: "Success",
							text: "Login success",
							showConfirmButton: false,
							timer: 2000,
							background: "#fefefe",
						}),
						1500
					);
					setLoading(false);
				} else {
					setTimeout(
						() =>
							Swal.fire({
								icon: "error",
								title: "Sorry",
								text: "Email or password is incorrect",
								showConfirmButton: false,
								timer: 2000,
								background: "#fef2f2",
							}),
						1500
					);
					setLoading(false);
				}
			})
			.catch(() => {
				setTimeout(
					() =>
						Swal.fire({
							icon: "error",
							title: "Sorry",
							text: "Email or password is incorrect",
							showConfirmButton: false,
							timer: 2000,
							background: "#fef2f2",
						}),
					1500
				);
				setLoading(false);
			});
	};

	const isValidEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const handleChange = (e) => {
		if (!isValidEmail(e.target.value)) {
			setError(<i className="fi fi-rr-cross absolute right-1 -bottom-0.5 p-2.5 text-sm text-red-700 lg:right-1 lg:-bottom-0.5"></i>);
		} else {
			setError(<i className="fi fi-rr-check absolute right-1 -bottom-0.5 p-2.5 text-green-700 lg:right-1 lg:-bottom-0.5 lg:text-sm"></i>);
		}

		setMessage(e.target.value);
	};

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	return (
		<div className="container">
			<div className="fixed inset-x-10 top-8 mx-auto">
				<div className="lg:m-auto">
					<div className="border-1 lg:bg-neutral rounded-none p-3 shadow-none lg:mx-auto lg:w-2/4 lg:rounded-100 lg:border-gray-200 lg:shadow-7">
						<div className="text-center">
							<Link to="/" className="text-3xl font-semibold lg:text-5xl">
								<span className="text-neutral-100-2">Work</span>
								<span className="text-primary-violet">Fit.</span>
							</Link>
							<p className="my-1 text-sm font-medium lg:text-base">How do I get started?</p>
							<img src={loginImg} alt="Login" className="mx-auto" />
							<h1 className="my-1 text-2xl font-semibold lg:text-4xl">Welcome Back Admin!</h1>
						</div>
						<form onSubmit={handleSubmit} className="mx-auto mt-1 w-full lg:mt-2 lg:w-2/4">
							<div className="mb-3 lg:mb-4">
								<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
									Email
								</label>
								<div className="relative grid grid-flow-col grid-cols-2 gap-0">
									<input
										id="email"
										name="email"
										className="col-span-2 block w-full rounded-16 border border-secondary-navy p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
										placeholder="Email"
										value={message}
										onChange={handleChange}
										required
										autoFocus
									/>
									{message === "" ? (
										<i
											title="Input with email type ('yourEmail'@mail.com)"
											className="fi fi-rr-info absolute right-0.5 -bottom-0.5 p-2.5 text-gray-300 hover:text-black hover:transition lg:-bottom-1.5 lg:text-lg"></i>
									) : (
										error && <div className="relative">{error}</div>
									)}
								</div>
							</div>
							<div className="mb-3 lg:mb-4">
								<label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
									Password
								</label>
								<div className="relative grid grid-flow-col grid-cols-2 gap-0">
									<input
										type={passwordShown ? "text" : "password"}
										id="password"
										name="password"
										className="flex-2 col-span-2 block w-full rounded-16 border border-secondary-navy p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
										required
										placeholder="Password"
									/>
									<button type="button" onClick={togglePassword}>
										{passwordShown === false ? (
											<i className="fi fi-rr-eye absolute right-0.5 -bottom-1 p-2.5 text-gray-900 hover:text-gray-300 hover:transition-colors lg:right-0.5 lg:-bottom-1.5 lg:text-lg"></i>
										) : (
											<i className="fi fi-rr-eye-crossed absolute right-0.5 -bottom-1 p-2.5 text-gray-900 hover:text-gray-300 hover:transition-colors lg:right-0.5 lg:-bottom-1.5 lg:text-lg"></i>
										)}
									</button>
								</div>
							</div>
							{loading ? (
								<button className="w-full rounded-16 bg-secondary-navy px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
									<PulseLoader size={7} color={"#ffffff"} />
								</button>
							) : (
								<button
									type="submit"
									className="w-full rounded-16 bg-secondary-navy px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
									Sign In
								</button>
							)}
						</form>
						<div className="mt-10 text-center text-xs lg:text-base">
							<span>Copyright @ 2022 Gym Membership.</span>
							<br />
							<span>All right reserved.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormLogin;
