import { useContext } from "react";
import axios from "axios";
import { AuthenticationContext } from "../app/context/AuthContext";
import { getCookie } from "cookies-next";


const useAuth = () => {
	const { loading, error, data, setAuthState } = useContext(AuthenticationContext)

	const signin = async ({
		email,
		password
	}: {
		email: string;
		password: string
	}, handleClose: () => void) => {
		setAuthState({
			loading: true,
			error: null,
			data: null
		});

		try {
			const response = await axios.post("http://localhost:3000/api/auth/signin", {
				email,
				password
			});

			setAuthState({
				loading: false,
				error: null,
				data: response.data
			});
			handleClose();
		} catch (error: any) {
			console.log(error);
			setAuthState({
				loading: false,
				error: error.response.data.errorMessage,
				data: null
			});
		};
	};

	const signup = async ({
		email,
		password,
		firstName,
		lastName,
		phone,
		city
	}: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		phone: string;
		city: string;
	}, handleClose: () => void) => {
		setAuthState({
			loading: true,
			error: null,
			data: null
		});

		try {
			const response = await axios.post("http://localhost:3000/api/auth/signup", {
				email,
				password,
				firstName,
				lastName,
				phone,
				city
			});

			setAuthState({
				loading: false,
				error: null,
				data: response.data
			});
			handleClose();
		} catch (error: any) {
			console.log(error);
			setAuthState({
				loading: false,
				error: error.response.data.errorMessage,
				data: null
			});
		};
	};

	return {
		signin,
		signup,
	};
};


export default useAuth;

//user: homer@simpson.com
//password: paSswo342rd!!!fasD