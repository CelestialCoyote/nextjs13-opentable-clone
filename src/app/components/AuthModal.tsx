"use client";


import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '../../../hooks/useAuth';


const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

export default function AuthModal({
	isSignIn
}: {
	isSignIn: boolean
}) {
	const [inputs, setInputs] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		city: "",
		password: ""
	});

	const [disabled, setDisabled] = useState(true);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { signin } = useAuth();

	const renderContent = (signInContent: string, signUpContent: string) => {
		return isSignIn ? signInContent : signUpContent;
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value
		});
	};

	const handleClick = () => {
		if (isSignIn) {
			signin({ email: inputs.email, password: inputs.password });
		};
	};

	useEffect(() => {
		if (isSignIn) {
			if (inputs.email && inputs.password)
				return setDisabled(false);
		} else {
			if (inputs.firstName && inputs.lastName && inputs.email && inputs.phone && inputs.city && inputs.password)
			return setDisabled(false);
		}

		setDisabled(true);
	}, [inputs]);

	return (
		<div>
			<button
				className={`${renderContent("bg-blue-400 text-white", "")} border p-1 px-4 rounded mr-3`}
				onClick={handleOpen}
			>
				{renderContent("Sign In", "Sign Up")}
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="p-2 h-[500px]">
						<div className="uppercase font-bold text-center pb-2 border-b mb-2">
							<p className="text-sm">
								{renderContent("Sign In", "Create Account")}
							</p>
						</div>
						<div className="m-aut0">
							<h2 className="text-2xl font-light text-center">
								{renderContent("Log Into Account", "Create Open Table Account")}
							</h2>
							<AuthModalInputs
								inputs={inputs}
								handleChangeInput={handleChangeInput}
								isSignIn={isSignIn}
							/>
							<button
								className="uppercase bg-red-600 w-full tex-white p-3 rounded text-sm disabled:bg-gray-400"
								disabled={disabled}
								onClick={handleClick}
							>
								{renderContent("Sign In", "Create Account")}
							</button>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
