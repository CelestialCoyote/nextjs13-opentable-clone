import NavBar from './components/NavBar';
import AuthContext from './context/AuthContext';
import './globals.css';


export const metadata = {
	title: 'OpenTable Clone',
	description: 'next13 app',
	icons: {
		icon: '/favicon.ico'
	}
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="">
				<main className="bg-gray-100 min-h-screen w-screen">
					<AuthContext>
						<main className="max-w-screen-2xl m-auto bg-white">
							<NavBar />
							{children}
						</main>
					</AuthContext>
				</main>
			</body>
		</html>
	)
}
