import { useContext } from "react";
import axios from "axios";
import { AuthenticationContext } from "../app/context/AuthContext";


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
			const response = await axios.post("https://localhost:3000/api/auth/signin", {
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
		}
	};

	const signup = async () => { }


	return {
		signin,
		signup
	}
}


export default useAuth;