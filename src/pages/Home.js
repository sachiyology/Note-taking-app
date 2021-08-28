import React, { useState, useEffect } from 'react';

export default function Home(props) {
	const [token, setToken] = useState(''); //authenticated

	const [user, setUser] = useState({
		username: '',
		password: ''
	});
	const [loggedInUser, setLoggedInUser] = useState('');
	const [toggle, setToggle] = useState(true);
	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};
	const handleLogin = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			setToken(data.token);
			setLoggedInUser(data.user.username);
			window.localStorage.setItem('token', data.token);
			window.localStorage.setItem('loggedInUser', data.user.username);
		} catch (err) {
			console.error(err);
		}
	};

	const handleRegister = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			setToken(data.token);
			setLoggedInUser(data.user.username);
			window.localStorage.setItem('token', data.token);
			window.localStorage.setItem('loggedInUser', data.user.username);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);

	return (
		<div
			className="HomePage"
			style={{ background: 'url(../public/img/mandala_1.png)' }}
		>
			{!token ? (
				<>
					<button
						onClick={() => setToggle(!toggle)}
						className="btn btn-secondary"
					>
						{toggle
							? 'Not registered yet? Register'
							: 'Already registered? Log in here'}
					</button>
					{toggle ? (
						<form onSubmit={handleLogin} className="input-group-prepend">
							<input
								type="text"
								id="username"
								value={user.username}
								onChange={handleChange}
								className="form-control"
								placeholder="username"
							/>
							<input
								type="password"
								id="password"
								value={user.password}
								onChange={handleChange}
								className="form-control"
								placeholder="password"
							/>

							<input type="submit" value="Login" className="input-group-text" />
						</form>
					) : (
						<form onSubmit={handleRegister} className="input-group-prepend">
							<input
								type="text"
								id="username"
								value={user.username}
								onChange={handleChange}
								className="form-control"
								placeholder="username"
							/>
							<input
								type="password"
								id="password"
								value={user.password}
								onChange={handleChange}
								className="form-control"
								placeholder="password"
							/>
							<input
								type="submit"
								value="Register"
								className="input-group-text"
								id=""
							/>
						</form>
					)}
				</>
			) : (
				<>
					<div>Hello {loggedInUser},</div>
				</>
			)}
		</div>
	);
}
